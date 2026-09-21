// WAECHTER UEBER DAS PRAEDIKAT (Phase 11.11, Scheibe 11.11d).
//
// DIE ERWARTUNGEN SIND AUS DER ENTSCHEIDUNG GETIPPT, NICHT AUS DEM CODE IMPORTIERT —
// weder die neun id-Werte noch die zwei Host-Tags noch der Wiring-Aufruf werden hier
// aus einer Konstante gelesen. Ein Import machte diesen Waechter zum SPIEGEL, der jeden
// Tippfehler bestaetigt (docs/immer-beachten.md, EIN WAECHTER UEBER DIE SPALTENLISTE
// BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE). Quelle der Liste: ENTSCHEIDUNG P11.11-18
// plus P11.11-22, Punkt (c).

import { describe, expect, it } from "vitest";
import {
  hasOwnBlocks,
  ownBlockFindings,
  ownBlocksPublishTarget,
} from "./own-blocks";
import { generateFunctional } from "./generate";
import { injectPageViewEmitter } from "./analytics/pageview-emitter";
import type { Mapping } from "./mappings";

// GETIPPT aus der Entscheidung, nicht gelesen.
const ERWARTETE_IDS = [
  "pagesmith-mappings",
  "pagesmith-consent",
  "__ps_pve",
  "__ps_cns",
  "__ps_cnr",
  "__ps_clb",
  "__ps_cmo",
  "__ps_crv",
  "__ps_sbx",
] as const;

const ERWARTETE_HOST_TAGS = ["pagesmith-bar", "pagesmith-modal"] as const;

const ERWARTETER_WIRING_AUFRUF = 'getElementById("pagesmith-mappings")';

// Eine Seite OHNE jeden eigenen Baustein. Sie traegt bewusst Text, ein Attribut und
// einen Kommentar — damit die Negativ-Laeufe nicht an einem leeren Dokument gruen sind.
const SAUBER =
  '<!DOCTYPE html><html lang="de"><head><title>Sauber</title></head>' +
  "<body><!-- ein Kommentar des Betreibers -->" +
  '<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>' +
  '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
  '<script>console.log("fremdes Script");</script></body></html>';

