import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung. Der Pruefling traegt die Marke
// bewusst (s. Kopf von google-authorize.ts), also wird sie hier neutralisiert — dasselbe
// Muster wie in secrets/oauth-payload.test.ts.
vi.mock("server-only", () => ({}));

import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  buildAuthorizeStart,
  buildAuthorizeUrl,
  buildStateCookieValue,
  DATA_MANAGER_SCOPE,
  GOOGLE_AUTHORIZE_ENDPOINT,
  isProjectIdShape,
  newStateValue,
  readAuthorizeConfig,
  serializeStateCookie,
  STATE_COOKIE_MAX_AGE_SECONDS,
  STATE_COOKIE_NAME,
} from "./google-authorize";

// ADDITIV FUER SCHEIBE 11.8e — als EIGENE Import-Anweisung und nicht in den Block
// darueber hinein: So bleibt der Bestand dieser Datei zeilengleich, und die 30
// bestehenden Tests sind der Beweis der Additivitaet.
import {
  parseStateCookie,
  serializeClearedStateCookie,
  statesMatch,
} from "./google-authorize";

// ===========================================================================
// KEIN ECHTER WERT. Jede Client-Kennung und jede Adresse unten ist erfunden und am
// NAMEN erkennbar. Die Weiterleitungs-Adressen sind den registrierten NACHGEBILDET,
// nicht abgeschrieben: geprueft wird die Unveraendertheit, und dafuer taugt jede
// Zeichenkette.
// ===========================================================================

const ERFUNDENE_CLIENT_ID = "erfundene-client-id-nicht-echt.apps.example";
const ERFUNDENE_REDIRECT_URI = "http://localhost:3000/api/oauth/beispiel/callback";
const ERFUNDENE_PROJEKT_ID = "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d";
const ERFUNDENER_STATE = "erfundener-state-wert-ohne-punkt";

function url(ueberschreibungen: Partial<Parameters<typeof buildAuthorizeUrl>[0]> = {}) {
  return buildAuthorizeUrl({
    clientId: ERFUNDENE_CLIENT_ID,
    redirectUri: ERFUNDENE_REDIRECT_URI,
    state: ERFUNDENER_STATE,
    ...ueberschreibungen,
  });
}

/** Liest einen Query-Wert aus der erzeugten Adresse, dekodiert. */
function param(erzeugt: string, name: string): string | null {
  return new URL(erzeugt).searchParams.get(name);
}

