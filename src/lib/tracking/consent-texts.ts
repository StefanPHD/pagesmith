/**
 * DIE TEXTE DES EINWILLIGUNGS-DIALOGS, JE SPRACHE (Phase 11.13, Scheibe 11.13e;
 * bindende Entscheidungen P11.13-31, P11.13-33 und P11.13-34).
 *
 * WARUM ES DIESE DATEI GIBT UND NICHT consent-choice.ts: Die elf Textplaetze lagen bis zu
 * dieser Scheibe in DREI verschiedenen Dateien — acht in consent-choice.ts, der
 * Regions-Name in consent-bar.ts, der Fenster-Name in consent-modal.ts, die Warnung in
 * consent-revoke.ts. Eine Tabelle IN consent-choice.ts haette die drei von dort importieren
 * muessen, und das ist ein ZYKLUS: consent-bar.ts importiert bereits aus consent-choice.ts.
 * DIE LOESUNG IST DER UMZUG: Die elf Konstanten liegen hier, die vier Erzeuger importieren
 * von hier, und diese Datei importiert KEINEN von ihnen. Der Preis war Null — die drei
 * umgezogenen Konstanten hatten ausserhalb ihrer eigenen Datei keinen einzigen Importeur
 * (GEMESSEN am Repo, CC, 2026-09-18).
 *
 * SIE IST REIN: kein "use server", kein `import "server-only"`, kein "use client", keine
 * Datenbank, kein Netzwerk, kein DOM zur Bauzeit. Sie importiert allein einen TYP.
 *
 * DER DEUTSCHE ZWEIG VERWEIST, ER SCHREIBT NICHT AB (Invariante Q3, Entscheidung
 * P11.13-33): Jedes Feld von `de` ist ein Verweis auf die Konstante darueber. Eine
 * Abschrift stuende zweimal im Repo, und EIN abweichendes Zeichen aenderte den
 * ausgelieferten Text, ohne dass ein Gate rot wuerde.
 *
 * DIE VERZWEIGUNG IST ERSCHOEPFEND (Invariante Q4, Bauform aus Entscheidung P11.13-8):
 * `consentTexts` hat einen `never`-Zweig. Ein dritter Sprachwert macht ihn zum
 * COMPILER-FEHLER, und ein im `en`-Zweig fehlendes Feld ebenso — `ConsentTextTable` hat
 * elf PFLICHT-Felder, keines optional.
 *
 * DIE WORTLAUTE SIND OWNER-ENTSCHEIDUNGEN, KEINE CODE-BEFUNDE (Entscheidung P11.13-31,
 * OWNER 2026-09-18). Sie werden ZEICHENGENAU uebernommen — auch in Satzzeichen, Gross- und
 * Kleinschreibung. Wer einen aendert, braucht eine neue Freigabe; die Waechter in
 * consent-texts.test.ts fuehren sie als LITERAL aus jener Entscheidung und importieren sie
 * ausdruecklich NICHT von hier (Invariante Q5) — sonst waere der Waechter ein Spiegel.
 *
 * KEINE BETREIBER-EINGABE: Der Sprachwert aus dem Einstellungs-Blob waehlt einen ZWEIG.
 * Der Rohwert erreicht den ausgelieferten Text nie. Die Sicherheitsachse der Scheibe
 * 11.13d ist damit nicht beruehrt — deshalb ist die Sprache eine eigene Scheibe
 * (Entscheidung P11.13-24).
 */

import type { ConsentLanguage } from "@/lib/settings";

// ===================================================================================
// DEUTSCH — die elf Wortlaute des Bestands, UNVERAENDERT und zeichengleich.
//
// ALLE ELF SIND UMLAUTFREI, und das ist kein Zufall: Die Quelldateien dieses Projekts
// tragen keine Umlaute, und die Wortlaute sind von Anfang an so freigegeben worden
// ("waere" in der Warnung). Ein Umlaut hier waere eine stille Aenderung am
// ausgelieferten Text.
// ===================================================================================

