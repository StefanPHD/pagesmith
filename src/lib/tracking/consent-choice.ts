// DAS GETEILTE DER ZWEI EINWILLIGUNGS-OBERFLAECHEN (Phase 11.5, Scheibe 11.5e-1). Leiste
// (consent-bar.ts) und Modal (consent-modal.ts) sind zwei Bloecke; was beide zeigen und
// tun, steht HIER und nur hier: der Sachtext, die drei Knoepfe, die zwei Gruppen-Schalter
// und die Aufloesung der Gruppen in Einwilligungs-Schluessel.
//
// WARUM EINE EIGENE DATEI (OWNER-ENTSCHEIDUNG 2026-09-15): Das Geteilte lag bis zu dieser
// Scheibe in consent-bar.ts, und das Modal importierte es von dort. Mit den Gruppen waere
// die Leisten-Datei still zum geteilten Modul geworden, obwohl ihr Name eine der zwei
// Formen meint.
//
// SIE IST REIN: kein `import "server-only"`, kein "use client", keine Datenbank, kein
// Netzwerk, kein DOM zur Bauzeit. Die Richtung bleibt server-only -> rein, nie umgekehrt;
// sie importiert allein reine Konstanten aus tracking/consent.ts und
// tracking/consent-targets.ts. Eine server-only-Datei waere aus erzeugtem Browser-Code
// nicht erreichbar.
//
// ES GIBT KEINEN LAUFZEIT-HELFER. CONSENT_CHOICE_JS ist ein Code-Stueck, das zur BAUZEIT in
// die sofort ausgefuehrte Funktion JEDES Blocks eingesetzt wird; seine Funktionen sind dort
// lokal. Ein globaler Name entsteht nicht (M12 und L12 halten das je fuer ihren Block).
// Zwei Kopien, die auseinanderlaufen koennten, gibt es damit nicht; M15b in
// consent-modal.test.ts haelt, dass beide Bloecke das Stueck tragen.
//
// SERIALISIERUNGSSICHER WIE DIE BLOECKE: Weder das Code-Stueck noch das Stylesheet enthalten
// ein `<`. Markup entsteht per createElement, Texte per textContent, jeder String per
// JSON.stringify. L3 und M3 pruefen den ganzen Blocktext und damit auch dieses Stueck.
//
// DIE OWNER-ENTSCHEIDUNG VOM 2026-09-15 SCHLOSS ZWEIERLEI AUS: einen AUFKLAPP-BEREICH UND
// eine EINZELAUSWAHL DER FUENF NETZWERKE.
// DER AUFKLAPP-TEIL IST ABGELOEST — docs/roadmap.md, Roadmap-Zeile 11.13, Punkt (c), und
// Entscheidung P11.13-1 der Phase 11.13 (OWNER-FREIGABE 2026-09-17): Die Oberflaeche
// erscheint eingeklappt, und ein Weg fuehrt zur Auswahl.
// „KEINE EINZELAUSWAHL DER FUENF NETZWERKE" GILT WEITER. Wer Anbieter-Granularitaet
// braucht, bindet ein Consent-Management ein, das den Hook je Schluessel setzt.

import { ANALYTICS_CONSENT_TARGET } from "@/lib/tracking/consent";
import { ALL_CONSENT_KEYS } from "@/lib/tracking/consent-targets";

/**
 * Der Sachtext beider Oberflaechen, eine Zeile ueber den Schaltern, ohne Ueberschrift.
 * WORTLAUT FREIGEGEBEN (Entscheidung E3 der Scheibe 11.5d, Architekt/Owner 2026-09-14).
 * ER TRAEGT KEINE RECHTSBEHAUPTUNG UND KEIN VERSPRECHEN UEBER DATENVERARBEITUNG, und kein
 * "notwendig" oder "essenziell": Seit Scheibe 11.5e-1 gibt es zwei Gruppen, aber KEINE
 * davon besteht ohne Einwilligung — das Wort erzeugte die Erwartung, die die
 * Knopf-Beschriftung „Ablehnen" bereits verworfen hat. Einen Verweis auf eine
 * Datenschutzerklaerung gibt es nicht, weil kein Einstellungsfeld einen traegt. Wer den
 * Satz aendert, braucht eine neue Freigabe; L13 und M5 halten ihn.
 * UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts, dort hiess er CONSENT_BAR_TEXT.
 */
export const CONSENT_TEXT =
  "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.";

/**
 * Beschriftung des Zustimmungs-Knopfs. Er schreibt alle sechs Schluessel und liest die
 * Schalter NICHT. UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts, dort hiess sie
 * CONSENT_BAR_ACCEPT_LABEL.
 */
