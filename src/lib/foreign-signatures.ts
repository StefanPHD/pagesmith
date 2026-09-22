// FREMDE TRACKING-BAUSTEINE — DIE SIGNATURLISTE
// (Phase 11.11, Scheibe 11.11b; bindende Entscheidungen P11.11-7, P11.11-11,
// P11.11-15, P11.11-27, P11.11-28, P11.11-29, P11.11-30 und P11.11-32).
//
// WAS DIESE DATEI IST: die versionierte Liste der bekannten Signaturen — Adressen,
// globale Namen und Rueckfall-Adressen je Anbieter, jede mit ihrer FUNDSTELLE. Sie
// ist REIN: kein React, kein Server, keine IO, KEIN DOM. Das Lesen des Dokuments
// liegt in foreign-scan.ts daneben.
//
// WARUM EINE LISTE, OBWOHL EINE LISTE ALTERT (Roadmap-Zeile 11.11, (e)): Weil JEDES
// Script angezeigt wird (P11.11-3), macht sich das Veralten als FEHLENDE MARKE
// bemerkbar und nicht als Abwesenheit. Die Liste entscheidet ueber das ETIKETT, nicht
// ueber die SICHTBARKEIT — und genau das war der Einwand.
//
// OHNE BELEG KEINE SIGNATUR (P11.11-15). Jeder Eintrag traegt sein `beleg`-Feld im
// Datensatz, damit ein Review Eintrag und Fundstelle nebeneinander sieht, ohne die
// Datei zu verlassen. Eine erfundene Adresse erzeugt einen Fehltreffer, und ein
// Fehltreffer boete in 11.11c fremden Code zum Loeschen an, den niemand gemeint hat.
//
// DIE ERWARTUNG IM TEST WIRD AUS DEM BELEG GETIPPT, NIE VON HIER IMPORTIERT
// (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM
// CODE). Ein Import machte den Waechter zum SPIEGEL, der jeden Tippfehler bestaetigt.
// AUSGENOMMEN ist der STRUKTUR-Waechter: er darf die Liste lesen, weil er keine
// Wortlaute prueft, sondern Eigenschaften (jeder Eintrag hat einen Beleg; keine
// Adresse kommt zweimal vor).
//
// DIE PARKFORM STEHT NICHT AM EINTRAG, und das ist kein Versehen: Sie ist eine
// Eigenschaft des gefundenen KNOTENS, nicht des Anbieters (P11.11-30). Sonst muesste
// jeder Anbieter jede Parkform fuehren, und eine neue Parkform zwaenge zu zwoelf
// Aenderungen statt zu einer.

/**
 * Die drei Klassen, die ein BEKANNTER Anbieter tragen kann.
 *
 * "container" ist die fuenfte Klasse der Erkennung und kam mit P11.11-27 dazu — die
 * Zaehlung "VIER Klassen" in P11.11-12, Satz 3, ist damit ueberholt; es sind
 * `eigen` · pixel · cmp · container · unbekannt. Ein Container wird NIE zum Entfernen
 * angeboten: er ist kein Pixel, und was er nachlaedt, weiss nur der Betreiber.
 */
export type ForeignClass = "pixel" | "cmp" | "container";

export type ForeignSignature = {
  /** Anzeigename in der Fundliste. */
  anbieter: string;
  klasse: ForeignClass;
  /**
   * Teilzeichenketten, die in `src`, `data-src` ODER `data-cmp-src` gesucht werden
   * (P11.11-30: die Adresse steht an drei Orten). Sie werden AUSSERDEM gegen die
   * Adresse eines `<img>`/`<iframe>` gehalten — ein Anbieter kann dieselbe Adresse
   * auf beiden Wegen ausliefern.
   */
  adressen: readonly string[];
  /**
   * Globale Namen und charakteristische Aufrufe. Gesucht wird im RUMPF eines
   * Inline-Scripts und im Wert eines Inline-Handlers (P11.11-12, Satz 7).
   */
  namen: readonly string[];
  /**
   * Adressen des noscript-Gegenstuecks (`<img>` bzw. `<iframe>`). GETRENNT von
   * `adressen`, damit die Fundliste den Rueckfall als solchen benennen kann — und
   * weil er bei Meta und Pinterest ein EIGENER, vom Anbieter dokumentierter Einbauweg
   * ohne jedes Script ist (P11.11-29).
   */
  rueckfall: readonly string[];
  /** Die Fundstelle im Wortlaut. Pflicht (P11.11-15). */
  beleg: string;
};

