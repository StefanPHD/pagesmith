"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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
    .select("id,name,html,mappings,settings")
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
 * Ergebnis von setCapiToken. Bei Erfolg liefert die Action den (ggf. neu erzeugten)
 * OEFFENTLICHEN trackingKey zurueck, damit der Client ihn zusammen mit tokenSet in
 * settings + savedSettings spiegeln kann. Der GEHEIME Token wird NIE zurueckgegeben.
 */
export type SetCapiTokenResult =
  | { ok: true; trackingKey: string }
  | { ok: false; error: string };

/**
 * Setzt den GEHEIMEN Meta-CAPI-Token eines Projekts (Scheibe 2a, Secret-Plumbing).
 * Write-only: der Token wird in die RLS-SELECT-gesperrte Tabelle project_tokens
 * geschrieben und erreicht den Client NIE zurueck.
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
 * Loescht die project_tokens-Zeile und flippt settings.capi.tokenSet auf false.
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
 * 3. DELETE ueber den Admin-Client (service_role): project_tokens hat KEINE DELETE-Policy
 *    fuer authenticated -> das Loeschen laeuft ausschliesslich privilegiert. Idempotent
 *    (0 Zeilen = ok).
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
  | { ok: true; url: string; label: string }
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
 * published_content = { html: functionalHtml, mappings, settings, publishedAt }.
 * IDEMPOTENZ: ein bereits vergebenes Label (settings.hosting.label) wird
 * WIEDERVERWENDET -> Re-Publish erzeugt KEINE zweite domains-Row und KEINEN neuen Label
 * (die Live-URL bleibt stabil). Das Label wird in settings.hosting gespiegelt
 * (oeffentlich, client-lesbar), damit der Client die URL ueber Sessions hinweg kennt.
 */
export async function publishProject(
  projectId: string,
  functionalHtml: string,
  snapshot: { html: string; mappings: Mapping[]; settings: ProjectSettings }
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
    .select("id,name,settings,tracking_key")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  const currentSettings = (owned.settings ?? {}) as ProjectSettings;
  const publishedAt = new Date().toISOString();

  // Bestehendes Label wiederverwenden (Idempotenz), sonst frisch vergeben.
  let label = getHostingLabel(currentSettings);
  if (!label) {
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
  const published_content = {
    html: injectPageViewEmitter(functionalHtml, trackingKey),
    mappings: snapshot.mappings,
    settings: snapshot.settings,
    publishedAt,
  };
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
  return { ok: true, url, label };
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