/**
 * Der Sachtext beider Oberflaechen, eine Zeile ueber den Schaltern, ohne Ueberschrift.
 * WORTLAUT FREIGEGEBEN (Entscheidung E3 der Scheibe 11.5d, Architekt/Owner 2026-09-14;
 * erneut in Entscheidung P11.13-31, Owner 2026-09-18).
 * ER TRAEGT KEINE RECHTSBEHAUPTUNG UND KEIN VERSPRECHEN UEBER DATENVERARBEITUNG, und kein
 * "notwendig" oder "essenziell": Seit Scheibe 11.5e-1 gibt es zwei Gruppen, aber KEINE
 * davon besteht ohne Einwilligung — das Wort erzeugte die Erwartung, die die
 * Knopf-Beschriftung „Ablehnen" bereits verworfen hat. Einen Verweis auf eine
 * Datenschutzerklaerung gibt es nicht, weil kein Einstellungsfeld einen traegt. Wer den
 * Satz aendert, braucht eine neue Freigabe; L13 und M5 halten ihn.
 * UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts (dort CONSENT_BAR_TEXT), in Scheibe
 * 11.13e aus consent-choice.ts hierher.
 */
export const CONSENT_TEXT =
  "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.";

/**
 * Beschriftung des Zustimmungs-Knopfs. Er schreibt alle sechs Schluessel und liest die
 * Schalter NICHT. UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts (dort
 * CONSENT_BAR_ACCEPT_LABEL), in Scheibe 11.13e aus consent-choice.ts hierher.
 * WORTLAUT NACHTRAEGLICH FREIGEGEBEN (Entscheidung P11.13-31, Owner 2026-09-18) — bis
 * dahin war er der einzige Knopf-Text ohne Freigabe.
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
 * UMGEZOGEN IN SCHEIBE 11.5e-1 aus consent-bar.ts (dort CONSENT_BAR_REJECT_LABEL), in
 * Scheibe 11.13e aus consent-choice.ts hierher.
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
 * WORTLAUT NACHTRAEGLICH FREIGEGEBEN (Entscheidung P11.13-31, Owner 2026-09-18).
 */
export const CONSENT_WAY_LABEL = "Einstellungen";

/** Beschriftung des Schalters fuer die eigene Auswertung (Freigabe F1, 2026-09-15). */
export const CONSENT_GROUP_MEASURE_LABEL = "Messung";

/** Beschriftung des Schalters fuer die Werbenetzwerke (Freigabe F1, 2026-09-15). */
export const CONSENT_GROUP_ADS_LABEL = "Werbung";

/**
 * Zugaenglicher Name der LEISTE (`role="region"`). UMGEZOGEN IN SCHEIBE 11.13e aus
 * consent-bar.ts.
 * WORTLAUT NACHTRAEGLICH FREIGEGEBEN (Entscheidung P11.13-31, Owner 2026-09-18) — bis
 * dahin hatte er weder eine Freigabe NOCH einen Waechter; das Fenster-Pendant hatte einen
 * (M5), die Leiste keinen (GEMESSEN, VERMERK P11.13-9, Punkt (b)). Der Waechter L25 ist
 * mit dieser Scheibe gebaut.
 */
export const CONSENT_BAR_REGION_LABEL = "Einwilligung";

/**
 * Zugaenglicher Name des FENSTERS (`role="dialog"`). UMGEZOGEN IN SCHEIBE 11.13e aus
 * consent-modal.ts. WORTLAUT NACHTRAEGLICH FREIGEGEBEN (Entscheidung P11.13-31, Owner
 * 2026-09-18). M5 haelt ihn seit der Scheibe 11.5d-2.
 * ER IST EINE EIGENE KONSTANTE UND KEIN VERWEIS AUF DIE LEISTE, obwohl beide denselben
 * Wortlaut tragen: Die zwei Oberflaechen sind getrennt freigegeben, und ein gemeinsames
 * Symbol machte aus zwei Entscheidungen eine.
 */
