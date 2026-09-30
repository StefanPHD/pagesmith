import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { generateFunctional } from "./generate";
import {
  FIELD_NAME_MAX,
  FORM_TARGET_NOTICE_HOST_TAG,
  FORM_TARGET_TIMEOUT_MS,
  buildFormTargetRuntime,
  deriveFormFieldNames,
  formTargetCheck,
  formTargetDocumentProblem,
  formTargetEndpointHost,
  formTargetNameDrift,
  formTargetNamesMessage,
  formTargetNamesProblem,
  formTargetProblem,
  ownFormTargetDomains,
  shortFieldName,
} from "./form-target";
import { mappingsEqual, type Mapping } from "./mappings";
import { annotateAndDetect } from "./detect";

// ===========================================================================
// FORMULAR-ZIEL (Phase 13, Scheibe 13-1). Die Tests F1–F13 und K1/K3 aus dem Plan der
// Scheibe; der Massstab sind die Invarianten I1–I8 und I10 (I9 ist gestrichen) im Zuschnitt
// Scheibe 13-1 der Phase 13 (Archiv docs/claude-history/phase-13-formular-ziel.md).
// Was jsdom NICHT zeigen kann (echtes Netz, Werbeblocker, Sichtbarkeit der Meldung,
// Navigation), steht in der Live-Anleitung.
// ===========================================================================

const ENDPOINT = "https://hook.eu2.make.com/abcdefghijklmnopqrstuvwxyz012345";
const THANKS = "https://danke.example/fertig";
const KOEDER = "ZZ-KOEDER-1";
const PIXEL = "123456789012345";
const TK = "tk-public-123";
const PROXY = "https://app.pagesmith.io/api/e";

// Die bestaetigte Liste des Formulars ps-cccccc in PAGE (Scheibe 13-1c): email, name und der
// Name des Absende-Knopfes "go" (Setzung P13-55) — sortiert. Das Feld mit form="ps-x"
// gehoert zu keinem Formular (es gibt kein Element mit dieser id).
const PAGE_NAMES = ["email", "go", "name"];

// fieldNames null = ein Ziel OHNE Liste (wie aus 13-1). Bewusst null und nicht undefined: Ein
// ausdrueckliches undefined loest den Vorgabewert aus, und der Test pruefte dann still ein
// Ziel MIT Liste.
function target(
  elementId: string,
  endpoint = ENDPOINT,
  thanksUrl = THANKS,
  fieldNames: string[] | null = PAGE_NAMES
): Mapping {
  return {
    elementId,
    type: "formTarget",
    config: fieldNames === null ? { endpoint, thanksUrl } : { endpoint, thanksUrl, fieldNames },
  };
}
function track(elementId: string, event: string): Mapping {
  return { elementId, type: "track", config: { event } };
}

// Formular mit Ziel (ps-cccccc) und ein zweites OHNE Ziel (ps-eeeeee), dazu ein Feld
// ausserhalb, das per form=-Attribut zum ersten gehoert.
const PAGE = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" action="#unten"><input type="email" name="email"><input type="text" name="name"><button data-pagesmith-id="ps-dddddd" type="submit" name="go" value="ja">Absenden</button></form><input form="ps-x" name="extern"><form id="f2" data-pagesmith-id="ps-eeeeee" action="#zwei"><input name="x"></form><a href="#">Link</a></body></html>`;

// ---------------------------------------------------------------------------
// Harness — dieselbe Bauform wie in generate.test.ts: frisches Dokument je Test, als
// globales document gestubbt, unsere Scripts per eval in Dokument-Reihenfolge.
// ---------------------------------------------------------------------------

let doc: Document;
let hrefValue: string;
// Der Ursprung der Seite im location-Stub. OHNE ihn waere location.origin undefined, und
// der Ursprungsvergleich der Laufzeit-Wache waere trivial falsch — G3 pruefte dann nichts.
const ORIGIN = "https://kunde.publayer.net";
let fetchCalls: { url: string; init: RequestInit & { body?: unknown } }[];
let pending: { resolve: (v: unknown) => void; reject: (e: unknown) => void }[];
let beacon: ReturnType<typeof vi.fn>;
let fbq: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  hrefValue = "";
  vi.stubGlobal("location", {
    get href() {
      return hrefValue;
    },
    set href(v: string) {
      hrefValue = v;
    },
    get origin() {
      return ORIGIN;
    },
  });
  vi.stubGlobal("open", vi.fn());
  fetchCalls = [];
  pending = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, init: RequestInit) => {
      fetchCalls.push({ url, init });
      return new Promise((resolve, reject) => pending.push({ resolve, reject }));
    })
  );
  beacon = vi.fn(() => true);
  (navigator as unknown as { sendBeacon: unknown }).sendBeacon = beacon;
  fbq = vi.fn();
  vi.stubGlobal("fbq", fbq);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete (navigator as unknown as { sendBeacon?: unknown }).sendBeacon;
});

function mount(output: string): void {
  doc = new DOMParser().parseFromString(output, "text/html");
  vi.stubGlobal("document", doc);
  for (const s of Array.from(doc.querySelectorAll("script"))) {
    if (s.id === "pagesmith-mappings") continue;
    window.eval(s.textContent ?? "");
  }
}

function exportDoc(mappings: Mapping[], extra: Record<string, unknown> = {}): string {
  return generateFunctional(PAGE, mappings, "export", {
    metaPixelId: PIXEL,
    trackingKey: TK,
    capiProxyUrl: PROXY,
    formTargetLanguage: "de",
    ...extra,
  });
}

function fill(): void {
  (doc.querySelector('[name="email"]') as HTMLInputElement).value = `${KOEDER}@example.com`;
  (doc.querySelector('[name="name"]') as HTMLInputElement).value = `${KOEDER} Name`;
}

function submit(selector = '[data-pagesmith-id="ps-cccccc"]', submitter?: Element): Event {
  const el = doc.querySelector(selector);
  if (!el) throw new Error(`kein Element fuer ${selector}`);
  const ev = submitter
    ? new SubmitEvent("submit", { bubbles: true, cancelable: true, submitter: submitter as HTMLElement })
    : new Event("submit", { bubbles: true, cancelable: true });
  el.dispatchEvent(ev);
  return ev;
}

// Mikrotasks abarbeiten (fetch-Promise -> then). Die Timer sind gefaelscht.
async function flush(): Promise<void> {
  await vi.advanceTimersByTimeAsync(0);
}

function bodyOf(i: number): string {
  return String(fetchCalls[i].init.body);
}

function notice(): { host: Element | null; box: Element | null } {
  const host = doc.querySelector(FORM_TARGET_NOTICE_HOST_TAG);
  const box = host?.shadowRoot?.querySelector('[role="alert"]') ?? null;
  return { host, box };
}
// STRUKTUR, NICHT SICHTBARKEIT (Dauerregel "DIE TESTUMGEBUNG WERTET KEIN CSS AUS"): Die
// Meldung "steht", wenn ihr Kasten die Klasse "box" OHNE "off" traegt.
function noticeOn(): boolean {
  const { box } = notice();
  return !!box && box.getAttribute("class") === "box";
}

const fbqTracks = () => fbq.mock.calls.filter((c) => c[0] === "track");

// ===========================================================================
// F1 (I1): Formularinhalte gehen AUSSCHLIESSLICH an die eingetragene Adresse.
// ===========================================================================
describe("F1 (I1) — Formularinhalte nur an die eingetragene Adresse", () => {
  it("F1: der Koeder steht nur im Rumpf des einen fetch an die Zieladresse — nicht im Beacon, nicht bei fbq, nicht auf der Konsole, nicht in der Adresse", async () => {
    // Rot, wenn Feldwerte irgendwo sonst hin reisen (M-I1: ein zusaetzlicher Aufruf an
    // /api/e mit dem Rumpf) oder in der Adresse der Danke-Seite landen (M-I2).
    const logs = [
      vi.spyOn(console, "log"),
      vi.spyOn(console, "info"),
      vi.spyOn(console, "warn"),
      vi.spyOn(console, "error"),
    ];
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    fill();
    submit();
    expect(fetchCalls).toHaveLength(1);
    expect(fetchCalls[0].url).toBe(ENDPOINT);
    expect(bodyOf(0)).toContain(KOEDER);
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();

    // POSITIVKONTROLLE: Der Track ist gelaufen — Beacon und fbq gab es, sie tragen nur den
    // Koeder nicht. Ohne sie waere "kein Koeder im Beacon" trivial wahr.
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(fbqTracks()).toHaveLength(1);

    const others = fetchCalls.slice(1).map((c) => `${c.url} ${String(c.init.body)}`);
    expect(others.join("|")).not.toContain(KOEDER);
    for (const call of beacon.mock.calls) {
      const payload = call[1] instanceof Blob ? await call[1].text() : String(call[1]);
      expect(payload).not.toContain(KOEDER);
      expect(String(call[0])).not.toContain(KOEDER);
    }
    expect(JSON.stringify(fbq.mock.calls)).not.toContain(KOEDER);
    for (const spy of logs) expect(JSON.stringify(spy.mock.calls)).not.toContain(KOEDER);
    expect(hrefValue).not.toContain(KOEDER);
  });

  it("F1b: der Rumpf ist form-urlencoded aus den Feldern, samt Absende-Knopf und mehrfachem Namen", () => {
    mount(exportDoc([target("ps-cccccc")]));
    fill();
    submit(undefined, doc.querySelector('[data-pagesmith-id="ps-dddddd"]')!);
    expect(fetchCalls[0].init.body).toBeInstanceOf(URLSearchParams);
    const params = new URLSearchParams(bodyOf(0));
    expect(params.get("email")).toBe(`${KOEDER}@example.com`);
    expect(params.get("go")).toBe("ja");
    // Die gemessene Aufruf-Form (G0, B0).
    expect(fetchCalls[0].init).toMatchObject({ method: "POST", mode: "no-cors", keepalive: true });
  });

  it("F1c: fremder submitter -> FormData wirft, der Rueckfall schickt ohne ihn (mit Positivkontrolle)", () => {
    // Positivkontrolle fuer das Instrument: FormData(form, fremderKnopf) wirft in jsdom.
    mount(exportDoc([target("ps-cccccc")]));
    const fremd = doc.querySelector("#f2")!.appendChild(doc.createElement("button"));
    fremd.setAttribute("name", "fremd");
    fremd.setAttribute("value", "1");
    const form = doc.querySelector('[data-pagesmith-id="ps-cccccc"]') as HTMLFormElement;
    expect(() => new FormData(form, fremd as HTMLButtonElement)).toThrow();
    fill();
    submit(undefined, fremd);
    expect(fetchCalls).toHaveLength(1);
    expect(bodyOf(0)).toContain(KOEDER);
    expect(bodyOf(0)).not.toContain("fremd");
  });
});

// ===========================================================================
// F2 (I2): keine Feldwerte in der Adresse der Danke-Seite.
// ===========================================================================
describe("F2 (I2) — Danke-Seite unveraendert", () => {
  it("F2: bei 'erreicht' ist die Adresse zeichengleich die eingetragene Danke-Seite", async () => {
    // Rot bei M-I2 (Anhaengen des Rumpfs an die Adresse).
    mount(exportDoc([target("ps-cccccc")]));
    fill();
    submit();
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
  });
});

