"use server";

import { createClient } from "@/lib/supabase/server";
import type { Mapping } from "@/lib/mappings";

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
    .select("id,name,html,mappings")
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
 * mappings wird mit dem html zusammen gespeichert (jsonb). Mapping-Aenderungen
 * fassen den Code nicht an -> ohne Mit-Speichern gingen sie still verloren.
 */
export async function saveProject(
  projectId: string | null,
  html: string,
  mappings: Mapping[]
): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  if (projectId) {
    const { data, error } = await supabase
      .from("projects")
      .update({ html, mappings, updated_at: new Date().toISOString() })
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
    .insert({ user_id: user.id, html, mappings, name: "Unbenanntes Projekt" })
    .select("id")
    .single();

  if (error || !data)
    return { ok: false, error: error?.message ?? "Anlegen fehlgeschlagen." };
  return { ok: true, id: data.id };
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
