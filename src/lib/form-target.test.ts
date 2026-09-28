import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { generateFunctional } from "./generate";
import {
  FORM_TARGET_NOTICE_HOST_TAG,
  FORM_TARGET_TIMEOUT_MS,
  buildFormTargetRuntime,
  formTargetCheck,
  formTargetDocumentProblem,
  formTargetProblem,
  ownFormTargetDomains,
} from "./form-target";
import { mappingsEqual, type Mapping } from "./mappings";

// ===========================================================================
// FORMULAR-ZIEL (Phase 13, Scheibe 13-1). Die Tests F1–F13 und K1/K3 aus dem Plan der
// Scheibe; der Massstab sind die Invarianten I1–I10 im Zuschnitt 13-1 der Standdatei.
// Was jsdom NICHT zeigen kann (echtes Netz, Werbeblocker, Sichtbarkeit der Meldung,
// Navigation), steht in der Live-Anleitung.
// ===========================================================================

const ENDPOINT = "https://hook.eu2.make.com/abcdefghijklmnopqrstuvwxyz012345";
const THANKS = "https://danke.example/fertig";
const KOEDER = "ZZ-KOEDER-1";
const PIXEL = "123456789012345";
const TK = "tk-public-123";
const PROXY = "https://app.pagesmith.io/api/e";

function target(elementId: string, endpoint = ENDPOINT, thanksUrl = THANKS): Mapping {
  return { elementId, type: "formTarget", config: { endpoint, thanksUrl } };
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

describe("F6b (I5) — Differenz-Nachweis MIT Ziel", () => {
  it("F6b: Nachher = Vorher plus GENAU R1, B1, D1", () => {
    // (1) Vorher-Wert: dieselbe Seite, dieselben Optionen, OHNE das Ziel.
    const vorher = exportDoc([track("ps-cccccc", "Lead")]);
    // (2) Nachher-Wert: an derselben Form, mit demselben Treiber.
    const nachher = exportDoc([track("ps-cccccc", "Lead"), target("ps-cccccc")]);
    // R1 ist der Baustein aus buildFormTargetRuntime — NICHT abgetippt: sein INHALT ist
    // durch F1–F4, K3 und F10 verhaltensgeprueft; dieser Nachweis prueft die STELLE.
    const R1 = buildFormTargetRuntime("de");
    // (3) je genau einmal.
    expect(count(nachher, R1)).toBe(1);
    expect(count(nachher, B1)).toBe(1);
    expect(count(nachher, D1)).toBe(1);
    // (4) entfernen -> zeichengleich zum Vorher-Wert.
    const rest = nachher.split(R1).join("").split(B1).join("").split(D1).join("");
    expect(bytes(rest)).toBe(bytes(vorher));
    expect(sha(rest)).toBe(sha(vorher));
    // (5) POSITIVKONTROLLE: ohne die Entfernung besteht ein Unterschied.
    expect(sha(nachher)).not.toBe(sha(vorher));
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
    expect(out).not.toContain("</script><script>window.__boese");
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
    vi.stubEnv("NEXT_PUBLIC_HOSTING_DOMAIN", " .Publayer.net/ ");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://App.Pagesmith.io/");
    expect(ownFormTargetDomains()).toEqual(["lvh.me", "publayer.net", "app.pagesmith.io"]);
    vi.unstubAllEnvs();
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

  it("K1: unbenannte Felder werden erkennbar genannt — Typ, id oder Platzhalter; auch per form=-Attribut", () => {
    const html = form(
      "",
      '<input name="ok"><input type="email" id="mail"><input placeholder="Dein Name"><textarea></textarea><select id="land"></select>',
      '<input type="tel" form="ps-f">'
    );
    const check = formTargetCheck(html, "ps-cccccc")!;
    expect(check.blocks).toEqual([
      { kind: "unnamed", fields: ["email #mail", 'text "Dein Name"', "textarea", "select #land", "tel"] },
    ]);
  });

  it("K2: ein Inline-onsubmit ist ein Hinweis, KEIN Ausschluss", () => {
    const check = formTargetCheck(form('onsubmit="return false"', '<input name="a">'), "ps-cccccc")!;
    expect(check).toEqual({ blocks: [], inlineScript: true });
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
  it("nachtraeglich unbenanntes Feld -> ineligible", () => {
    const html = PAGE.replace('<input type="text" name="name">', '<input type="text">');
    expect(formTargetDocumentProblem(html, [target("ps-cccccc")], OWN, "de")).toBe("ineligible");
  });
  it("unbekannte Sprache bei einem Ziel -> language", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-cccccc")], OWN, "unknown")).toBe("language");
  });
  it("verwaistes Ziel zaehlt nicht", () => {
    expect(formTargetDocumentProblem(PAGE, [target("ps-weg000", "http://x")], OWN, "unknown")).toBeNull();
  });
});
