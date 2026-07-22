import { describe, expect, it } from "vitest";
import {
  buildPageViewScript,
  injectPageViewEmitter,
} from "./pageview-emitter";
import { PAGEVIEW_EVENT } from "./events";

const MARKER = 'id="__ps_pve"';

describe("injectPageViewEmitter", () => {
  it("(a) fuegt das Script VOR dem </body> ein (nach dem Body-Inhalt)", () => {
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk-1");
    // Script sitzt zwischen dem Body-Inhalt und dem schliessenden Tag.
    expect(out.indexOf("x")).toBeLessThan(out.indexOf(MARKER));
    expect(out.indexOf(MARKER)).toBeLessThan(out.indexOf("</body>"));
    // published_content bleibt gueltiges HTML: der </body>-Abschluss bleibt erhalten.
    expect(out).toContain("</body></html>");
  });

  it("(a') findet </body> case-insensitiv (</BODY>)", () => {
    const out = injectPageViewEmitter("<HTML><BODY>x</BODY></HTML>", "tk-1");
    expect(out.indexOf(MARKER)).toBeGreaterThan(-1);
    expect(out.indexOf(MARKER)).toBeLessThan(out.indexOf("</BODY>"));
  });

  it("(b) haengt bei fehlendem </body> ans Ende an", () => {
    const out = injectPageViewEmitter("<div>x</div>", "tk-1");
    expect(out).toContain("<div>x</div>");
    // Script am Dokumentende (feuert trotzdem).
    expect(out.trimEnd().endsWith("</script>")).toBe(true);
    expect(out.indexOf("<div>x</div>")).toBeLessThan(out.indexOf(MARKER));
  });

  it("(c) baeckt den UEBERGEBENEN (Spalten-)Key via JSON.stringify ein", () => {
    const out = injectPageViewEmitter("<body></body>", "col-key");
    expect(out).toContain(JSON.stringify("col-key")); // "col-key"
  });

  it("(d) nutzt die events.ts-Konstante fuer event (kein handgetipptes Literal) + first-party /api/e + keepalive", () => {
    const out = injectPageViewEmitter("<body></body>", "tk-1");
    // event kommt aus der geteilten Konstante -> kein Drift zu isForwardable.
    expect(out).toContain(JSON.stringify(PAGEVIEW_EVENT));
    // Relativer first-party-Endpunkt (wie der Conversion-Beacon, 7b) + keepalive-Fallback.
    expect(out).toContain("sendBeacon('/api/e'");
    expect(out).toContain("keepalive: true");
    // ID-Guard vorhanden.
    expect(out).toContain("window.__ps_pv");
  });

  it("(e) kommt DANEBEN: CAPI-Wiring bleibt erhalten, Emitter kommt zusaetzlich", () => {
    // Simuliert ein CAPI-Projekt-HTML mit Meta-Wiring-Marker.
    const input = "<html><body><h1>x</h1><script>__psMetaFire(a.config);</script></body></html>";
    const out = injectPageViewEmitter(input, "tk-1");
    // Der CAPI-Marker ueberlebt (Emitter ersetzt nichts).
    expect(out).toContain("__psMetaFire(a.config);");
    // Der Emitter ist zusaetzlich da.
    expect(out).toContain(MARKER);
    // Rein additiv: laenger als das Original, kompletter Body-Inhalt als Teilstring.
    expect(out.length).toBeGreaterThan(input.length);
    expect(out).toContain("<h1>x</h1>");
  });
});

describe("buildPageViewScript", () => {
  it("ist serialisierungssicher: kein literales </script> oder </body> im Emitter", () => {
    const script = buildPageViewScript("tk-1");
    // Genau EIN schliessendes </script> (das Tag selbst), keins im JS-Body.
    expect(script.match(/<\/script>/g)?.length).toBe(1);
    expect(script.endsWith("</script>")).toBe(true);
    expect(script.toLowerCase()).not.toContain("</body>");
  });
});
