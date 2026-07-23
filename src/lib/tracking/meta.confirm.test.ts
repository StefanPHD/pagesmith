import { describe, expect, it } from "vitest";
import {
  buildCapiBeaconStatement,
  buildMetaRuntime,
  buildPixelConfirmStatement,
} from "./meta";
import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";

const PIXEL = "PIXEL-123";
const KEY = "tk-abc";
const URL = "/api/e";

describe("Adblocker-Erkennung: Handler am Script-Element (Scheibe A)", () => {
  // Der eigentliche Erkennungs-Mechanismus: DOM-Ebene statt Meta-Interna. window.fbq ist
  // als Check wertlos (der Stub steht auch bei geblocktem Script).
  it("haengt load/error-Handler an das fbevents-Script-Element", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);

    expect(rt).toContain("t.onload");
    expect(rt).toContain("t.onerror");
    expect(rt).toContain('__psPixelResolve("ok")');
    expect(rt).toContain('__psPixelResolve("blocked")');
  });

  // REIHENFOLGE ist die eigentliche Zusicherung: haengen die Handler erst NACH
  // insertBefore, verpasst ein schneller (gecachter) Load das load-Event -> der Zustand
  // bliebe 'pending' und die Bestaetigung verfiele.
  it("Handler stehen VOR insertBefore (sonst Race auf schnelle Loads)", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);

    const onload = rt.indexOf("t.onload");
    const onerror = rt.indexOf("t.onerror");
    // Anker ist der AUFRUF, nicht das blosse Wort: "insertBefore" kommt auch im
    // erklaerenden Kommentar darueber vor und wuerde den Vergleich verfaelschen.
    const insert = rt.indexOf("parentNode.insertBefore");

    expect(onload).toBeGreaterThan(-1);
    expect(insert).toBeGreaterThan(-1);
    expect(onload).toBeLessThan(insert);
    expect(onerror).toBeLessThan(insert);
    // ... und nach dem Setzen der src (sonst haengen sie an einem Element ohne Ziel).
    expect(rt.indexOf("t.src = v")).toBeLessThan(onload);
  });

  // FREMD-PIXEL: der bestehende Frueh-Ausstieg erzeugt KEIN Script-Element -> ohne diesen
  // Zweig bliebe der Zustand ewig 'pending' und JEDE Conversion gaelte als Verlust.
  it("Frueh-Ausstieg bei fremdem Pixel loest zu 'foreign' auf und warnt", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);

    expect(rt).toContain('__psPixelResolve("foreign")');
    expect(rt).toContain("console.warn");
    // Der Resolve steht IM Frueh-Ausstieg, also vor dem return.
    const branch = rt.slice(rt.indexOf("if (f.fbq)"));
    expect(branch.indexOf('__psPixelResolve("foreign")')).toBeLessThan(
      branch.indexOf("return;")
    );
  });
});

describe("Zustandsautomat + Nachreichen (Scheibe A)", () => {
  it("baut State, Queue mit Cap und einmaligen Resolve", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);

    expect(rt).toContain('var __psPixelState = "pending"');
    expect(rt).toContain("var __psConfirmQueue = []");
    expect(rt).toContain("var __PS_CONFIRM_CAP = 20");
    // Einmaligkeit: ein zweiter Ausgang darf den ersten nicht ueberschreiben.
    expect(rt).toContain('if (__psPixelState !== "pending") return;');
  });

  it("'ok' reicht den Puffer nach, jeder andere Ausgang verwirft ihn", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    const resolve = rt.slice(
      rt.indexOf("function __psPixelResolve"),
      rt.indexOf("function __psConfirm(")
    );

    // Flush NUR bei 'ok' ...
    expect(resolve).toContain('if (s === "ok")');
    expect(resolve).toContain("__psConfirmSend(__psConfirmQueue[i].id");
    // ... und der Puffer wird in JEDEM Fall geleert (kein Nachsenden nach 'blocked').
    expect(resolve).toContain("__psConfirmQueue.length = 0;");
  });
});

