"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { META_TARGET } from "@/lib/capi/token";
import type { Mapping } from "@/lib/mappings";
import {
  ensureTrackingKey,
  getHostingLabel,
  getTrackingKey,
  setCapiState,
  setHostingState,
  type ProjectSettings,
} from "@/lib/settings";
import {
  buildLiveUrl,
  randomLabelSuffix,
  slugForLabel,
} from "@/lib/hosting/host";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import {
  deliverableVariantB,
  emptyPublishVariant,
  EMPTY_PUBLISH_MESSAGE,
  EMPTY_VARIANT_A_MESSAGE,
  EMPTY_VARIANT_B_MESSAGE,
  VARIANT_B_NOT_PUBLISHED_MESSAGE,
  type PublishedLike,
} from "@/lib/hosting/variant";

/**
 * Speichern-Ergebnis. Bei { ok: true } liefert die Action die (ggf. NEU
 * angelegte) projectId zurueck, damit der Client sie als aktives Projekt
 * uebernimmt. Bei { ok: false } zeigt er error an.
 */
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

/** Schmales ok/error-Ergebnis fuer Aktionen ohne Rueckgabewert (delete/rename). */
export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Eine geladene Projektzeile. mappings haelt die Aktions-Zuweisungen (jsonb).
 */
export type ProjectRow = {
  id: string;
  name: string;
  html: string;
  mappings: Mapping[];
  // Projektweite Einstellungen (jsonb, Scheibe 1b). Genau wie mappings
  // durchgereicht/persistiert. Default '{}' in der DB -> {} fuer Altzeilen.
  settings: ProjectSettings;
  // Variante B (Phase 9 Scheibe 9a). BEIDE null = dieses Projekt hat KEINE
  // Variante B; der DB-CHECK projects_variant_b_pair (Migration 0016) garantiert
  // den Gleichlauf, "html_b IS NOT NULL" ist die EINZIGE Existenz-Wahrheitsquelle.
  html_b: string | null;
  mappings_b: Mapping[] | null;
  // A/B-Test aktiv? (Phase 9 Scheibe 9b-1). SERVER-autoritativ, eigene Spalte —
  // NICHT in settings (das ist client-besessen und wuerde den Schalter beim
  // naechsten saveProject wortlos zuruecksetzen).
  ab_test_active: boolean;
  // Beginn des laufenden/letzten A/B-Testlaufs (Phase 9 Scheibe 9c-2). NULL heisst
  // "keine Abgrenzung" — entweder lief nie ein Test, oder der Lauf liegt VOR 9c-2
  // (kein Backfill). Der Wert wird beim START gesetzt und beim STOPP NICHT
  // veraendert: sonst verschwaenden die Zahlen genau in dem Moment, in dem der
  // Owner sie liest.
  //
  // WOFUER DIE UI IHN BRAUCHT (der Filter braucht ihn NICHT — den liest die RPC
  // DB-seitig selbst): Sichtbarkeit der Auswertungs-Sektion und ihre
  // Zeitraum-Beschriftung. Eine "returns table"-Funktion kann ihn nicht liefern,
  // weil sie bei leerer Ergebnismenge NULL ZEILEN zurueckgibt — und genau dann
  // (Test gerade gestartet) wird er gebraucht.
  ab_test_started_at: string | null;
};

/** Listen-Eintrag fuer den Projekt-Switcher (ohne das schwere html-Feld). */
export type ProjectListItem = {
  id: string;
  name: string;
  updated_at: string;
};

/**
 * Alle Projekte des Users, zuletzt bearbeitetes zuerst. Defense in depth:
 * zusaetzlich zur RLS explizit nach user_id gefiltert.
 */
export async function listProjects(): Promise<ProjectListItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("id,name,updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as ProjectListItem[];
}

/**
 * Laedt EIN Projekt: mit id die konkrete Zeile, ohne id das zuletzt bearbeitete
 * (updated_at desc limit 1). null, wenn nichts existiert / kein User.
 * user_id-Filter zusaetzlich zur RLS (defense in depth).
 */
export async function loadProject(id?: string): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  let query = supabase
    .from("projects")
    .select(
      "id,name,html,mappings,settings,html_b,mappings_b,ab_test_active,ab_test_started_at"
    )
    .eq("user_id", user.id);

  if (id) {
    query = query.eq("id", id);
  } else {
    query = query.order("updated_at", { ascending: false }).limit(1);
  }

  const { data, error } = await query.maybeSingle();
  if (error || !data) return null;
  return data as ProjectRow;
}

/**
 * Speichert den (bereits CLIENT-SEITIG stabilisierten) Code. Parst/stabilisiert
 * hier NICHTS: DOMParser existiert auf dem Server nicht.
 *
 * projectId gesetzt -> update GENAU dieser Zeile. projectId null -> insert eines
 * neuen Projekts. user_id wird IMMER aus der Server-Session gesetzt, NIE aus
 * Client-Argumenten; zusammen mit RLS und dem expliziten user_id-Filter
 * (defense in depth) kann kein User in eine fremde Zeile schreiben.
 *
 * updated_at wird bei jedem Speichern verbindlich auf now() gesetzt — der
 * BEFORE-UPDATE-Trigger erzwingt es ohnehin, hier zusaetzlich explizit, weil
 * "zuletzt bearbeitet" (Listen-Sortierung + Fallback) daran haengt.
 *
 * mappings + settings werden mit dem html zusammen gespeichert (jsonb). Beide
 * fassen den Code nicht an -> ohne Mit-Speichern gingen sie still verloren.
 */
export async function saveProject(
  projectId: string | null,
  html: string,
  mappings: Mapping[],
  settings: ProjectSettings
): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  if (projectId) {
    const { data, error } = await supabase
      .from("projects")
      .update({ html, mappings, settings, updated_at: new Date().toISOString() })
      .eq("id", projectId)
      .eq("user_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) return { ok: false, error: error.message };
    if (!data) return { ok: false, error: "Projekt nicht gefunden." };
    return { ok: true, id: data.id };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      html,
      mappings,
      settings,
      name: "Unbenanntes Projekt",
    })
    .select("id")
    .single();

  if (error || !data)
    return { ok: false, error: error?.message ?? "Anlegen fehlgeschlagen." };
  return { ok: true, id: data.id };
}

/**
 * Speichert Variante B (Phase 9 Scheibe 9a). GETRENNTE Action statt eines
 * variant-Parameters an saveProject — und das ist der ganze Punkt:
 *
 * INVARIANTE (ii) STRUKTURELL, NICHT LAUFZEITABHAENGIG: die Spaltenmenge ist hier
 * ein LITERAL ({ html_b, mappings_b, settings, updated_at }), genau wie in
 * saveProject ({ html, mappings, settings, updated_at }). Dadurch existiert in der
 * A-schreibenden Funktion KEIN Pfad, der html_b erreicht, und in der
 * B-schreibenden KEINER, der html erreicht. Mit einem variant-Parameter entschiede
 * dagegen ein LAUFZEITWERT ueber die Zielspalte — und genau dieser Wert waere der
 * Vektor fuer den stillen Totalverlust von Variante A (ein Save auf B, der A
 * ueberschreibt, meldet keinen Fehler und ist im UI nicht zu sehen).
 *
 * SETTINGS BEWUSST IM PAYLOAD (zwei Schreiber auf denselben Blob, am Code geprueft):
 * projects.settings ist CLIENT-autoritativ und wird GANZHEITLICH ersetzt (2b-0-
 * Lektion). Mit dieser Action gibt es einen ZWEITEN solchen Schreiber. Das ist
 * KEIN Versehen: das Einstellungs-Panel (Meta-Pixel-ID) ist variant-UNABHAENGIG
 * sichtbar und editierbar, seine Aenderung geht in dasselbe dirty-Flag und wird
 * ausschliesslich ueber den EINEN grossen Speichern-Button persistiert. Fehlte
 * settings hier, ginge eine Pixel-ID-Aenderung, die der Nutzer bei aktiver Variante
 * B vornimmt, beim Speichern STILL verloren (der Client setzt savedSettings danach
 * gleich settings -> dirty faellt weg, der Wert ist weg). Beide Schreiber schreiben
 * DENSELBEN Client-Blob mit demselben Inhalt; server-autoritative Werte
 * (tracking_key, published_content) stehen wie in saveProject NICHT im Payload und
 * ueberleben damit beide.
 *
 * Ownership: user_id-Filter zusaetzlich zur RLS (defense in depth), identisch zu
 * saveProject. projectId ist PFLICHT — Variante B existiert nur auf einer bereits
 * persistierten Zeile (kein Insert-Zweig).
 */
