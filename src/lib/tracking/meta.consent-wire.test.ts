import { describe, expect, it } from "vitest";
import {
  buildCapiBeaconStatement,
  buildMetaRuntime,
  buildPixelConfirmStatement,
} from "./meta";
import { META_CONSENT_TARGET } from "./consent";
import { CONSENT_WIRE_FIELD } from "./consent-wire";

// ===========================================================================
// DER ERZEUGER DES EINWILLIGUNGS-SIGNALS (Phase 11, fuenfte Scheibe).
//
// REINE TEXT-TESTS auf dem erzeugten Laufzeit-JS. Die WIRKUNG des Feldes prueft
// capi/ingest.consent.test.ts, die REGEL tracking/consent-wire.test.ts. Hier steht
// nur: Steht es drin, steht es NUR dort, und kostet es keinen zweiten Hook-Aufruf.
//
// WARUM TEXT UND NICHT WIRKUNG: Der Beacon-Rumpf referenziert `__c`, `eid` und
// `cfg` aus seinem Einbettungs-Kontext — er ist fuer sich allein nicht
// ausfuehrbar. Die ausfuehrende Pruefung des Gesamt-Dokuments liegt in
// generate.test.ts und bleibt unangetastet.
// ===========================================================================

const PIXEL = "1234567890";
const KEY = "tk-public-123";
const URL = "https://app.pagesmith.io/api/e";

describe("Der Conversion-Beacon traegt das Signal", () => {
  it("Feldname und Ziel-Schluessel stehen im Body — beide aus den Konstanten", () => {
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain(`"${CONSENT_WIRE_FIELD}": { "${META_CONSENT_TARGET}": __c === true }`);
  });

  it("der Wert ist die GEHOBENE Variable, nicht ein zweiter Hook-Aufruf", () => {
    // ROT DURCH: `__psConsent("meta") === true` direkt im Body. Das waere ein
    // ZWEITER Schnappschuss desselben Urteils — er koennte der Entscheidung
    // widersprechen, die den Beacon durchgelassen hat.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).not.toContain("__psConsent");
  });

  it("`=== true` statt truthy — die Strenge der Regel gespiegelt", () => {
    // ROT DURCH M2 auf der ERZEUGER-Seite: `__c` roh statt `__c === true` schickte
    // bei einem truthy-Wert etwas anderes als einen Boolean in den Draht.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain("__c === true");
  });

  it("die Bestandsfelder stehen unveraendert daneben", () => {
    // Das Signal kommt DANEBEN. Ein verlorenes Bestandsfeld waere eine stille
    // Regression auf dem gerade beruehrten Pfad.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain("eventID: eid");
    expect(beacon).toContain("event: cfg.event");
    expect(beacon).toContain("eventSourceUrl: location.href");
    expect(beacon).toContain("isCustom: !!cfg.isCustom");
    expect(beacon).toContain("__b._fbp = __fbp");
  });

  it("ohne trackingKey/proxyUrl entsteht KEIN Body und damit auch kein Signal", () => {
    expect(buildCapiBeaconStatement("", URL)).not.toContain(CONSENT_WIRE_FIELD);
    expect(buildCapiBeaconStatement(KEY, "")).not.toContain(CONSENT_WIRE_FIELD);
  });
});

describe("Der Confirm-Beacon bleibt SCHMAL", () => {
  it("er traegt das Signal NICHT", () => {
    // ENTSCHEIDUNG MIT GRUND, kein Vergessen: Er forwardet nie, und sein Urteil
    // waere strukturell VERALTET — er erbt es und sendet im gepufferten Fall erst
    // nach dem Laden des Fremdscripts. Ein veraltetes Urteil im Draht ist
    // schlechter als keines, weil der Server ihm glaubte.
    const confirm = buildPixelConfirmStatement(KEY, URL);
    expect(confirm).not.toContain(CONSENT_WIRE_FIELD);
    expect(confirm).toContain("obs:");
  });
});

describe("Die Zahl der Hook-Aufrufe bleibt, wie sie war", () => {
  it("GENAU ZWEI Aufrufstellen von __psConsent( im ganzen Laufzeit-Text", () => {
    // DER ZAEHLENDE WAECHTER (Invariante 4: kein zusaetzlicher Hook-Aufruf).
    // Zwei Stellen, und nur diese zwei: __psMetaInit und __psMetaFire. Ein dritter
    // Aufruf — etwa im Beacon-Rumpf — waere ein zusaetzlicher Schnappschuss auf dem
    // Klick-Pfad. `toContain` faenge das NICHT; nur eine Zaehlung faengt es.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(/__psConsent\(/g)?.length).toBe(2);
  });

  it("und GENAU ZWEI Existenzpruefungen daneben", () => {
    // Die Pruefungen sind KEINE Aufrufe (sie stehen ohne Klammer). Getrennt
    // gezaehlt, damit ein entfernter Guard nicht von der Aufruf-Zahl verdeckt wird.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(/typeof __psConsent !== "function"/g)?.length).toBe(2);
  });

  it("das Signal wird EINMAL gesetzt, nicht je Konsument erneut", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(new RegExp(`"${CONSENT_WIRE_FIELD}":`, "g"))?.length).toBe(1);
  });
});

describe("Die gehobene Variable steht VOR ihrem Leser", () => {
  it("__c wird deklariert, bevor der Beacon-Rumpf sie liest", () => {
    // ROT DURCH: eine Umstellung, die den Beacon vor die Deklaration schoebe — im
    // Browser waere das ein `undefined` im Draht statt eines Booleans.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    const decl = rt.indexOf("var __c = __psConsent(");
    const use = rt.indexOf("__c === true");
    expect(decl).toBeGreaterThan(-1);
    expect(use).toBeGreaterThan(decl);
  });

  it("das Gate bleibt VOR dem Init und damit vor dem Script-Load", () => {
    // Die Verschaerfung aus Phase 6 haengt daran: vor Consent kein Request an
    // connect.facebook.net. Die gehobene Variable darf daran nichts verschieben.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.indexOf("if (!__c) return;")).toBeLessThan(rt.indexOf("__psMetaInit()) return;"));
  });
});