describe("buildAuthorizeUrl — die Adresse und ihre Parameter", () => {
  it("T0 — der Endpunkt ist der gelesene, zeichengenau", () => {
    expect(GOOGLE_AUTHORIZE_ENDPOINT).toBe(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );
    expect(url().startsWith(`${GOOGLE_AUTHORIZE_ENDPOINT}?`)).toBe(true);
  });

  it("T1 — der Bereich steht zeichengenau in der Adresse", () => {
    expect(DATA_MANAGER_SCOPE).toBe("https://www.googleapis.com/auth/datamanager");
    expect(param(url(), "scope")).toBe("https://www.googleapis.com/auth/datamanager");
  });

  // ROT, sobald jemand die Adresse normalisiert, einen Schraegstrich anhaengt oder
  // entfernt oder die Gross-/Kleinschreibung anfasst. Der Anbieter gleicht als
  // ZEICHENKETTE ab (docs/ziel-befunde.md, Google-Abschnitt, Teil (au)).
  it("T2 — die Weiterleitungs-Adresse geht UNVERAENDERT hinein", () => {
    expect(param(url(), "redirect_uri")).toBe(ERFUNDENE_REDIRECT_URI);
  });

  it("T2b — auch mit abschliessendem Schraegstrich und Grossbuchstaben unveraendert", () => {
    const eigenwillig = "https://Beispiel.Example/api/oauth/Google/callback/";
    expect(param(url({ redirectUri: eigenwillig }), "redirect_uri")).toBe(eigenwillig);
  });

  it("T3 — der state-Parameter traegt GENAU den uebergebenen Zufallswert", () => {
    expect(param(url(), "state")).toBe(ERFUNDENER_STATE);
  });

  // DIE TRAGENDE ZUSICHERUNG DIESER SCHEIBE (Entscheidung 1 des Zuschnitts): Was durch
  // eine fremde Weiterleitung reist, ist manipulierbar. Die Projekt-Kennung darf nie
  // ueber Google laufen.
  //
  // SIE WIRD AN buildAuthorizeStart GEPRUEFT UND NICHT AN buildAuthorizeUrl, und das ist
  // der ganze Punkt: buildAuthorizeUrl NIMMT die Kennung gar nicht entgegen — eine
  // Abwesenheits-Behauptung dort waere TRIVIAL WAHR und koennte nie fallen
  // (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL",
  // Fall 2). Erst hier ist die Kennung im Scope, also etwas, das durchsickern KANN.
  //
  // DIE ZWEITE HAELFTE IST NICHT SCHMUCK: Ohne sie unterscheidet der Test ein wirksames
  // Gate nicht von einer Funktion, die gar nichts tut. Die Kennung MUSS im Cookie stehen.
  it("T4 — die Kennung steht im Cookie und in der Adresse NIRGENDS", () => {
    const start = buildAuthorizeStart({
      clientId: ERFUNDENE_CLIENT_ID,
      redirectUri: ERFUNDENE_REDIRECT_URI,
      projectId: ERFUNDENE_PROJEKT_ID,
    });
    expect(start.location).not.toContain(ERFUNDENE_PROJEKT_ID);
    expect(start.setCookie).toContain(ERFUNDENE_PROJEKT_ID);
  });

  // Der bequeme Fehlgriff hat einen eigenen Test: den Cookie-WERT als state uebergeben.
  // Dann reiste die Kennung mit, und T4 allein koennte das melden — dieser Test benennt
  // die URSACHE, damit sie beim naechsten Umbau nicht neu gefunden werden muss.
  it("T4b — der state in der Adresse traegt kein Trennzeichen, also keinen zweiten Teil", () => {
    const start = buildAuthorizeStart({
      clientId: ERFUNDENE_CLIENT_ID,
      redirectUri: ERFUNDENE_REDIRECT_URI,
      projectId: ERFUNDENE_PROJEKT_ID,
    });
    const state = param(start.location, "state");
    expect(state).not.toBeNull();
    expect(state).not.toContain(".");
  });

  it("T5 — client_id und response_type stehen wie gelesen", () => {
    expect(param(url(), "client_id")).toBe(ERFUNDENE_CLIENT_ID);
    expect(param(url(), "response_type")).toBe("code");
  });

  // Ohne access_type=offline entsteht kein Erneuerungs-Token (Teil (av)).
  it("T6 — access_type ist offline", () => {
    expect(param(url(), "access_type")).toBe("offline");
  });

  // ERGAENZUNG E1 (ARCHITEKT, 2026-08-27). Ohne den Parameter haengt das
  // Erneuerungs-Token daran, ob dieses Konto schon einmal zugestimmt hat.
  it("T7 — prompt ist consent", () => {
    expect(param(url(), "prompt")).toBe("consent");
  });

  // ERGAENZUNG E2 (ARCHITEKT, 2026-08-27). Wir fordern genau einen Bereich an; der
  // Parameter erweitert eine Zustimmung ueber FRUEHERE Bereiche, die es hier nicht gibt.
  it("T8 — include_granted_scopes wird NICHT gesetzt", () => {
    expect(param(url(), "include_granted_scopes")).toBeNull();
    expect(url()).not.toContain("include_granted_scopes");
  });

  // Das Leerzeichen als %20 statt "+" ist der belegte Weg (Teil (at)); heute traegt kein
  // Wert eines, mit einem zweiten Bereich schon. Der Test haelt die Kodierform fest,
  // BEVOR es darauf ankommt.
  it("T9 — ein Leerzeichen wird als %20 kodiert, nicht als +", () => {
    const erzeugt = url({ state: "zwei teile" });
    expect(erzeugt).toContain("state=zwei%20teile");
    expect(erzeugt).not.toContain("state=zwei+teile");
  });
});