export async function saveVariantB(
  projectId: string,
  html: string,
  mappings: Mapping[],
  settings: ProjectSettings
): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const { data, error } = await supabase
    .from("projects")
    .update({
      html_b: html,
      mappings_b: mappings,
      settings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: "Projekt nicht gefunden." };
  return { ok: true, id: data.id };
}

/**
 * Ergebnis von createVariantB. Bei Erfolg liefert die Action die TATSAECHLICH
 * geschriebenen Werte zurueck, damit der Client seinen abgeleiteten Zustand aus der
 * SERVER-Antwort uebernimmt statt ihn lokal anzunehmen ("ist ja die Kopie von A") —
 * ABLEITEN STATT LOESCHEN, angewandt auf den Varianten-Stash.
 */
export type CreateVariantBResult =
  | { ok: true; html: string; mappings: Mapping[] }
  | { ok: false; error: string };

/**
 * Legt Variante B als KOPIE der gespeicherten Variante A an (Phase 9 Scheibe 9a).
 *
 * SERVER-SEITIGE KOPIE, kein Client-Payload: die Action bekommt NUR die projectId.
 * Der Client kann damit strukturell keinen fremden/veralteten HTML-Stand in den
 * B-Slot schreiben. Die data-pagesmith-id-Anker sind in der Kopie identisch -> die
 * mitkopierten Mappings bleiben gueltig (kein Orphan-Rauschen in B).
 *
 * IDEMPOTENZ / KEIN KLOBBERN: existiert bereits ein B (html_b IS NOT NULL), bricht
 * die Action ab, statt es zu ueberschreiben. Ein versehentlicher Doppelklick darf
 * eine bearbeitete Variante B nicht auf den A-Stand zuruecksetzen.
 *
 * Zwei Roundtrips (select -> update), weil PostgREST kein "set html_b = html"
 * (Spalte-auf-Spalte) kennt. Kein heisser Pfad (eine bewusste Nutzeraktion pro
 * Projekt), kein Rennen von Belang (derselbe Nutzer, dieselbe Zeile).
 *
 * Ownership-Gate wie ueberall: user_id-Filter zusaetzlich zur RLS.
 */
export async function createVariantB(
  projectId: string
): Promise<CreateVariantBResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,html,mappings,html_b")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };
  if (owned.html_b !== null && owned.html_b !== undefined)
    return { ok: false, error: "Variante B existiert bereits." };

  const html = (owned.html as string | null) ?? "";
  const mappings = (owned.mappings as Mapping[] | null) ?? [];

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      html_b: html,
      mappings_b: mappings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (updateError) return { ok: false, error: updateError.message };

  return { ok: true, html, mappings };
}

/**
 * Entfernt Variante B (Phase 9 Scheibe 9a). Gegenstueck zu createVariantB.
 *
 * Setzt html_b + mappings_b auf NULL (Gleichlauf, DB-CHECK) UND entfernt den
 * variantB-Key aus published_content — sonst bliebe eine veraltete Variante B
 * VEROEFFENTLICHT liegen und ginge in 9b beim Split wieder live.
 *
 * BENANNTE AUSNAHME — READ-MODIFY-WRITE auf published_content: fuer den
 * Publish-Pfad ist Read-Modify-Write auf dieser Spalte ausdruecklich VERWORFEN
 * (der grosse jsonb-Blob gehoert nicht in den Ownership-select des heissen
 * Publish-Pfades, und dort besteht ein echtes Rennen). HIER ist es vertretbar und
 * bewusst gewaehlt: (a) PostgREST kennt den jsonb-"-"-Operator nicht, ein
 * feldweises Loeschen ist ueber den JS-Client nicht formulierbar; (b) das ist eine
 * seltene, explizit bestaetigte Nutzeraktion, kein Pfad, den Besucher-Traffic
 * trifft. Kein Selbstwiderspruch, sondern eine begruendete Einzelfall-Ausnahme.
 *
 * published_content BLEIBT NULL, wenn es NULL war: ein nie veroeffentlichtes
 * Projekt darf durch das Entfernen von B keinen ERFUNDENEN Zustand bekommen. Ein
 * geschriebenes {} waere nicht neutral — resolve.ts liest published?.html, und der
 * Publish-Indikator leitet aus dieser Spalte ab. Deshalb steht die Spalte in diesem
 * Fall GAR NICHT im update-Payload (die inverse Form von "ABLEITEN STATT LOESCHEN").
 *
 * A wird NIE beruehrt: html/mappings/settings/tracking_key stehen nicht im Payload.
 */
