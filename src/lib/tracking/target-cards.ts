// DIE BESCHRIFTUNGEN JE ZIEL — REINE DATEN (Scheibe 3 des Schnitts der Phase 11.2).
// Keine Direktive, kein React, kein DOM, kein Netzwerk, keine Datenbank; der einzige
// Import ist der TYP der Ziel-Union.
//
// WOHER SIE KOMMEN: Typ und Tabelle standen bis zum 2026-08-29 in
// components/TargetCard.tsx und sind ZEICHENGLEICH hierher gewandert — kein Wort
// umformuliert, keine Zeile umsortiert.
//
// WARUM SIE UMGEZOGEN SIND, und der Grund ist eine NICHT-ENTSCHEIDBARKEIT und keine
// Praeferenz: Die Aktion setCapiToken (app/projects/actions.ts, "use server") muss ihr
// Urteil "traegt dieses Ziel ein Geheimnis-Feld?" aus DERSELBEN Quelle ableiten wie die
// Karte — sonst gaebe es zwei Instanzen, die dieselbe Frage beantworten, und die laufen
// auseinander. Ob eine "use server"-Datei einen Wert aus einer "use client"-Datei
// importieren darf, ist AM CODE NICHT ENTSCHEIDBAR (GEMESSEN als Nicht-Entscheidbarkeit,
// CC 2026-08-29): Die Projektregel zu "use server"-Dateien bindet deren EXPORTE, nicht
// ihre Importe, und der Bestand kennt keinen solchen Import.
// EIN REINES lib-MODUL IST UNTER BEIDEN AUSGAENGEN RICHTIG und zugleich der einzige
// gelebte Weg ueber diese Grenze — @/lib/settings und @/lib/tracking/consent-targets
// werden heute schon von einer "use server"-Datei UND von einer "use client"-Datei
// gelesen.
//
// KEIN RE-EXPORT AUS components/TargetCard.tsx, und das ist ENTSCHIEDEN (ARCHITEKT,
// 2026-08-29): Ein Re-Export spart drei Importpfade und schafft ZWEI ADRESSEN fuer EINE
// Sache — die Karte zoege ueber die Client-Datei, die Aktion ueber dieses Modul. Die
// naechste Runde griffe aus dem Server-Kontext zur falschen.
//
// KEINE AUFTEILUNG IN "Beschriftungen hier, Geheimnis-Felder dort": Das WAERE die zweite
// Liste, die der Zuschnitt verbietet. Eine Quelle, ein Ort.

import type { TrackingTarget } from "@/lib/settings";

/**
 * Was eine Plattform an Beschriftung mitbringt.
 *
 * ZIEL-SPEZIFISCHE BESCHRIFTUNGEN SIND FACHLICH BEGRUENDET, NICHT TEST-GETRIEBEN:
 * "CAPI-Token" ist METAS Vokabular — Pinterest hat keinen CAPI-Token. Ein
 * gemeinsamer Text waere fachlich falsch UND machte jede Abfrage mehrdeutig, die
 * heute auf Metas Begriffe zeigt. Beides zeigt in dieselbe Richtung; die Fachlage
 * ist der Grund, die Eindeutigkeit die Folge.
 *
 * DAS FELD hasAdapter IST MIT SCHEIBE C2 ENTFALLEN. Es stand hier und steuerte den
 * Folgenlosigkeits-Hinweis — und war damit die ZWEITE Behauptung ueber dieselbe
 * Tatsache neben den Ziel-Zweigen im Verteiler; die beiden waren durch nichts
 * verbunden. Die Tatsache steht jetzt EINMAL, in TARGETS_WITH_ADAPTER
 * (lib/tracking/target-adapters.ts), und erreicht diese Karte als PROP.
 * WARUM ALS PROP UND NICHT DURCH EIGENEN ZUGRIFF AUF DIE LISTE: Nur so ist der
 * Hinweis-Zweig im Test erreichbar, ohne Modulzustand zu mutieren — und genau das
 * ist hier schon einmal begruendet verworfen worden (s. den Zweig selbst).
 * DIESE KONFIGURATION BESCHREIBT SEITHER NUR NOCH BESCHRIFTUNGEN. Ueber Adapter
 * behauptet sie nichts mehr.
 */
