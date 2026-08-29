// Die Beweis-Route der Erneuerung (Phase 11.2, Scheibe 1a des Schnitts).
//
// WAS DIESE ROUTE TUT: Sie prueft die Sitzung, prueft das Eigentum am Projekt, ruft
// die Erneuerungs-Funktion und gibt deren ZUSTAND samt den ZWEI ABLAUFZEITPUNKTEN
// zurueck.
//
// SIE GIBT KEINE TOKEN ZURUECK. Weder das Zugangsdatum noch das Erneuerungs-Token
// noch das Chiffrat, auch nicht gekuerzt — ein gekuerztes Geheimnis ist ein Geheimnis
// (docs/immer-beachten.md, SCHWAERZUNG, Teil (a)). Die zwei Zeitpunkte sind keine
// Geheimnisse.
//
// ---------------------------------------------------------------------------
// SIE WIRD NACH DEM LIVE-TEST NICHT ZURUECKGEBAUT — sie ist ein PRODUKT-BAUSTEIN.
// Zwei Gruende, beide benannt (docs/aktiver-stand.md, "Die Beweis-Route bleibt
// stehen"):
//   · Der offene Punkt "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN"
//     (CLAUDE.md, "## Offene Punkte") fuehrt als Ursache (4) genau diesen Fall — ein
//     Ziel, dessen Zugangsdatum ablaufen kann — und SEIN TRIGGER IST EINGETRETEN.
//   · Die beiden Ablauf-Zeitpunkte liegen in project_secrets.secret_enc und sind
//     damit unlesbar, nicht nur fuer die Oberflaeche, sondern fuer jeden ausser dem
//     Dechiffrier-Pfad. Diese Route ist heute der EINZIGE Weg, sie zu sehen.
//
// ---------------------------------------------------------------------------
// WARUM POST UND NICHT GET (ARCHITEKT, 2026-08-29): Die zwei bestehenden
// OAuth-Routen sind GET, weil sie Weiterleitungen entgegennehmen. Diese nimmt keine
// entgegen — sie SCHREIBT eine Zeile und ruft einen fremden Endpunkt. Ein GET dafuer
// wuerde von jedem Vorablade-Mechanismus mit der Sitzung des Betreibers ausgeloest.
// DER PREIS IST BENANNT: Der Live-Test laesst sich nicht durch Eintippen einer URL
// fahren, sondern braucht einen fetch aus der eingeloggten Anwendung.
//
// DIE BAUFORM IST DIE DER ZWEI BESTEHENDEN OAUTH-ROUTEN und kein neues Muster:
// runtime "nodejs", dynamic "force-dynamic", getUser(), DANN das Eigentums-Gate.
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts.
import { createClient } from "@/lib/supabase/server";
import { isProjectIdShape } from "@/lib/oauth/google-authorize";
import { refreshAccessToken } from "@/lib/oauth/token-refresh";

// Der Pfad zieht ueber cipher.ts node:crypto herein -> Node-Runtime, nicht Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json; charset=utf-8",
  // Eine Antwort dieses Flusses wird nie geteilt zwischengespeichert: sie haengt an
  // einer Sitzung und an genau einem Projekt.
  "Cache-Control": "private, no-store",
};

/** Das Ziel dieser Route. ROUTEN-LOKAL, wie in der Callback-Route nebenan. */
const GOOGLE_TARGET = "google";

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

/**
 * EIN Ausgang fuer DREI Faelle — formwidrige Kennung, unbekanntes Projekt, fremdes
 * Projekt. Absicht und Bestand (s. den gleichlautenden Kopf in der Start-Route): Ein
 * eigener Text fuer "gehoert dir nicht" verriete die Existenz einer fremden Kennung.
 */
function notFound(): Response {
  return json(404, { error: "not_found" });
}

export async function POST(request: Request): Promise<Response> {
  const projectId = new URL(request.url).searchParams.get("project") ?? "";

  // FORM ZUERST, VOR jeder Abfrage: Der Parameter ist Nutzereingabe. Eine formwidrige
  // Kennung erzeugte in der Datenbank einen Typfehler, und der waere von einem echten
  // Fehler nicht zu unterscheiden.
  if (!isProjectIdShape(projectId)) return notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // KEIN Redirect wie in der Start-Route: Diese Route wird programmatisch gerufen,
  // eine Weiterleitung nach /login waere dort eine 200 mit einer Anmeldeseite im
  // Rumpf und saehe wie ein Erfolg aus.
  if (!user) return json(401, { error: "unauthenticated" });

  // DAS EIGENTUMS-GATE. Es steht VOR dem Aufruf der Bibliotheksfunktion, und das ist
  // hier keine Stilfrage: refreshAccessToken prueft KEIN Eigentum und instanziiert
  // selbst den Admin-Client (service_role, bypassed RLS). project_secrets traegt RLS
  // aktiv und KEINE Policy — DIESES GATE IST DIE EINZIGE ISOLATIONSSCHICHT DES PFADES.
  //
  // Es laeuft ueber den authenticated-SSR-Client, damit RLS zusaetzlich greift; ein
  // Gate ueber den Admin-Client umginge RLS und waere wertlos. Der user_id-Filter
  // kommt ZUSAETZLICH dazu (defense in depth).
  //
  // { data, error } IMMER destrukturiert — sonst wird ein Fehler still verschluckt und
  // sieht aus wie "nicht gefunden" (docs/immer-beachten.md, POSTGREST-QUERIES).
  const { data: project, error } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[oauth/google/refresh] project_lookup", {
      projectId,
      userId: user.id,
    });
    return json(500, { error: "lookup_failed" });
  }
  if (!project) return notFound();

  const result = await refreshAccessToken({
    projectId,
    target: GOOGLE_TARGET,
  });

  // DIE ANTWORT TRAEGT DEN ZUSTAND, NICHT DEN HTTP-STATUS ALS URTEIL: Alle vier
  // Zustaende sind ein gueltiges Ergebnis der Pruefung — auch "dead" ist eine
  // Auskunft und kein Fehler dieser Route. Ein 4xx/5xx je Zustand machte aus einer
  // Diagnose einen Transportfehler und waere von einem echten nicht zu unterscheiden.
  if (result.kind === "ok") {
    return json(200, {
      state: "ok",
      accessTokenExpiresAt: result.accessTokenExpiresAt,
      refreshTokenExpiresAt: result.refreshTokenExpiresAt,
    });
  }

  return json(200, { state: result.kind, reason: result.reason });
}
