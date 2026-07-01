"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Mapping } from "@/lib/mappings";
import {
  getTrackingKey,
  setCapiState,
  type ProjectSettings,
} from "@/lib/settings";

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
  //    settings gleich mitlesen, um trackingKey/pixels beim Merge zu erhalten.
  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,settings")
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

  // 3) settings mergen: trackingKey lazy (nur beim ersten Token-Set), tokenSet=true,
  //    pixels unangetastet. updated_at explizit (wie in saveProject). Bleibt ueber den
  //    authenticated-SSR-Client (RLS greift auf der geschuetzten projects-Zeile).
  const current = (owned.settings ?? {}) as ProjectSettings;
  const trackingKey = getTrackingKey(current) || crypto.randomUUID();
  const nextSettings = setCapiState(current, { trackingKey, tokenSet: true });

  const { error: settingsError } = await supabase
    .from("projects")
    .update({ settings: nextSettings, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", user.id);
  if (settingsError) return { ok: false, error: settingsError.message };

  return { ok: true, trackingKey };
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