/**
 * DIE DREI OEFFENTLICHEN FELDER SIND SEIT 11.1a OPTIONAL — UND IHRE ABWESENHEIT IST DER
 * SCHALTER (Variante C des freigegebenen Plans).
 *
 * WARUM UEBERHAUPT: Das vierte Ziel hat kein oeffentliches Feld, das diese Scheibe
 * anbieten duerfte. Seine Kennung ist eine Conversion-Regel-URN, die JE EREIGNISTYP
 * gilt; wo sie abgelegt wird, ist ausdruecklich NICHT entschieden (Trigger (ii) der
 * Primaerschluessel-Entscheidung, CLAUDE.md "## Offene Punkte"). Ein Eingabefeld
 * anzubieten hiesse, die Ablage im CLIENT-besessenen Einstellungs-Blob faktisch zu
 * entscheiden — durch die Hintertuer und ohne Beschluss.
 *
 * NACHGETRAGEN (Scheibe 2 der Phase 11.2), UND DER ABSATZ DARUEBER BLEIBT WOERTLICH:
 * Der Halbsatz "wo sie abgelegt wird, ist ausdruecklich NICHT entschieden" beschrieb
 * den Stand vom 2026-08-19 und ist ueberholt. TRIGGER (ii) IST GEPRUEFT UND VERNEINT
 * (ARCHITEKT, 2026-08-31): Eine Kennung, die der Betreiber SEHEN und AENDERN koennen
 * muss, ist kein Geheimnis im Sinne von project_secrets — jene Tabelle traegt RLS
 * aktiv und keine einzige Policy und ist bewusst unlesbar. Beide Kennungsformen
 * liegen damit im Einstellungs-Blob, und zwar per Beschluss statt durch die
 * Hintertuer. Die volle Begruendung und ihre GRENZE (sie ruht auf einem NICHT-Treffer,
 * nicht auf einem Beleg) stehen in docs/aktiver-stand.md, Festlegung (2) des
 * Zuschnitts der Scheibe 2.
 * WAS DER ABSATZ DARUEBER WEITERHIN RICHTIG SAGT: dass die Abwesenheit der Felder der
 * Schalter ist, und dass die URN JE EREIGNISTYP gilt. Nur die Ablage-Frage ist
 * beantwortet.
 *
 * WARUM DIE ABWESENHEIT UND KEIN EIGENES FLAG: Ein Flag NEBEN den drei Feldern waere
 * eine zweite Wahrheit ueber dieselbe Sache — es koennte "kein Feld" sagen, waehrend
 * eine Beschriftung danebensteht. So gibt es nur eine Quelle.
 *
 * WAS DER TYP NICHT VERHINDERT, ausdruecklich benannt statt behauptet: Er verbietet
 * eine HALB gefuellte Gruppe nicht (Label ohne Platzhalter). Die Alternative — die drei
 * in ein verschachteltes Objekt zu ziehen — haette sechzehn bestehende Testzeilen
 * umgeschrieben, darunter Waechter ueber ganz andere Entscheidungen. Der Preis dieser
 * Wahl ist diese Luecke; die Komponente liest die drei ausschliesslich INNERHALB des
 * einen Zweiges, der an `publicLabel` haengt.
 */
