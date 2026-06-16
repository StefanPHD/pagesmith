"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

/**
 * Eine Seite fuer Login UND Signup (E-Mail + Passwort) mit Modus-Umschalter.
 * Nutzt den Supabase-Browser-Client. Nach Erfolg -> Editor (/), router.refresh()
 * damit die Middleware das neue Session-Cookie sieht. Das Auth-Gate (eingeloggt
 * auf /login -> /) liegt in der Middleware.
 */
export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Confirm-email ist fuers MVP deaktiviert -> direkt eingeloggt.
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-gray-300 bg-white p-6">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Pagesmith</h1>
        <p className="mb-6 text-sm text-gray-500">
          {mode === "login"
            ? "Melde dich an, um weiterzumachen."
            : "Erstelle ein Konto, um loszulegen."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            E-Mail
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Passwort
            <input
              type="password"
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </label>

          {error !== null && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {loading
              ? "Bitte warten…"
              : mode === "login"
                ? "Anmelden"
                : "Registrieren"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === "login" ? "Noch kein Konto?" : "Schon ein Konto?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
            }}
            className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
          >
            {mode === "login" ? "Registrieren" : "Anmelden"}
          </button>
        </p>
      </div>
    </main>
  );
}