export async function removeVariantB(
  projectId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,published_content")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  // Payload-Basis: die beiden Slots im Gleichlauf auf NULL (DB-CHECK).
  //
  // ab_test_active: false MUSS im SELBEN Payload stehen (Scheibe 9b-1): der CHECK
  // projects_ab_test_needs_variant_b verbietet "Test aktiv ohne html_b". Liefe ein
  // Test und wuerde B entfernt, wiese Postgres das Update mit 23514 zurueck und der
  // Nutzer saehe beim harmlosen "Variante B entfernen" einen rohen Constraint-Fehler.
  // EIN atomarer Update erfuellt den CHECK. Der CHECK bleibt trotzdem — er ist das
  // Netz fuer einen KUENFTIGEN vierten Schreiber, nicht fuer diesen.
  const patch: Record<string, unknown> = {
    html_b: null,
    mappings_b: null,
    ab_test_active: false,
    updated_at: new Date().toISOString(),
  };

  // published_content NUR anfassen, wenn dort wirklich ein variantB-Key liegt.
  // NULL (nie veroeffentlicht) und ein Publish OHNE B lassen die Spalte unberuehrt
  // -> kein erfundener Zustand, kein ueberfluessiger Blob-Write.
  const published = owned.published_content as Record<string, unknown> | null;
  if (published && typeof published === "object" && "variantB" in published) {
    const { variantB: _dropped, ...rest } = published;
    void _dropped;
    patch.published_content = rest;
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (updateError) return { ok: false, error: updateError.message };

  return { ok: true };
}

/**
 * Ergebnis von setAbTestActive. Bei Erfolg liefert die Action den TATSAECHLICH
 * geschriebenen Zustand zurueck, damit der Client seinen Schalter aus der
 * SERVER-Antwort ableitet statt ihn lokal anzunehmen — dasselbe Muster wie
 * createVariantB in 9a ("ABLEITEN STATT LOESCHEN", angewandt auf den Schalter).
 */
export type SetAbTestResult =
  | {
      ok: true;
      abTestActive: boolean;
      /**
       * Der NEU GESETZTE Lauf-Beginn (Scheibe 9c-2) — NUR beim Starten vorhanden.
       *
       * OPTIONAL UND NICHT NULLABLE, und das ist der ganze Punkt: "undefined"
       * heisst "in diesem Aufruf NICHT geschrieben", nicht "es gibt keinen Wert".
       * Ein nullable Feld truege beide Bedeutungen in EINEM Wert — und der Client
       * wuerde beim STOPPEN seinen bekannten Zeitstempel ueberschreiben, obwohl
       * die DB ihn behalten hat (K2). Der Stopp-Zweig liefert das Feld deshalb gar
       * nicht, und der Client uebernimmt nur, was da ist.
       */
      abTestStartedAt?: string;
    }
  | { ok: false; error: string };

/**
 * Startet/stoppt den A/B-Test eines Projekts (Phase 9 Scheibe 9b-1).
 *
 * FALLE — "AKTIV" HEISST NICHT "VEROEFFENTLICHT": der DB-CHECK garantiert, dass B
 * als ENTWURF existiert (html_b), NICHT dass B VEROEFFENTLICHT ist. Wer B anlegt
 * und den Test aktiviert, OHNE neu zu publishen, haette ab_test_active = true, aber
 * KEINEN variantB-Key in published_content — die Serve-Route wuerfelte Besucher in
 * einen Bucket, der ins Leere greift. Darum verweigert die Aktivierung hier mit
 * klarem Text. ZWEITE, unabhaengige Massnahme (Defense-in-Depth): die Serve-Route
 * faellt in genau diesem Fall ohnehin auf A zurueck — sie trifft NIE eine Annahme
 * ueber den Publish-Zustand.
 *
 * DEAKTIVIEREN ist bedingungslos: es fuehrt IMMER in den fail-safen Zustand
 * (Route liefert A) und darf darum an keiner Vorbedingung scheitern.
 *
 * Ownership-Gate wie ueberall: user_id-Filter zusaetzlich zur RLS (defense in
 * depth), Baustil wie setCapiToken. KEIN service_role — die projects-Zeile ist
 * owner-lesbar und owner-schreibbar.
 */
export async function setAbTestActive(
  projectId: string,
  active: boolean
): Promise<SetAbTestResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,html_b,published_content")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  if (active) {
    if (owned.html_b === null || owned.html_b === undefined)
      return { ok: false, error: "Variante B existiert nicht." };

    // DASSELBE AUSLIEFERBARKEITS-PRAEDIKAT WIE DER SERVE-PFAD (deliverableVariantB).
    // Pruefte die Aktivierung nur die EXISTENZ des variantB-Keys, waehrend die
    // Auslieferung auf NICHT-LEER prueft, passte genau ein Zustand dazwischen:
    // html_b = "" ist erlaubt (der DB-CHECK verlangt nur "is not null"), publiziert
    // einen variantB-Key mit leerem html, die Aktivierung ginge DURCH — und die
    // Route degradierte still auf A. Das UI saegte "Test laeuft", die Live-URL
    // liefert ALLEN Besuchern A, und niemand merkt es.
    const published = owned.published_content as PublishedLike;
    if (!deliverableVariantB(published)) {
      // Das URTEIL faellt allein das geteilte Praedikat; die Unterscheidung hier
      // waehlt NUR den Text, damit der Nutzer die richtige Handlung sieht.
      const hasKey =
        !!published && typeof published === "object" && "variantB" in published;
      return {
        ok: false,
        // Der "nicht veroeffentlicht"-Satz kommt aus der GETEILTEN Konstante — der
        // Client-Hinweis in der Varianten-Sektion zeigt denselben Text vorab an.
        // Der "kein Inhalt"-Satz bleibt LOKAL: er beschreibt einen Zustand, den der
        // Client heute gar nicht unterscheiden kann (er kennt nur das Boolean der
        // Read-Action, nicht den Grund) -> es gibt keinen zweiten Verwender, und
        // eine Konstante ohne zweiten Verwender waere Vorrat ohne Nutzen.
        error: hasKey
          ? "Variante B hat keinen Inhalt — erst Inhalt für Variante B speichern und veröffentlichen."
          : VARIANT_B_NOT_PUBLISHED_MESSAGE,
      };
    }
  }

  // LAUF-BEGINN (Scheibe 9c-2): NUR beim START schreiben. Beim STOPP bleibt die
  // Spalte unangetastet (K2) — der gestoppte Lauf soll seine Zahlen behalten, sonst
  // verschwaende die Auswertung genau in dem Moment, in dem man sie ansieht. Ein
  // erneuter Start UEBERSCHREIBT: das ist der Zweck der Spalte (sauberer Lauf), und
  // geloescht wird dabei nichts — die events-Zeilen bleiben vollstaendig.
  //
  // ZWEI UHREN (bewusst, s. Migration 0020): dieser Zeitstempel entsteht auf dem
  // APP-Server, events.created_at per DB-now(). Der Versatz verschwindet in der
  // Netzwerkrunde plus der menschlichen Handlung, die zwischen Aktivierung und
  // erstem PageView liegen. Kein DB-seitiges now() hier — die Kopplung waere
  // teurer als das Risiko.
  const patch: Record<string, unknown> = {
    ab_test_active: active,
    updated_at: new Date().toISOString(),
  };
  const startedAt = active ? new Date().toISOString() : undefined;
  if (startedAt) patch.ab_test_started_at = startedAt;

  const { error: updateError } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (updateError) return { ok: false, error: updateError.message };

  // startedAt wird nur im Start-Zweig mitgegeben -> beim Stoppen fehlt das Feld, und
  // der Client behaelt seinen bekannten Wert (s. SetAbTestResult).
  return { ok: true, abTestActive: active, ...(startedAt ? { abTestStartedAt: startedAt } : {}) };
}

/**
 * Ergebnis von setCapiToken. Bei Erfolg liefert die Action den (ggf. neu erzeugten)
 * OEFFENTLICHEN trackingKey zurueck, damit der Client ihn zusammen mit tokenSet in
 * settings + savedSettings spiegeln kann. Der GEHEIME Token wird NIE zurueckgegeben.
 */
export type SetCapiTokenResult =
  | { ok: true; trackingKey: string }
  | { ok: false; error: string };

/**
 * Setzt den GEHEIMEN Meta-CAPI-Token eines Projekts (Scheibe 2a, Secret-Plumbing).
 * Write-only: der Token wird in die RLS-SELECT-gesperrten Geheimnis-Tabellen
 * project_secrets UND project_tokens geschrieben (Doppelschreib seit Phase 11
 * Scheibe 1, s. Punkt 4 unten) und erreicht den Client NIE zurueck. Die
 * write-only-Zusage gilt fuer BEIDE — ergaenzt, weil hier zuvor nur die
 * Alt-Tabelle stand und der gelesene Wert seither in der neuen liegt.
 *
 * Zwei-Client-Fluss (bewusst getrennt):
 * 1. Session-Check ueber den authenticated-SSR-Client (createClient).
 * 2. OWNERSHIP-GATE ZWINGEND ueber DENSELBEN authenticated-SSR-Client (RLS greift):
 *    select id from projects where id=projectId and user_id=user.id. Die Pruefung
 *    MUSS ueber den RLS-Client laufen — pruefte man ueber den Admin-Client, wuerde
 *    die Pruefung selbst RLS bypassen und waere wertlos. Nicht gefunden -> Abbruch.
 * 3. HARTE INVARIANTE: createAdminClient() (service_role, bypassed RLS) wird ERST
 *    NACH bestandenem Gate aufgerufen. Im Nicht-Owner-Pfad wird der Admin-Client GAR
 *    NICHT instanziiert (Early-return VOR jeder Admin-Zeile) -> der RLS-Bypass ist
 *    ohne bestandenes Gate physisch unerreichbar.
 * 4. Token-Upsert ueber den Admin-Client: service_role bypassed RLS -> kein
 *    WITH-CHECK, kein RETURNING-Konflikt mit der write-only-SELECT-Sperre (die frueher
 *    per authenticated-Client den Read-back scheitern liess). Die SELECT-Sperre selbst
 *    BLEIBT unveraendert (keine neue Policy) — nur der WRITE laeuft privilegiert.
 *    SEIT PHASE 11 SCHEIBE 1 IST DAS EIN DOPPELSCHREIB in BEIDE Geheimnis-Tabellen,
 *    Reihenfolge und Fehlerverhalten festgelegt — s. den Kommentar an der Stelle.
 * 5. settings-Merge (trackingKey lazy + tokenSet) bleibt ueber den authenticated-SSR-
 *    Client (RLS greift; kein Grund fuer service_role auf der geschuetzten Zeile).
 *
 * Der Client spiegelt {trackingKey, tokenSet:true} nach Erfolg in settings UND
 * savedSettings (setCapiState) -> kein false-dirty (settingsEqual ignoriert capi).
 */