describe("Das State-Cookie", () => {
  it("T10 — der Name traegt den __Host--Praefix", () => {
    expect(STATE_COOKIE_NAME.startsWith("__Host-")).toBe(true);
    expect(serializeStateCookie(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID)).toContain(
      `${STATE_COOKIE_NAME}=`,
    );
  });

  it("T11 — die vier Attribute stehen, und kein Domain-Attribut", () => {
    const cookie = serializeStateCookie(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID);
    expect(cookie).toContain("Path=/");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain(`Max-Age=${STATE_COOKIE_MAX_AGE_SECONDS}`);
    // Ein Domain-Attribut ist unter __Host- verboten; der Browser verwuerfe das Cookie.
    expect(cookie).not.toMatch(/Domain=/i);
  });

  // EIGENER TEST NEBEN T11, und das ist keine Doppelung: T11 wuerde ein "SameSite=Strict"
  // nicht bemerken, wenn es nur auf die Anwesenheit der Attribute saehe. Strict ist der
  // naheliegende Fehlgriff — es sieht sicherer aus und bricht den Callback.
  it("T12 — SameSite ist Lax und ausdruecklich nicht Strict", () => {
    const cookie = serializeStateCookie(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID);
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).not.toContain("SameSite=Strict");
  });

  it("T13 — der Wert hat GENAU zwei Teile, und der zweite ist die Projekt-Kennung", () => {
    const wert = buildStateCookieValue(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID);
    const teile = wert.split(".");
    expect(teile).toHaveLength(2);
    expect(teile[0]).toBe(ERFUNDENER_STATE);
    expect(teile[1]).toBe(ERFUNDENE_PROJEKT_ID);
  });

  it("T14 — der Wert steht so auch in der Set-Cookie-Zeile", () => {
    const wert = buildStateCookieValue(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID);
    expect(serializeStateCookie(ERFUNDENER_STATE, ERFUNDENE_PROJEKT_ID)).toContain(
      `${STATE_COOKIE_NAME}=${wert};`,
    );
  });
});

