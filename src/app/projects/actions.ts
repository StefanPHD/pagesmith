"use server";

import { createClient } from "@/lib/supabase/server";
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
 * Ablauf:
 * 1. OWNERSHIP-PRUEFUNG (IDOR-Schutz, kritisch): Die RLS-WITH-CHECK auf
 *    project_tokens prueft NUR user_id = auth.uid(), NICHT dass die project_id dem
 *    User gehoert. Ohne diese explizite Pruefung koennte ein eingeloggter User ein
 *    Token-Row auf eine FREMDE project_id mit EIGENER user_id schreiben (und via
 *    on-conflict eine bestehende fremde Zeile ueberschreiben). Darum: das Projekt
 *    muss dem User gehoeren, sonst Abbruch OHNE Upsert.
 * 2. Upsert des Tokens (SSR-Client, Rolle authenticated, RLS greift zusaetzlich).
 * 3. settings mergen: trackingKey LAZY erzeugen (nur falls noch keiner existiert) +
 *    tokenSet=true, pixels UNANGETASTET. Zurueck in projects.settings schreiben.
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

  // 1) Ownership-Pruefung: Projekt muss dem User gehoeren. RLS allein deckt das
  //    beim project_tokens-Write NICHT ab (siehe Doku oben). settings gleich
  //    mitlesen, um trackingKey/pixels beim Merge zu erhalten.
  const { data: owned, error: ownError } = await supabase
    .from("projects")
    .select("id,settings")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (ownError) return { ok: false, error: ownError.message };
  if (!owned) return { ok: false, error: "Projekt nicht gefunden." };

  // 2) Geheimen Token upserten (ein Row pro Projekt, on conflict project_id).
  //
  // WRITE-ONLY / RETURNING-VERBOT (bewiesene RLS-Ursache): project_tokens hat
  // BEWUSST keine SELECT-Policy fuer authenticated (write-only ist die tragende
  // Kontrolle). Der Server gibt bei einem POST per Default aber eine Representation
  // zurueck (RETURNING) — und dieses Zurueck­lesen der frisch geschriebenen Zeile
  // schlaegt an ebendieser SELECT-Sperre an (RLS-Verletzung), obwohl der INSERT
  // selbst policy-konform ist (auth.uid() === user_id). Fix: explizit
  // `return=minimal` -> kein RETURNING, kein Read-back. KEIN .select() anhaengen.
  // resolution=merge-duplicates MUSS erhalten bleiben (sonst wird aus dem Upsert
  // ein reiner Insert -> 409 bei bestehendem Token), darum kombiniert gesetzt
  // (setHeader ersetzt den Prefer-Header komplett). Die Action braucht die
  // geschriebene Zeile NICHT zurueck (Rueckgabe = trackingKey aus settings).
  const row = { project_id: projectId, user_id: user.id, meta_capi_token: trimmed };
  const { error: tokenError } = await supabase
    .from("project_tokens")
    .upsert(row, { onConflict: "project_id" })
    .setHeader("Prefer", "resolution=merge-duplicates,return=minimal");
  if (tokenError) return { ok: false, error: tokenError.message };

  // 3) settings mergen: trackingKey lazy (nur beim ersten Token-Set), tokenSet=true,
  //    pixels unangetastet. updated_at explizit (wie in saveProject).
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