/**
 * DER ERSTE WURF: zwoelf Eintraege fuer die elf Anbieter aus P11.11-11.
 *
 * GOOGLE STEHT ZWEIMAL, und das ist ein BEFUND und keine Ablage-Laune: Der Anbieter
 * liefert fuer dasselbe Ziel ZWEI Bausteine mit verschiedenen Pfaden, verschiedenen
 * Aufrufen und verschiedenem Rueckfall-Element — den Google-Tag (/gtag/js, kein
 * Rueckfall belegt) und den Tag Manager (/gtm.js, Rueckfall als <iframe>). DER HOST
 * IST BEI BEIDEN DERSELBE; eine Signatur allein auf `googletagmanager.com` koennte
 * sie nicht unterscheiden. Deshalb tragen beide den PFAD.
 *
 * DER GOOGLE-TAG IST HIER "pixel" (P11.11-32, Punkt (b)). In 11.11b ist das folgenlos
 * — die Klasse setzt allein das Etikett, und diese Scheibe bietet keine Handlung an.
 * OB ER IN 11.11c ENTFERNT WERDEN DARF, IST EINE OWNER-FRAGE: derselbe Tag traegt
 * ausweislich der Anbieter-Doku auch Analytics, Campaign Manager, Display & Video 360
 * und Search Ads 360.
 */
