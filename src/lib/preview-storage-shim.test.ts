import { describe, expect, it } from "vitest";
import {
  PREVIEW_STORAGE_SHIM_ID,
  buildPreviewStorageShimScript,
  withPreviewStorageShim,
} from "./preview-storage-shim";

// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NIE AUS DEM CODE: die Kennung
// und die Marker unten sind GETIPPT. Importiert werden nur die Bau-Funktionen —
// so faengt ein Test eine Umbenennung, statt sie mitzumachen.
const ID = "__ps_sbx";

/** Der nackte Skript-Rumpf, ohne Huelle — per DOMParser geloest, nicht per Regex. */
function shimBody(): string {
  const tag = buildPreviewStorageShimScript();
  const doc = new DOMParser().parseFromString(tag, "text/html");
  const el = doc.querySelector("script");
  if (!el) throw new Error("Kein script-Element im Riegel-Block");
  return el.textContent ?? "";
}

/**
 * Fuehrt den ECHTEN Riegel-Text gegen ATTRAPPEN aus (Konvention: detect.test.ts,
 * new Function("window","document", …)). Die Attrappen sind noetig, weil der
 * Riegel Object.defineProperty(window, …) ruft — der echte jsdom-Zustand darf
 * davon nicht beruehrt werden.
 */
function runShim(): { win: Record<string, unknown>; doc: Record<string, unknown> } {
  const win: Record<string, unknown> = {};
  const doc: Record<string, unknown> = {};
  new Function("window", "document", shimBody())(win, doc);
  return { win, doc };
}

type Storeish = {
  getItem(k: string): string | null;
  setItem(k: string, v: unknown): void;
  removeItem(k: string): void;
  clear(): void;
  key(i: number): string | null;
  length: number;
  [k: string]: unknown;
};

function storeOf(name: "localStorage" | "sessionStorage"): Storeish {
  return runShim().win[name] as Storeish;
}