// ===========================================================================
// F3 (I3): Danke-Seite NUR bei r.type === "opaque".
// ===========================================================================
describe("F3 (I3) — 'erreicht' nur bei opaque", () => {
  it("F3a: opaque -> Navigation und genau ein Track, keine Meldung", async () => {
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    const ev = submit();
    expect(ev.defaultPrevented).toBe(true);
    expect(fbqTracks()).toHaveLength(0); // der Track wartet auf "erreicht" (P13-26)
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
    expect(fbqTracks()).toHaveLength(1);
    expect(noticeOn()).toBe(false);
  });

  it.each([
    ["F3b: 'basic' (ein Blocker, der umleitet — N3)", { type: "basic", status: 200 }],
    ["F3d: ein unerwarteter Typ ('cors')", { type: "cors", status: 200 }],
  ])("%s -> keine Navigation, Formular steht, Meldung, kein Track", async (_name, response) => {
    // Rot bei M-I3 (Pruefung auf opaque gelockert zu "aufgeloest = erreicht").
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    const ev = submit();
    pending[0].resolve(response);
    await flush();
    expect(ev.defaultPrevented).toBe(true);
    expect(hrefValue).toBe("");
    expect(doc.querySelector('[data-pagesmith-id="ps-cccccc"]')).not.toBeNull();
    expect(noticeOn()).toBe(true);
    expect(fbqTracks()).toHaveLength(0);
  });

  it("F3c: Wurf (offline — N7) -> keine Navigation, Meldung, kein Track", async () => {
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    submit();
    pending[0].reject(new TypeError("Failed to fetch"));
    await flush();
    expect(hrefValue).toBe("");
    expect(noticeOn()).toBe(true);
    expect(fbqTracks()).toHaveLength(0);
  });

  it("F3e: Fehlschlag, dann erneuter Versuch mit Erfolg -> zwei Aufrufe, eine Navigation, genau EIN Track", async () => {
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    submit();
    pending[0].reject(new TypeError("Failed to fetch"));
    await flush();
    expect(noticeOn()).toBe(true);
    submit();
    expect(fetchCalls).toHaveLength(2);
    expect(noticeOn()).toBe(false); // ein neuer Versuch nimmt die Meldung weg
    pending[1].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
    expect(fbqTracks()).toHaveLength(1);
  });

  it("F3f: ein Wurf im Track haelt die Navigation nicht auf", async () => {
    fbq.mockImplementation(() => {
      throw new Error("fbq kaputt");
    });
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    submit();
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
  });
});

// ===========================================================================
// G: die Laufzeit-Wache (Nachschaerfung vor dem GO; Verteidigung in der Tiefe fuer I1).
// Eine Konfiguration, die an den Wachen beim Veroeffentlichen vorbeigerutscht ist, sendet
// NICHTS: kein fetch, eigene Meldung, keine Navigation — und das Formular schickt auch
// nicht nativ ab.
// ===========================================================================
describe("G — Laufzeit-Wache vor dem Versand", () => {
  it("G0 (Positivkontrolle): eine gueltige Konfiguration sendet — auch mit Leerraum und grossem Schema", () => {
    mount(exportDoc([target("ps-cccccc", ` HTTPS://hook.eu2.make.com/abc `, " https://danke.example/ ")]));
    const ev = submit();
    expect(ev.defaultPrevented).toBe(true);
    expect(fetchCalls).toHaveLength(1);
    expect(noticeOn()).toBe(false);
  });

  it.each([
    ["G1: fehlende Zieladresse", { thanksUrl: THANKS }],
    ["G2: Zieladresse http:", { endpoint: "http://hook.example/x", thanksUrl: THANKS }],
    ["G3: Zieladresse auf demselben Ursprung wie die Seite", { endpoint: `${ORIGIN}/hook`, thanksUrl: THANKS }],
    ["G4: unparsbare Zieladresse", { endpoint: "https://", thanksUrl: THANKS }],
    ["G5: Danke-Seite javascript:", { endpoint: ENDPOINT, thanksUrl: "javascript:alert(1)" }],
    ["G6: fehlende Danke-Seite", { endpoint: ENDPOINT }],
  ])("%s -> KEIN fetch, Meldung, keine Navigation, kein natives Abschicken", async (_name, config) => {
    // G3 ist der EINZIGE Test, der die Ursprungspruefung traegt (Pflicht-Mutation).
    mount(
      exportDoc([{ elementId: "ps-cccccc", type: "formTarget", config } as unknown as Mapping])
    );
    fill();
    const ev = submit();
    await flush();
    expect(fetchCalls).toHaveLength(0);
    expect(noticeOn()).toBe(true);
    expect(hrefValue).toBe("");
    expect(ev.defaultPrevented).toBe(true);
  });
});

// ===========================================================================
// F4: die Sperre gegen Doppel-Absenden.
// ===========================================================================
describe("F4 — Sperre waehrend eines Versands", () => {
  it("F4: zweimal Abschicken bei haengendem Aufruf -> EIN fetch, BEIDE Ereignisse verhindert", () => {
    // Rot, wenn die Sperre VOR dem preventDefault prueft (dann schickte der zweite Klick
    // nativ ab — bei GET mit den Werten in der Adresse, I2).
    mount(exportDoc([target("ps-cccccc")]));
    const a = submit();
    const b = submit();
    expect(fetchCalls).toHaveLength(1);
    expect(a.defaultPrevented).toBe(true);
    expect(b.defaultPrevented).toBe(true);
  });
});

// ===========================================================================
// K3: das Zeitlimit (Setzung P13-32).
// ===========================================================================
describe("K3 — Zeitlimit ohne Abbruch", () => {
  it("K3a: nach dem Limit Meldung und Sperre frei — ein zweiter Klick schickt erneut", async () => {
    // Rot, wenn das Zeitlimit fehlt (M-T): dann bleibt die Sperre, und der Klick
    // verpufft.
    mount(exportDoc([target("ps-cccccc")]));
    submit();
    await vi.advanceTimersByTimeAsync(FORM_TARGET_TIMEOUT_MS - 1);
    expect(noticeOn()).toBe(false);
    submit();
    expect(fetchCalls).toHaveLength(1); // noch gesperrt
    await vi.advanceTimersByTimeAsync(1);
    expect(noticeOn()).toBe(true);
    submit();
    expect(fetchCalls).toHaveLength(2);
  });

  it("K3b: ein spaetes 'opaque' nach dem Limit navigiert noch (kein Abbruch)", async () => {
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    submit();
    await vi.advanceTimersByTimeAsync(FORM_TARGET_TIMEOUT_MS);
    expect(noticeOn()).toBe(true);
    expect(hrefValue).toBe("");
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
    expect(fbqTracks()).toHaveLength(1);
  });

  it("K3c: ein spaetes NICHT-opaque nach dem Limit navigiert nicht", async () => {
    mount(exportDoc([target("ps-cccccc")]));
    submit();
    await vi.advanceTimersByTimeAsync(FORM_TARGET_TIMEOUT_MS);
    pending[0].resolve({ type: "basic", status: 200 });
    await flush();
    expect(hrefValue).toBe("");
    expect(noticeOn()).toBe(true);
  });

  it("K3d: ein Ergebnis VOR dem Limit loescht den Timer — keine spaete Meldung", async () => {
    mount(exportDoc([target("ps-cccccc")]));
    submit();
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    await vi.advanceTimersByTimeAsync(FORM_TARGET_TIMEOUT_MS * 2);
    expect(noticeOn()).toBe(false);
  });
});

// ===========================================================================
// F5 (I4): Formulare OHNE Ziel verhalten sich unveraendert.
// ===========================================================================
describe("F5 (I4) — Formular ohne Ziel neben einem mit Ziel", () => {
  it("F5: das Formular OHNE Ziel schickt nativ ab (kein preventDefault, kein fetch) und zaehlt seinen Track sofort", () => {
    // Rot, wenn preventDefault fuer alle Formulare gilt. S1, S4, S6, S7 und U1 in
    // generate.test.ts pruefen dasselbe auf einer Seite OHNE jedes Ziel.
    mount(exportDoc([target("ps-cccccc"), track("ps-eeeeee", "Contact")]));
    const ev = submit("#f2");
    expect(ev.defaultPrevented).toBe(false);
    expect(fetchCalls).toHaveLength(0);
    expect(fbqTracks().map((c) => c[1])).toEqual(["Contact"]);
    // Positivkontrolle im selben Lauf: das Formular MIT Ziel wird verhindert.
    expect(submit().defaultPrevented).toBe(true);
  });
});

// ===========================================================================
// F6b (I5, Gegenstueck): der Text MIT Ziel ist der Text OHNE Ziel plus GENAU die drei
// Einsetzungen R1 (Baustein), B1 (Zweig im submit-Listener), D1 (Tabelleneintrag).
// Die fuenf Schritte der Dauerregel "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …".
// Der Text OHNE Ziel ist byte-gleich zu vor der Scheibe — das halten W1', W2', T1, T9.
// ===========================================================================

const sha = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
const bytes = (s: string) => Buffer.byteLength(s, "utf8");
const count = (s: string, part: string) => s.split(part).length - 1;

// B1 — GETIPPT aus dem Plan (Einsetzung hinter der FORM-Pruefung, VOR der Sperre), mit der
// Track-Anweisung dieser Sonde (Pixel + Beacon -> "__psMetaFire(a.config);").
const B1 = [
  "",
  '      var ftList = byId[f.getAttribute("data-pagesmith-id")];',
  "      var ft = null;",
  "      if (ftList) {",
  "        for (var q = 0; q < ftList.length; q++) {",
  '          if (ftList[q].type === "formTarget") ft = ftList[q].config;',
  "        }",
  "      }",
  "      if (ft) {",
  "        e.preventDefault();",
  "        __psFormTargetSend(f, e.submitter, ft, function () {",
  "          if (submittedForms.indexOf(f) !== -1) return;",
  "          submittedForms.push(f);",
  "          for (var j = 0; j < ftList.length; j++) {",
  "            var a = ftList[j];",
  '            if (a.type === "track") {',
  "            __psMetaFire(a.config);",
  "            }",
  "          }",
  "        });",
  "        return;",
  "      }",
].join("\n");
// D1 — der Tabelleneintrag, hinter dem Track-Eintrag (Reihenfolge der Mappings).
const D1 = `,{"elementId":"ps-cccccc","type":"formTarget","config":{"endpoint":"${ENDPOINT}","thanksUrl":"${THANKS}"}}`;

// DER NATIVE RUECKFALL (Phase 13.6, Scheibe 13.6-1; Setzungen P13.6-32 und P13.6-36 der Phase
// 13.6). GETIPPT aus den Setzungen, nicht aus dem Code: Am <form> mit Ziel wird die action des
// Betreibers durch die eingetragene Adresse ERSETZT (X1), und method, enctype und
// accept-charset kommen hinzu (A1) — setAttribute haengt ein neues Attribut hinten an. Eine
// Ersetzung ist KEINE isolierbare Einsetzung; die Zusage lautet deshalb (Dauerregel "WO EINE
// BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …", Vorbedingung): Nachher = Vorher, in dem X1 genau
// einmal ersetzt und A1 genau einmal eingesetzt ist, plus R1, B1, D1.
const X1_VORHER = ' action="#unten"';
const X1_NACHHER = ` action="${ENDPOINT}"`;
const A1 = ' method="post" enctype="application/x-www-form-urlencoded" accept-charset="UTF-8"';

// Die Ruecknahme der Scheibe 13.6-1 an einem Nachher-Text: A1 raus, X1 zurueck. Zaehlt vorher,
// dass jedes genau einmal vorkommt — sonst waere die Ruecknahme mehrdeutig.
function ohneRueckfall(nachher: string): string {
  expect(count(nachher, A1)).toBe(1);
  expect(count(nachher, X1_NACHHER)).toBe(1);
  expect(count(nachher, X1_VORHER)).toBe(0);
  return nachher.split(A1).join("").split(X1_NACHHER).join(X1_VORHER);
}

describe("F6b (I5) — Differenz-Nachweis MIT Ziel", () => {
  it("F6b′: Nachher = Vorher plus GENAU R1, B1, D1 — und am <form> genau die Ersetzung X1 und die Einsetzung A1", () => {
    // (1) Vorher-Wert: dieselbe Seite, dieselben Optionen, OHNE das Ziel.
    const vorher = exportDoc([track("ps-cccccc", "Lead")]);
    expect(count(vorher, X1_VORHER)).toBe(1);
    // (2) Nachher-Wert: an derselben Form, mit demselben Treiber.
    const nachher = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]);
    // R1 ist der Baustein aus buildFormTargetRuntime — NICHT abgetippt: sein INHALT ist
    // durch F1–F4, K3 und F10 verhaltensgeprueft; dieser Nachweis prueft die STELLE.
    const R1 = buildFormTargetRuntime("de", false);
    // (3) je genau einmal — R1, B1, D1 hier, X1 und A1 in ohneRueckfall.
    expect(count(nachher, R1)).toBe(1);
    expect(count(nachher, B1)).toBe(1);
    expect(count(nachher, D1)).toBe(1);
    // (4) entfernen bzw. zuruecknehmen -> zeichengleich zum Vorher-Wert.
    const ohneBaustein = nachher.split(R1).join("").split(B1).join("").split(D1).join("");
    const rest = ohneRueckfall(ohneBaustein);
    expect(bytes(rest)).toBe(bytes(vorher));
    expect(sha(rest)).toBe(sha(vorher));
    // (5) POSITIVKONTROLLEN: ohne die Entfernung besteht ein Unterschied — und ohne die
    // Ruecknahme von X1 und A1 ebenfalls.
    expect(sha(nachher)).not.toBe(sha(vorher));
    expect(sha(ohneBaustein)).not.toBe(sha(vorher));
  });
});