export async function setCapiToken(
  projectId: string,
  token: string,
): Promise<SetCapiTokenResult> {
  const trimmed = token.trim();
  if (!trimmed) return { ok: false, error: "Token darf nicht leer sein." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  // 1) Ownership-Gate ZWINGEND ueber den authenticated-SSR-Client (RLS greift).
  //    settings (fuer pixels/Client-Einbettung) UND tracking_key (server-autoritative
  //    Identitaets-Spalte, Scheibe 2b-0) gleich mitlesen.
  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,settings,tracking_key")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  // 2) HARTE INVARIANTE: Admin-Client (service_role, bypassed RLS) erst HIER, NACH
  //    dem bestandenen Ownership-Gate, instanziieren. Oberhalb dieser Zeile steht im
  //    Nicht-Owner-Pfad KEINE Admin-Zeile -> der RLS-Bypass ist ohne Gate unerreichbar.
  const admin = createAdminClient();

  // 2a) DOPPELSCHREIB, NEUE TABELLE ZUERST (Phase 11 Scheibe 1).
  //     REIHENFOLGE IST ENTSCHIEDEN, nicht beliebig: Bricht es NACH diesem Vorgang
  //     ab, liest der LIVE-Pfad (getCapiConfigByTrackingKey) bereits den korrekten
  //     Wert und nur die Rollback-Reserve in project_tokens ist veraltet.
  //     Umgekehrt — alt zuerst — laese der Live-Pfad NICHTS, und der Server-Forward
  //     stuerbe lautlos, waehrend die Oberflaeche "Token gesetzt" zeigt.
  //     KEIN updated_at im Patch: bei Konflikt fuehrt der Trigger
  //     project_secrets_set_updated_at ihn nach, beim Insert der Spalten-Default.
  const { error: secretError } = await admin
    .from("project_secrets")
    .upsert(
      { project_id: projectId, target: META_TARGET, secret: trimmed },
      { onConflict: "project_id,target" },
    );
  // BEIDE MUESSEN GELINGEN. Kein "nur protokollieren und weiter": eine still
  // wegdriftende Alt-Tabelle machte das Code-Rollback zur Falle statt zur
  // Absicherung — sie ist die einzige Reserve, weil ein Schema-Rueckweg fehlt.
  // Durchgereicht wird AUSSCHLIESSLICH message, nie details/hint: das Geheimnis
  // selbst gehoert in keine Meldung und in kein Log.
  if (secretError) return { ok: false, error: secretError.message };

  // 2b) ALT-TABELLE, unveraendert — sie bleibt bis zu einer eigenen Scheibe die
  //     Rollback-Reserve fuer die vorige Code-Fassung.
  const row = { project_id: projectId, user_id: user.id, meta_capi_token: trimmed };
  const { error: tokenError } = await admin
    .from("project_tokens")
    .upsert(row, { onConflict: "project_id" });
  if (tokenError) return { ok: false, error: tokenError.message };

  // 3) Identitaet ableiten + DUAL-WRITE. trackingKey aus der SPALTE (Autoritaet,
  //    Scheibe 2b-0), idempotent (bestehender Wert 1:1). Geschrieben wird er in BEIDE:
  //    - tracking_key (Spalte) = Aufloesungs-Autoritaet (der Resolver liest nur sie);
  //    - settings.capi.trackingKey (via setCapiState, UNVERAENDERT) = heutige Client-
  //      Einbettung, byte-gleicher Wert -> CAPI-Client-Pfad bleibt identisch.
  //    tokenSet=true, pixels unangetastet. updated_at explizit. Ueber den
  //    authenticated-SSR-Client (RLS greift auf der geschuetzten projects-Zeile).
  const current = (owned.settings ?? {}) as ProjectSettings;
  const trackingKey = ensureTrackingKey(owned.tracking_key as string | null);
  const nextSettings = setCapiState(current, { trackingKey, tokenSet: true });

  const { error: settingsError } = await supabase
    .from("projects")
    .update({
      settings: nextSettings,
      tracking_key: trackingKey,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (settingsError) return { ok: false, error: settingsError.message };

  return { ok: true, trackingKey };
}

export type RemoveCapiTokenResult = { ok: true } | { ok: false; error: string };

/**
 * Entfernt den GEHEIMEN Meta-CAPI-Token eines Projekts (Gegenstueck zu setCapiToken).
 * Loescht die Geheimnis-Zeile in project_secrets UND project_tokens (Doppel-Delete
 * seit Phase 11 Scheibe 1, s. Punkt 3 unten) und flippt settings.capi.tokenSet auf
 * false. Ergaenzt, weil hier zuvor nur die Alt-Tabelle stand — die Spiegelung des
 * Schreibpfads, nur auf dem Loeschpfad.
 *
 * ABLEITEN STATT LOESCHEN: der trackingKey (oeffentlicher Handle, in Exporte eingebacken)
 * BLEIBT erhalten — nur der Aktivierungszustand (tokenSet) wird umgelegt. Das Tracking ist
 * ohnehin aus, sobald die Token-Zeile weg ist (der 2b-Read-Pfad findet keinen Token ->
 * kein Forward); ein spaeteres Re-Add wird damit nahtlos (setCapiToken verwendet den
 * bestehenden Key wieder).
 *
 * Gleiches heiligstes-Gate-Muster wie setCapiToken:
 * 1. Session-Check (authenticated-SSR-Client).
 * 2. OWNERSHIP-GATE ZWINGEND ueber DENSELBEN SSR-Client (RLS greift). Nicht gefunden ->
 *    Abbruch VOR jeder Admin-Zeile (IDOR-safe, Admin-Client gar nicht instanziiert).
 * 3. DELETE ueber den Admin-Client (service_role): keine der beiden Geheimnis-Tabellen
 *    traegt eine DELETE-Policy fuer authenticated -> das Loeschen laeuft ausschliesslich
 *    privilegiert. Idempotent (0 Zeilen = ok). Seit Phase 11 Scheibe 1 ist es ein
 *    DOPPEL-DELETE, gleiche Reihenfolge und gleiches Fehlerverhalten wie beim Setzen.
 * 4. settings-Merge (tokenSet:false, trackingKey erhalten) ueber den SSR-Client.
 */
export async function removeCapiToken(
  projectId: string,
): Promise<RemoveCapiTokenResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  // 1) Ownership-Gate ZWINGEND ueber den authenticated-SSR-Client (RLS greift).
  //    settings mitlesen fuer den tokenSet-Merge.
  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,settings")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  // 2) HARTE INVARIANTE: Admin-Client (service_role) erst HIER, NACH dem Gate. Oberhalb
  //    steht im Nicht-Owner-Pfad KEINE Admin-Zeile -> RLS-Bypass ohne Gate unerreichbar.
  const admin = createAdminClient();

  // 2a) NEUE TABELLE ZUERST — dieselbe Begruendung wie beim Setzen, nur in die
  //     andere Richtung: Bricht es danach ab, ist das Ziel fuer den LIVE-Pfad
  //     bereits abgeschaltet (kein Forward mit einem Geheimnis, das der Nutzer
  //     entfernt hat). Alt zuerst hiesse: die Alt-Tabelle ist leer, der Live-Pfad
  //     forwarded weiter.
  //     Der Ziel-Filter ist Pflicht: ohne ihn loeschte diese Zeile spaeter die
  //     Geheimnisse ALLER Ziele des Projekts, obwohl nur Meta gemeint ist.
  const { error: secretDelError } = await admin
    .from("project_secrets")
    .delete()
    .eq("project_id", projectId)
    .eq("target", META_TARGET);
  // BEIDE MUESSEN GELINGEN — s. setCapiToken. Nur message, nie details/hint.
  if (secretDelError) return { ok: false, error: secretDelError.message };

  // 2b) ALT-TABELLE, unveraendert.
  const { error: delError } = await admin
    .from("project_tokens")
    .delete()
    .eq("project_id", projectId);
  if (delError) return { ok: false, error: delError.message };

  // 3) settings mergen: tokenSet=false, trackingKey ERHALTEN, pixels unangetastet.
  //    Ueber den SSR-Client (RLS greift auf der geschuetzten projects-Zeile).
  const current = (owned.settings ?? {}) as ProjectSettings;
  const nextSettings = setCapiState(current, {
    trackingKey: getTrackingKey(current),
    tokenSet: false,
  });
  const { error: settingsError } = await supabase
    .from("projects")
    .update({ settings: nextSettings, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (settingsError) return { ok: false, error: settingsError.message };

  return { ok: true };
}

/** Ergebnis von publishProject. Bei Erfolg die absolute Live-URL + das Label. */
export type PublishResult =
  | {
      ok: true;
      url: string;
      label: string;
      // Die Label-Zeile fehlte und wurde MIT DEM ALTEN Label wiederhergestellt (die
      // Live-URL war bis eben tot). Optional und nur im Heilungsfall gesetzt ->
      // Projekte ohne Divergenz bekommen die byte-gleiche Antwort wie bisher
      // (Invariante i). Der Client zeigt es als Zusatz in der bestehenden
      // Statuszeile; fehlt das Feld, aendert sich am UI nichts.
      restored?: true;
    }
  | { ok: false; error: string };

// Der authenticated-SSR-Client (fuer die Typisierung des Helpers).
type SsrClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Vergibt EINEM Projekt ein neues, global eindeutiges domains-Label (slug + Random),
 * mit Kollisions-Retry. INSERT laeuft ueber den authenticated-Client -> die RLS-
 * WITH-CHECK-Policy (Projekt-Ownership) muss greifen. Unique-Violation (23505) ->
 * neuer Versuch; anderer Fehler -> Abbruch (null). Gibt das vergebene Label oder null.
 */
async function assignDomainLabel(
  supabase: SsrClient,
  projectId: string,
  name: string | null
): Promise<string | null> {
  const base = slugForLabel(name);
  for (let i = 0; i < 6; i++) {
    const label = `${base}-${randomLabelSuffix()}`;
    const { error } = await supabase
      .from("domains")
      .insert({ label, project_id: projectId });
    if (!error) return label;
    // 23505 = unique_violation -> Label schon vergeben, neuer Kandidat. Jeder andere
    // Fehler (z.B. RLS/Verbindung) ist echt -> abbrechen.
    if (error.code !== "23505") return null;
  }
  return null;
}

/**
 * Legt die Label-Zeile mit einem VORGEGEBENEN Label an (Wiederherstellung nach einer
 * Divergenz). Gegenstueck zu assignDomainLabel, das ein FRISCHES Label wuerfelt.
 *
 * Rueckgabe: null = angelegt; "taken" = das Label gehoert bereits jemandem
 * (23505 auf dem PK); "error" = alles andere.
 *
 * KEIN LABEL-DIEBSTAHL (Invariante ii) — und zwar STRUKTURELL, nicht per Guard: label
 * ist der PRIMAERSCHLUESSEL der Tabelle (Migration 0006). Ein Insert auf ein fremdes
 * Label scheitert mit 23505, unabhaengig von jeder Policy. Zusaetzlich laesst die
 * WITH-CHECK-Policy domains_insert_own nur Zeilen auf EIGENE Projekte zu. Es gibt
 * hier bewusst KEIN update/upsert — nur ein Insert kann fehlschlagen, ein Upsert
 * wuerde die fremde Zeile uebernehmen.
 */
async function insertDomainLabel(
  supabase: SsrClient,
  projectId: string,
  label: string
): Promise<null | "taken" | "error"> {
  const { error } = await supabase
    .from("domains")
    .insert({ label, project_id: projectId });
  if (!error) return null;
  return error.code === "23505" ? "taken" : "error";
}

/**
 * Publiziert ein Projekt: macht seine funktionale Seite unter label.publayer.net live.
 *
 * functionalHtml ist CLIENT-generiert (generateFunctional("export") — der Server hat
 * kein DOM, siehe generate.ts SSR-Guard). Der Server SPEICHERT nur, wie saveProject.
 *
 * IDOR-Muster wie setCapiToken: Session-Check + Ownership-Gate ZWINGEND ueber den
 * authenticated-SSR-Client (RLS greift). Beide Writes (projects.published_content und
 * domains) laufen ueber DENSELBEN authenticated-Client — anders als setCapiToken KEIN
 * service_role, weil domains owner-scoped lesbar ist (keine write-only-Sperre, kein
 * RETURNING-Konflikt). Ein Nicht-Owner scheitert am Gate, bevor irgendetwas geschrieben
 * wird.
 *
 * published_content = { html: functionalHtml, mappings, settings, publishedAt }
 * — plus, NUR wenn das Projekt eine Variante B traegt, den additiven Geschwister-Key
 * variantB: { html, mappings } (Scheibe 9a).
 * IDEMPOTENZ: ein bereits vergebenes Label (settings.hosting.label) wird
 * WIEDERVERWENDET -> Re-Publish erzeugt KEINE zweite domains-Row und KEINEN neuen Label
 * (die Live-URL bleibt stabil). Das Label wird in settings.hosting gespiegelt
 * (oeffentlich, client-lesbar), damit der Client die URL ueber Sessions hinweg kennt.
 */
export async function publishProject(
  projectId: string,
  functionalHtml: string,
  snapshot: { html: string; mappings: Mapping[]; settings: ProjectSettings },
  // Variante B (Phase 9 Scheibe 9a), OPTIONAL. Fehlt der Parameter, ist der
  // gesamte Pfad byte-gleich zu vorher (published_content traegt exakt die vier
  // bisherigen Keys) -> Invariante (i): Projekte OHNE B verhalten sich wie heute.
  // functionalHtml ist auch hier CLIENT-generiert (generateFunctional ist eine
  // reine Funktion und laesst sich auf die INAKTIVE Variante anwenden, ohne dass
  // der Editor umschaltet).
  variantB?: { functionalHtml: string; mappings: Mapping[] }
): Promise<PublishResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  // Ownership-Gate (authenticated-Client, RLS greift). name + settings + tracking_key
  // mitlesen: name -> Label-Slug, settings -> bestehendes Label (Idempotenz) +
  // Merge-Basis, tracking_key -> server-autoritative Identitaet lazy sicherstellen (2b-0).
  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,name,settings,tracking_key,html_b")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  // Der SERVER ist Autoritaet darueber, OB eine Variante B existiert (Spalte), nicht
  // der Client. Ein Client, der ein B-Artefakt mitschickt, obwohl die Spalte leer
  // ist, wird ignoriert (kein Weg, per Publish eine Variante zu erfinden).
  const hasVariantB = owned.html_b !== null && owned.html_b !== undefined;

  // FAIL-CLOSED: die Spalte sagt "B existiert", der Aufruf bringt aber kein
  // B-Artefakt mit -> es wird NICHTS geschrieben. Wuerden wir hier einfach ohne B
  // publizieren, verschwaende die veroeffentlichte Variante B STILL (die Live-Seite
  // liefe weiter, nur B waere weg) — genau die Falle, die published_content als
  // GANZHEITLICH ersetzter Blob aufstellt. Der realistische Ausloeser ist ein
  // veralteter Browser-Tab mit gecachtem JS nach einem Deploy, darum nennt der Text
  // die Handlung.
  if (hasVariantB && !variantB)
    return {
      ok: false,
      error:
        "Variante B konnte nicht mitveröffentlicht werden — dieser Tab läuft auf einem veralteten Stand. Bitte die Seite neu laden und erneut veröffentlichen. Es wurde nichts geändert.",
    };

  // ===== LEER-RIEGEL: NICHTS LEERES GEHT LIVE ====================================
  //
  // WARUM HIER UND NICHT WEITER UNTEN — das ist die eigentliche Auflage, nicht der
  // Riegel selbst: Der Label-Block direkt darunter SCHREIBT bereits
  // (insertDomainLabel/assignDomainLabel legen eine domains-Zeile an). Laege der
  // Riegel danach, hinterliesse ein ABGELEHNTER Publish eine frische Label-Zeile —
  // eine Live-URL, die nie Inhalt bekommt, und laut "DIE domains-ZEILE IST DIE
  // ALLEINIGE WAHRHEIT" waere das Projekt damit fuer jede Divergenz-Pruefung
  // "live". Hier oben schreibt die Ablehnung GAR NICHTS (Invariante i).
  //
  // WARUM AUF DEM EINGEHENDEN functionalHtml: weil der Server gleich SELBST Inhalt
  // hinzufuegt. injectPageViewEmitter("", key) liefert den reinen Emitter (~716
  // Zeichen) -> eine Pruefung NACH der Injektion saehe immer "nicht leer" und der
  // Besucher bekaeme eine visuell leere Seite. Geprueft wird exakt der String, der
  // publiziert wird; dazwischen liegt nichts als die Injektion.
  //
  // hasVariantB && variantB IST DIESELBE BEDINGUNG wie beim Bau von
  // published_content weiter unten — bewusst als geteiltes const, nicht zweimal
  // getippt (Auflage 4). Der Riegel darf B NUR pruefen, wenn B auch geschrieben
  // wird: sonst blockierte ein Client, der nach dem Entfernen der Variante noch ein
  // variantB im Zustand haelt (alter Tab), einen voellig legitimen Publish.
  //
  // Das Urteil faellt emptyPublishVariant aus der REINEN Datei — dieselbe
  // nonEmptyHtml-Regel wie im Serve-Pfad und im Aktivierungs-Riegel (Invariante v),
  // reine String-Op ohne Parser (Invariante iv).
  const publishesVariantB = hasVariantB && variantB;
  const emptyVariant = emptyPublishVariant(
    functionalHtml,
    publishesVariantB ? { html: variantB.functionalHtml } : null
  );
  if (emptyVariant)
    return {
      ok: false,
      // Ohne Variante B der neutrale Satz — "Variante A" waere dort Fachjargon fuer
      // einen Zustand, den der Nutzer gar nicht kennt. Mit B der spezifische Satz,
      // und der B-Satz nennt den AUSWEG (fuellen ODER entfernen): ein Projekt mit
      // leerem html_b ist sonst komplett unveroeffentlichbar, auch Variante A.
      error: !publishesVariantB
        ? EMPTY_PUBLISH_MESSAGE
        : emptyVariant === "a"
          ? EMPTY_VARIANT_A_MESSAGE
          : EMPTY_VARIANT_B_MESSAGE,
    };

  const currentSettings = (owned.settings ?? {}) as ProjectSettings;
  const publishedAt = new Date().toISOString();

  // ===== LABEL: DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT =====================
  //
  // FRUEHER las dieser Block das Label aus settings.hosting.label und glaubte ihm
  // blind. settings ist aber CLIENT-besessen (saveProject ersetzt es GANZHEITLICH),
  // waehrend die AUSLIEFERUNG allein an der domains-Zeile haengt (resolve.ts matcht
  // sie). Zwei ungekoppelte Wahrheiten -> Divergenz in BEIDE Richtungen:
  //   (a) settings bleibt, Zeile weg  -> Live-URL 404t, UI sagt "veroeffentlicht",
  //       und ein Re-Publish HEILT NICHT, weil getHostingLabel weiter einen Wert
  //       liefert und der Vergabe-Zweig nie betreten wird (live gemessen).
  //   (b) Zeile bleibt, settings weg  -> der naechste Publish vergibt ein ZWEITES
  //       Label; die alte Zeile wird zur Waise und servt weiter alten Inhalt.
  // Beide verschwinden, sobald die Zeile die Quelle ist: settings.hosting ist ab
  // hier ein reiner SPIEGEL (2b-0-Denkfigur, nur ohne neue Spalte — die
  // server-autoritative Wahrheit existiert bereits, sie wurde nur nicht gelesen).
  //
  // EIGENER ROUNDTRIP, bewusst: der Ownership-Select liest projects, hier geht es um
  // domains — ein Join wuerde die bewusst schmale Projektion aufweichen. Anders
  // bewertet als auf dem SERVE-Pfad ("KEIN zweiter DB-Zugriff"): den trifft JEDER
  // Besucher JEDER Kundenseite, Publish ist eine bewusste Nutzeraktion, wenige Male
  // pro Projekt.
  //
  // ALLE Label-Zeilen lesen, NICHT maybeSingle: die DB erlaubt MEHRERE davon pro
  // Projekt. Der partial-unique-Index domains_custom_host_key (0007) deckt nur
  // custom_host ab, und seine Begruendung dort bezieht sich auf die NULL-Semantik
  // von UNIQUE — sie ist KEINE Entscheidung fuer mehrere Label-Zeilen. Ein
  // maybeSingle wuerde in diesem Zustand zufaellig eine Zeile ziehen (oder mit
  // PGRST116 scheitern) und damit ueber die ausgelieferte URL wuerfeln.
  // order by created_at asc -> rows[0] ist deterministisch die AELTESTE.
  const { data: labelRows, error: labelErr } = await supabase
    .from("domains")
    .select("label, created_at")
    .eq("project_id", projectId)
    .is("custom_host", null)
    .order("created_at", { ascending: true });

  // FAIL-CLOSED: bei unklarem Zustand lieber KEIN Publish als eines, das die
  // Divergenz fortschreibt.
  if (labelErr)
    return {
      ok: false,
      error:
        "Der Veröffentlichungsstatus konnte nicht geprüft werden — bitte erneut versuchen. Es wurde nichts geändert.",
    };

  const settingsLabel = getHostingLabel(currentSettings);
  const rows = (labelRows ?? []) as { label: string; created_at: string }[];

  let label: string;
  let restored = false;

  if (rows.length > 0) {
    // NORMALFALL + Heilung von Richtung (b). Bei mehreren Zeilen deterministisch:
    // die aus settings gewinnt (URL-KONTINUITAET — laufende Ads zeigen weiter
    // richtig); gibt es die nicht, die AELTESTE. Nie "die erste zurueckgelieferte".
    // ABWEICHENDES settings-LABEL (die dritte Divergenzform): findet sich zu
    // settingsLabel KEINE Zeile, gewinnt rows[0] — und die im UI angezeigte
    // Adresse aendert sich damit. Das ist KEIN Verstoss gegen die
    // URL-Stabilitaet, sondern ihre Durchsetzung: die settings-Adresse hat nie
    // ausgeliefert (keine Zeile), die gewaehlte tut es. Die ANGEZEIGTE Adresse
    // wird auf die TATSAECHLICH servende korrigiert. Heute nicht real
    // (gemessen 2026-07-27: kein Projekt mit mehreren Label-Zeilen, keine
    // Label-Abweichung), deshalb bewusst ohne eigenen UI-Hinweis.
    const match = rows.find((r) => r.label === settingsLabel);
    label = (match ?? rows[0]).label;
  } else if (settingsLabel) {
    // HEILUNG von Richtung (a): die Zeile fehlt, das Label steht aber in settings.
    // Es wird MIT DEM ALTEN Label wiederhergestellt — ABGELEITET, nicht erfunden,
    // und die Live-URL bleibt stabil (Invariante iii).
    const ins = await insertDomainLabel(supabase, projectId, settingsLabel);
    if (ins === "taken")
      // KEIN Diebstahl (Invariante ii): das Label gehoert inzwischen jemand
      // anderem. Fail-closed statt still ein NEUES Label zu vergeben — eine
      // lautlos geaenderte Live-URL waere der teurere Fehler (laufende Ads zeigten
      // weiter auf die tote Adresse, und der Nutzer erfuehre es nie). Kein
      // Support-Kanal wird versprochen, es gibt heute keinen.
      return {
        ok: false,
        error: `Die bisherige Adresse "${settingsLabel}" ist inzwischen anderweitig vergeben. Es wurde NICHTS veröffentlicht — die Seite bleibt unter dieser Adresse offline, bis eine neue Adresse vergeben wird.`,
      };
    if (ins === "error")
      return { ok: false, error: "Label-Vergabe fehlgeschlagen." };
    label = settingsLabel;
    restored = true;
  } else {
    // ERSTER PUBLISH: weder Zeile noch settings -> frisches Label wie bisher.
    const assigned = await assignDomainLabel(
      supabase,
      projectId,
      (owned.name as string | null) ?? null
    );
    if (!assigned)
      return { ok: false, error: "Label-Vergabe fehlgeschlagen." };
    label = assigned;
  }

  // Scheibe 2b-0: server-autoritative Tracking-Identitaet lazy sicherstellen. Aus der
  // SPALTE abgeleitet (idempotent: bestehender Wert 1:1), in die SPALTE geschrieben —
  // NICHT in settings (dort ist es client-besessen und wuerde vom naechsten saveProject
  // ganzheitlich ueberschrieben; die Spalte liegt ausserhalb dieses Blobs und ueberlebt).
  // Wird HIER (vor published_content) abgeleitet, weil die 2b-1-Injektion den Key braucht
  // — reiner Reorder, identischer Wert/identische Spalten-Schreibung wie zuvor.
  const trackingKey = ensureTrackingKey(owned.tracking_key as string | null);

  // Scheibe 2b-1: den PageView-Emitter server-injizieren. Der Key kommt aus der SPALTE
  // (server-autoritativ), nicht aus settings -> funktioniert auch fuer Meta-lose Projekte
  // und loest den frueheren Ordering-Bug (Injektion NACH der Key-Sicherung, im HTML, das
  // gleich gespeichert wird). functionalHtml ist pro Publish frisch vom Client -> kein
  // Doppel-Inject. Der Emitter kommt DANEBEN — die CAPI-Wiring bleibt byte-gleich.
  const base = {
    html: injectPageViewEmitter(functionalHtml, trackingKey),
    mappings: snapshot.mappings,
    settings: snapshot.settings,
    publishedAt,
  };

  // Scheibe 9a: Variante B als ADDITIVER Geschwister-Key im BESTEHENDEN jsonb —
  // nicht als neue Spalte und NICHT als Umbau auf { a: …, b: … }. Der Serve-Pfad
  // liest weiterhin published_content.html (resolve.ts) und sieht den neuen Key
  // gar nicht -> ohne aktiven Test liefert ein Projekt IMMER A (fail-safe by
  // default, Invariante vi). Ohne B bleibt es bei EXAKT den vier Keys von base
  // (Invariante i: kein Schema-Drift fuer Bestandsprojekte).
  //
  // Invariante (iii) faellt hier strukturell an: es gibt kein "nur A publishen" —
  // EIN Publish schreibt beide Varianten in EINEM atomaren Write, also kann ein
  // Publish von A die veroeffentlichte B nicht zerstoeren (und umgekehrt).
  //
  // Invariante (iv): der Emitter wird in BEIDE Varianten injiziert, mit DEMSELBEN
  // trackingKey aus der Spalte (Invariante v: der Key gilt pro PROJEKT, nicht pro
  // Variante). Fehlte er in B, verschwaenden B's PageViews still, sobald 9b
  // splittet. Gleiche reine String-Op wie bei A, KEIN Parsing (Invariante viii).
  //
  // publishesVariantB IST DASSELBE const, das der Leer-Riegel oben benutzt — nicht
  // die zweimal getippte gleiche Bedingung. Damit ist "der Riegel prueft genau das,
  // was geschrieben wird" STRUKTURELL wahr statt per Kommentar behauptet: wer die
  // Write-Bedingung aendert, aendert die Pruef-Bedingung zwangslaeufig mit.
  const published_content = publishesVariantB
    ? {
        ...base,
        variantB: {
          html: injectPageViewEmitter(variantB.functionalHtml, trackingKey),
          mappings: variantB.mappings,
        },
      }
    : base;
  const nextSettings = setHostingState(currentSettings, { label, publishedAt });

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      published_content,
      settings: nextSettings,
      tracking_key: trackingKey,
      updated_at: publishedAt,
    })
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (updateError) return { ok: false, error: updateError.message };

  // Live-URL aus der Basis-Domain (env NEXT_PUBLIC_HOSTING_DOMAIN) + Label. Fehlt die
  // env, ist url "" -> der Client zeigt dann nur das Label.
  const domain = process.env.NEXT_PUBLIC_HOSTING_DOMAIN?.trim() ?? "";
  const url = buildLiveUrl(label, domain);
  // FAIL-LOUD, NUR in Prod: leere Serving-Domain -> publizierte Seite ohne Live-URL
  // (Ops-Fehlkonfig). In Dev/Test ist eine leere Domain waehrend Iteration normal ->
  // kein Warn. Analog zum NEXT_PUBLIC_APP_URL-Warn-Muster (siehe lib/tracking/meta.ts).
  if (process.env.NODE_ENV === "production" && !domain) {
    console.warn(
      "[pagesmith] NEXT_PUBLIC_HOSTING_DOMAIN ist leer in Production — publizierte Projekte erhalten keine Live-URL."
    );
  }
  // restored NUR im Heilungsfall mitgeben (kein "restored: false"): ohne Divergenz
  // ist die Antwort damit byte-gleich zu vorher (Invariante i).
  return restored ? { ok: true, url, label, restored } : { ok: true, url, label };
}

/**
 * Loescht GENAU eine Zeile des Users. user_id-Filter zusaetzlich zur RLS.
 */
export async function deleteProject(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Benennt ein Projekt um. Leerer Name faellt auf den Default zurueck.
 * user_id-Filter zusaetzlich zur RLS.
 */
export async function renameProject(
  id: string,
  name: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  const trimmed = name.trim() || "Unbenanntes Projekt";
  const { error } = await supabase
    .from("projects")
    .update({ name: trimmed })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Ist die VERÖFFENTLICHTE Variante B auslieferbar? (Phase 9 Scheibe 9b-1p)
 *
 * true  = published_content traegt eine nicht-leere Variante B,
 * false = nicht,
 * null  = NICHT ERMITTELBAR (kein User, kein Projekt, DB-Fehler).
 *
 * null ist NICHT dasselbe wie false: bei null zeigt das UI KEINEN Hinweis und
 * behauptet nichts — genau wie getAdblockLoss lieber den Neutral-Status liefert
 * als eine erfundene Zahl.
 *
 * WARUM EINE EIGENE ACTION statt eines Feldes in loadProject: published_content ist
 * der GROSSE Blob (das komplette funktionale HTML beider Varianten) und bleibt
 * bewusst AUSSERHALB des Ladepfades. Hier wird er SERVERSEITIG gelesen und nur ein
 * Boolean zurueckgegeben.
 *
 * DAS URTEIL FAELLT deliverableVariantB — DASSELBE Praedikat wie im Serve-Pfad
 * (resolve.ts) und im Riegel (setAbTestActive). Kein drittes Urteil, keine
 * Client-Heuristik.
 *
 * Read-only, Baustil wie getEventCounts: Session-Check, {data,error}
 * destrukturiert, jeder Fehlerzustand -> null. user_id-Filter zusaetzlich zur RLS.
 *
 * BEWUSSTER TAUSCH — BITTE NICHT "OPTIMIEREN": diese Abfrage zieht den KOMPLETTEN
 * published_content-Blob (das funktionale HTML BEIDER Varianten) aus der DB in den
 * Serverprozess, nur um ein Boolean zurueckzugeben. Das sieht nach Verschwendung
 * aus und ist trotzdem die richtige Wahl:
 *   Eine SQL-RPC koennte in Postgres pruefen und nur das Boolean ueber die Leitung
 *   schicken — muesste dafuer aber die Nicht-Leer-Regel in SQL NACHBAUEN. Das waere
 *   ein DRITTES Urteil ueber "ist B auslieferbar", neben resolve.ts und
 *   setAbTestActive: exakt der Fehler, den Scheibe 9b-1 mit dem geteilten Praedikat
 *   gerade beseitigt hat (die Aktivierung prueft heute dasselbe wie die
 *   Auslieferung). Der Blob-Transfer ist der PREIS dafuer, dass
 *   deliverableVariantB die EINZIGE Instanz bleibt.
 * Der Transfer ist server-intern (DB -> Serverprozess), erreicht den Client NIE,
 * und faellt einmal pro Projektladen an — nicht pro Besucher. Wird er je zum
 * echten Problem, ist die Loesung NICHT eine zweite Regel in SQL, sondern eine
 * Postgres-Funktion, die deliverableVariantB 1:1 abbildet UND per Test gegen
 * dieselbe Fixture-Tabelle gemessen wird.
 */
export async function getVariantBPublished(
  projectId: string
): Promise<boolean | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("published_content")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return deliverableVariantB(data.published_content as PublishedLike) !== null;
}

/** Ein Count-Eintrag der Analytics-Read-Scheibe: wie oft ein event_type auftrat. */
export type EventCount = { event_type: string; count: number };

/**
 * Analytics-Read (Phase 8 Scheibe 3): gruppierte Counts je event_type fuer EIN Projekt.
 *
 * Ueber den User-JWT-Client (createClient, wie loadProject) -> RLS ist AKTIV: die
 * get_event_counts-Funktion laeuft SECURITY INVOKER, die events_select_own-Policy filtert
 * die Aggregation von innen. Defense in depth: der p_project_id-Scope waehlt das Projekt
 * (WELCHES), die RLS-Policy erzwingt die Ownership (WESSEN Events, via projects.user_id).
 * Ein fremdes Projekt liefert damit leer, nicht fremde Zahlen.
 *
 * Read-only, kein Schreibpfad. {data,error} destrukturiert; jeder Fehlerzustand -> [].
 */
export async function getEventCounts(projectId: string): Promise<EventCount[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase.rpc("get_event_counts", {
    p_project_id: projectId,
  });
  if (error || !data) return [];
  return data as EventCount[];
}

/**
 * Rohzahlen der Adblocker-Verlustrate (Phase 8 Scheibe B). Prozent + "N von M"-Text
 * formatiert das UI -> die Zahl bleibt gegen SQL nachrechenbar.
 *
 * first_confirm_at === null ist der NEUTRAL-Status ("Warte auf erste Bestaetigung") und
 * damit von einer echten 0 unterscheidbar — das UI muss nicht raten.
 */
export type AdblockLoss = {
  total_server_conversions: number;
  confirmed_conversions: number;
  first_confirm_at: string | null;
};

/**
 * Analytics-Read (Phase 8 Scheibe B): Verlustraten-Rohzahlen fuer EIN Projekt.
 *
 * Baustil 1:1 wie getEventCounts: User-JWT-Client (createClient) -> RLS ist AKTIV, die
 * get_adblock_loss-Funktion laeuft SECURITY INVOKER, die events_select_own-Policy filtert
 * die Aggregation von innen. Der p_project_id-Scope waehlt das Projekt (WELCHES), die
 * RLS-Policy erzwingt die Ownership (WESSEN Events).
 *
 * Read-only. {data,error} destrukturiert; jeder Fehlerzustand -> null. null ist hier der
 * richtige Leer-Wert (nicht [] wie bei den Counts): das UI zeigt dann den Neutral-Status,
 * nie eine erfundene 0%-Zahl.
 *
 * Die RPC liefert per RETURNS TABLE genau EINE Zeile (Aggregat ohne group by) -> erstes
 * Element. Fehlt sie wider Erwarten, ist null der sichere Ausgang.
 */
export async function getAdblockLoss(
  projectId: string
): Promise<AdblockLoss | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase.rpc("get_adblock_loss", {
    p_project_id: projectId,
  });
  if (error || !data) return null;
  return (data as AdblockLoss[])[0] ?? null;
}

/**
 * Eine Zeile der Varianten-Auswertung (Phase 9 Scheibe 9c-1): wie oft ein event_type in
 * Variante A, in Variante B und OHNE Zuordnung auftrat.
 *
 * FESTE SPALTEN statt einer Zeile je (event_type, variant): eine Gruppierung liefert nur
 * Kombinationen, die es gibt — erscheint eine Event-Art nur in A, FEHLTE die B-Zeile ganz,
 * und "fehlt" ist nicht "0". Die filter-Aggregate der RPC machen die Luecke strukturell
 * unmoeglich (s. Migration 0019).
 */
export type VariantCount = {
  event_type: string;
  count_a: number;
  count_b: number;
  count_none: number;
};

/**
 * Ergebnis der Varianten-Auswertung — DISKRIMINIERT "leer" von "nicht ladbar".
 *
 * DAS IST DER UNTERSCHIED ZUM BESTANDSMUSTER, und er ist der eigentliche Zweck dieser
 * Form: getEventCounts bildet JEDEN Fehlerzustand auf [] ab, getAdblockLoss auf null. Die
 * zugehoerigen Kacheln sagen dann "Noch keine Events" bzw. "Warte auf erste Bestaetigung"
 * — eine AUSSAGE, die sie nicht belegen koennen (Backlog-Punkt "LEER UND NICHT LADBAR SIND
 * IM UI NICHT UNTERSCHEIDBAR"). Ein leeres Array traegt diese Unterscheidung nicht, ein
 * Union-Typ schon: {ok:false} kann das UI nicht versehentlich als "keine Daten" rendern,
 * weil es die Zeilen gar nicht erst herausgibt.
 *
 * Die BESTEHENDEN Kacheln bleiben bewusst unveraendert — ein live bewiesener Pfad wird
 * nicht ohne Anlass umgebaut. Der Backlog-Punkt bleibt fuer sie offen.
 */
export type VariantCountsResult =
  | { ok: true; rows: VariantCount[] }
  | { ok: false };

/**
 * Analytics-Read (Phase 9 Scheibe 9c-1): Counts je event_type UND Variante fuer EIN Projekt.
 *
 * Baustil wie getEventCounts/getAdblockLoss: User-JWT-Client (createClient) -> RLS ist
 * AKTIV, die get_variant_counts-Funktion laeuft SECURITY INVOKER, die
 * events_select_own-Policy filtert die Aggregation von innen. Der p_project_id-Scope waehlt
 * das Projekt (WELCHES), die RLS-Policy erzwingt die Ownership (WESSEN Events) — ein
 * fremdes Projekt liefert leer, nie fremde Zahlen.
 *
 * Read-only, kein Schreibpfad. {data,error} destrukturiert. ABWEICHEND vom Bestandsmuster
 * muendet der Fehlerzustand NICHT in einen Leer-Wert, sondern in {ok:false} (s.
 * VariantCountsResult). Eine fehlende Session ist ebenfalls {ok:false}: ohne Session ist
 * die Frage nicht beantwortbar, und "keine Daten" waere die falsche Auskunft.
 */
export async function getVariantCounts(
  projectId: string
): Promise<VariantCountsResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data, error } = await supabase.rpc("get_variant_counts", {
    p_project_id: projectId,
  });
  if (error || !data) return { ok: false };
  return { ok: true, rows: data as VariantCount[] };
}
