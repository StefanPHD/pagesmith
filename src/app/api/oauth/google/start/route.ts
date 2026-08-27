// Autorisierungs-Start fuer Google (Phase 11.8, Scheibe 11.8d).
//
// WAS DIESE ROUTE TUT — und mehr nicht: Sie prueft die Sitzung, prueft die Ownership des
// Projekts, baut die Autorisierungs-Adresse, setzt das State-Cookie und leitet weiter.
//
// WAS SIE AUSDRUECKLICH NICHT TUT: keinen Callback, keinen Tausch des Codes, keine
// Chiffrierung, keinen Schreibpfad in project_secrets. Sie importiert src/lib/secrets/
// NICHT — die drei Riegel (AUFRUFER-RIEGEL CIPHER, AUFRUFER-RIEGEL FORM, IMPORT-RIEGEL)
// bleiben in dieser Scheibe unberuehrt und fallen erst in 11.8e, mit Ansage
// (docs/aktiver-stand-11.8.md, "## Scheibe 11.8d" und "## Scheibe 11.8e").
//
// DIE RUECKKEHR LAEUFT INS LEERE, UND DAS IST ABSICHT: /api/oauth/google/callback hat
// noch keine Route. Der Autorisierungs-Code wird nicht eingeloest und verfaellt. Wer das
// als Fehlschlag protokolliert, hat die Scheibengrenze fuer einen Defekt gehalten.
//
// AUF EINEM SERVING-HOST IST DIESE ROUTE NICHT ERREICHBAR, und das ist gewollt: Die
// Proxy-Datei laesst im Serving-Zweig nur /api/e und /api/capi durch (exakter Match) und
// schreibt alles andere auf /app-serve um. Eine gehostete Kundenseite exponiert also
// keine App-Route. GEMESSEN am Code (src/proxy.ts, Symbol proxy).
//
// DAS AUTH-GATE LIEGT SCHON DAVOR — und die Pruefung hier ersetzt es trotzdem nicht:
// updateSession (src/lib/supabase/middleware.ts) oeffnet nur /login, /api/capi und
// /api/e; alles andere ohne Sitzung geht auf /login. Dieser Schutz ist ein NEBENEFFEKT
// fremder Logik: aendert jemand jene Liste, faellt er still weg. "NUR EIN TEST IST EIN
// WAECHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST KEINER" (docs/immer-beachten.md).
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts.
import { createClient } from "@/lib/supabase/server";
import {
  buildAuthorizeStart,
  isProjectIdShape,
  readAuthorizeConfig,
} from "@/lib/oauth/google-authorize";

// randomBytes stammt aus node:crypto -> Node-Runtime, nicht Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEXT_HEADERS: Record<string, string> = {
  "Content-Type": "text/plain; charset=utf-8",
  // Eine Antwort dieses Flusses wird nie geteilt zwischengespeichert: sie haengt an
  // einer Sitzung, und der Erfolgsfall traegt ein besucherunterscheidendes Cookie.
  "Cache-Control": "private, no-store",
};

/**
 * EIN Ausgang fuer DREI Faelle — formwidrige Kennung, unbekanntes Projekt, fremdes
 * Projekt. Das ist Absicht und folgt dem Bestand (domains/register.ts,
 * domains/remove.ts, domains/status.ts, projects/actions.ts antworten alle
 * "Projekt nicht gefunden."): Ein eigener Text fuer "gehoert dir nicht" verriete die
 * Existenz einer fremden Kennung.
 *
 * Die Meldung behauptet weder Ursache noch Ergebnis (docs/immer-beachten.md).
 */
function notFound(): Response {
  return new Response("Projekt nicht gefunden.", {
    status: 404,
    headers: TEXT_HEADERS,
  });
}

export async function GET(request: Request): Promise<Response> {
  const projectId = new URL(request.url).searchParams.get("project") ?? "";

  // FORM ZUERST, und zwar VOR jeder Abfrage: Der Parameter ist Nutzereingabe. Eine
  // formwidrige Kennung erzeugte in der Datenbank einen Typfehler, und der waere von
  // einem echten Fehler nicht zu unterscheiden. Nach der Formpruefung ist jeder
  // Datenbank-Fehler unten ein echter.
  if (!isProjectIdShape(projectId)) return notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ohne Sitzung dorthin, wo eine entsteht. Relative Location bewusst: eine absolute
  // muesste aus dem Anfrage-Host gebaut werden, und dieser Fluss leitet Host-Werte
  // grundsaetzlich nicht ab.
  if (!user) {
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }

  // OWNERSHIP-GATE VOR DEM START, nicht erst bei der Ablage: Sonst bindet ein
  // angemeldeter Nutzer ein Zugangsdatum an ein FREMDES Projekt, und die Pruefung kaeme
  // erst, wenn der Zugang schon beschafft ist.
  //
  // user_id-Filter ZUSAETZLICH zur RLS (defense in depth) — dasselbe Muster wie
  // saveProject/saveVariantB in projects/actions.ts. Ein Admin-Client waere hier falsch:
  // es wird nichts geschrieben, wofuer RLS umgangen werden muesste.
  //
  // { data, error } IMMER destrukturieren — sonst wird ein Fehler still verschluckt und
  // sieht aus wie "nicht gefunden" (docs/immer-beachten.md, POSTGREST-QUERIES).
  const { data: project, error } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[oauth/google/start] project lookup failed", {
      projectId,
      userId: user.id,
    });
    return new Response("Es ist ein Fehler aufgetreten.", {
      status: 500,
      headers: TEXT_HEADERS,
    });
  }
  if (!project) return notFound();

  // FAIL-LOUD: Fehlt eine der zwei Variablen, gibt es keinen stillen Ersatzwert. Ohne
  // diesen Ausgang bekaeme der Nutzer einen Zustimmungsbildschirm mit leerer
  // Client-Kennung oder ein redirect_uri_mismatch, und die Suche begaenne bei Google
  // statt in der Umgebung. Geloggt wird der NAME der Variablen, nie ihr Wert.
  const config = readAuthorizeConfig();
  if (config.kind === "missing_config") {
    console.error("[oauth/google/start] missing env var", {
      variable: config.variable,
    });
    return new Response("Google-Anbindung ist nicht eingerichtet.", {
      status: 500,
      headers: TEXT_HEADERS,
    });
  }

  // DIE ROUTE SETZT NICHTS SELBST ZUSAMMEN, und das ist Absicht: Sie sieht den
  // Zufallswert gar nicht. Damit kann sie den naheliegenden Fehlgriff nicht machen — den
  // Cookie-WERT (Zufall UND Kennung) als state zu uebergeben und die Projekt-Kennung so
  // ueber Google reisen zu lassen. Die Zusammensetzung liegt in der reinen Datei, wo ein
  // Test sie pruefen kann.
  const start = buildAuthorizeStart({
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    projectId,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: start.location,
      "Set-Cookie": start.setCookie,
      "Cache-Control": "private, no-store",
    },
  });
}