describe("withPreviewStorageShim – Einsetz-Position", () => {
  const NORMAL = '<!DOCTYPE html><html><head><title>t</title></head><body>x</body></html>';

  it("Normalfall: der Riegel ist der ERSTE Knoten im head, hinter <head> und vor <title>", () => {
    // WIRD ROT, WENN die Einsetzung ans Ende, in den body oder vor den Doctype rutscht.
    const out = withPreviewStorageShim(NORMAL);
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf("<head>"));
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("<title>"));
    expect(out.startsWith("<!DOCTYPE html>")).toBe(true);
  });

  it("head mit Attributen: das Start-Tag bleibt UNVERSEHRT, der Riegel steht dahinter", () => {
    // WIRD ROT, WENN das Start-Tag zerschnitten wird oder die Einsetzung DAVOR
    // landet — davor zoege der Parser einen impliziten head hoch, und das echte
    // <head …> gaelte samt seiner Attribute als ignoriertes Doppel-Tag.
    const src = '<!DOCTYPE html><html><head lang="de" data-x><title>t</title></head><body></body></html>';
    const out = withPreviewStorageShim(src);
    expect(out).toContain('<head lang="de" data-x>');
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf('<head lang="de" data-x>'));
    // DIE ZWEITE HAELFTE IST TRAGEND: "hinter <head>" allein erfuellt auch ein
    // Anhaengen am DATEIENDE. Erst die Obergrenze nagelt die Position fest.
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("<title>"));
  });

  it('N1: ein ">" IM Attributwert beendet das Start-Tag NICHT', () => {
    // WIRD ROT, WENN endOfStartTag auf indexOf(">") zurueckfaellt: dann landete
    // der Riegel mitten im Attributwert und zerstoerte das Dokument.
    // GEMESSEN (CC, 2026-09-17, Chromium 153): der Serialisierer DIESES Browsers
    // escaped ">" in Attributwerten zu "&gt;", der Fall entsteht dort also gar
    // nicht. Verlassen wird sich darauf NICHT — der Editor laeuft im Browser des
    // Betreibers, und der catch-Pfad von generateFunctional liefert ROHES HTML.
    const src = '<!DOCTYPE html><html><head data-x="a>b"><title>t</title></head><body></body></html>';
    const out = withPreviewStorageShim(src);
    expect(out).toContain('<head data-x="a>b">');
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf('<head data-x="a>b">'));
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("<title>"));
  });

  it('N1-Gegenstueck: ein ">" im Attributwert des <html>-Tags verschiebt den Anker nicht', () => {
    const src = '<!DOCTYPE html><html data-y="p>q"><head><title>t</title></head><body></body></html>';
    const out = withPreviewStorageShim(src);
    expect(out).toContain('<html data-y="p>q">');
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf("<head>"));
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("<title>"));
  });

  it("HEAD in Grossschreibung wird getroffen", () => {
    // WIRD ROT, WENN das /i am Muster fehlt.
    const out = withPreviewStorageShim("<HTML><HEAD></HEAD><BODY></BODY></HTML>");
    expect(out).toContain(ID);
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf("<HEAD>"));
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("</HEAD>"));
  });

  it("<header> im body wird NICHT getroffen (der Lookahead)", () => {
    // WIRD ROT, WENN /<head(?=[\s/>])/ zu /<head/ wird: dann landete der Riegel
    // mitten im <header>-Start-Tag. DER WICHTIGSTE LAUF DIESER DATEI.
    const src = "<html><body><header class=\"x\">h</header></body></html>";
    expect(withPreviewStorageShim(src)).toBe(src);
  });

  it("fehlender Doctype: eingesetzt, aber es wird KEINER ergaenzt", () => {
    const out = withPreviewStorageShim("<html><head></head><body></body></html>");
    expect(out).toContain(ID);
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("</head>"));
    expect(out.startsWith("<html>")).toBe(true);
    expect(out).not.toContain("<!DOCTYPE");
  });

  it("Kommentar vor <html>: bleibt an Position 0, der Riegel sitzt im head", () => {
    const out = withPreviewStorageShim("<!-- vorn --><html><head></head><body></body></html>");
    expect(out.startsWith("<!-- vorn -->")).toBe(true);
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf("<head>"));
    expect(out.indexOf(ID)).toBeLessThan(out.indexOf("</head>"));
  });

  it('ein "<head " in einem Kommentar VOR <html> verschiebt den Anker nicht', () => {
    const src = "<!-- <head foo> --><html><head></head><body></body></html>";
    const out = withPreviewStorageShim(src);
    expect(out.indexOf(ID)).toBeGreaterThan(out.indexOf("<head></head>".slice(0, 6)));
    expect(out.startsWith("<!-- <head foo> --><html><head>")).toBe(true);
  });

  it("kein head vorhanden: Eingabe kommt BYTE-GLEICH zurueck", () => {
    const src = "<html><body>nur body</body></html>";
    expect(withPreviewStorageShim(src)).toBe(src);
  });

  it("Fragment ohne html/head: byte-gleich", () => {
    const src = "<div>x</div>";
    expect(withPreviewStorageShim(src)).toBe(src);
  });

  it("leerer String bleibt leer", () => {
    expect(withPreviewStorageShim("")).toBe("");
  });

  it("nur der Varianten-Marker (erster Render bei leerem Code): byte-gleich", () => {
    // GEMESSEN am Code: bei leerem previewHtml gibt editPreviewHtml "" + marker
    // zurueck — beim ersten Render ist editHtml exakt dieser Kommentar.
    const src = "<!--__ps_variant:a-->";
    expect(withPreviewStorageShim(src)).toBe(src);
  });

  it("unabgeschlossenes Start-Tag: byte-gleich statt zerstoert", () => {
    const src = '<html><head data-x="offen';
    expect(withPreviewStorageShim(src)).toBe(src);
  });

  it("DETERMINISMUS: zwei Aufrufe mit gleicher Eingabe liefern denselben String", () => {
    // WIRD ROT, WENN der Riegel eine gewuerfelte Kennung oder einen Zeitstempel
    // traegt.
    // ER IST DER EINZIGE WAECHTER DIESER ACHSE — GEMESSEN (CC, 2026-09-17):
    // Unter derselben Mutation bleibt der Bestandstest "Text-Mapping-Aenderung
    // bei unveraendertem Code erzeugt KEIN neues srcDoc" GRUEN, weil das
    // editHtml-Memo bei unveraenderten Deps nicht neu rechnet. Wer diesen Lauf
    // als redundant entfernt, nimmt die einzige Abdeckung mit
    // (docs/immer-beachten.md, MUTATIONSPROBEN …, Lektion (f)).
    expect(withPreviewStorageShim(NORMAL)).toBe(withPreviewStorageShim(NORMAL));
    expect(buildPreviewStorageShimScript()).toBe(buildPreviewStorageShimScript());
  });

  it("der Block traegt die Kennung und kein literales Skript-Schluss-Tag im Rumpf", () => {
    const tag = buildPreviewStorageShimScript();
    expect(tag).toContain(`id="${ID}"`);
    expect(PREVIEW_STORAGE_SHIM_ID).toBe(ID);
    expect(shimBody()).not.toContain("</" + "script>");
  });
});