export const CONSENT_MODAL_DIALOG_LABEL = "Einwilligung";

/**
 * Die Konsolen-Warnung des Widerrufs (Freigabe G6 der Scheibe 11.5e-2, Owner 2026-09-16).
 * UMGEZOGEN IN SCHEIBE 11.13e aus consent-revoke.ts.
 * SIE BEGINNT MIT DEM GLOBALEN NAMEN, damit ein Betreiber die Meldung in der Konsole
 * zuordnen kann. IHR ZWEITER SATZ IST KEIN SCHMUCK: Ruft jemand den Widerruf, WAEHREND
 * der Lade-Dialog offen steht, liefert read() ebenfalls "never" — die Warnung feuert dann
 * und sagt "nichts zu widerrufen", obwohl der Dialog sichtbar dasteht. W9 haelt sie.
 */
export const CONSENT_REVOKE_WARNING =
  "pagesmithConsentRevoke: Es liegt keine gespeicherte Entscheidung vor, die zu widerrufen waere. Steht der Dialog gerade offen, entscheide dort.";

// ===================================================================================
// ENGLISCH — neu mit der Scheibe 11.13e (Entscheidung P11.13-31, Owner 2026-09-18).
//
// ZEHN KONSTANTEN FUER ELF FELDER, und das ist eine BENANNTE Asymmetrie: O6 gibt fuer
// Leiste und Fenster EINEN englischen Wortlaut, und ihn zweimal hinzuschreiben waere eine
// Abschrift in derselben Datei. Auf der deutschen Seite bleibt es bei ZWEI Konstanten,
// weil sie im Bestand zwei sind — ein Zusammenlegen waere eine Aenderung am deutschen
// Zweig, die diese Scheibe nicht bestellt hat.
// ===================================================================================

/** EN-Sachtext. Symmetrisch zum deutschen: keine Rechtsbehauptung, kein "necessary". */
export const CONSENT_TEXT_EN =
  "This site can use tracking services. You decide whether that happens.";

/** EN-Zustimmung. "Accept all" — er schreibt alle sechs Schluessel. */
export const CONSENT_ACCEPT_LABEL_EN = "Accept all";

/** EN-Speichern. "Save selection" — er schreibt die Schluessel der gewaehlten Gruppen. */
export const CONSENT_SAVE_LABEL_EN = "Save selection";

/**
 * EN-Ablehnung. "Reject all" — SYMMETRISCH zu "Accept all" und ausdruecklich nicht
 * "Decline" oder "Necessary only": write([]) lehnt ALLE sechs Schluessel ab, auch
 * analytics. Die Gleichrangigkeit aus Roadmap (h) ist damit auch im Wortlaut gebaut.
 */
export const CONSENT_REJECT_LABEL_EN = "Reject all";

/** EN-Weg zur Auswahl. Ein Knopf in Textoptik, kein Link. */
export const CONSENT_WAY_LABEL_EN = "Settings";

/** EN-Name der Gruppe der zwei Schalter. Kein sichtbarer Text. */
export const CONSENT_GROUPS_LABEL_EN = "Categories";

/** EN-Schalter fuer die eigene Auswertung. */
export const CONSENT_GROUP_MEASURE_LABEL_EN = "Analytics";

/** EN-Schalter fuer die Werbenetzwerke. */
export const CONSENT_GROUP_ADS_LABEL_EN = "Advertising";

/**
 * EN-Name von Leiste UND Fenster. EINE Konstante fuer ZWEI Felder — s. den Absatz ueber
 * der Asymmetrie. Wer sie trennt, braucht zwei Freigaben statt einer.
 */
export const CONSENT_ARIA_LABEL_EN = "Consent";

/** EN-Konsolen-Warnung des Widerrufs. Beginnt wie die deutsche mit dem globalen Namen. */
export const CONSENT_REVOKE_WARNING_EN =
  "pagesmithConsentRevoke: No stored decision to revoke. If the dialog is currently open, decide there.";