// ===========================================================================
// F7 (I7): Betreiber-Werte nur ueber embedInScript — eine feindliche Nutzlast bricht
// nicht aus dem Datenblock aus.
// ===========================================================================
describe("F7 (I7) — feindliche Nutzlast in Zieladresse und Danke-Seite", () => {
  it("F7: kein zusaetzliches <script>, und der Datenblock liefert die Originalwerte zurueck", () => {
    // Rot, wenn der Datenblock das "<" nicht maskiert.
    const boeseA = "https://x.example/</script><script>window.__boese=1</script>";
    const boeseB = "https://y.example/<!--<script>";
    const ohne = exportDoc([track("ps-cccccc", "Lead")]);
    const out = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc", boeseA, boeseB)]);
    const parsed = new DOMParser().parseFromString(out, "text/html");
    const zahl = (d: Document) => d.querySelectorAll("script").length;
    expect(zahl(parsed)).toBe(zahl(new DOMParser().parseFromString(ohne, "text/html")));
    const table = JSON.parse(parsed.getElementById("pagesmith-mappings")!.textContent ?? "[]");
    expect(table[1].config).toEqual({ endpoint: boeseA, thanksUrl: boeseB });
    // DIE ZEICHENPRUEFUNG GILT DEM SCRIPT-ROHTEXT (verengt in der Scheibe 13.6-1): Seit dort
    // steht die Adresse zusaetzlich im action-Attribut des <form> — ein gequoteter
    // Attributwert, in dem "</script>" kein Tag ist (Dauerregel "JEDER BETREIBER-WERT, DER IN
    // SCRIPT-ROHTEXT GEHT …": das Escape traegt nur im Script-Rohtext). Die Scripts stehen
    // hinter dem <form>, am Ende des body; geprueft wird der Text ab dem Datenblock. Die
    // Attribut-Seite prueft F7b.
    const abDatenblock = out.slice(out.indexOf('<script type="application/json" id="pagesmith-mappings">'));
    expect(abDatenblock.length).toBeGreaterThan(0);
    expect(abDatenblock).not.toContain("</script><script>window.__boese");
  });

  it("F7b (Scheibe 13.6-1): eine feindliche Adresse im action-Attribut bricht nicht aus — der Serialisierer maskiert", () => {
    // Rot, wenn die Adresse roh in den Text geschrieben wird statt ueber setAttribute.
    const boese = 'https://x.example/"><script>window.__boese=2</script><x-boese a="';
    const ohne = exportDoc([track("ps-cccccc", "Lead")]);
    const out = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc", boese)]);
    const parsed = new DOMParser().parseFromString(out, "text/html");
    const vorher = new DOMParser().parseFromString(ohne, "text/html");
    // Kein zusaetzliches Element: gleich viele Scripts, kein fremdes Element.
    expect(parsed.querySelectorAll("script").length).toBe(vorher.querySelectorAll("script").length);
    expect(parsed.querySelector("x-boese")).toBeNull();
    // Der Attributwert kommt zeichengleich zurueck.
    const form = parsed.querySelector('[data-pagesmith-id="ps-cccccc"]')!;
    expect(form.getAttribute("action")).toBe(boese);
    // POSITIVKONTROLLE: Die Sonde traegt wirklich ein Anfuehrungszeichen, und es steht
    // maskiert im Text.
    expect(boese).toContain('"');
    // Nur das Anfuehrungszeichen wird hier festgeschrieben: ob "<" und ">" im Attribut
    // ebenfalls maskiert werden, unterscheidet sich zwischen Serialisierern (jsdom 29 tut es
    // nicht, gemessen in der Planrunde) und ist fuer den Ausbruch unerheblich.
    expect(out).toContain('action="https://x.example/&quot;');
  });
});