export const CONSENT_ACCEPT_LABEL = "Alle akzeptieren";

/**
 * Beschriftung des Speichern-Knopfs (Scheibe 11.5e-1, Freigabe F2 2026-09-15). Er schreibt
 * die Schluessel der gewaehlten Gruppen; ist keine gewaehlt, ist das `write([])`.
 */
export const CONSENT_SAVE_LABEL = "Auswahl speichern";

/**
 * Beschriftung des Ablehnungs-Knopfs. „Ablehnen", NICHT „Nur Notwendige": write([])
 * lehnt alle sechs Schluessel ab, auch analytics — es bleibt nichts Notwendiges uebrig
 * (bindende Entscheidung (12) der Phase 11.5). Er liest die Schalter NICHT: Auch bei
 * gewaehlter Gruppe lehnt er alles ab.
 * UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts, dort hiess sie CONSENT_BAR_REJECT_LABEL.
 */
export const CONSENT_REJECT_LABEL = "Ablehnen";

/**
 * Zugaenglicher Name der Gruppe der zwei Schalter (Freigabe F3 der Scheibe 11.5e-1,
 * 2026-09-15): Er sagt, WAS darin liegt, nicht was man tut. Kein sichtbarer Text.
 */
export const CONSENT_GROUPS_LABEL = "Bereiche";

/**
 * Beschriftung des Wegs zur Auswahl (Phase 11.13, Scheibe 11.13a; Entscheidung P11.13-1).
 * EINGEKLAPPT ZEIGT DIE OBERFLAECHE ZWEI GLEICHRANGIGE KNOEPFE UND DIESEN WEG; der Klick
 * haengt Gruppe und "Auswahl speichern" an ihre Plaetze und entfernt den Weg. Es gibt kein
 * Zurueck.
 * ER IST EIN KNOPF, KEIN LINK: Ein `a href="#"` aenderte Fragment und Scroll-Position der
 * fremden Seite — das verbietet Invariante I1 (kein Eingriff ausserhalb des eigenen
 * Schattenbaums).
 */
export const CONSENT_WAY_LABEL = "Einstellungen";

/** Beschriftung des Schalters fuer die eigene Auswertung (Freigabe F1, 2026-09-15). */
export const CONSENT_GROUP_MEASURE_LABEL = "Messung";

/** Beschriftung des Schalters fuer die Werbenetzwerke (Freigabe F1, 2026-09-15). */
export const CONSENT_GROUP_ADS_LABEL = "Werbung";

/**
 * DIE ZWEI GRUPPEN, ALS SCHLUESSEL (Entscheidung (25) der Phase 11.5; die Zuordnung ist
 * die Setzung des Zuschnitts der Scheibe 11.5e-1): „Messung" traegt analytics, „Werbung"
 * die fuenf Ziel-Schluessel.
 *
 * DIE GRUPPE IST EIN BEDIENELEMENT, KEIN DATENMODELL. Sie wird vor write() in
 * Einzelschluessel aufgeloest; kein Gruppenname erreicht Speicher oder Hook.
 *
 * ABGELEITET AUS ALL_CONSENT_KEYS, NIE AUS EINER ZWEITEN LISTE (Entscheidung (4)). Die
 * Ableitung schoebe einen kuenftigen Schluessel still in „Werbung" — genau deshalb haelt
 * G0 in consent-bar.test.ts beide Gruppen LITERAL und wird bei jedem neuen Schluessel rot:
 * Wer einen Schluessel hinzufuegt, prueft, in welche Gruppe er gehoert (Entscheidung (25)).
 */
export const CONSENT_GROUP_KEYS: {
  readonly measure: readonly string[];
  readonly ads: readonly string[];
} = {
  measure: [ANALYTICS_CONSENT_TARGET],
  ads: ALL_CONSENT_KEYS.filter((k) => k !== ANALYTICS_CONSENT_TARGET),
};

/**
 * Das Stylesheet der Schalter und des Wegs, angehaengt an das Stylesheet des jeweiligen
 * Blocks, im Schattenbaum. KEIN `overflow`: L12 verbietet das Wort im Leisten-Block.
 *
 * DIE REGEL DES WEGS IST KLASSEN-GEBUNDEN, UND DAS IST KEINE STILFRAGE: Beide Bloecke
 * tragen einen BAREN `button{...}`-Selektor mit `min-width:160px` und Rahmen — er trifft
 * JEDES `button` im Schattenbaum, also auch den Weg. Wer den Weg ueber jenen Selektor
 * umstylt, aendert die drei echten Knoepfe mit. `.way` ueberschreibt nur, was den Weg
 * unauffaellig macht; Polsterung, Farbe und der Fokus-Ring der Knopf-Regel bleiben, damit
 * Treffergroesse und Kontrast die des Bestands sind.
 */