/**
 * DIE DREI GEHEIMNIS-FELDER SIND SEIT DER SCHEIBE 3 EBENFALLS OPTIONAL — UND IHRE
 * ABWESENHEIT IST DERSELBE SCHALTER (ARCHITEKT, 2026-08-29).
 *
 * WARUM: Das fuenfte Ziel nimmt sein Zugangsdatum NICHT als eingefuegten Text entgegen.
 * Es entsteht ueber einen Autorisierungs-Fluss und liegt CHIFFRIERT in
 * project_secrets.secret_enc; die Klartext-Spalte secret bleibt dort NULL, und der CHECK
 * project_secrets_secret_genau_eines erzwingt genau eines von beiden. Ein Eingabefeld
 * anzubieten hiesse, einen Klartext in eine Zeile zu schreiben, deren Geheimnis
 * chiffriert gehoert.
 *
 * DIESELBE BAUFORM WIE OBEN UND AUS DEMSELBEN GRUND: kein Flag daneben, das "kein Feld"
 * sagen koennte, waehrend eine Beschriftung dasteht.
 *
 * WAS DER TYP DAMIT VERLIERT, und es ist der Preis dieser Wahl: Er erzwingt fuer die VIER
 * bestehenden Ziele kein Geheimnis-Feld mehr — ein spaeterer Eingriff koennte es bei
 * meta, pinterest, tiktok oder linkedin still weglassen, und der Compiler schwiege.
 * WAS HEUTE EIN PFLICHTFELD ERZWANG, ERZWINGT AB JETZT EIN WAECHTER
 * (tracking/target-cards.test.ts): "die Menge der Ziele ohne Geheimnis-Feld ist genau
 * {google}". Dieselbe Figur wie bei LEGACY_CONSENT_ROLE, wo ebenfalls kein Typ, sondern
 * ein Test die tragende Eigenschaft haelt.
 */
export type TargetCardConfig = {
  name: string;
  publicLabel?: string;
  publicHint?: string;
  publicPlaceholder?: string;
  secretLabel?: string;
  secretPlaceholderNew?: string;
  secretPlaceholderReplace?: string;
};