describe("newStateValue — der Zufallswert", () => {
  it("T15 — zwei Aufrufe liefern verschiedene Werte", () => {
    expect(newStateValue()).not.toBe(newStateValue());
  });

  // base64url enthaelt den Punkt nicht — sonst braeche der Wert die Teilezahl aus T13.
  it("T16 — der Wert enthaelt keinen Punkt und ist nicht leer", () => {
    const wert = newStateValue();
    expect(wert.length).toBeGreaterThan(0);
    expect(wert).not.toContain(".");
    expect(wert).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe("readAuthorizeConfig — die zwei Umgebungswerte", () => {
  const VORHER = {
    id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  };

  beforeEach(() => {
    process.env.GOOGLE_OAUTH_CLIENT_ID = ERFUNDENE_CLIENT_ID;
    process.env.GOOGLE_OAUTH_REDIRECT_URI = ERFUNDENE_REDIRECT_URI;
  });

  afterEach(() => {
    if (VORHER.id === undefined) delete process.env.GOOGLE_OAUTH_CLIENT_ID;
    else process.env.GOOGLE_OAUTH_CLIENT_ID = VORHER.id;
    if (VORHER.uri === undefined) delete process.env.GOOGLE_OAUTH_REDIRECT_URI;
    else process.env.GOOGLE_OAUTH_REDIRECT_URI = VORHER.uri;
  });

  it("T17 — beide gesetzt -> ok, mit den Werten", () => {
    expect(readAuthorizeConfig()).toEqual({
      kind: "ok",
      clientId: ERFUNDENE_CLIENT_ID,
      redirectUri: ERFUNDENE_REDIRECT_URI,
    });
  });

  // Der NAME der fehlenden Variablen gehoert ins Ergebnis: ein namenloser Fehlerausgang
  // zwingt den Betreiber zum Raten, welche der zwei fehlt.
  it("T18 — fehlende Client-Kennung -> missing_config MIT Namen", () => {
    delete process.env.GOOGLE_OAUTH_CLIENT_ID;
    expect(readAuthorizeConfig()).toEqual({
      kind: "missing_config",
      variable: "GOOGLE_OAUTH_CLIENT_ID",
    });
  });

  it("T19 — fehlende Weiterleitungs-Adresse -> missing_config MIT Namen", () => {
    delete process.env.GOOGLE_OAUTH_REDIRECT_URI;
    expect(readAuthorizeConfig()).toEqual({
      kind: "missing_config",
      variable: "GOOGLE_OAUTH_REDIRECT_URI",
    });
  });

  it("T20 — nur Leerraum zaehlt als fehlend", () => {
    process.env.GOOGLE_OAUTH_REDIRECT_URI = "   ";
    expect(readAuthorizeConfig()).toEqual({
      kind: "missing_config",
      variable: "GOOGLE_OAUTH_REDIRECT_URI",
    });
  });

  // ROT, wenn jemand die Werte beim Laden des Moduls liest statt je Aufruf: dann bliebe
  // eine Aenderung im laufenden Prozess unsichtbar.
  it("T21 — gelesen wird JE AUFRUF, nicht beim Laden des Moduls", () => {
    expect(readAuthorizeConfig().kind).toBe("ok");
    delete process.env.GOOGLE_OAUTH_CLIENT_ID;
    expect(readAuthorizeConfig().kind).toBe("missing_config");
    process.env.GOOGLE_OAUTH_CLIENT_ID = ERFUNDENE_CLIENT_ID;
    expect(readAuthorizeConfig().kind).toBe("ok");
  });
});

describe("isProjectIdShape — FORM, keine Existenz", () => {
  it("T22 — eine wohlgeformte Kennung wird angenommen", () => {
    expect(isProjectIdShape(ERFUNDENE_PROJEKT_ID)).toBe(true);
  });

  it("T23 — formwidrige Eingaben werden abgewiesen", () => {
    for (const eingabe of [
      "",
      "   ",
      "kein-uuid",
      `${ERFUNDENE_PROJEKT_ID}x`,
      `${ERFUNDENE_PROJEKT_ID} or 1=1`,
      "0a1b2c3d4e5f4a6b8c7d9e0f1a2b3c4d",
    ]) {
      expect(isProjectIdShape(eingabe)).toBe(false);
    }
  });
});

// ===========================================================================
// DIE WAECHTER UEBER DEN QUELLTEXT.
//
// SIE PRUEFEN, WAS KEIN RUNDLAUF PRUEFEN KANN: Aussagen ueber den IMPORT-GRAPHEN und
// ueber das, was NICHT gelesen wird. Ein Kommentar bewacht so etwas nicht.
//
// IHRE GRENZE GEHOERT AN SIE SELBST: Ein Textwaechter sieht Zeichen, nicht Bedeutung —
// er kann eine Prosa-Erwaehnung nicht von einem Import trennen. Deshalb werden reine
// Kommentarzeilen herausgefiltert; ein Symbolname in einem angehaengten Kommentar hinter
// Code wuerde weiterhin treffen. Der Waechter irrt damit in die STRENGE Richtung, und
// das ist bei einer Trennungs-Auflage die richtige. (Dieselbe Bauform und derselbe
// Grund wie in secrets/oauth-payload.test.ts.)
// ===========================================================================

describe("Die Waechter — die drei Riegel und das Anwendungs-Geheimnis", () => {
  function nurCode(quelle: string): string {
    return quelle
      .split("\n")
      .filter((zeile) => {
        const t = zeile.trim();
        return !(t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"));
      })
      .join("\n");
  }

  const REINE_DATEI = nurCode(readFileSync(join(__dirname, "google-authorize.ts"), "utf8"));
  const ROUTE = nurCode(
    readFileSync(
      join(__dirname, "..", "..", "app", "api", "oauth", "google", "start", "route.ts"),
      "utf8",
    ),
  );

  // AUFRUFER-RIEGEL CIPHER, AUFRUFER-RIEGEL FORM und IMPORT-RIEGEL bleiben in 11.8d
  // unberuehrt. Sie fallen erst in 11.8e, und dort mit Ansage.
  it("T24 — die reine Datei importiert src/lib/secrets/ NICHT", () => {
    expect(REINE_DATEI).not.toMatch(/from\s+["'][^"']*secrets\//);
    expect(REINE_DATEI).not.toMatch(/require\(["'][^"']*secrets\//);
    expect(REINE_DATEI).not.toMatch(/encryptSecret|decryptSecret/);
    expect(REINE_DATEI).not.toMatch(/formatOAuthPayload|parseOAuthPayload/);
  });

  it("T25 — die Route importiert src/lib/secrets/ NICHT", () => {
    expect(ROUTE).not.toMatch(/from\s+["'][^"']*secrets\//);
    expect(ROUTE).not.toMatch(/require\(["'][^"']*secrets\//);
    expect(ROUTE).not.toMatch(/encryptSecret|decryptSecret/);
    expect(ROUTE).not.toMatch(/formatOAuthPayload|parseOAuthPayload/);
  });

  // GOOGLE_OAUTH_CLIENT_SECRET ist ein ANWENDUNGS-Geheimnis und gehoert dem Code-Tausch
  // in 11.8e. Diese Scheibe fasst es nicht an — das ist ein billiger zweiter Riegel.
  it("T26 — das Anwendungs-Geheimnis wird in dieser Scheibe nirgends gelesen", () => {
    expect(REINE_DATEI).not.toContain("GOOGLE_OAUTH_CLIENT_SECRET");
    expect(ROUTE).not.toContain("GOOGLE_OAUTH_CLIENT_SECRET");
  });

  // POSITIVKONTROLLE — ohne sie sind ein echter Nicht-Treffer und ein kaputt gewordener
  // Waechter am Ergebnis nicht zu unterscheiden (docs/immer-beachten.md,
  // "MUTATIONSPROBEN", Lektion (d)). Sie beweist, dass nurCode() Code NICHT wegfiltert.
  it("T27 — Positivkontrolle: die gefilterten Quellen tragen ihren echten Code noch", () => {
    expect(REINE_DATEI).toContain("export function buildAuthorizeUrl");
    expect(REINE_DATEI).toContain('from "node:crypto"');
    expect(ROUTE).toContain("export async function GET");
    expect(ROUTE).toContain("@/lib/oauth/google-authorize");
  });
});

// ===========================================================================
// SCHEIBE 11.8e — DIE LESE-SEITE. Additiv angefuegt; nichts oberhalb ist geaendert.
// ===========================================================================

describe("parseStateCookie (Scheibe 11.8e)", () => {
  it("P1 — ein gueltiger Wert liefert BEIDE Teile", () => {
    const roh = `${ERFUNDENER_STATE}.${ERFUNDENE_PROJEKT_ID}`;
    expect(parseStateCookie(roh)).toEqual({
      kind: "ok",
      state: ERFUNDENER_STATE,
      projectId: ERFUNDENE_PROJEKT_ID,
    });
  });

  // missing und bad_format sind GETRENNTE Zustaende: der Betreiber sieht dasselbe,
  // das Log unterscheidet sie. Wer sie verschmilzt, macht diesen Test rot.
  it("P2 — kein Cookie und leerer Wert ergeben missing, NICHT bad_format", () => {
    expect(parseStateCookie(null)).toEqual({ kind: "missing" });
    expect(parseStateCookie(undefined)).toEqual({ kind: "missing" });
    expect(parseStateCookie("")).toEqual({ kind: "missing" });
  });

  it("P3 — EIN Teil (kein Trenner) wird verworfen", () => {
    expect(parseStateCookie(ERFUNDENER_STATE)).toEqual({ kind: "bad_format" });
  });

  // DIE M3-LEKTION: ein angehaengter DRITTER Teil waere sonst still ignoriert worden.
  // Wird rot, sobald jemand die Teilezahl auf ">= 2" lockert.
  it("P4 — DREI Teile werden verworfen, die Teilezahl gilt strikt", () => {
    const roh = `${ERFUNDENER_STATE}.${ERFUNDENE_PROJEKT_ID}.angehaengt`;
    expect(parseStateCookie(roh)).toEqual({ kind: "bad_format" });
  });

  it("P5 — ein leerer Zufallswert-Teil wird verworfen", () => {
    expect(parseStateCookie(`.${ERFUNDENE_PROJEKT_ID}`)).toEqual({
      kind: "bad_format",
    });
  });

  it("P6 — eine formwidrige Projekt-Kennung wird verworfen", () => {
    expect(parseStateCookie(`${ERFUNDENER_STATE}.keine-uuid`)).toEqual({
      kind: "bad_format",
    });
    expect(parseStateCookie(`${ERFUNDENER_STATE}.`)).toEqual({
      kind: "bad_format",
    });
  });

  // DER EIGENTLICHE GRUND FUER DEN GEMEINSAMEN ORT: Schreiber und Leser duerfen nicht
  // auseinanderlaufen. Dieser Test faellt, sobald einer von beiden das Trennzeichen
  // oder die Reihenfolge aendert.
  it("P7 — Rundlauf: was buildStateCookieValue schreibt, liest parseStateCookie", () => {
    const state = newStateValue();
    const roh = buildStateCookieValue(state, ERFUNDENE_PROJEKT_ID);
    expect(parseStateCookie(roh)).toEqual({
      kind: "ok",
      state,
      projectId: ERFUNDENE_PROJEKT_ID,
    });
  });
});

describe("statesMatch (Scheibe 11.8e)", () => {
  it("S1 — gleiche Werte stimmen ueberein", () => {
    expect(statesMatch(ERFUNDENER_STATE, ERFUNDENER_STATE)).toBe(true);
  });

  it("S2 — verschiedene Werte GLEICHER Laenge stimmen nicht ueberein", () => {
    const anders = `${ERFUNDENER_STATE.slice(0, -1)}X`;
    expect(anders.length).toBe(ERFUNDENER_STATE.length);
    expect(statesMatch(anders, ERFUNDENER_STATE)).toBe(false);
  });

  // DER LAENGEN-FALL IST DER GRUND FUER DIE VORGESCHALTETE PRUEFUNG: timingSafeEqual
  // WIRFT bei ungleicher Laenge. Ohne den Riegel waere ausgerechnet die
  // Sicherheitsfunktion die Stelle, an der ein untergeschobener state einen 500 mit
  // Stack erzeugt. Der Test prueft BEIDES: kein Wurf UND das Ergebnis false.
  it("S3 — ungleiche Laenge liefert false und WIRFT NICHT", () => {
    expect(() => statesMatch("kurz", ERFUNDENER_STATE)).not.toThrow();
    expect(statesMatch("kurz", ERFUNDENER_STATE)).toBe(false);
    expect(statesMatch(`${ERFUNDENER_STATE}laenger`, ERFUNDENER_STATE)).toBe(
      false,
    );
  });

  it("S4 — fehlender oder leerer URL-Wert liefert false", () => {
    expect(statesMatch(null, ERFUNDENER_STATE)).toBe(false);
    expect(statesMatch(undefined, ERFUNDENER_STATE)).toBe(false);
    expect(statesMatch("", ERFUNDENER_STATE)).toBe(false);
  });

  it("S5 — ein leerer Cookie-Wert liefert false, auch gegen einen leeren URL-Wert", () => {
    expect(statesMatch("", "")).toBe(false);
    expect(statesMatch(ERFUNDENER_STATE, "")).toBe(false);
  });
});

describe("serializeClearedStateCookie (Scheibe 11.8e)", () => {
  // EIN LOESCHBEFEHL MIT ABWEICHENDEM PFAD LOESCHT NICHTS, und der Browser meldet das
  // nicht. __Host- erzwingt Pfad "/" und Secure auch beim Loeschen.
  it("C1 — sie traegt denselben Namen, Pfad / und Secure, und Max-Age=0", () => {
    const zeile = serializeClearedStateCookie();
    expect(zeile.startsWith(`${STATE_COOKIE_NAME}=;`)).toBe(true);
    expect(zeile).toContain("Path=/");
    expect(zeile).toContain("Secure");
    expect(zeile).toContain("HttpOnly");
    expect(zeile).toContain("SameSite=Lax");
    expect(zeile).toContain("Max-Age=0");
  });

  it("C2 — sie traegt KEINE Lebensdauer aus dem Setz-Pfad", () => {
    expect(serializeClearedStateCookie()).not.toContain(
      `Max-Age=${STATE_COOKIE_MAX_AGE_SECONDS}`,
    );
  });
});