export const CONSENT_CHOICE_CSS =
  ".groups{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin:0;padding:0;border:0;}" +
  ".group{display:inline-flex;align-items:center;gap:6px;cursor:pointer;}" +
  ".group input{box-sizing:border-box;width:18px;height:18px;margin:0;accent-color:#111827;cursor:pointer;}" +
  ".group input:focus-visible{outline:2px solid #2563eb;outline-offset:2px;}" +
  ".way{min-width:0;border:0;background:transparent;font-weight:400;text-decoration:underline;}";

/**
 * Das Code-Stueck, das JEDER Block in seine sofort ausgefuehrte Funktion einsetzt. Es
 * deklariert vier lokale Funktionen; der Block ruft danach
 * `fillChoice(<container>, <ausgeklappt>)`. Der zweite Wert ist ein zur BAUZEIT
 * eingesetztes Literal — `false` im Lade-Zweig, `true` im Widerruf-Zweig (Entscheidung
 * P11.13-2: wer „Einwilligung aendern" waehlt, will auswaehlen).
 *
 * ES ERWARTET ZWEI NAMEN IM UMGEBENDEN BLOCK: `api` (die Speicher-Schnittstelle) und
 * `host` (das Host-Element). Benennt ein Block einen davon um, wirft der Klick einen
 * ReferenceError — L9 bzw. M9 werden rot.
 *
 * WAS ENTSTEHT — ZWEI ZUSTAENDE (Phase 11.13, Scheibe 11.13a):
 * EINGEKLAPPT, in dieser Reihenfolge im Container: „Alle akzeptieren", „Ablehnen", der Weg
 * „Einstellungen". KEINE Schalter, KEIN „Auswahl speichern".
 * AUSGEKLAPPT, nach dem Klick auf den Weg oder sofort im Widerruf-Zweig: eine Gruppe
 * (`role="group"`) mit zwei Schaltern „Messung" und „Werbung" (je `label` mit Checkbox und
 * Text; der zugaengliche Name kommt aus dem label, es gibt kein id), danach „Alle
 * akzeptieren", „Auswahl speichern", „Ablehnen" — EXAKT die Gestalt vor dieser Scheibe.
 *
 * ALLE ELEMENTE ENTSTEHEN IM AUFBAU UND SIND DORT VERDRAHTET; eingeklappt sind Gruppe und
 * „Auswahl speichern" nur NICHT EINGEHAENGT. DAS IST INVARIANTE I3 AM WORTLAUT: Zum
 * Zeitpunkt von `body.appendChild(host)` sind ALLE Listener gebunden — der des Wegs und die
 * aller drei Knoepfe. Ein beim Klick erzeugter Teil haette sie danach gebunden.
 *
 * DIE REIHENFOLGE IM KLICK-HANDLER IST BINDEND: erst einhaengen, ZULETZT den Weg entfernen.
 * Umgekehrt entstuende ein Zwischenzustand ohne Auswahl und ohne Weg, falls dazwischen
 * etwas wirft.
 *
 * DER FOKUS WANDERT AUF DAS ERSTE EIGENE KAESTCHEN (Rueckfall (a) der Freigabe E2,
 * 2026-09-17). ER IST GEMESSEN UND NICHT GEWAEHLT: Ohne ihn faellt der Fokus beim
 * Entfernen des Wegs auf `document.body`, und der NAECHSTE Tabulator-Schritt landet beim
 * ERSTEN fokussierbaren Element der FREMDEN Seite — gemessen am 2026-09-17 in Chromium
 * 153, an einer Probeseite MIT eigenen Bedienelementen, bei Leiste und Modal. Auf einer
 * Probeseite OHNE solche Elemente war dasselbe Kriterium gruen; das war die Falle.
 * `preventScroll: true` IST PFLICHT UND KEINE FEINHEIT: Ohne die Option scrollt der
 * Browser das Ziel bei Bedarf in den Sichtbereich — und das aendert die SCROLL-POSITION
 * der fremden Seite, was Invariante I1 ausdruecklich verbietet. Die Option steht im
 * ausgelieferten Text; ein Struktur-Waechter haelt sie (L23 bzw. M24). DASS SIE WIRKT,
 * IST EINE LIVE-ACHSE — die Testumgebung scrollt nicht.
 * DAS ZIEL LIEGT IM EIGENEN SCHATTENBAUM — Invariante I1 ist unberuehrt. Die Nadel
 * `.focus(` in M12 und W11 ist dafuer BENANNT VERENGT: `measure.box.focus()` ist
 * ausgenommen, jeder andere Fokus-Aufruf bleibt verboten, und `b.focus()` bleibt rot.
 *
 * DIE SCHALTER STARTEN AUS UND TRAGEN KEINEN LISTENER. Eine Vorauswahl waere eine
 * vorweggenommene Zustimmung. Ihr Zustand wird erst beim Klick auf „Auswahl speichern" ueber
 * `checked` gelesen, an Referenzen, die makeGroup zurueckgibt — keine Abfrage, kein Zugriff
 * ausserhalb der eigenen Elemente.
 *
 * DIE EINZIGE RUECKNAHME IST DAS ENTFERNEN DES HOSTS, im `finally` von makeButton — also AUCH,
 * WENN write() `false` LIEFERT ODER WIRFT. Alle drei Knoepfe laufen ueber dieselbe Form; `pick`
 * steht im `try`.
 *
 * DIE AUFLOESUNG: `pick` liefert Einzelschluessel aus CONSENT_GROUP_KEYS bzw. ALL_CONSENT_KEYS,
 * als Literal eingesetzt. Die Reihenfolge ist gleichgueltig — write() legt in der Reihenfolge
 * seiner Schluesselliste ab.
 */