// ===========================================================================
// F9 (I10): kein Einwilligungs-Tor.
// ===========================================================================
describe("F9 (I10) — kein Einwilligungs-Tor", () => {
  it("F9: der Hook verweigert alles -> der Versand laeuft trotzdem, der Track nicht", async () => {
    // Rot, wenn der Versand hinter __psConsent haengt.
    vi.stubGlobal("pagesmithConsent", () => false);
    mount(exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]));
    submit();
    expect(fetchCalls).toHaveLength(1);
    pending[0].resolve({ type: "opaque", status: 0 });
    await flush();
    expect(hrefValue).toBe(THANKS);
    // Positivkontrolle, dass der Hook wirkt: der Track ist gegatet und bleibt aus.
    expect(fbqTracks()).toHaveLength(0);
    expect(beacon).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// F10 (I6): kein fremder Knoten veraendert.
// ===========================================================================
describe("F10 (I6) — kein Eingriff an fremden Knoten", () => {
  it("F10: nach Versand und Fehlschlag sind Formular, Fokus und alle fremden Knoten unveraendert; body hat genau EIN Kind mehr", async () => {
    // Rot, wenn der Versand etwa den Knopf sperrt (disabled) oder den Fokus verschiebt.
    mount(exportDoc([target("ps-cccccc")]));
    const knopf = doc.querySelector('[data-pagesmith-id="ps-dddddd"]') as HTMLButtonElement;
    knopf.focus();
    const vorher = doc.body.innerHTML;
    const kinder = doc.body.children.length;
    const fokus = doc.activeElement;
    submit(undefined, knopf);
    expect(doc.body.innerHTML).toBe(vorher); // waehrend des Versands
    pending[0].reject(new TypeError("Failed to fetch"));
    await flush();
    expect(noticeOn()).toBe(true);
    expect(doc.activeElement).toBe(fokus);
    expect(doc.body.children.length).toBe(kinder + 1);
    const host = doc.body.lastElementChild!;
    expect(host.tagName.toLowerCase()).toBe(FORM_TARGET_NOTICE_HOST_TAG);
    host.remove();
    expect(doc.body.innerHTML).toBe(vorher);
  });

  it("F10b: die Meldung lebt im eigenen Schattenbaum, traegt role=alert und behauptet keine Ursache", async () => {
    mount(exportDoc([target("ps-cccccc")]));
    submit();
    pending[0].reject(new TypeError("Failed to fetch"));
    await flush();
    const { host, box } = notice();
    expect(host!.shadowRoot).not.toBeNull();
    expect(box!.getAttribute("lang")).toBe("de");
    expect(box!.textContent).toContain("Bitte sende das Formular noch einmal.");
    // Schliessen versteckt per Klasse im eigenen Baum.
    (host!.shadowRoot!.querySelector("button") as HTMLButtonElement).click();
    expect(noticeOn()).toBe(false);
  });

  it("F10c: Projektsprache en -> englischer Text", async () => {
    mount(exportDoc([target("ps-cccccc")], { formTargetLanguage: "en" }));
    submit();
    pending[0].reject(new TypeError("x"));
    await flush();
    expect(notice().box!.getAttribute("lang")).toBe("en");
    expect(notice().box!.textContent).toContain("Please submit the form again.");
  });
});

// ===========================================================================
// F11: keine Formular-Ziel-Laufzeit in Vorschau und Edit (Setzung P13-30).
// ===========================================================================
describe("F11 — Modus-Sperre", () => {
  it("F11: preview und edit tragen weder Baustein noch Zweig; export traegt beide (Positivkontrolle)", () => {
    // Rot, wenn die Modus-Sperre fehlt.
    const m = [target("ps-cccccc")];
    for (const mode of ["preview", "edit"] as const) {
      const out = generateFunctional(PAGE, m, mode, { formTargetLanguage: "de" });
      expect(out).not.toContain("__psFormTargetSend");
    }
    expect(generateFunctional(PAGE, m, "export", { formTargetLanguage: "de" })).toContain(
      "__psFormTargetSend(f, e.submitter"
    );
  });

  it("F11b: ein VERWAISTES Ziel erzeugt keinen Baustein", () => {
    const out = generateFunctional(PAGE, [target("ps-weg000")], "export", {});
    expect(out).not.toContain("__psFormTargetSend");
  });
});

// ===========================================================================
// F12: dirty erkennt eine Aenderung am Ziel.
// ===========================================================================
describe("F12 — mappingsEqual", () => {
  it("F12: geaenderte Zieladresse oder Danke-Seite ist dirty; gleiche Werte nicht", () => {
    // Rot ohne den formTarget-Zweig in configEqual (dann waere auch GLEICH dirty).
    const a = [target("ps-cccccc")];
    expect(mappingsEqual(a, [target("ps-cccccc")])).toBe(true);
    expect(mappingsEqual(a, [target("ps-cccccc", "https://hook.example/b")])).toBe(false);
    expect(mappingsEqual(a, [target("ps-cccccc", ENDPOINT, "https://danke.example/b")])).toBe(false);
  });
});

// ===========================================================================
// Die Werte (Setzung P13-29) — formTargetProblem.
// ===========================================================================
describe("formTargetProblem — die Werte", () => {
  const OWN = ["lvh.me", "publayer.net", "app.pagesmith.io"];
  it.each([
    ["tauglich", { endpoint: ENDPOINT, thanksUrl: THANKS }, null],
    ["Danke-Seite http", { endpoint: ENDPOINT, thanksUrl: "http://d.example/" }, null],
    ["kein Objekt", "x", "shape"],
    ["null", null, "shape"],
    ["endpoint kein String", { endpoint: 1, thanksUrl: THANKS }, "shape"],
    ["Danke-Seite fehlt", { endpoint: ENDPOINT }, "shape"],
    ["endpoint http", { endpoint: "http://hook.example/x", thanksUrl: THANKS }, "endpoint"],
    ["endpoint javascript:", { endpoint: "javascript:alert(1)", thanksUrl: THANKS }, "endpoint"],
    ["endpoint relativ", { endpoint: "/hook", thanksUrl: THANKS }, "endpoint"],
    ["endpoint eigener Serving-Host", { endpoint: "https://kunde.publayer.net/x", thanksUrl: THANKS }, "endpoint"],
    ["endpoint Hosting-Domaene selbst", { endpoint: "https://publayer.net/x", thanksUrl: THANKS }, "endpoint"],
    ["endpoint App-Host", { endpoint: "https://app.pagesmith.io/api/e", thanksUrl: THANKS }, "endpoint"],
    ["endpoint lvh.me", { endpoint: "https://a.lvh.me/x", thanksUrl: THANKS }, "endpoint"],
    ["Namensvetter ist KEIN eigener Host", { endpoint: "https://notpublayer.net/x", thanksUrl: THANKS }, null],
    ["Danke-Seite leer", { endpoint: ENDPOINT, thanksUrl: "" }, "thanks"],
    ["Danke-Seite relativ", { endpoint: ENDPOINT, thanksUrl: "/danke" }, "thanks"],
    ["Danke-Seite javascript:", { endpoint: ENDPOINT, thanksUrl: "javascript:alert(1)" }, "thanks"],
  ])("%s", (_name, config, soll) => {
    expect(formTargetProblem(config, OWN)).toBe(soll);
  });

  it("ownFormTargetDomains liest Hosting-Domaene und App-Host aus der Umgebung", () => {
    // SEIT 13.6-1 steht "vercel.app" fest in der Liste (Setzungen P13.6-34 und P13.6-36, F4);
    // die Erwartung ist aus der Setzung geschrieben.
    vi.stubEnv("NEXT_PUBLIC_HOSTING_DOMAIN", " .Publayer.net/ ");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://App.Pagesmith.io/");
    expect(ownFormTargetDomains()).toEqual(["lvh.me", "vercel.app", "publayer.net", "app.pagesmith.io"]);
    vi.unstubAllEnvs();
  });

  // V1 (Scheibe 13.6-1, F4): ueber die ECHTE Liste aus ownFormTargetDomains, nicht ueber OWN
  // oben — sonst faende die Mutation "vercel.app fehlt" (M4) keinen Gegner.
  it.each([
    ["Vorschau-Adresse", "https://pagesmith-abc123-team.vercel.app/hook", "endpoint"],
    ["vercel.app selbst", "https://vercel.app/x", "endpoint"],
    ["Namensvetter ist KEIN eigener Host", "https://notvercel.app/x", null],
  ])("V1: %s", (_name, endpoint, soll) => {
    vi.stubEnv("NEXT_PUBLIC_HOSTING_DOMAIN", "publayer.net");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    expect(formTargetProblem({ endpoint, thanksUrl: THANKS }, ownFormTargetDomains())).toBe(soll);
    vi.unstubAllEnvs();
  });

  // P4 (Client, Scheibe 13.6-1, F5): isOwnHost normalisiert — Punkt am Ende und
  // Grossschreibung, an der Adresse wie am Listeneintrag. Der Punkt am Ende ist gemessen
  // (Vermerk P13.6-35 der Phase 13.6): new URL laesst ihn stehen.
  it.each([
    ["Punkt am Ende", "https://kunde.publayer.net./x", OWN, "endpoint"],
    ["Punkt am Ende an der Hosting-Domaene selbst", "https://publayer.net./x", OWN, "endpoint"],
    ["Grossbuchstaben und Punkt am Ende", "https://KUNDE.Publayer.NET./x", OWN, "endpoint"],
    ["Listeneintrag mit Grossbuchstaben und Punkt", "https://kunde.publayer.net/x", ["Publayer.NET."], "endpoint"],
    ["Positivkontrolle: fremder Host mit Punkt am Ende", "https://hook.eu2.make.com./x", OWN, null],
  ])("P4 (Client): %s", (_name, endpoint, own, soll) => {
    expect(formTargetProblem({ endpoint, thanksUrl: THANKS }, own)).toBe(soll);
  });
});

// ===========================================================================
// formTargetEndpointHost (Scheibe 13.6-1, F7) — der Host fuer die Pruefung in publishProject.
// Die Erwartung ist aus der Setzung geschrieben: normalisiert, dann nur [a-z0-9.-], nicht leer.
// ===========================================================================
describe("formTargetEndpointHost — normalisiert, dann streng", () => {
  it.each([
    ["Grossbuchstaben und Punkt am Ende", "https://Hook.EU2.make.com./x", "hook.eu2.make.com"],
    ["Leerraum am Rand", "  https://kunde.example/x ", "kunde.example"],
    ["Punycode", "https://xn--mnchen-3ya.de/x", "xn--mnchen-3ya.de"],
    ["IPv4", "https://203.0.113.7/x", "203.0.113.7"],
    ["IPv6 in Klammern", "https://[2001:db8::1]/x", null],
    ["Unterstrich", "https://a_b.example/x", null],
    ["unparsbar", "https://", null],
    ["kein String", 7, null],
  ])("%s", (_name, endpoint, soll) => {
    expect(formTargetEndpointHost(endpoint)).toBe(soll);
  });
});

// ===========================================================================
// F13 / K1: die Berechtigung — formTargetCheck.
// ===========================================================================
describe("F13/K1 — formTargetCheck", () => {
  const form = (attrs: string, inner: string, after = "") =>
    `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" id="ps-f" ${attrs}>${inner}</form>${after}</body></html>`;
  const kinds = (html: string) =>
    formTargetCheck(html, "ps-cccccc")?.blocks.map((b) => b.kind) ?? "null";

  it("Positivkontrolle: benannte Felder, kein action -> erlaubt, ohne Hinweis", () => {
    expect(formTargetCheck(form("", '<input name="a"><button>Senden</button>'), "ps-cccccc")).toEqual({
      blocks: [],
      inlineScript: false,
      fields: [{ name: "a", source: "code" }],
      fieldNames: ["a"],
    });
  });

  it.each([
    ["action '#'", form('action="#"', '<input name="a">'), []],
    ["action relativ", form('action="/senden"', '<input name="a">'), []],
    ["action leer", form('action=""', '<input name="a">'), []],
    ["action absolut", form('action="https://formspree.io/f/x"', '<input name="a">'), ["foreign-action"]],
    ["action protokoll-relativ", form('action="//formspree.io/f/x"', '<input name="a">'), ["foreign-action"]],
    ["formaction absolut", form("", '<input name="a"><button formaction="https://x.example/">S</button>'), ["foreign-action"]],
    ["formaction an type=button zaehlt nicht", form("", '<input name="a"><button type="button" formaction="https://x.example/">S</button>'), []],
    ["Datei-Feld", form("", '<input name="a"><input type="file" name="f">'), ["file-field"]],
    ["Datei-Feld per form=-Attribut ausserhalb", form("", '<input name="a">', '<input type="file" name="f" form="ps-f">'), ["file-field"]],
    ["method=dialog", form('method="dialog"', '<input name="a">'), ["dialog"]],
    ["formmethod=dialog", form("", '<input name="a"><button formmethod="dialog">S</button>'), ["dialog"]],
    ["hidden und submit ohne Namen zaehlen nicht", form("", '<input name="a"><input type="hidden"><input type="submit"><button>S</button>'), []],
  ])("%s", (_name, html, soll) => {
    expect(kinds(html)).toEqual(soll);
  });

  // SEIT 13-1c ist ein unbenanntes Eingabefeld KEIN Ausschluss mehr (es ist benennbar); die
  // Sperre "unnamed" aus 13-1 ist ersetzt durch "unnamed-radio" (J4) und "blank-name" (F3).
  it("K1 (13-1c): unbenannte Felder sind benennbar — kein Ausschluss, auch per form=-Attribut", () => {
    const html = form(
      "",
      '<input name="ok"><input type="email" id="mail"><input placeholder="Dein Name"><textarea></textarea><select id="land"></select>',
      '<input type="tel" form="ps-f">'
    );
    const check = formTargetCheck(html, "ps-cccccc")!;
    expect(check.blocks).toEqual([]);
    expect(check.fields).toEqual([
      { name: "ok", source: "code" },
      { name: "mail", source: "id" },
      { name: "dein_name", source: "placeholder" },
      { name: "textarea", source: "type" },
      { name: "land", source: "id" },
      { name: "tel", source: "type" },
    ]);
  });

  it("J4 (P13-46): ein Radio ohne Namen sperrt und wird genannt; ein benanntes Radio nicht (Positivkontrolle)", () => {
    // Rot, wenn Radios benannt werden.
    const check = formTargetCheck(
      form("", '<input name="a"><input type="radio" id="r1" value="x"><input type="radio" name="farbe" value="y">'),
      "ps-cccccc"
    )!;
    expect(check.blocks).toEqual([{ kind: "unnamed-radio", fields: ["radio #r1"] }]);
    expect(check.fieldNames).toEqual(["a", "farbe"]);
  });

  it("F3 (P13-53): ein Name nur aus Leerraum sperrt und wird NICHT ersetzt", () => {
    // Rot, wenn ein Leerraum-Name als unbenannt gilt und einen abgeleiteten Namen bekommt.
    const check = formTargetCheck(form("", '<input name="a"><input name="   " id="leer">'), "ps-cccccc")!;
    expect(check.blocks).toEqual([{ kind: "blank-name", fields: ["text #leer"] }]);
    expect(check.fieldNames).toEqual(["a"]);
  });

  it("K2: ein Inline-onsubmit ist ein Hinweis, KEIN Ausschluss", () => {
    const check = formTargetCheck(form('onsubmit="return false"', '<input name="a">'), "ps-cccccc")!;
    expect(check).toEqual({
      blocks: [],
      inlineScript: true,
      fields: [{ name: "a", source: "code" }],
      fieldNames: ["a"],
    });
  });

  // DIE ANGEBOTSREGEL DER SCHEIBE 13.6-1 (Setzungen P13.6-33 und P13.6-36, F1/F2): formaction,
  // formmethod und formenctype an einem Absende-Element, JEDES mit JEDEM Wert — auch am
  // Bild-Knopf und ausserhalb ueber form=. formtarget und formnovalidate nicht. Erwartung aus
  // der Setzung. Ein Element, das schon "foreign-action" oder "dialog" traegt, bleibt dort
  // (Zeilen "formaction absolut" und "formmethod=dialog" oben, unveraendert).
  it.each([
    ["A1: formaction relativ", form("", '<input name="a"><button formaction="/senden">S</button>'), ["submitter-override"]],
    ["A1: formaction leer", form("", '<input name="a"><button formaction="">S</button>'), ["submitter-override"]],
    ["A1: formaction an input type=submit", form("", '<input name="a"><input type="submit" formaction="#x">'), ["submitter-override"]],
    ["A2: Bild-Knopf mit formaction relativ", form("", '<input name="a"><input type="image" src="x.png" formaction="/x">'), ["submitter-override"]],
    ["A2: Bild-Knopf ausserhalb ueber form= mit formmethod", form("", '<input name="a">', '<input type="image" src="x.png" form="ps-f" formmethod="get">'), ["submitter-override"]],
    ["A2: Bild-Knopf mit absolutem formaction (Vorrat P13-61)", form("", '<input name="a"><input type="image" src="x.png" formaction="https://x.example/">'), ["foreign-action"]],
    ["A2: Bild-Knopf mit formmethod=dialog", form("", '<input name="a"><input type="image" src="x.png" formmethod="dialog">'), ["dialog"]],
    ["A3: formmethod get", form("", '<input name="a"><button formmethod="get">S</button>'), ["submitter-override"]],
    ["A3: formmethod post (jeder Wert)", form("", '<input name="a"><button formmethod="post">S</button>'), ["submitter-override"]],
    ["A3: formenctype urlencoded (jeder Wert)", form("", '<input name="a"><button formenctype="application/x-www-form-urlencoded">S</button>'), ["submitter-override"]],
    ["A3: formenctype text/plain", form("", '<input name="a"><button formenctype="text/plain">S</button>'), ["submitter-override"]],
    ["A3: formtarget sperrt nicht", form("", '<input name="a"><button formtarget="_blank">S</button>'), []],
    ["A3: formnovalidate sperrt nicht", form("", '<input name="a"><button formnovalidate>S</button>'), []],
    ["A3: formaction an type=button zaehlt nicht", form("", '<input name="a"><button type="button" formaction="/x" formenctype="text/plain">S</button>'), []],
  ])("%s", (_name, html, soll) => {
    expect(kinds(html)).toEqual(soll);
  });

  it("kein <form> oder unbekannte ID -> null", () => {
    const html = `<!DOCTYPE html><html><body><div data-pagesmith-id="ps-cccccc"></div></body></html>`;
    expect(formTargetCheck(html, "ps-cccccc")).toBeNull();
    expect(formTargetCheck(html, "ps-zzzzzz")).toBeNull();
  });
});

// ===========================================================================
// Die Riegel im Editor — formTargetDocumentProblem.
// ===========================================================================
describe("formTargetDocumentProblem — die Riegel vor Veroeffentlichen und Export", () => {
  const OWN = ["lvh.me", "publayer.net"];
  it("tauglich -> null; ohne Ziel -> null auch bei unbekannter Sprache", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-cccccc")], OWN, "de")).toBeNull();
    expect(formTargetDocumentProblem(PAGE, [track("ps-cccccc", "L")], OWN, "unknown")).toBeNull();
  });
  it("ungueltiger Wert -> invalid", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-cccccc", "http://x.example")], OWN, "de")).toBe("invalid");
  });
  it("nachtraeglich ein Radio ohne Namen -> ineligible", () => {
    const html = PAGE.replace('<input type="text" name="name">', '<input type="text" name="name"><input type="radio">');
    expect(formTargetDocumentProblem(html, [target("ps-cccccc")], OWN, "de")).toBe("ineligible");
  });
  it("J7: nachtraeglich unbenanntes Feld -> names (seit 13-1c benennbar, aber die Liste weicht ab)", () => {
    const html = PAGE.replace('<input type="text" name="name">', '<input type="text">');
    expect(formTargetDocumentProblem(html, [target("ps-cccccc")], OWN, "de")).toBe("names");
  });
  it("J7 / P13-48: ein Ziel OHNE Liste -> names, auch wenn die Felder passen", () => {
    expect(
      formTargetDocumentProblem(PAGE, [target("ps-cccccc", ENDPOINT, THANKS, null)], OWN, "de")
    ).toBe("names");
  });
  it("Reihenfolge: ineligible schlaegt names", () => {
    const html = PAGE.replace('<input type="text" name="name">', '<input type="radio">');
    expect(formTargetDocumentProblem(html, [target("ps-cccccc")], OWN, "de")).toBe("ineligible");
  });
  it("A4 (Scheibe 13.6-1): ein Absende-Knopf mit formenctype oder formaction sperrt Veroeffentlichen und Export (ineligible)", () => {
    // Rot, wenn die Angebotsregel den Riegel nicht erreicht.
    for (const attr of ['formenctype="text/plain"', 'formaction="/x"']) {
      const html = PAGE.replace('name="go" value="ja"', `name="go" value="ja" ${attr}`);
      expect(html).not.toBe(PAGE);
      expect(formTargetDocumentProblem(html, [target("ps-cccccc")], OWN, "de")).toBe("ineligible");
    }
  });
  it("unbekannte Sprache bei einem Ziel -> language", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-cccccc")], OWN, "unknown")).toBe("language");
  });
  it("verwaistes Ziel zaehlt nicht", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-weg000", "http://x")], OWN, "unknown")).toBeNull();
  });
});

