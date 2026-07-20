/**
 * Analytics-Event-Vokabular (Phase 8 Scheibe 2a).
 *
 * BEWUSST OHNE `import "server-only"`: die Konstante wird in Scheibe 2b auch vom
 * PageView-Emitter gebraucht, der als String im Wiring-Script gebaut wird (generate.ts /
 * tracking/meta.ts laufen auch im Client-Bundle). Eine server-only-Fessel wuerde die
 * gemeinsame Wahrheitsquelle sprengen und zu einem zweiten, driftenden Literal fuehren.
 *
 * Eigene Datei statt tracking/meta.ts: der PageView ist UNSER Analytics-Event, kein
 * Meta-Event. tracking/meta.ts ist bewusst die ISOLIERTE Meta-Einheit — ein
 * plattform-neutraler Token gehoert dort nicht hinein.
 */

/**
 * RESERVIERTER Event-Name unseres eigenen PageView-Emitters (Scheibe 2b).
 *
 * Der Name ist BEWUSST namespaced und NICHT "PageView": TrackConfig.event ist ein FREIER
 * Nutzer-String (lib/mappings.ts), und ueber trackCustom ist JEDER Name erlaubt — ein
 * Marketer kann "PageView" heute schon als legitimes Custom-Event angelegt haben. Ein
 * Ausschluss auf "PageView" wuerde dessen CAPI-Forward LAUTLOS abschalten (kein Fehler,
 * nur verschwundene Conversions). Dieser Token ist praktisch nicht versehentlich
 * eintippbar.
 */
export const PAGEVIEW_EVENT = "__ps_pageview";

/**
 * Entscheidet, ob ein Event an die Meta-CAPI weitergereicht wird.
 *
 * NEGATIV-Ausschluss von GENAU EINEM Token — KEINE Allowlist. Begruendung: die Menge der
 * Conversion-Namen ist UNBESCHRAENKT (Standard-Events + beliebige Custom-Namen), eine
 * Allowlist schnitte Custom-Events still vom Forward ab. Jeder heutige Event-Name liefert
 * hier true; nur unser eigener PageView wird ausgeschlossen (er gehoert in unsere
 * Analytics, nicht als Conversion zu Meta).
 */
export function isForwardable(eventType: string): boolean {
  return eventType !== PAGEVIEW_EVENT;
}