describe("Riegel – Wirkung (der echte Text, gegen Attrappen ausgefuehrt)", () => {
  it("NEGATIVKONTROLLE: ohne Riegel wirft der Zugriff, mit Riegel nicht mehr", () => {
    // Muster uebernommen von consent-store.test.ts, Lauf R8: jsdom ist NICHT
    // sandboxed und wirft den SecurityError nicht — der Wurf wird deshalb
    // NACHGESTELLT. Der Deskriptor wird im finally zurueckgestellt.
    const desc = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("SecurityError");
      },
    });
    try {
      expect(() => window.localStorage.getItem("k")).toThrow();

      // Derselbe Text, der im Rahmen laeuft — hier auf das ECHTE window.
      new Function(shimBody())();
      expect(() => window.localStorage.getItem("k")).not.toThrow();
      window.localStorage.setItem("k", "v");
      expect(window.localStorage.getItem("k")).toBe("v");
    } finally {
      if (desc) Object.defineProperty(window, "localStorage", desc);
    }
  });

  it("die sechs Storage-Glieder: setItem/getItem/removeItem/clear/key/length", () => {
    const s = storeOf("localStorage");
    expect(s.length).toBe(0);
    s.setItem("a", "1");
    s.setItem("b", "2");
    expect(s.getItem("a")).toBe("1");
    // length ist LEBENDIG, nicht eingefroren — sonst liefe eine for-Schleife
    // ueber key(i) null Runden.
    expect(s.length).toBe(2);
    expect(s.key(0)).toBe("a");
    expect(s.key(1)).toBe("b");
    expect(s.key(9)).toBeNull();
    s.removeItem("a");
    expect(s.getItem("a")).toBeNull();
    expect(s.length).toBe(1);
    s.clear();
    expect(s.length).toBe(0);
  });

  it("Werte werden zu Strings gezwungen, Unbekanntes ist null", () => {
    const s = storeOf("localStorage");
    s.setItem("n", 1 as unknown as string);
    expect(s.getItem("n")).toBe("1");
    expect(s.getItem("fehlt")).toBeNull();
    // Object.create(null) statt {}: sonst kaeme hier eine Funktion.
    expect(s.getItem("toString")).toBeNull();
  });

  it("Eigenschafts-Zugriff: schreiben und lesen, sichtbar fuer getItem", () => {
    const s = storeOf("localStorage");
    s.foo = "x";
    expect(s.getItem("foo")).toBe("x");
    expect(s.foo).toBe("x");
    expect(s.length).toBe(1);
    s.setItem("bar", "y");
    expect(s.bar).toBe("y");
    delete s.foo;
    expect(s.getItem("foo")).toBeNull();
  });

  it("N2: Object.keys, for..in, 'in' und JSON.stringify werfen nicht und liefern die Paare", () => {
    // WIRD ROT, WENN die getOwnPropertyDescriptor-Trap fehlt oder nicht
    // configurable:true / enumerable:true liefert — dann wirft Object.keys einen
    // Proxy-Invarianten-TypeError, und DAS waere schlimmer als gar kein Riegel.
    const s = storeOf("localStorage");
    s.setItem("a", "1");
    s.setItem("b", "2");
    expect(() => Object.keys(s)).not.toThrow();
    expect(Object.keys(s)).toEqual(["a", "b"]);
    expect("a" in s).toBe(true);
    expect("fehlt" in s).toBe(false);
    expect("getItem" in s).toBe(true);
    const gesehen: string[] = [];
    for (const k in s) gesehen.push(k);
    expect(gesehen).toEqual(["a", "b"]);
    expect(() => JSON.stringify(s)).not.toThrow();
    expect(JSON.parse(JSON.stringify(s))).toEqual({ a: "1", b: "2" });
  });

  it("local und session sind GETRENNTE Ablagen", () => {
    // WIRD ROT, WENN beide dieselbe makeStore()-Instanz bekommen.
    const { win } = runShim();
    const ls = win.localStorage as Storeish;
    const ss = win.sessionStorage as Storeish;
    ls.setItem("k", "L");
    ss.setItem("k", "S");
    expect(ls.getItem("k")).toBe("L");
    expect(ss.getItem("k")).toBe("S");
  });

  it("cookie: setzen, mehrere lesen, Attribute erscheinen NICHT im Lesen", () => {
    const { doc } = runShim();
    const d = doc as { cookie: string };
    d.cookie = "a=1; path=/; max-age=3600";
    d.cookie = "b=2";
    expect(d.cookie).toBe("a=1; b=2");
    d.cookie = "a=9";
    expect(d.cookie).toBe("a=9; b=2");
  });

  it("cookie: Loeschen per max-age=0 UND per expires in der Vergangenheit", () => {
    const { doc } = runShim();
    const d = doc as { cookie: string };
    d.cookie = "a=1";
    d.cookie = "b=2";
    d.cookie = "a=; max-age=0";
    expect(d.cookie).toBe("b=2");
    d.cookie = "b=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    expect(d.cookie).toBe("");
  });

  it("cookie: ein expires in der ZUKUNFT loescht nicht", () => {
    // WIRD ROT, WENN der Vergleich die Richtung wechselt.
    const { doc } = runShim();
    const d = doc as { cookie: string };
    d.cookie = "a=1";
    d.cookie = "a=2; expires=Tue, 01 Jan 2999 00:00:00 GMT";
    expect(d.cookie).toBe("a=2");
  });

  it("T5: der Riegel wirft in keinem Zweig", () => {
    const { win, doc } = runShim();
    const s = win.localStorage as Storeish;
    const d = doc as { cookie: string };
    expect(() => (s.setItem as unknown as () => void)()).not.toThrow();
    expect(() => {
      d.cookie = "";
    }).not.toThrow();
    expect(() => {
      d.cookie = "=";
    }).not.toThrow();
    expect(() => {
      d.cookie = "kein-gleich";
    }).not.toThrow();
    expect(() => {
      d.cookie = "=nurwert";
    }).not.toThrow();
    expect(() => {
      d.cookie = "x=1; expires=voellig-kaputt";
    }).not.toThrow();
    expect(d.cookie).toBe("x=1");
  });
});