// ===========================================================================
// SCHEIBE 13-1c — AUTOMATISCHE BENENNUNG DER FORMULARFELDER. Der Massstab sind die
// Invarianten J1–J9 und die Setzungen P13-43 bis P13-59 im Zuschnitt Scheibe 13-1c der
// Phase 13 (Archiv docs/claude-history/phase-13-formular-ziel.md).
// Die ERWARTETEN Namen sind aus den Setzungen geschrieben, nicht aus dem Code abgelesen.
// ===========================================================================

const formDoc = (inner: string, after = "", formAttrs = "") =>
  `<!DOCTYPE html><html><head></head><body><form data-pagesmith-id="ps-cccccc" ${formAttrs}>${inner}</form>${after}</body></html>`;

function formOf(html: string, id = "ps-cccccc"): HTMLFormElement {
  const d = new DOMParser().parseFromString(html, "text/html");
  const f = d.querySelector(`[data-pagesmith-id="${id}"]`);
  if (!f || f.tagName !== "FORM") throw new Error(`kein <form> ${id}`);
  return f as HTMLFormElement;
}

// Die Namen, unter denen die Felder eines Formulars im AUSGELIEFERTEN Text stehen — gelesen
// am Attribut, in Dokument-Reihenfolge, ohne noscript-Inhalt. Ein eigener, schlichter Leser:
// NICHT deriveFormFieldNames, die hier geprueft wird.
function namesInOutput(output: string, id = "ps-cccccc"): string[] {
  return Array.from(formOf(output, id).elements)
    .filter((el) => !el.closest("noscript") && el.hasAttribute("name"))
    .map((el) => el.getAttribute("name") as string);
}

function exportOf(
  html: string,
  mappings: Mapping[],
  mode: "export" | "preview" | "edit" = "export"
): string {
  return generateFunctional(html, mappings, mode, {
    metaPixelId: PIXEL,
    trackingKey: TK,
    capiProxyUrl: PROXY,
    formTargetLanguage: "de",
  });
}

describe("13-1c — die Kurzform (Setzung P13-51)", () => {
  const ZERLEGT = `Mu${String.fromCharCode(0x308)}ller`; // Vokal plus kombinierendes Trema
  it.each([
    ["E-Mail *", "e_mail"],
    ["Straße & Hausnr.", "strasse_hausnr"],
    ["Größe", "groesse"],
    ["ÄRGER Über", "aerger_ueber"],
    [ZERLEGT, "mueller"],
    ["  __x__  ", "x"],
    ["Vor-Name", "vor_name"],
    ["!!!", ""],
    ["a".repeat(50), "a".repeat(40)],
    [`${"b".repeat(39)} c`, "b".repeat(39)],
  ])("%s -> %s", (roh, soll) => {
    expect(shortFieldName(roh)).toBe(soll);
  });
});

describe("13-1c — die Quellen (Setzung P13-44) und die Label-Falle (Vermerk P13-50)", () => {
  it("Reihenfolge id · Beschriftung · aria-label · Platzhalter · Feldtyp; die Beschriftung ohne den Text enthaltener Felder", () => {
    // Rot, wenn eine Quelle fehlt, die Reihenfolge kippt oder "Land DE" statt "land" entsteht.
    const html = formDoc(
      '<label for="i1">Vorname</label><input id="i1">' +
        "<label>Land <select><option>DE</option></select></label>" +
        '<input aria-label="Telefon (mobil)" placeholder="0171">' +
        '<input placeholder="Deine Stadt">' +
        '<input type="tel">' +
        '<input id="!!!" placeholder="Rest">'
    );
    expect(deriveFormFieldNames(formOf(html)).fields).toEqual([
      { name: "i1", source: "id" },
      { name: "land", source: "label" },
      { name: "telefon_mobil", source: "aria-label" },
      { name: "deine_stadt", source: "placeholder" },
      { name: "tel", source: "type" },
      { name: "rest", source: "placeholder" },
    ]);
  });

  it("aria-labelledby ist KEINE Quelle (Setzung P13-52)", () => {
    const html = formDoc('<span id="t">Telefon</span><input type="tel" aria-labelledby="t">');
    expect(deriveFormFieldNames(formOf(html)).fields).toEqual([{ name: "tel", source: "type" }]);
  });

  it("F5 (P13-55): benannte Absende-Knoepfe gehoeren in die Liste, ein Bild-Knopf als .x/.y; type=button nicht", () => {
    const html = formDoc(
      '<input name="a"><button name="go">S</button><input type="image" name="img" src="x.png"><button type="button" name="nie">B</button><input type="hidden" name="quelle">'
    );
    expect(deriveFormFieldNames(formOf(html)).names).toEqual(["a", "go", "img.x", "img.y", "quelle"]);
  });
});

describe("13-1c — J3: ein vorhandener Name wird nie ueberschrieben", () => {
  it("J3: Namen mit Gross/Klein und Leerzeichen am Rand bleiben zeichengleich; ein gleichlautender abgeleiteter weicht aus", () => {
    // Rot, wenn die Erzeugung ein benanntes Feld anfasst.
    const html = formDoc('<input name="E-Mail Adresse " id="a1"><input name="vorname"><input id="vorname">');
    const out = exportOf(html, [target("ps-cccccc")]);
    expect(namesInOutput(out)).toEqual(["E-Mail Adresse ", "vorname", "vorname_2"]);
  });
});

describe("13-1c — J6: eindeutig und nie auf einem vorhandenen Namen", () => {
  it("J6: gleiche Beschriftung zaehlt hoch; ein abgeleiteter Name trifft keinen vorhandenen, auch keinen spaeteren", () => {
    // Rot ohne den Kollisionszaehler.
    const html = formDoc(
      '<label>Telefon <input></label><label>Telefon <input></label><input id="email"><input name="email">'
    );
    const names = deriveFormFieldNames(formOf(html)).fields.map((f) => f.name);
    expect(names).toEqual(["telefon", "telefon_2", "email_2", "email"]);
    expect(new Set(names).size).toBe(names.length);
  });

  it("J6: auch mit Suffix hoechstens FIELD_NAME_MAX Zeichen", () => {
    const lang = "x".repeat(60);
    const html = formDoc(`<input placeholder="${lang}"><input placeholder="${lang}">`);
    const names = deriveFormFieldNames(formOf(html)).fields.map((f) => f.name);
    expect(names).toEqual(["x".repeat(40), `${"x".repeat(38)}_2`]);
    expect(names.every((n) => n.length <= FIELD_NAME_MAX)).toBe(true);
  });
});

describe("13-1c — F4: noscript", () => {
  it("F4 (P13-54): ein Feld mit noscript-Vorfahren fehlt in Liste und Anzeige und bekommt keinen Namen", () => {
    // Rot, wenn noscript-Felder benannt oder gelistet werden.
    const html = formDoc('<input id="a"><noscript><input id="ns"><input name="nsname"></noscript>');
    // VORBEDINGUNG: Die Testumgebung parst den noscript-Inhalt als ELEMENTE, die zum Formular
    // gehoeren (wie DOMParser im Browser, Vermerk P13-50) — sonst truege die Fixture den
    // Gegenstand gar nicht, und der Test waere trivial gruen.
    expect(Array.from(formOf(html).elements).map((e) => e.getAttribute("id") ?? e.getAttribute("name"))).toEqual([
      "a",
      "ns",
      "nsname",
    ]);
    const check = formTargetCheck(html, "ps-cccccc")!;
    expect(check.fieldNames).toEqual(["a"]);
    const out = exportOf(html, [target("ps-cccccc", ENDPOINT, THANKS, ["a"])]);
    expect(out).toContain('id="a" name="a"');
    expect(out).toContain('<input id="ns">');
  });
});

describe("13-1c — J4 und F3 in der Erzeugung", () => {
  it("J4/F3: ein Radio ohne Namen und ein Leerraum-Name bleiben im erzeugten Text unberuehrt", () => {
    const html = formDoc('<input type="radio" id="r1"><input name="   " id="leer"><input id="ok">');
    const out = exportOf(html, [target("ps-cccccc")]);
    expect(out).toContain('<input type="radio" id="r1">');
    expect(out).toContain('<input name="   " id="leer">');
    // Positivkontrolle: das benennbare Feld daneben IST benannt.
    expect(out).toContain('<input id="ok" name="ok">');
  });
});

// J2 — DIE VIER DIFFERENZ-NACHWEISE W1', W2', T1, T9 KOENNEN DAS NICHT FANGEN: Ihre Sonden
// tragen KEIN einziges Eingabefeld (gezaehlt in der Planrunde: input, select, textarea je 0).
// Diese Tests sind deshalb die Waechter von J2 (Mutation M-J2).
describe("13-1c — J2: ohne Formular-Ziel keine Namen", () => {
  const ZWEI = `<!DOCTYPE html><html><head></head><body><form data-pagesmith-id="ps-cccccc"><input id="vorname"></form><form data-pagesmith-id="ps-eeeeee"><input id="zweit"><textarea></textarea></form></body></html>`;

  it("J2a: ein Projekt ohne Formular-Ziel — kein Name im erzeugten Text", () => {
    const out = exportOf(ZWEI, [track("ps-cccccc", "Lead"), track("ps-eeeeee", "Lead")]);
    expect(namesInOutput(out, "ps-cccccc")).toEqual([]);
    expect(namesInOutput(out, "ps-eeeeee")).toEqual([]);
  });

  it("J2b: ein Formular OHNE Ziel neben einem MIT Ziel bleibt unbenannt (Positivkontrolle: das mit Ziel ist benannt)", () => {
    const out = exportOf(ZWEI, [target("ps-cccccc", ENDPOINT, THANKS, ["vorname"])]);
    expect(namesInOutput(out, "ps-cccccc")).toEqual(["vorname"]);
    expect(namesInOutput(out, "ps-eeeeee")).toEqual([]);
  });

  it("J2c: Vorschau und Edit schreiben keine Namen, auch mit Ziel", () => {
    for (const mode of ["preview", "edit"] as const) {
      const out = exportOf(ZWEI, [target("ps-cccccc", ENDPOINT, THANKS, ["vorname"])], mode);
      expect(namesInOutput(out, "ps-cccccc")).toEqual([]);
    }
  });
});