describe("Bestaetigungs-Beacon (Scheibe A)", () => {
  it("feuert mit DERSELBEN eid wie fbq — kein zweiter Generator", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);

    // Der fbq-Aufruf und der Confirm-Aufruf referenzieren dieselbe lokale Variable.
    expect(rt).toContain("fbq(\"track\", cfg.event, params, { eventID: eid })");
    expect(rt).toContain("__psConfirm(eid, cfg.event);");
    // Die eid wird GENAU EINMAL erzeugt (sonst braeche der Verlustraten-Join).
    expect(rt.match(/randomUUID\(\)/g)?.length).toBe(1);
  });

  it("Payload traegt den Marker in `obs` — event bleibt der ECHTE Conversion-Name", () => {
    const stmt = buildPixelConfirmStatement(KEY, URL);

    expect(stmt).toContain(`obs: "${BROWSER_CONFIRM_MARKER}"`);
    expect(stmt).toContain("event: ev");
    expect(stmt).toContain("eventID: eid");
    expect(stmt).toContain(`trackingKey: "${KEY}"`);
    // Der Client sendet NIE den source-Wert selbst.
    expect(stmt).not.toContain("source");
    // BARE Payload: die Bestaetigung wird nie geforwardet, Meta-Felder waeren tote Bytes.
    expect(stmt).not.toContain("value");
    expect(stmt).not.toContain("_fbp");
    expect(stmt).not.toContain("eventSourceUrl");
  });

  it("Zustellung: sendBeacon (text/plain) mit keepalive-fetch als Fallback", () => {
    const stmt = buildPixelConfirmStatement(KEY, URL);

    expect(stmt).toContain("navigator.sendBeacon");
    expect(stmt).toContain('type: "text/plain"');
    expect(stmt).toContain("keepalive: true");
  });

  // GEGENPROBE zur Bau-Zeit-Gatung: ohne Key/URL gibt es nichts zu senden — und KEINEN
  // zweiten fail-loud-Warn (den setzt buildCapiBeaconStatement fuer dieselbe Ursache).
  it("ohne trackingKey/proxyUrl: leerer Sende-Rumpf, kein zweiter Warn", () => {
    expect(buildPixelConfirmStatement("", URL)).toBe("");
    expect(buildPixelConfirmStatement(KEY, "")).toBe("");

    const rt = buildMetaRuntime(PIXEL, "", "");
    expect(rt).not.toContain(BROWSER_CONFIRM_MARKER);
    expect(rt).not.toContain("navigator.sendBeacon");
    // Das Geruest bleibt (EIN Bootstrap-Pfad), nur der Rumpf ist leer.
    expect(rt).toContain("function __psConfirmSend(eid, ev)");
    expect(rt).toContain("t.onload");
  });
});

// REGRESSIONSZAUN um Invariante (iii): der CAPI-Beacon ist der gerade reparierte Pfad.
// Scheibe A haengt DANEBEN, sie editiert ihn nicht.
describe("Invariante (iii): CAPI-Beacon unveraendert", () => {
  it("Beacon-Statement traegt weiter genau seine Bestandsfelder", () => {
    const beacon = buildCapiBeaconStatement(KEY, URL);

    expect(beacon).toContain("eventID: eid");
    expect(beacon).toContain("event: cfg.event");
    expect(beacon).toContain("eventSourceUrl: location.href");
    expect(beacon).toContain("isCustom: !!cfg.isCustom");
    expect(beacon).toContain("__b._fbp = __fbp");
    expect(beacon).toContain('type: "text/plain"');
    // Der Bestaetigungs-Marker gehoert NICHT in den Conversion-Beacon.
    expect(beacon).not.toContain(BROWSER_CONFIRM_MARKER);
  });

  it("fail-loud-Warn bei fehlender proxyUrl bleibt der EINZIGE Warn dieser Ursache", () => {
    const beacon = buildCapiBeaconStatement(KEY, "");
    expect(beacon).toContain("NEXT_PUBLIC_APP_URL nicht gesetzt");

    const rt = buildMetaRuntime(PIXEL, KEY, "");
    // Genau ein Vorkommen — der Confirm-Pfad legt keinen zweiten Warn nach.
    expect(rt.match(/NEXT_PUBLIC_APP_URL nicht gesetzt/g)?.length).toBe(1);
  });
});