// ===================================================================================
// DIE TABELLE
// ===================================================================================

/**
 * DIE ELF TEXTPLAETZE DES AUSGELIEFERTEN DIALOGS, ALLE PFLICHT.
 *
 * KEIN FELD IST OPTIONAL, und das ist die Zusicherung der Vollstaendigkeit (Invariante
 * Q4): Fehlt im `en`-Zweig eines, meldet `tsc` es namentlich. Ein Test kann das nicht
 * leisten — er liefe erst, wenn der Zweig schon gebaut ist.
 *
 * DIE FELDNAMEN SIND DEUTSCH wie die Parameter der zwei Aufbauten (`darstellung`,
 * `sachtext`, `ausgeklappt`); die Konstanten sind englisch benannt wie im Bestand. Das
 * ist die vorgefundene Mischung dieser Dateien und keine neue.
 */
export type ConsentTextTable = {
  readonly sachtext: string;
  readonly akzeptieren: string;
  readonly speichern: string;
  readonly ablehnen: string;
  readonly weg: string;
  readonly gruppen: string;
  readonly messung: string;
  readonly werbung: string;
  readonly leisteAria: string;
  readonly fensterAria: string;
  readonly widerrufWarnung: string;
};

/**
 * DIE EINE VERZWEIGUNG UEBER DIE SPRACHE (Invariante Q4; Bauform aus Entscheidung
 * P11.13-8, wie `consentThemeCss` fuer die Darstellung).
 *
 * SIE STEHT AN GENAU EINER STELLE. Eine zweite Verzweigung ueber die Sprache entsteht
 * nicht — die vier Erzeuger rufen diese Funktion einmal und lesen danach Felder.
 *
 * DER `never`-ZWEIG IST DER WAECHTER DER VOLLSTAENDIGKEIT NACH AUSSEN: Ein dritter Wert in
 * CONSENT_LANGUAGES macht ihn zum Compiler-Fehler. Er ist ausdruecklich KEIN Rueckfall auf
 * Deutsch — ein unbekannter Wert erreicht diese Funktion gar nicht, weil publishProject ihn
 * vorher abweist (Entscheidung P11.13-37).
 */
export function consentTexts(sprache: ConsentLanguage): ConsentTextTable {
  switch (sprache) {
    case "de":
      return {
        sachtext: CONSENT_TEXT,
        akzeptieren: CONSENT_ACCEPT_LABEL,
        speichern: CONSENT_SAVE_LABEL,
        ablehnen: CONSENT_REJECT_LABEL,
        weg: CONSENT_WAY_LABEL,
        gruppen: CONSENT_GROUPS_LABEL,
        messung: CONSENT_GROUP_MEASURE_LABEL,
        werbung: CONSENT_GROUP_ADS_LABEL,
        leisteAria: CONSENT_BAR_REGION_LABEL,
        fensterAria: CONSENT_MODAL_DIALOG_LABEL,
        widerrufWarnung: CONSENT_REVOKE_WARNING,
      };
    case "en":
      return {
        sachtext: CONSENT_TEXT_EN,
        akzeptieren: CONSENT_ACCEPT_LABEL_EN,
        speichern: CONSENT_SAVE_LABEL_EN,
        ablehnen: CONSENT_REJECT_LABEL_EN,
        weg: CONSENT_WAY_LABEL_EN,
        gruppen: CONSENT_GROUPS_LABEL_EN,
        messung: CONSENT_GROUP_MEASURE_LABEL_EN,
        werbung: CONSENT_GROUP_ADS_LABEL_EN,
        leisteAria: CONSENT_ARIA_LABEL_EN,
        fensterAria: CONSENT_ARIA_LABEL_EN,
        widerrufWarnung: CONSENT_REVOKE_WARNING_EN,
      };
    default: {
      const unhandled: never = sprache;
      throw new Error(
        `consentTexts: unbekannte Sprache ${JSON.stringify(unhandled)}`
      );
    }
  }
}
