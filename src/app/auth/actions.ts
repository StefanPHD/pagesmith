"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-Action: meldet den User ab und leitet auf /login um. Das Loeschen der
 * Session-Cookies uebernimmt der Supabase-Server-Client; die Middleware setzt
 * danach das Auth-Gate durch.
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