// N-Diff: der Text MIT Ziel ist der Text OHNE Ziel plus GENAU R1, B1, D1 (wie F6b) und die
// Namens-Einsetzungen — die fuenf Schritte der Dauerregel "WO EINE BYTE-GLEICHHEIT BEWUSST
// AUFGEGEBEN WIRD …". Die Seite traegt nur die Quellen id und Platzhalter (keine Beschriftung).
describe("13-1c — N-Diff: Nachher = Vorher plus R1, B1, D1 und genau die Namen", () => {
  it("N-Diff′: zwei Namens-Einsetzungen, die Ersetzung X1 und die Einsetzung A1 (Scheibe 13.6-1), danach zeichengleich", () => {
    const SEITE = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" action="#unten"><input type="email" name="email"><input type="text" id="vorname"><input placeholder="Deine Stadt"><button data-pagesmith-id="ps-dddddd" type="submit" name="go" value="ja">Absenden</button></form></body></html>`;
    // (1) Vorher-Wert: dieselbe Seite und Optionen, OHNE das Ziel.
    const vorher = exportOf(SEITE, [track("ps-cccccc", "Lead")]);
    expect(count(vorher, X1_VORHER)).toBe(1);
    // (2) Nachher-Wert: an derselben Form, mit demselben Treiber.
    const nachher = exportOf(SEITE, [
      track("ps-cccccc", "Lead"),
      target("ps-cccccc", ENDPOINT, THANKS, ["deine_stadt", "email", "go", "vorname"]),
    ]);
    const R1 = buildFormTargetRuntime("de", false);
    const EINSETZUNGEN = [' name="vorname"', ' name="deine_stadt"'];
    // (3) je genau einmal — erwartet: R1, B1, D1 je 1, die zwei Namen je 1; X1 und A1 je 1
    // (in ohneRueckfall).
    for (const teil of [R1, B1, D1, ...EINSETZUNGEN]) expect(count(nachher, teil)).toBe(1);
    // (4) entfernen bzw. zuruecknehmen -> zeichengleich zum Vorher-Wert.
    let ohneEinsetzungen = nachher;
    for (const teil of [R1, B1, D1, ...EINSETZUNGEN])
      ohneEinsetzungen = ohneEinsetzungen.split(teil).join("");
    const rest = ohneRueckfall(ohneEinsetzungen);
    expect(bytes(rest)).toBe(bytes(vorher));
    expect(sha(rest)).toBe(sha(vorher));
    // (5) POSITIVKONTROLLEN: ohne die Namens-Entfernung besteht ein Unterschied — und ohne die
    // Ruecknahme von X1 und A1 ebenfalls.
    const ohneNamen = ohneRueckfall(nachher.split(R1).join("").split(B1).join("").split(D1).join(""));
    expect(sha(ohneNamen)).not.toBe(sha(vorher));
    expect(sha(ohneEinsetzungen)).not.toBe(sha(vorher));
  });
});

describe("13-1c — F6c (Setzung P13-58): die Liste geht nicht hinaus", () => {
  it("F6c: ein Ziel MIT Liste an einer voll benannten Seite erzeugt denselben Text wie ein Ziel aus 13-1 ohne Liste", () => {
    // Rot, wenn fieldNames in den Datenblock gelangt.
    const alt = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc", ENDPOINT, THANKS, null)]);
    const neu = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]);
    expect(sha(neu)).toBe(sha(alt));
    expect(neu).not.toContain("fieldNames");
  });

  it("F6c-b: die Schluessel-Reihenfolge eines Mappings aus der Datenbank (jsonb) bleibt erhalten", () => {
    // jsonb ordnet Schluessel nach Laenge: type, config, elementId; im config endpoint,
    // thanksUrl, fieldNames. Rot, wenn das Weglassen das Mapping in anderer Reihenfolge neu baut.
    const ausDb = (config: Record<string, unknown>) =>
      ({ type: "formTarget", config, elementId: "ps-cccccc" }) as unknown as Mapping;
    const alt = exportDoc([ausDb({ endpoint: ENDPOINT, thanksUrl: THANKS })]);
    const neu = exportDoc([ausDb({ endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: PAGE_NAMES })]);
    expect(sha(neu)).toBe(sha(alt));
    expect(neu).toContain(
      `{"type":"formTarget","config":{"endpoint":"${ENDPOINT}","thanksUrl":"${THANKS}"},"elementId":"ps-cccccc"}`
    );
  });
});

// J5 — DIESELBE FUNKTION IM EDITOR UND IN DER ERZEUGUNG. Die Editor-Seite laeuft ueber die
// ECHTE Funktion, die im Editor previewHtml erzeugt: annotateAndDetect (lib/detect.ts;
// gerufen in CodeImporter.tsx im Memo, das previewHtml liefert) — keine Nachbildung. Die
// Erwartung ist aus den Setzungen P13-44, P13-51, P13-54, P13-55 geschrieben.
// Ein Text-Override auf dem <p> IN einer Beschriftung faengt eine Benennung NACH dem
// Text-Bake (Setzung P13-59).
describe("13-1c — J5: Editor-Anzeige und Erzeugung liefern dieselben Namen", () => {
  it("J5: previewHtml aus annotateAndDetect und die Erzeugung — dieselben Namen in derselben Zuordnung", () => {
    const CODE =
      '<!DOCTYPE html><html><head></head><body><form data-pagesmith-id="ps-cccccc">' +
      '<input type="email" name="email">' +
      '<input type="text" id="Vor-Name">' +
      '<label><p data-pagesmith-id="ps-pppppp">Straße</p><input type="text"></label>' +
      "<label>Land <select><option>DE</option></select></label>" +
      '<input type="tel" aria-label="Telefon (mobil)">' +
      '<input placeholder="Ihre Nachricht">' +
      "<textarea></textarea>" +
      '<input type="checkbox">' +
      '<input type="text" id="email">' +
      `<input type="hidden" name="quelle" value="${KOEDER}">` +
      '<button type="submit" name="go">Senden</button>' +
      '<noscript><input id="ns"></noscript>' +
      "</form></body></html>";
    const SOLL = [
      "email",
      "vor_name",
      "strasse",
      "land",
      "telefon_mobil",
      "ihre_nachricht",
      "textarea",
      "checkbox",
      "email_2",
      "quelle",
      "go",
    ];
    // Editor-Seite.
    const previewHtml = annotateAndDetect(CODE).html;
    const check = formTargetCheck(previewHtml, "ps-cccccc")!;
    expect(check.fields.map((f) => f.name)).toEqual(SOLL);
    // Erzeugungs-Seite, MIT Text-Override im Label.
    const out = exportOf(CODE, [
      { elementId: "ps-pppppp", type: "text", config: { content: "Anders" } },
      target("ps-cccccc", ENDPOINT, THANKS, [...SOLL].sort()),
    ]);
    expect(namesInOutput(out)).toEqual(SOLL);
    // Vorbedingung, dass der Override wirklich im Label steht — sonst prueft der Satz oben
    // die Reihenfolge nicht.
    expect(out).toContain(">Anders</p>");
    // J8: nur Namen, nie Werte.
    expect(check.fieldNames.join(" ")).not.toContain(KOEDER);
    // Keine Abweichung zwischen Anzeige und bestaetigter Liste.
    expect(
      formTargetNameDrift(previewHtml, [target("ps-cccccc", ENDPOINT, THANKS, [...SOLL].sort())])
    ).toEqual([]);
  });
});

describe("13-1c — J8 und die Form der gespeicherten Liste", () => {
  it.each([
    ["Liste tauglich", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: ["a"] }, null],
    ["Liste leer ist tauglich", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: [] }, null],
    ["Liste fehlt", { endpoint: ENDPOINT, thanksUrl: THANKS }, "missing"],
    ["kein Array", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: "a" }, "shape"],
    ["null", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: null }, "shape"],
    ["Zahl darin", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: ["a", 1] }, "shape"],
    ["Leerraum darin", { endpoint: ENDPOINT, thanksUrl: THANKS, fieldNames: [" "] }, "shape"],
    ["kein Objekt", "x", "shape"],
  ])("%s", (_name, config, soll) => {
    expect(formTargetNamesProblem(config)).toBe(soll);
  });
});

describe("13-1c — J7: Abweichung und Meldung", () => {
  it("J7: formTargetNameDrift nennt alt und neu; ohne Liste ist alt null; passende Liste -> leer (Positivkontrolle)", () => {
    const html = PAGE.replace('<input type="text" name="name">', '<input type="text" id="vorname">');
    expect(formTargetNameDrift(html, [target("ps-cccccc")])).toEqual([
      { elementId: "ps-cccccc", saved: ["email", "go", "name"], current: ["email", "go", "vorname"] },
    ]);
    expect(formTargetNameDrift(PAGE, [target("ps-cccccc", ENDPOINT, THANKS, null)])).toEqual([
      { elementId: "ps-cccccc", saved: null, current: ["email", "go", "name"] },
    ]);
    expect(formTargetNameDrift(PAGE, [target("ps-cccccc")])).toEqual([]);
  });

  it("J7 / P13-57: die Meldung traegt die vollen Listen alt -> neu samt Variante; beim Export ohne den Veroeffentlichen-Schluss", () => {
    const drifts = [
      { elementId: "ps-a", saved: ["email"], current: ["email", "vorname"], variant: "B" as const },
      { elementId: "ps-b", saved: null, current: ["email"], variant: null },
    ];
    const pub = formTargetNamesMessage(drifts, "publish");
    expect(pub).toContain("Variante B: alt: email → neu: email, vorname");
    expect(pub).toContain("alt: (keine bestätigt) → neu: email");
    expect(pub).toContain("Es wurde nichts veröffentlicht.");
    const exp = formTargetNamesMessage(drifts, "export");
    expect(exp.startsWith("Export gesperrt: ")).toBe(true);
    expect(exp).not.toContain("Es wurde nichts veröffentlicht.");
  });

  it("F12': eine geaenderte Liste ist dirty; gleiche nicht; fehlend gegen vorhanden ist dirty", () => {
    // Rot ohne den Listen-Term in configEqual.
    const a = [target("ps-cccccc")];
    expect(mappingsEqual(a, [target("ps-cccccc")])).toBe(true);
    expect(mappingsEqual(a, [target("ps-cccccc", ENDPOINT, THANKS, ["email"])])).toBe(false);
    expect(mappingsEqual(a, [target("ps-cccccc", ENDPOINT, THANKS, null)])).toBe(false);
  });
});

// ===========================================================================
// PHASE 13.6, SCHEIBE 13.6-1 — B-2: DER NATIVE RUECKFALL. Massstab: Setzungen P13.6-32 und
// P13.6-36 im Zuschnitt Scheibe 13.6-1 der Phase 13.6. Die ERWARTETEN Attribute sind aus den
// Setzungen geschrieben: action = eingetragene Adresse, method="post",
// enctype="application/x-www-form-urlencoded", accept-charset="UTF-8"; target unangetastet.
// Ob der Browser dann wirklich an die Adresse schickt, ist eine LIVE-Achse (jsdom schickt
// nichts ab).
// ===========================================================================

function formAttrs(output: string, id = "ps-cccccc"): Record<string, string | null> {
  const f = formOf(output, id);
  return {
    action: f.getAttribute("action"),
    method: f.getAttribute("method"),
    enctype: f.getAttribute("enctype"),
    "accept-charset": f.getAttribute("accept-charset"),
    target: f.getAttribute("target"),
  };
}

const RUECKFALL = {
  action: ENDPOINT,
  method: "post",
  enctype: "application/x-www-form-urlencoded",
  "accept-charset": "UTF-8",
};