export const FOREIGN_SIGNATURES: readonly ForeignSignature[] = [
  // --- DIE FUENF FAN-OUT-ZIELE ------------------------------------------------
  {
    anbieter: "Meta",
    klasse: "pixel",
    adressen: ["connect.facebook.net"],
    namen: ["fbq(", "_fbq"],
    rueckfall: ["www.facebook.com/tr?"],
    beleg: "docs/ziel-befunde.md, Abschnitt Meta (Conversions API), Teil (g)",
  },
  {
    anbieter: "Pinterest",
    klasse: "pixel",
    adressen: ["s.pinimg.com/ct/core.js"],
    namen: ["pintrk("],
    rueckfall: ["ct.pinterest.com/v3/"],
    beleg: "docs/ziel-befunde.md, Abschnitt Pinterest (Conversions API), Teil (ab)",
  },
  {
    anbieter: "TikTok",
    klasse: "pixel",
    adressen: ["analytics.tiktok.com/i18n/pixel/events.js"],
    namen: ["TiktokAnalyticsObject", "ttq.load("],
    // KEIN Rueckfall: Auf der gelesenen Einbau-Seite kommt weder `noscript` noch
    // `<img` vor (Nicht-Treffer mit benannter Achse, je 0). KEINE ENTWARNUNG — die
    // Reichweite ist jene eine Seite.
    rueckfall: [],
    beleg: "docs/ziel-befunde.md, Abschnitt TikTok (Events API 2.0), Teil (i)",
  },
  {
    anbieter: "LinkedIn",
    klasse: "pixel",
    adressen: ["snap.licdn.com/li.lms-analytics/insight.min.js"],
    namen: ["_linkedin_partner_id", "lintrk("],
    rueckfall: ["px.ads.linkedin.com/collect/"],
    beleg: "docs/ziel-befunde.md, Abschnitt LinkedIn (Conversions API), Teil (am)",
  },
  {
    anbieter: "Google-Tag",
    klasse: "pixel",
    adressen: ["googletagmanager.com/gtag/js"],
    namen: ["gtag("],
    // KEIN Rueckfall gefunden; Reichweite: die zwei gelesenen Seiten.
    rueckfall: [],
    beleg:
      "docs/ziel-befunde.md, Abschnitt Google (Google Ads Conversions / GA4), Teil (cs)",
  },
  // --- DER CONTAINER ----------------------------------------------------------
  {
    anbieter: "Google Tag Manager",
    klasse: "container",
    adressen: ["googletagmanager.com/gtm.js"],
    namen: ["gtm.start"],
    rueckfall: ["googletagmanager.com/ns.html"],
    beleg:
      "docs/ziel-befunde.md, Abschnitt Google (Google Ads Conversions / GA4), Teil (ct)",
  },
  // --- DIE SECHS CMPs ---------------------------------------------------------
  {
    anbieter: "Cookiebot",
    klasse: "cmp",
    adressen: ["consent.cookiebot.com/"],
    namen: ["Cookiebot"],
    rueckfall: [],
    beleg: "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-13 (Crawl 1), Cookiebot (a) und (b)",
  },
  {
    anbieter: "Usercentrics",
    klasse: "cmp",
    adressen: ["app.usercentrics.eu/"],
    namen: ["UC_UI_DOMAINS"],
    rueckfall: [],
    beleg:
      "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-13 (Crawl 1), Usercentrics (a) und (b)",
  },
  {
    anbieter: "Klaro",
    klasse: "cmp",
    adressen: ["cdn.kiprotect.com/klaro/"],
    namen: ["klaroConfig"],
    rueckfall: [],
    beleg: "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-13 (Crawl 1), Klaro (a) und (b)",
  },
  {
    anbieter: "OneTrust",
    klasse: "cmp",
    // DIE ADRESSE RUHT AUF EINER MESSUNG AN EINER EINZELNEN INSTALLATION, NICHT AUF
    // DER DOKU — zulaessig allein fuer das ETIKETT, weil bei einem CMP kein Entfernen
    // daranhaengt (P11.11-28). Ein PIXEL bekaeme auf dieser Grundlage KEINE Signatur.
    // Der Pfadbestandteil `202602.1.0` aus jener Messung ist eine VERSIONSANGABE und
    // steht deshalb NICHT hier; tauglich ist der Host.
    adressen: ["cdn.cookielaw.org"],
    namen: ["OptanonWrapper", "OptanonActiveGroups"],
    rueckfall: [],
    beleg:
      "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-25, OneTrust (Messung am DOM von developer.onetrust.com); Methoden aus VERMERK P11.11-13 (b)",
  },
  {
    anbieter: "consentmanager",
    klasse: "cmp",
    adressen: ["delivery.consentmanager.net", "cdn.consentmanager.net"],
    namen: ["cmp_host", "cmp_setStub"],
    rueckfall: [],
    beleg: "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-25, consentmanager (a) und (b)",
  },
  {
    anbieter: "CookieYes",
    klasse: "cmp",
    // BEIDE HOSTS, und das ist P11.11-28: Die Anbieter-Doku widerspricht sich auf
    // DERSELBEN Seite — Fliesstext `cdn.cookieyes.com` mit PUNKT, Direktiven-Tabelle
    // `cdn-cookieyes.com` mit BINDESTRICH. Beide sind belegt, keiner widerlegt; sich
    // fuer einen zu entscheiden hiesse, die Haelfte der Installationen zu verfehlen.
    // DAS PFADMUSTER `client_data/(.*)/script.js` steht NICHT hier: Host und Pfad zu
    // einer URL zusammenzusetzen waere eine FOLGERUNG (VERMERK P11.11-25).
    adressen: ["cdn.cookieyes.com", "cdn-cookieyes.com"],
    namen: ["getCkyConsent", "cookieyes_banner_load"],
    rueckfall: [],
    beleg: "docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-25, CookieYes (a) und (b)",
  },
];
