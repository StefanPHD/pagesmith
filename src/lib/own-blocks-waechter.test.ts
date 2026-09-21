// DER BYTE-WAECHTER UEBER DEN AUSGELIEFERTEN TEXT (Phase 11.11, Scheibe 11.11d;
// Entscheidung P11.11-22, Punkt (g)).
//
// WAS ER FESTNAGELT: Die Scheibe 11.11d hat an den zwei ERZEUGERN des ausgelieferten
// Textes je EIN Wort geaendert — `export` an MAPPINGS_SCRIPT_ID (lib/generate.ts) und
// an SCRIPT_ID (lib/analytics/pageview-emitter.ts). Ein Export aendert kein Verhalten;
// dieser Waechter belegt, dass der erzeugte Text davon byte-gleich unberuehrt ist.
//
// DIE SOLLWERTE SIND VOR DER ERSTEN ZEILE PRODUKTIVCODE ERHOBEN WORDEN und stehen in
// docs/aktiver-stand.md, ENTSCHEIDUNG P11.11-22, Punkt (g). Nach dem Bau sind sie nicht
// mehr herstellbar (docs/immer-beachten.md, EIN VORHER-WERT WIRD VOR DEM DEPLOY
// GESICHERT).
//
// WIRD ER ROT, IST DAS EIN STOPP UND KEINE ANPASSUNG DES SOLLWERTS. Ein nachgezogener
// Sollwert waere genau der SPIEGEL, den Entscheidung P11.11-18 verbietet: Er
// bestaetigte jede Aenderung, statt sie zu fangen.
//
// SEINE GRENZE GEHOERT AN IHN SELBST: Der Aufbau ist eine SONDE, keine reale
// Kundenseite. Er sagt, dass DIESE Eingabe DIESEN Text erzeugt — nicht, dass eine von
// einem KI-Werkzeug erzeugte Seite unveraendert bleibt.

import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { generateFunctional } from "./generate";
import { injectPageViewEmitter } from "./analytics/pageview-emitter";
import type { Mapping } from "./mappings";

// Der Aufbau — zeichengleich zu dem, mit dem die Sollwerte erhoben wurden.
const SAUBER =
  '<!DOCTYPE html><html lang="de"><head><title>Waechter</title></head>' +
  '<body><h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>' +
  '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>';

const MAPPINGS: Mapping[] = [
  {
    elementId: "ps-bbbbbb",
    type: "redirect",
    config: { url: "https://example.com/checkout", openInNewTab: false },
  },
  { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
];

const TRACKING_KEY = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

const OPTS = {
  metaPixelId: "1234567890",
  trackingKey: TRACKING_KEY,
  capiProxyUrl: "/api/e",
  consentTargets: ["meta", "analytics"] as readonly string[],
};

// GETIPPT aus ENTSCHEIDUNG P11.11-22, Punkt (g) — nicht aus einem Lauf abgelesen.
const SOLL_EXPORT = {
  bytes: 13250,
  sha256: "b6ee842b2a6652ff50f7e827ccefeaef615cdadc1b0b342b67645e0a33a471e6",
};
const SOLL_PUBLISHED = {
  bytes: 27158,
  sha256: "70a86db8444cbbd988913373fc7b0c63959ab80050066a333af9048ef1a89d46",
};

const sha = (s: string) =>
  createHash("sha256").update(s, "utf8").digest("hex");
const bytes = (s: string) => Buffer.byteLength(s, "utf8");

function exportDoc(): string {
  return generateFunctional(SAUBER, MAPPINGS, "export", OPTS);
}

function publishedDoc(): string {
  return injectPageViewEmitter(exportDoc(), TRACKING_KEY, "bar", {
    appearance: { theme: "auto" },
    text: "standard",
    language: "de",
  });
}

describe("Byte-Waechter: der ausgelieferte Text eines SAUBEREN Projekts", () => {
  it("W1: generateFunctional('export') liefert den Vorher-Wert byte-gleich", () => {
    const doc = exportDoc();
    expect(bytes(doc)).toBe(SOLL_EXPORT.bytes);
    expect(sha(doc)).toBe(SOLL_EXPORT.sha256);
  });

  it("W2: danach injectPageViewEmitter liefert den Vorher-Wert byte-gleich", () => {
    const doc = publishedDoc();
    expect(bytes(doc)).toBe(SOLL_PUBLISHED.bytes);
    expect(sha(doc)).toBe(SOLL_PUBLISHED.sha256);
  });

  it("W3: der erzeugte Text ist DETERMINISTISCH — zwei Laeufe, ein Ergebnis", () => {
    // Ohne diesen Lauf waeren W1/W2 von einem zufaellig passenden Ergebnis nicht zu
    // unterscheiden: Traegt der Erzeuger irgendwann einen Zeitstempel oder einen
    // Zufallswert, faellt W1/W2 zwar auf — aber erst beim naechsten Lauf, und dann
    // ohne erkennbaren Grund.
    expect(exportDoc()).toBe(exportDoc());
    expect(publishedDoc()).toBe(publishedDoc());
  });

  it("W4: POSITIVKONTROLLE — eine veraenderte Eingabe erzeugt einen ANDEREN Text", () => {
    // Ohne sie waeren W1 und W2 von einem Erzeuger, der IMMER denselben String
    // liefert, nicht zu unterscheiden (docs/immer-beachten.md, Lektion (d) zu
    // Waechtern, die Abwesenheit pruefen — hier dieselbe Denkfigur an einer
    // Gleichheits-Zusicherung).
    const anders = generateFunctional(
      SAUBER.replace("Titel", "Anderer Titel"),
      MAPPINGS,
      "export",
      OPTS,
    );
    expect(sha(anders)).not.toBe(SOLL_EXPORT.sha256);
  });
});