describe("13.6-1 — B-2: das Formular mit Ziel traegt die Adresse und die Versandform", () => {
  it("B2a: action, method, enctype und accept-charset stehen am <form> mit Ziel", () => {
    // Rot ohne das Setzen (M1: action, M2: method).
    expect(formAttrs(exportDoc([target("ps-cccccc")]))).toEqual({ ...RUECKFALL, target: null });
  });

  it("B2b: vorhandene Werte des Betreibers werden ersetzt, target bleibt", () => {
    // Rot, wenn nur fehlende Attribute gesetzt werden oder target angefasst wird.
    const html = formDoc(
      '<input name="a">',
      "",
      'action="/senden" method="get" enctype="text/plain" accept-charset="ISO-8859-1" target="_blank"'
    );
    // Vorbedingung: die Werte des Betreibers stehen wirklich in der Sonde.
    expect(formAttrs(html)).toEqual({
      action: "/senden",
      method: "get",
      enctype: "text/plain",
      "accept-charset": "ISO-8859-1",
      target: "_blank",
    });
    expect(formAttrs(exportOf(html, [target("ps-cccccc", ENDPOINT, THANKS, ["a"])]))).toEqual({
      ...RUECKFALL,
      target: "_blank",
    });
  });

  it("B2c: Vorschau und Edit schreiben die Attribute nicht, auch mit Ziel (Positivkontrolle: Export)", () => {
    // Rot, wenn die Modus-Sperre fehlt.
    const m = [target("ps-cccccc")];
    for (const mode of ["preview", "edit"] as const) {
      expect(formAttrs(exportOf(PAGE, m, mode))).toEqual({
        action: "#unten",
        method: null,
        enctype: null,
        "accept-charset": null,
        target: null,
      });
    }
    expect(formAttrs(exportOf(PAGE, m, "export"))).toEqual({ ...RUECKFALL, target: null });
  });

  it("B2d: die Laufzeit liest die Attribute nicht — mit Skript schickt der Versand weiter per fetch, nie nativ", () => {
    // Rot, wenn das Setzen den Skript-Pfad veraendert (preventDefault, ein fetch an die
    // Adresse aus dem Datenblock).
    mount(exportDoc([target("ps-cccccc")]));
    fill();
    const ev = submit();
    expect(ev.defaultPrevented).toBe(true);
    expect(fetchCalls).toHaveLength(1);
    expect(fetchCalls[0].url).toBe(ENDPOINT);
  });
});

// B2-J — OHNE ZIEL BLEIBT ALLES BYTE-GLEICH. Die vier Differenz-Nachweise W1', W2', T1, T9
// sehen diese Stelle NICHT: ihre Sonden tragen kein <form>-Element (gezaehlt in der Planrunde
// der Scheibe 13.6-1: jedes "<form" dort steht in einem abgeschriebenen Kommentar). Diese
// beiden Tests sind die Waechter (Mutation M-I5').
describe("13.6-1 — B2-J: Formulare und Projekte OHNE Ziel bleiben unberuehrt", () => {
  it("B2-J1: ein Formular OHNE Ziel neben einem MIT Ziel behaelt seine Attribute (Positivkontrolle: das mit Ziel traegt sie)", () => {
    const out = exportDoc([target("ps-cccccc"), track("ps-eeeeee", "Contact")]);
    expect(formAttrs(out, "ps-eeeeee")).toEqual({
      action: "#zwei",
      method: null,
      enctype: null,
      "accept-charset": null,
      target: null,
    });
    expect(formAttrs(out)).toEqual({ ...RUECKFALL, target: null });
  });

  // DER VORHER-WERT IST EINE KONSTANTE, erhoben VOR dem ersten Eingriff der Scheibe 13.6-1:
  // generateFunctional im Modus "export" an Commit 5b1ddc7 (Sonde ausserhalb des Repos, CC,
  // 2026-09-29) — 16574 Bytes, sha256 unten. Er wird NIE neu berechnet: Wird dieser Test rot,
  // ist der CODE falsch, nicht die Konstante.
  const B2J2_HTML = `<!DOCTYPE html><html><head></head><body><form data-pagesmith-id="ps-aaaaaa" action="#kontakt" method="get" enctype="text/plain"><input type="email" name="email"><input id="vorname"><button type="submit" data-pagesmith-id="ps-bbbbbb">Senden</button></form><form data-pagesmith-id="ps-cccccc"><input name="q"></form><a href="https://alt.example/" data-pagesmith-id="ps-dddddd">Link</a></body></html>`;
  const B2J2_MAPPINGS: Mapping[] = [
    { elementId: "ps-aaaaaa", type: "track", config: { event: "Lead" } },
    { elementId: "ps-cccccc", type: "track", config: { event: "Search" } },
    { elementId: "ps-dddddd", type: "redirect", config: { url: "https://neu.example/", openInNewTab: false } },
  ];
  const B2J2_OPTIONS = {
    metaPixelId: "123456789012345",
    trackingKey: "tk-public-123",
    capiProxyUrl: "https://app.pagesmith.io/api/e",
    formTargetLanguage: "de" as const,
  };
  const B2J2_BYTES = 16574;
  const B2J2_SHA = "6eeede3eef1459c50a7c6815cf4861a97b2c2897ddb4e311b89625ad304e5598";

  it("B2-J2: ein Projekt ohne jedes Ziel, mit zwei Formularen, ist byte-gleich zum Vorher-Wert", () => {
    const out = generateFunctional(B2J2_HTML, B2J2_MAPPINGS, "export", B2J2_OPTIONS);
    expect(bytes(out)).toBe(B2J2_BYTES);
    expect(sha(out)).toBe(B2J2_SHA);
  });

  it("B2-J2 (Positivkontrolle): dieselbe Sonde MIT Ziel weicht ab — die Sonde traegt den Gegenstand", () => {
    // Ohne sie waere B2-J2 auch dann gruen, wenn die Sonde kein Formular erreichte.
    const out = generateFunctional(
      B2J2_HTML,
      [...B2J2_MAPPINGS, target("ps-aaaaaa", ENDPOINT, THANKS, ["email", "vorname"])],
      "export",
      B2J2_OPTIONS
    );
    expect(sha(out)).not.toBe(B2J2_SHA);
    expect(formAttrs(out, "ps-aaaaaa")).toEqual({ ...RUECKFALL, target: null });
  });
});

// ===========================================================================
// 13.6-4 — DER RELAY-WEG IM SEITENSKRIPT UND DER DATENSPARMODUS (Phase 13.6, Scheibe 13.6-4;
// Standdatei jener Phase: Setzungen P13.6-61 bis P13.6-64, P13.6-66 und P13.6-67). Die Tests
// RT-1 bis RT-13 aus der Planrunde.
// ===========================================================================

// ---RT-FIXTURE-BEGIN---
const RT_PAGE = `<!DOCTYPE html><html><head><title>RT</title></head><body><form data-pagesmith-id="ps-rraaaa" action="#a"><input type="email" name="email"><input type="text" name="name"><button type="submit" name="go" value="ja">Senden</button></form><form data-pagesmith-id="ps-rrbbbb" action="#b"><input type="text" name="x"><button type="submit" name="los" value="1">Los</button></form><a href="#" data-pagesmith-id="ps-rrcccc">Mehr</a></body></html>`;
const RT_MAKE = "https://hook.eu2.make.com/rtsondeabcdefghijklmnopqrstuv";
const RT_FOREIGN = "https://hooks.example.org/rt-ziel";
const RT_THANKS = "https://danke.example/rt";
const RT_BASE: Mapping[] = [
  { elementId: "ps-rraaaa", type: "track", config: { event: "Contact" } },
  { elementId: "ps-rrbbbb", type: "track", config: { event: "Lead" } },
  { elementId: "ps-rrcccc", type: "track", config: { event: "ViewContent" } },
];
const rtTarget = (elementId: string, endpoint: string, fieldNames: string[]): Mapping => ({
  elementId,
  type: "formTarget",
  config: { endpoint, thanksUrl: RT_THANKS, fieldNames },
});
const RT_OPTIONS = {
  metaPixelId: "123456789012345",
  trackingKey: "tk-rt-sonde",
  capiProxyUrl: "/api/e",
  formTargetLanguage: "de" as const,
};
// ---RT-FIXTURE-END---

// DIE VORHER-WERTE SIND KONSTANTEN, erhoben VOR dem ersten Eingriff der Scheibe 13.6-4 am
// Commit 69cb057 (Sonde ausserhalb des Repos, jiti mit jsdom 29.1.1, CC, 2026-09-30; der
// Fixture-Block oben ist zeichengleich der Sonde, sha256 des Blocks 4e7b4350…). Sie werden NIE
// neu berechnet: Wird einer dieser Tests rot, ist der CODE falsch, nicht die Konstante.
const RT_V9 = { bytes: 16483, sha: "077868a02ba8b82d49b2e750766952d94aa914a315385a186d157a5debb5aeec" };
const RT_V10A = { bytes: 21528, sha: "7ec78e7f8c541d4c3143cacfb00b6fe74cf317ccd7e39b8afc66493d48914469" };
const RT_V10B = { bytes: 21572, sha: "ff5290f2aa73bef1a1197be466f42a8eb8c5c356a75f6e9f0ae787e3f216027a" };
const RT_NAMES = ["email", "go", "name"];

function rtOut(mappings: Mapping[], extra: Record<string, unknown> = {}, mode: "export" | "preview" | "edit" = "export"): string {
  return generateFunctional(RT_PAGE, mappings, mode, { ...RT_OPTIONS, ...extra });
}

describe("13.6-4 — die Vorher-Werte in dieser Testumgebung", () => {
  it("RT-V: ohne Merkmal liefert der Erzeuger genau die Vorher-Werte der Sonde", () => {
    const v9 = rtOut(RT_BASE);
    const v10a = rtOut([...RT_BASE, rtTarget("ps-rraaaa", RT_FOREIGN, RT_NAMES)]);
    const v10b = rtOut([...RT_BASE, rtTarget("ps-rraaaa", RT_MAKE, RT_NAMES)]);
    expect([bytes(v9), sha(v9)]).toEqual([RT_V9.bytes, RT_V9.sha]);
    expect([bytes(v10a), sha(v10a)]).toEqual([RT_V10A.bytes, RT_V10A.sha]);
    expect([bytes(v10b), sha(v10b)]).toEqual([RT_V10B.bytes, RT_V10B.sha]);
  });
});

const RT_FORM_A = '[data-pagesmith-id="ps-rraaaa"]';
const RT_FORM_B = '[data-pagesmith-id="ps-rrbbbb"]';
const RT_RELAY_URL = "/api/f?f=ps-rraaaa";
const rtMake = () => [...RT_BASE, rtTarget("ps-rraaaa", RT_MAKE, RT_NAMES)];
function rtMakeDs(): Mapping[] {
  return [
    ...RT_BASE,
    { elementId: "ps-rraaaa", type: "formTarget", config: { endpoint: RT_MAKE, thanksUrl: RT_THANKS, fieldNames: RT_NAMES, dataSaver: true } },
  ];
}
const rtResponse = (status: number, type = "basic") => ({ status, type });

// DIE EINSETZUNG R2 — GETIPPT aus dem Plan (Vermerk P13.6-65, Punkt (9), und Setzung P13.6-67
// der Phase 13.6), NICHT aus dem Code. Sie steht hinter dem Timer von __psFormTargetSend.
const R2 = [
  "",
  "    // RELAY-WEG (Phase 13.6, Scheibe 13.6-4): zugestellt nur bei Status 204.",
  "    if (cfg.relay === true) {",
  "      var rq;",
  "      try {",
  '        rq = fetch("/api/f" + "?f=" + encodeURIComponent(f.getAttribute("data-pagesmith-id") || ""), {',
  '          method: "POST",',
  '          mode: "same-origin",',
  '          credentials: "same-origin",',
  '          redirect: "error",',
  '          referrerPolicy: "no-referrer",',
  "          keepalive: true,",
  "          body: body",
  "        });",
  "      } catch (err) {",
  "        settled = true;",
  "        clearTimeout(timer);",
  "        fail();",
  "        return;",
  "      }",
  "      rq.then(",
  "        function (r) {",
  "          settled = true;",
  "          clearTimeout(timer);",
  "          if (r && r.status === 204) {",
  "            try {",
  "              onReached();",
  "            } catch (err) {}",
  "            window.location.href = cfg.thanksUrl;",
  "          } else {",
  "            fail();",
  "          }",
  "        },",
  "        function () {",
  "          settled = true;",
  "          clearTimeout(timer);",
  "          fail();",
  "        }",
  "      );",
  "      return;",
  "    }",
].join("\n");
// DIE MARKE IM DATENBLOCK (Setzung P13.6-66, Q2): hinten an der Konfiguration des Relay-Ziels.
const D2 = ',"relay":true';