export const TARGET_CARDS: Record<TrackingTarget, TargetCardConfig> = {
  meta: {
    name: "Meta",
    publicLabel: "Meta-Pixel-ID",
    publicHint: "Öffentlich, steht im Seitenquelltext",
    publicPlaceholder: "z.B. 123456789012345",
    secretLabel: "Meta CAPI-Token",
    secretPlaceholderNew: "CAPI-Token einfügen",
    secretPlaceholderReplace: "Neuen Token eingeben zum Ersetzen",
  },
  // DIE DREI OEFFENTLICHEN FELDER NENNEN DIE KONTO-KENNUNG (Phase 11, elfte
  // Scheibe). Sie nannten bis dahin die TAG-Kennung des Browser-Tags — und den
  // injizieren wir gar nicht; der Adapter braucht die Kennung, die im
  // Endpunkt-PFAD steht. Zwei verschiedene Nummern im selben Anbieter-Konto,
  // und der Unterschied ist fuer den Betreiber unsichtbar.
  //
  // (1) DAS ANBIETER-PRAEFIX BLEIBT, obwohl der Kartenname es schon traegt: Die
  //     Karte des ersten Ziels ist genauso gebaut ("Meta-Pixel-ID"). Zwei
  //     Beschriftungen in verschiedener Bauart waeren schlechter als eine lange.
  //     "Anzeigenkonto-ID" ist der Wortlaut, den der Betreiber im Anbieter-Konto
  //     wiederfindet — nicht die interne Bezeichnung "Konto-Kennung" und nicht
  //     der Schnittstellen-Name ad_account_id.
  // (2) DER HILFETEXT TRIFFT EINE DOPPELAUSSAGE, die auf dieser Karte bisher
  //     keinen Ausdruck hatte: HERKUNFT plus ABGRENZUNG. Er ist NICHT mehr der
  //     des ersten Ziels — dort ist "steht im Seitenquelltext" wahr, weil
  //     buildMetaRuntime die Kennung als PS_PIXEL_ID einbettet; hier injiziert
  //     kein Erzeuger etwas, es landet allein der Consent-Schluessel. "Server-…"
  //     ist ausgeschlossen, weil es mit dem Untertext des Geheimnis-Feldes
  //     kollidierte ("Server-Side, geheim") — und genau dieser Unterschied ist
  //     das, was die Karte erklaeren muss.
  // (3) DER PLATZHALTER IST ABSTEIGEND, damit er nicht als Kuerzung von Metas
  //     aufsteigendem Beispiel gelesen wird. Er darf Metas Zeichenkette nicht
  //     ENTHALTEN — CodeImporter.test.tsx waehlt Metas Feld ueber dessen
  //     Platzhalter, per Teilstring-Muster.
  pinterest: {
    name: "Pinterest",
    publicLabel: "Pinterest-Anzeigenkonto-ID",
    publicHint: "Aus dem Anzeigenkonto, nicht im Seitenquelltext",
    publicPlaceholder: "z.B. 987654321098",
    secretLabel: "Pinterest-Zugangsdaten",
    secretPlaceholderNew: "Zugangsdaten einfügen",
    secretPlaceholderReplace: "Neue Zugangsdaten eingeben zum Ersetzen",
  },
  // DAS DRITTE ZIEL. Die oeffentliche Kennung heisst hier tatsaechlich Pixel-ID —
  // anders als beim zweiten Ziel, wo der Adapter die ANZEIGENKONTO-Kennung braucht
  // und die Karte deshalb umbenannt werden musste. Der Hilfetext folgt derselben
  // Doppelaussage wie dort (HERKUNFT plus ABGRENZUNG): Die Kennung stammt aus dem
  // Events Manager des Anbieters, und wir injizieren KEIN Browser-Tag — im
  // Seitenquelltext landet allein der Consent-Schluessel.
  // DER PLATZHALTER IST ABSTEIGEND und enthaelt Metas aufsteigende Beispielziffern
  // NICHT: CodeImporter.test.tsx waehlt Metas Feld ueber dessen Platzhalter, per
  // Teilstring-Muster.
  tiktok: {
    name: "TikTok",
    publicLabel: "TikTok-Pixel-ID",
    publicHint: "Aus dem Events Manager, nicht im Seitenquelltext",
    publicPlaceholder: "z.B. CABCDE0123FGHIJKLMNO",
    secretLabel: "TikTok-Zugangsdaten",
    secretPlaceholderNew: "Zugangsdaten einfügen",
    secretPlaceholderReplace: "Neue Zugangsdaten eingeben zum Ersetzen",
  },
  // DAS VIERTE ZIEL — DIE ERSTE KARTE OHNE OEFFENTLICHES FELD (11.1a). Die drei
  // public-Felder FEHLEN, und das ist der Schalter, nicht ein Versehen: s. die
  // Begruendung am Typ. Die Karte legt hier ausschliesslich das Zugangsdatum ab.
  // KEIN EIGENER HILFETEXT ZUM FEHLENDEN FELD: Die Karte sagt ueber die Auslieferung
  // bereits eine Zeile ("Auslieferung folgt — dieses Ziel sendet noch nicht"), und eine
  // zweite Erklaerung daneben waere die zweite Aussage ueber dieselbe Sache.
  linkedin: {
    name: "LinkedIn",
    secretLabel: "LinkedIn-Zugangsdaten",
    secretPlaceholderNew: "Zugangsdaten einfügen",
    secretPlaceholderReplace: "Neue Zugangsdaten eingeben zum Ersetzen",
  },
  // DAS FUENFTE ZIEL — DIE EINZIGE KARTE MIT OEFFENTLICHEM UND OHNE GEHEIMNIS-FELD
  // (Scheibe 2 der Phase 11.2). Nur EINE Gruppe fehlt, und ihre Abwesenheit ist der
  // Schalter:
  // - DAS OEFFENTLICHE FELD IST MIT SCHEIBE 2 DAZUGEKOMMEN. Es traegt die
  //   GOOGLE-ADS-KUNDENNUMMER (operatingAccount.accountId) — EINEN Wert je Projekt.
  //   ERSETZT — HIER STAND "KEIN OEFFENTLICHES FELD: Google braucht ZWEI Skalare, wo
  //   pixelId einen traegt (Kundennummer und Ziel-Kennung)". DIE AUSSAGE WAR FALSCH,
  //   und sie ist der Grund, warum das Feld so lange fehlte: productDestinationId ist
  //   KEIN projektweiter Skalar. Sie gilt je Conversion-Action und damit faktisch je
  //   Ereignistyp (GELESEN, docs/ziel-befunde.md, Google-Abschnitt, Teil (k)/C3) und
  //   liegt deshalb auf der EREIGNIS-ACHSE (settings.pixels.google.conversionRules,
  //   Bereich MESSEN), nicht auf dieser Karte. Es sind zwei Kennungen auf ZWEI
  //   VERSCHIEDENEN ACHSEN, nicht zwei Skalare.
  //   SACHKORREKTUR, KEIN STEMPEL: Die alte Fassung wuerde beim naechsten Lesen erneut
  //   zu dem Schluss fuehren, dieser Slot reiche fuer Google nicht.
  //   WAS DAMIT FAELLT, UND ZWAR ABSICHTLICH: das erste der vier Tore der Scheibe 3.
  //   settings.pixels.google kann ab hier ueber die Oberflaeche entstehen. Die tragende
  //   Schicht war ohnehin das ZWEITE Tor (die Klartext-Spalte secret bleibt NULL) — das
  //   erste war eine UI-ABWESENHEIT und kein Riegel, weil saveProject den
  //   Einstellungs-Blob unvalidiert schreibt. Nach Tor A tragen Tor B UND Tor D, und
  //   Tor D (kein Eintrag in TARGETS_WITH_ADAPTER) haelt unabhaengig.
  //   DIE BESCHRIFTUNG FOLGT DER DOPPELAUSSAGE DER ZWEI NACHBARKARTEN (HERKUNFT plus
  //   ABGRENZUNG): Die Nummer stammt aus dem Google-Ads-Konto, und wir liefern KEIN Tag
  //   aus — im Seitenquelltext landet allein der Consent-Schluessel.
  //   DER PLATZHALTER ZEIGT DIE FORM, IN DER DER ANBIETER SIE ANZEIGT — MIT
  //   Bindestrichen. Das ist Absicht und kein Widerspruch zur Umformung: Der Betreiber
  //   soll wiedererkennen, was er abschreibt; die Bindestriche fallen beim Eintragen
  //   (NORMALIZE_PIXEL_ID in lib/settings.ts). Er enthaelt Metas aufsteigende
  //   Beispielziffern NICHT — CodeImporter.test.tsx waehlt Metas Feld per
  //   Teilstring-Muster ueber dessen Platzhalter.
  // - KEIN GEHEIMNIS-FELD: Das Zugangsdatum entsteht ueber den Autorisierungs-Fluss und
  //   liegt chiffriert; ein eingefuegter Klartext hat in dieser Zeile nichts zu suchen.
  //   setCapiToken weist ein Ziel ohne Geheimnis-Feld deshalb ab, VOR jedem DB-Zugriff,
  //   und leitet sein Urteil aus GENAU DIESER Tabelle ab — nicht aus einer zweiten Liste.
  // WAS DIE KARTE AUSSERDEM TRAEGT: einen Verbinden-Weg und den bestehenden
  // Trennen-Weg. Beide leben in der Komponente, nicht hier — diese Datei beschreibt
  // ausschliesslich Beschriftungen.
  google: {
    name: "Google",
    publicLabel: "Google-Ads-Kundennummer",
    publicHint: "Aus dem Google-Ads-Konto, nicht im Seitenquelltext",
    publicPlaceholder: "z.B. 987-654-3210",
  },
};