const MAPPINGS: Mapping[] = [
  {
    elementId: "ps-bbbbbb",
    type: "redirect",
    config: { url: "https://example.com/checkout", openInNewTab: false },
  },
  { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
];

function exportDoc(): string {
  return generateFunctional(SAUBER, MAPPINGS, "export", {
    metaPixelId: "1234567890",
    trackingKey: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    capiProxyUrl: "/api/e",
    consentTargets: ["meta", "analytics"],
  });
}

function publishedDoc(form: "bar" | "modal"): string {
  return injectPageViewEmitter(
    exportDoc(),
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    form,
    { appearance: { theme: "auto" }, text: "standard", language: "de" }
  );
}

describe("own-blocks — das Praedikat", () => {
  // GEMESSEN AN DER MUTATION M1 (CC, 2026-09-21): Wird der Wiring-Aufruf aus der
  // Nadel-Liste gestrichen, fallen GENAU DIESER LAUF UND P5 — und sonst nichts.
  // P2 und P3 bleiben GRUEN, weil ein ECHTES Dokument die uebrigen acht Merkmale
  // mitfuehrt. DAS WIRING-MERKMAL IST ALSO ALLEIN VON DIESER SYNTHETISCHEN FIXTURE
  // GEDECKT; in keinem realen Dokument laesst es sich isolieren, weil
  // generateFunctional Datenblock, Gate und Wiring immer zusammen anhaengt. Wer
  // diesen Lauf als redundant streicht, nimmt die einzige Abdeckung mit.
  it("P1: JEDES Merkmal wird einzeln gefunden — neun ids, zwei Host-Tags, der Wiring-Aufruf", () => {
    // Zwoelf Laeufe in einem: je ein Minimal-Dokument mit GENAU EINEM Merkmal.
    // POSITIVKONTROLLE VORWEG (Projektregel (d) zu Waechtern, die auch Abwesenheit
    // pruefen): Die Huelle allein darf NICHT anschlagen, sonst waere jeder Treffer
    // unten trivial.
    const huelle = (inhalt: string) =>
      `<!DOCTYPE html><html><body>${inhalt}</body></html>`;
    expect(hasOwnBlocks(huelle("<p>nichts</p>"))).toBe(false);

    for (const id of ERWARTETE_IDS) {
      expect(hasOwnBlocks(huelle(`<script id="${id}"></script>`))).toBe(true);
    }
    for (const tag of ERWARTETE_HOST_TAGS) {
      expect(hasOwnBlocks(huelle(`<${tag}></${tag}>`))).toBe(true);
    }
    expect(
      hasOwnBlocks(huelle(`<script>var d = ${ERWARTETER_WIRING_AUFRUF};</script>`))
    ).toBe(true);
  });

  it("P2: ein ECHTES Export-Dokument wird erkannt", () => {
    const doc = exportDoc();
    // POSITIVKONTROLLE: das Dokument traegt wirklich Bausteine, der Lauf ist also
    // nicht aus einem anderen Grund gruen.
    expect(doc).toContain('id="pagesmith-mappings"');
    expect(hasOwnBlocks(doc)).toBe(true);
  });

  it("P3: ein ECHTES Publish-Dokument wird erkannt — in BEIDEN Dialog-Formen", () => {
    for (const form of ["bar", "modal"] as const) {
      const doc = publishedDoc(form);
      expect(doc).toContain('id="__ps_pve"');
      expect(hasOwnBlocks(doc)).toBe(true);
    }
  });

  it("P4: eine saubere Seite wird NICHT erkannt — mit Positivkontrolle, dass sie nicht leer ist", () => {
    // Ohne diese zwei Zeilen waere der Lauf trivial wahr: ein leerer String schlaegt
    // ebenfalls nicht an (docs/immer-beachten.md, EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF
    // DREI WEISEN HOHL, Fall (2)).
    expect(SAUBER.length).toBeGreaterThan(100);
    expect(SAUBER).toContain("<script>");

    expect(hasOwnBlocks(SAUBER)).toBe(false);
    expect(ownBlockFindings(SAUBER)).toEqual([]);
  });

  it("P5: ownBlockFindings meldet GENAU die Merkmale des Publish-Dokuments, in fester Reihenfolge", () => {
    // Ein Publish-Dokument mit der LEISTE traegt sieben id-Bloecke plus das id-lose
    // Wiring-Script; __ps_cmo (Modal) und __ps_sbx (Vorschau-Riegel) stehen dort NICHT,
    // und die zwei Host-Tags entstehen erst zur Laufzeit (Vermerk P11.11-17, Punkt (g)).
    expect(ownBlockFindings(publishedDoc("bar"))).toEqual([
      'id="pagesmith-mappings"',
      'id="pagesmith-consent"',
      'id="__ps_pve"',
      'id="__ps_cns"',
      'id="__ps_cnr"',
      'id="__ps_clb"',
      'id="__ps_crv"',
      ERWARTETER_WIRING_AUFRUF,
    ]);
  });

  it("P6: der Wiring-Aufruf ist ZUSAMMENGESETZT — er traegt die Mapping-Kennung als Teil", () => {
    // Waechter gegen ein zweites getipptes Literal im Praedikat (P11.11-18, "eine
    // Quelle"). Wer die Kennung im Aufruf hart hinschreibt, laesst diesen Lauf gruen —
    // deshalb prueft er die WIRKUNG: ein Dokument, dessen Aufruf eine ANDERE Kennung
    // nennt, darf NICHT anschlagen.
    const huelle = (s: string) => `<!DOCTYPE html><html><body>${s}</body></html>`;
    expect(ERWARTETER_WIRING_AUFRUF).toContain("pagesmith-mappings");
    expect(
      hasOwnBlocks(huelle('<script>var d = getElementById("etwas-anderes");</script>'))
    ).toBe(false);
  });

  it("P7: Nicht-Strings sind fail-closed 'kein Fund' und werfen nicht", () => {
    for (const wert of [null, undefined, 42, {}, []] as unknown[]) {
      expect(hasOwnBlocks(wert)).toBe(false);
      expect(ownBlockFindings(wert)).toEqual([]);
    }
  });
});

describe("own-blocks — ownBlocksPublishTarget", () => {
  const MIT = publishedDoc("bar");

  it("T1: nur A traegt Bausteine -> 'a'", () => {
    expect(ownBlocksPublishTarget(MIT, { html: SAUBER })).toBe("a");
  });

  it("T2: nur B traegt Bausteine -> 'b'", () => {
    expect(ownBlocksPublishTarget(SAUBER, { html: MIT })).toBe("b");
  });

  it("T3: BEIDE tragen Bausteine -> 'both'", () => {
    expect(ownBlocksPublishTarget(MIT, { html: MIT })).toBe("both");
  });

  it("T4: beide sauber -> null", () => {
    expect(ownBlocksPublishTarget(SAUBER, { html: SAUBER })).toBeNull();
  });

  it("T5: variantB === null heisst 'nicht pruefen', NICHT 'unbekannt'", () => {
    // Derselbe null-Vertrag wie bei emptyPublishVariant: Der Riegel darf B nur pruefen,
    // wenn B auch geschrieben wird — sonst blockierte ein alter Tab, der nach dem
    // Entfernen der Variante noch ein variantB im Zustand haelt, einen legitimen
    // Publish.
    expect(ownBlocksPublishTarget(SAUBER, null)).toBeNull();
    // Gegenprobe: dasselbe B, diesmal geprueft.
    expect(ownBlocksPublishTarget(SAUBER, { html: MIT })).toBe("b");
  });
});