describe("13.6-4 — RT-1 bis RT-4: der Relay-Weg im Seitenskript", () => {
  it("RT-1: zugestellt (204) -> Danke-Seite und genau ein Track, keine Meldung", async () => {
    // Rot, wenn 204 nicht navigiert, der Track fehlt oder der Aufruf an die Zieladresse geht.
    mount(rtOut(rtMake(), { hosted: true }));
    fill();
    expect(submit(RT_FORM_A).defaultPrevented).toBe(true);
    expect(fetchCalls.map((c) => c.url)).toEqual([RT_RELAY_URL]);
    pending[0].resolve(rtResponse(204));
    await flush();
    expect(hrefValue).toBe(RT_THANKS);
    expect(fbqTracks().map((c) => c[1])).toEqual(["Contact"]);
    expect(noticeOn()).toBe(false);
  });

  it("RT-2: die Optionen des Aufrufs sind genau die der Entscheidung; Werte nur im Rumpf", () => {
    // Rot, wenn referrerPolicy fehlt (M5), eine Option abweicht oder ein Wert in die Adresse
    // gelangt (R2).
    mount(rtOut(rtMake(), { hosted: true }));
    fill();
    submit(RT_FORM_A);
    expect(fetchCalls).toHaveLength(1);
    const { url, init } = fetchCalls[0];
    const { body, ...rest } = init;
    expect(rest).toEqual({
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      redirect: "error",
      referrerPolicy: "no-referrer",
      keepalive: true,
    });
    expect(body).toBeInstanceOf(URLSearchParams);
    expect(String(body)).toContain(KOEDER);
    expect(url).not.toContain(KOEDER);
    expect(url).toBe(RT_RELAY_URL);
  });

  it.each([
    ["502 (das Relay: nicht zugestellt)", rtResponse(502)],
    ["405 (keine Route)", rtResponse(405)],
    ["200 (kein 204)", rtResponse(200)],
    ["opaque (Typ statt Status)", rtResponse(0, "opaque")],
  ])("RT-3: %s -> keine Navigation, Meldung, kein Track; ein zweiter Versuch sendet erneut", async (_n, res) => {
    // Rot, wenn etwas anderes als Status 204 als zugestellt gilt (M4).
    mount(rtOut(rtMake(), { hosted: true }));
    fill();
    submit(RT_FORM_A);
    pending[0].resolve(res);
    await flush();
    expect(hrefValue).toBe("");
    expect(noticeOn()).toBe(true);
    expect(fbqTracks()).toHaveLength(0);
    submit(RT_FORM_A);
    expect(fetchCalls).toHaveLength(2);
  });

  it("RT-3: Ablehnung (Netzfehler oder Umleitung bei redirect error) -> Meldung, kein Track", async () => {
    mount(rtOut(rtMake(), { hosted: true }));
    fill();
    submit(RT_FORM_A);
    pending[0].reject(new TypeError("Failed to fetch"));
    await flush();
    expect(hrefValue).toBe("");
    expect(noticeOn()).toBe(true);
    expect(fbqTracks()).toHaveLength(0);
  });

  it("RT-4: Zeitlimit -> Meldung und Sperre frei; ein spaetes 204 navigiert noch, genau ein Track", async () => {
    // Rot, wenn der Relay-Weg den Timer nicht teilt oder ein spaetes 204 verwirft.
    mount(rtOut(rtMake(), { hosted: true }));
    fill();
    submit(RT_FORM_A);
    await vi.advanceTimersByTimeAsync(FORM_TARGET_TIMEOUT_MS);
    expect(noticeOn()).toBe(true);
    expect(fbqTracks()).toHaveLength(0);
    pending[0].resolve(rtResponse(204));
    await flush();
    expect(hrefValue).toBe(RT_THANKS);
    expect(fbqTracks().map((c) => c[1])).toEqual(["Contact"]);
  });
});

describe("13.6-4 — RT-5 bis RT-8, RT-12, RT-13: wann der Relay-Weg entsteht", () => {
  const noRelay = (out: string) => {
    expect(out).not.toContain("/api/f");
    expect(out).not.toContain('"relay"');
    expect(out).not.toContain("RELAY-WEG");
  };

  it("RT-5: Datensparmodus -> direkter Versand wie heute (no-cors an die Adresse)", () => {
    // Rot, wenn die Engine dataSaver nicht prueft (M2).
    const out = rtOut(rtMakeDs(), { hosted: true });
    noRelay(out);
    expect(out).not.toContain("dataSaver");
    mount(out);
    fill();
    submit(RT_FORM_A);
    expect(fetchCalls.map((c) => [c.url, c.init.mode])).toEqual([[RT_MAKE, "no-cors"]]);
  });

  it("RT-6: eine Adresse ausserhalb der Host-Liste -> direkter Versand", () => {
    const out = rtOut([...RT_BASE, rtTarget("ps-rraaaa", RT_FOREIGN, RT_NAMES)], { hosted: true });
    noRelay(out);
    mount(out);
    fill();
    submit(RT_FORM_A);
    expect(fetchCalls.map((c) => [c.url, c.init.mode])).toEqual([[RT_FOREIGN, "no-cors"]]);
  });

  it("RT-7: ein Export (ohne Merkmal, auch hosted false) mit einer Adresse der Liste -> direkter Versand", () => {
    // Rot, wenn die Engine das Merkmal nicht fragt (M1b).
    for (const extra of [{}, { hosted: false }]) {
      const out = rtOut(rtMake(), extra);
      noRelay(out);
    }
    mount(rtOut(rtMake()));
    fill();
    submit(RT_FORM_A);
    expect(fetchCalls.map((c) => [c.url, c.init.mode])).toEqual([[RT_MAKE, "no-cors"]]);
  });

  it("RT-7b: ein Schluessel relay aus der Datenbank reist nie mit; die Marke setzt allein die Engine", () => {
    const stray = (extra: Record<string, unknown>): Mapping[] => [
      ...RT_BASE,
      {
        elementId: "ps-rraaaa",
        type: "formTarget",
        config: { endpoint: RT_MAKE, thanksUrl: RT_THANKS, ...extra } as Mapping["config"] & { endpoint: string; thanksUrl: string },
      } as Mapping,
    ];
    noRelay(rtOut(stray({ relay: true })));
    noRelay(rtOut(stray({ relay: true, dataSaver: true }), { hosted: true }));
    // Positivkontrolle: mit Merkmal und ohne Datensparmodus entsteht die Marke genau einmal.
    const out = rtOut(stray({ relay: "x" }), { hosted: true });
    expect(count(out, D2)).toBe(1);
  });

  it("RT-8: gemischte Seite — das Relay-Ziel geht an /api/f, das andere direkt", () => {
    const out = rtOut(
      [...rtMake(), rtTarget("ps-rrbbbb", RT_FOREIGN, ["los", "x"])],
      { hosted: true }
    );
    mount(out);
    fill();
    submit(RT_FORM_A);
    submit(RT_FORM_B);
    expect(fetchCalls.map((c) => [c.url, c.init.mode])).toEqual([
      [RT_RELAY_URL, "same-origin"],
      [RT_FOREIGN, "no-cors"],
    ]);
  });

  it("RT-12: Vorschau und Edit tragen auch mit Merkmal weder Relay-Weg noch Marke", () => {
    for (const mode of ["preview", "edit"] as const) noRelay(rtOut(rtMake(), { hosted: true }, mode));
    // Positivkontrolle am Export mit Merkmal.
    expect(rtOut(rtMake(), { hosted: true })).toContain("/api/f");
  });

  it("RT-13: die Laufzeit-Wache gilt auch im Relay-Weg — kaputte Danke-Seite, kein Aufruf", () => {
    const m: Mapping[] = [
      ...RT_BASE,
      { elementId: "ps-rraaaa", type: "formTarget", config: { endpoint: RT_MAKE, thanksUrl: "ftp://x.example/" } },
    ];
    const out = rtOut(m, { hosted: true });
    expect(count(out, D2)).toBe(1);
    mount(out);
    fill();
    submit(RT_FORM_A);
    expect(fetchCalls).toHaveLength(0);
    expect(noticeOn()).toBe(true);
  });
});

describe("13.6-4 — RT-9 bis RT-11: die Byte-Nachweise", () => {
  it("RT-9 (i): ohne Formular-Ziel ist der Text mit und ohne Merkmal der Vorher-Wert", () => {
    for (const extra of [{ hosted: true }, { hosted: false }, {}]) {
      const out = rtOut(RT_BASE, extra);
      expect([bytes(out), sha(out)]).toEqual([RT_V9.bytes, RT_V9.sha]);
    }
  });

  it("RT-10a (ii-a): eine Adresse ausserhalb der Liste, mit Merkmal -> der Vorher-Wert", () => {
    const out = rtOut([...RT_BASE, rtTarget("ps-rraaaa", RT_FOREIGN, RT_NAMES)], { hosted: true });
    expect([bytes(out), sha(out)]).toEqual([RT_V10A.bytes, RT_V10A.sha]);
  });

  it("RT-10b (ii-b): Make im Datensparmodus, mit Merkmal -> der Vorher-Wert desselben Ziels ohne das Feld", () => {
    // Rot, wenn dataSaver in den Datenblock gelangt oder der Relay-Weg entsteht (M2).
    const out = rtOut(rtMakeDs(), { hosted: true });
    expect([bytes(out), sha(out)]).toEqual([RT_V10B.bytes, RT_V10B.sha]);
  });

  it("RT-10 (Positivkontrolle): dasselbe Make-Ziel OHNE Datensparmodus weicht ab", () => {
    expect(sha(rtOut(rtMake(), { hosted: true }))).not.toBe(RT_V10B.sha);
  });

  it("RT-11: Differenz-Nachweis — Relay-Seite = Vorher + GENAU R2 und D2", () => {
    // Die fuenf Schritte der Dauerregel "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …":
    // (1) Vorher-Wert RT_V10B (Konstante), (2) Nachher mit demselben Treiber, (3) jede
    // Einsetzung genau einmal, (4) entfernt = Vorher in Bytes und sha256, (5) Positivkontrolle.
    const nachher = rtOut(rtMake(), { hosted: true });
    expect(count(nachher, R2)).toBe(1);
    expect(count(nachher, D2)).toBe(1);
    const zurueck = nachher.split(R2).join("").split(D2).join("");
    expect([bytes(zurueck), sha(zurueck)]).toEqual([RT_V10B.bytes, RT_V10B.sha]);
    expect(sha(nachher)).not.toBe(RT_V10B.sha);
  });
});

describe("13.6-4 — formTargetProblem-DS und F12-DS", () => {
  const base = { endpoint: RT_MAKE, thanksUrl: RT_THANKS };

  it("formTargetProblem-DS: fehlend und true gehen; jeder andere Wert ist shape", () => {
    expect(formTargetProblem(base, ownFormTargetDomains())).toBeNull();
    expect(formTargetProblem({ ...base, dataSaver: true }, ownFormTargetDomains())).toBeNull();
    for (const v of [false, "ja", 1, null, {}]) {
      expect(formTargetProblem({ ...base, dataSaver: v }, ownFormTargetDomains())).toBe("shape");
    }
  });

  it("F12-DS: ein reiner Wechsel des Datensparmodus ist dirty; gleich gegen gleich nicht", () => {
    // Rot, wenn configEqual den Term nicht traegt (M6).
    const aus: Mapping = { elementId: "ps-rraaaa", type: "formTarget", config: { ...base } };
    const an: Mapping = { elementId: "ps-rraaaa", type: "formTarget", config: { ...base, dataSaver: true } };
    expect(mappingsEqual([aus], [an])).toBe(false);
    expect(mappingsEqual([an], [aus])).toBe(false);
    expect(mappingsEqual([an], [{ ...an, config: { ...base, dataSaver: true } }])).toBe(true);
  });
});
