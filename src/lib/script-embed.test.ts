import { describe, it, expect } from "vitest";
import { embedInScript } from "@/lib/script-embed";

// DER EINBETTUNGS-HELFER (Phase 11.13, Scheibe 11.13d; bindende Entscheidung P11.13-25).
//
// DIE NUTZLASTEN SIND DIE GEMESSENEN UND KEINE ERFUNDENEN (Invariante S9 des Zuschnitts).
// Sie stammen woertlich aus VERMERK P11.13-7 der Standdatei — dem Lauf, in dem der
// Ausbruch am 2026-09-18 in Chromium ueber file:// gemessen wurde. Eine erfundene Nutzlast
// ersetzt keine gemessene: Der Unterschied zwischen den ersten beiden hat in jenem Lauf
// darueber entschieden, ob der Handler ZUENDET oder nicht, und genau der waere beim
// Erfinden verlorengegangen.
const NUTZLASTEN: ReadonlyArray<readonly [string, string]> = [
  // MIT Anfuehrungszeichen: bricht aus, der Handler zuendet NICHT — JSON.stringify
  // maskiert die inneren `"`. DAS IST EIN ZUFALL DER ZEICHENFOLGE UND KEIN SCHUTZ.
  ["mit_anfuehrungszeichen", '</script><img src=x onerror="window.__AUSBRUCH=1">'],
  // OHNE Anfuehrungszeichen: bricht aus UND FUEHRT AUS (gemessen: window.__AUSBRUCH === true).
  ["ohne_anfuehrungszeichen", "</script><img src=x onerror=window.__AUSBRUCH=1>"],
  // Der Parser-Zustand "script data escaped": verschluckt das NAECHSTE Script-Element,
  // ohne einen einzigen Fehler zu erzeugen. Die gefaehrlichste der drei Gestalten.
  ["kommentar_start", '<!--<script><img src=x onerror="window.__AUSBRUCH=1">'],
  // GROSSSCHREIBUNG: Der HTML-Parser vergleicht das Ende-Tag case-insensitiv. Ein
  // Schutz, der nur `</script` in Kleinschreibung faengt, faellt hier.
  ["grossschreibung", "x</SCRIPT>y"],
];

describe("embedInScript — die Maskierung fuer Script-Rohtext", () => {
  // EM1. DIE HAUPTZUSICHERUNG: kein `<` im Ergebnis. WODURCH ROT: wenn die Ersetzung
  // fehlt, nicht global ist (`/</` statt `/</g`) oder auf das falsche Zeichen zielt.
  it("EM1: keine der gemessenen Nutzlasten hinterlaesst ein '<' im Ergebnis", () => {
    for (const [name, nutzlast] of NUTZLASTEN) {
      expect(embedInScript(nutzlast).includes("<"), name).toBe(false);
    }
    // POSITIVKONTROLLE im selben Lauf: Ohne den Helfer traegt JEDE der vier ein `<`.
    // Ohne sie waere EM1 auch dann gruen, wenn die Nutzlasten gar keins enthielten.
    for (const [name, nutzlast] of NUTZLASTEN) {
      expect(JSON.stringify(nutzlast).includes("<"), name).toBe(true);
    }
  });

  // EM2. DER RUNDLAUF — OHNE IHN WAERE EM1 AUCH MIT "alles wegwerfen" GRUEN.
  // WODURCH ROT: wenn der Helfer den Wert VERAENDERT, statt ihn nur zu maskieren.
  it("EM2: JSON.parse(embedInScript(x)) liefert x zurueck", () => {
    const faelle = [
      ...NUTZLASTEN.map(([, n]) => n),
      "Diese Seite kann Tracking-Dienste einbinden.",
      "Umlaute: aeoeue und scharfes S",
      'Anfuehrungszeichen " und Backslash \\',
      // U+2028 und U+2029 werden von JSON.stringify maskiert und muessen den Rundlauf
      // trotzdem ueberstehen: Der Helfer darf sie nicht anfassen.
      // SIE WERDEN IM CODE GEBAUT UND NICHT HINGESCHRIEBEN, und das ist kein Stil:
      // Ein Unicode-Escape im Quelltext dieses Projekts ist am 2026-09-18 mehrfach
      // STILL in sein Zeichen verwandelt worden — hier haette danach ein ROHER
      // Zeilentrenner in einem String-Literal gestanden, also genau das unsichtbare
      // Zeichen, das das Tor in lib/settings.ts verbietet. Reines ASCII kann kein
      // Werkzeug umdeuten (docs/immer-beachten.md, EIN NACHWEIS AN EINER NEUEN DATEI
      // IST BLIND).
      "Zeilentrenner:" +
        String.fromCharCode(0x2028) +
        "und" +
        String.fromCharCode(0x2029) +
        "Absatztrenner",
      "Emoji ausserhalb der Grundebene: " + String.fromCodePoint(0x1f600),
      "",
    ];
    for (const f of faelle) {
      expect(JSON.parse(embedInScript(f)), JSON.stringify(f)).toBe(f);
    }
  });

  // EM3. DIE BYTE-ZUSAGE (Invariante S1, bindende Entscheidung P11.13-25): Fuer jeden
  // Wert OHNE `<` ist die Ausgabe ZEICHENGLEICH mit JSON.stringify. Das ist der Grund,
  // aus dem der ausgelieferte Text dieser Scheibe unveraendert bleibt.
  // WODURCH ROT: wenn der Helfer mehr tut als maskieren.
  it("EM3: ohne '<' ist die Ausgabe zeichengleich mit JSON.stringify", () => {
    const ohne = [
      "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.",
      "Alle akzeptieren",
      "pagesmith-bar",
      "1234567890",
      ".bar{color:#f9fafb;}",
    ];
    for (const w of ohne) {
      expect(embedInScript(w), w).toBe(JSON.stringify(w));
    }
  });

  // EM4. DIE POSITIVKONTROLLE ZU EM3 — ohne sie waere EM3 auch dann gruen, wenn der
  // Helfer GAR NICHTS taete. WODURCH ROT: wenn die Ersetzung entfernt wird.
  it("EM4: mit '<' weicht die Ausgabe von JSON.stringify ab", () => {
    for (const [name, nutzlast] of NUTZLASTEN) {
      expect(embedInScript(nutzlast), name).not.toBe(JSON.stringify(nutzlast));
    }
  });

  // EM5. DER HELFER NIMMT MEHR ALS STRINGS — die Einsetzstellen uebergeben auch Listen
  // (ALL_CONSENT_KEYS, die zwei Gruppen-Listen). WODURCH ROT: wenn die Signatur auf
  // `string` verengt wird und eine Liste dadurch an einer Einsetzstelle scheitert.
  it("EM5: Listen und Zahlen ueberstehen den Rundlauf und tragen kein '<'", () => {
    const liste = ["analytics", "meta", "x</script>y"];
    const aus = embedInScript(liste);
    expect(aus.includes("<")).toBe(false);
    expect(JSON.parse(aus)).toEqual(liste);
    expect(embedInScript(42)).toBe("42");
  });
});
