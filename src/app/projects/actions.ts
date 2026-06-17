"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Schmaler, serialisierbarer Rueckgabe-Typ fuer den Speichern-Pfad. Der Client
 * spiegelt bei { ok: true } das bereits stabilisierte HTML zurueck in die
 * Textarea; bei { ok: false } zeigt er error an.
 */
export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * Eine geladene Projektzeile. mappings ist in 3.2 designt, aber leer (befuellt
 * erst, sobald die Action-Zuweisungs-UI existiert) — Typ bleibt bewusst offen.
 */
export type ProjectRow = {
  id: string;
  name: string;
  html: string;
  mappings: unknown[];
};

/**
 * Speichert den (bereits CLIENT-SEITIG stabilisierten) Code als das eine Projekt
 * des Users. Parst/stabilisiert hier NICHTS: DOMParser existiert auf dem Server
 * nicht, stabilizeIds wuerde still nichts tun — deshalb stabilisiert der Client
 * und schickt fertiges HTML.
 *
 * Sicherheit: user_id wird IMMER aus der Server-Session gesetzt, NIE aus
 * Client-Argumenten. Zusammen mit den RLS-Policies (auth.uid() = user_id) kann
 * kein User in eine fremde Zeile schreiben.
 */
export async function saveProject(html: string): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  // Upsert auf die user_id-Unique-Constraint (ein Projekt pro User, 3.2). name,
  // mappings und Timestamps bleiben den DB-Defaults bzw. dem updated_at-Trigger
  // ueberlassen.
  const { error } = await supabase
    .from("projects")
    .upsert({ user_id: user.id, html }, { onConflict: "user_id" });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Laedt die eine Projektzeile des Users (oder null, wenn keine existiert / kein
 * User). RLS ist die eigentliche Absicherung; der user_id-Filter ist nur ein
 * sauberer Selektor.
 */
export async function loadProject(): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("id,name,html,mappings")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data as ProjectRow;
}