export const CONSENT_CHOICE_JS = [
  "  function makeButton(label, pick) {",
  '    var b = document.createElement("button");',
  '    b.setAttribute("type", "button");',
  "    b.textContent = label;",
  '    b.addEventListener("click", function () {',
  "      try {",
  "        api.write(pick());",
  "      } finally {",
  "        if (host.parentNode) host.parentNode.removeChild(host);",
  "      }",
  "    });",
  "    return b;",
  "  }",
  "  function makeGroup(label) {",
  '    var wrap = document.createElement("label");',
  '    wrap.setAttribute("class", "group");',
  '    var box = document.createElement("input");',
  '    box.setAttribute("type", "checkbox");',
  '    var name = document.createElement("span");',
  "    name.textContent = label;",
  "    wrap.appendChild(box);",
  "    wrap.appendChild(name);",
  "    return { label: wrap, box: box };",
  "  }",
  "  function makeWay(label) {",
  '    var b = document.createElement("button");',
  '    b.setAttribute("type", "button");',
  '    b.setAttribute("class", "way");',
  "    b.textContent = label;",
  "    return b;",
  "  }",
  "  function fillChoice(panel, ausgeklappt) {",
  '    var groups = document.createElement("div");',
  '    groups.setAttribute("class", "groups");',
  '    groups.setAttribute("role", "group");',
  `    groups.setAttribute("aria-label", ${JSON.stringify(CONSENT_GROUPS_LABEL)});`,
  `    var measure = makeGroup(${JSON.stringify(CONSENT_GROUP_MEASURE_LABEL)});`,
  `    var ads = makeGroup(${JSON.stringify(CONSENT_GROUP_ADS_LABEL)});`,
  "    groups.appendChild(measure.label);",
  "    groups.appendChild(ads.label);",
  `    var akzeptieren = makeButton(${JSON.stringify(CONSENT_ACCEPT_LABEL)}, function () { return ${JSON.stringify([...ALL_CONSENT_KEYS])}; });`,
  `    var speichern = makeButton(${JSON.stringify(CONSENT_SAVE_LABEL)}, function () {`,
  "      var granted = [];",
  `      if (measure.box.checked) granted = granted.concat(${JSON.stringify([...CONSENT_GROUP_KEYS.measure])});`,
  `      if (ads.box.checked) granted = granted.concat(${JSON.stringify([...CONSENT_GROUP_KEYS.ads])});`,
  "      return granted;",
  "    });",
  `    var ablehnen = makeButton(${JSON.stringify(CONSENT_REJECT_LABEL)}, function () { return []; });`,
  "    if (ausgeklappt) {",
  "      panel.appendChild(groups);",
  "      panel.appendChild(akzeptieren);",
  "      panel.appendChild(speichern);",
  "      panel.appendChild(ablehnen);",
  "      return;",
  "    }",
  `    var weg = makeWay(${JSON.stringify(CONSENT_WAY_LABEL)});`,
  '    weg.addEventListener("click", function () {',
  "      panel.insertBefore(groups, akzeptieren);",
  "      panel.insertBefore(speichern, ablehnen);",
  "      panel.removeChild(weg);",
  "      measure.box.focus({ preventScroll: true });",
  "    });",
  "    panel.appendChild(akzeptieren);",
  "    panel.appendChild(ablehnen);",
  "    panel.appendChild(weg);",
  "  }",
].join("\n");
