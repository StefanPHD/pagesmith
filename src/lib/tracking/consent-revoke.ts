// DER WIDERRUF (Phase 11.5, Scheibe 11.5e-2). Traegt die HUELLE des Widerruf-Blocks und
// die drei Konstanten, die Leiste und Modal dafuer teilen — die Kennung des Blocks, den
// globalen Namen und den Text der Warnung. Reiner String-Bau: kein React, kein Netzwerk,
// keine Datenbank, kein server-seitiges Parsen.
//
// WARUM EINE EIGENE DATEI (und nicht consent-bar.ts wie vor Scheibe 11.5e-1): Leiste und
// Modal brauchen DIESELBE Kennung und DENSELBEN Namen — es gibt je Seite nur EINEN
// Widerruf. Laege beides in einer der zwei Oberflaechen-Dateien, wuerde die andere sie von
// dort importieren, und jene Datei waere still zum geteilten Modul geworden. Genau das hat
// die Scheibe 11.5e-1 mit consent-choice.ts aufgeloest; dieselbe Begruendung, derselbe
// Schnitt.
//
// SIE IST REIN: kein `import "server-only"`, kein "use client", keine Datenbank, kein
// Netzwerk, kein DOM zur Bauzeit; sie importiert allein den NAMEN der Speicher-Schnittstelle
// aus consent-store.ts. Eine server-only-Datei waere aus erzeugtem Browser-Code nicht
// erreichbar.
// DER NAME WIRD IMPORTIERT UND NICHT HINGESCHRIEBEN ("ABLEITEN STATT HARDCODEN"): Er steht
// an genau einer Stelle, und ein hier abgeschriebenes Literal liefe beim naechsten
// Umbenennen still ins Leere — der Widerruf traege dann eine Schnittstelle, die es nicht
// gibt, und faende sie erst der Besucher.
//
// ES GIBT KEINEN LAUFZEIT-HELFER. `wrapRevoke` setzt den AUFBAU-String der jeweiligen
// Oberflaeche zur BAUZEIT in die Huelle ein. Der Aufbau selbst steht in consent-bar.ts bzw.
// consent-modal.ts und wird dort fuer BEIDE Gestalten aus EINEM String gebildet — zwei
// Kopien, die auseinanderlaufen koennten, gibt es damit nicht.
//
// SERIALISIERUNGSSICHER WIE DIE OBERFLAECHEN-BLOECKE: Die Huelle enthaelt KEIN `<` ausser
// den zwei Tags des Script-Elements selbst; der eingesetzte Aufbau traegt keins.

import { CONSENT_STORE_API } from "@/lib/tracking/consent-store";
import { embedInScript } from "@/lib/script-embed";

/**
 * DIE ZWEI GESTALTEN EINER EINWILLIGUNGS-OBERFLAECHE (Scheibe 11.5e-2).
 * - "load" — der Block, der beim Laden aufbaut, wenn beide Wachen durchlaufen. Die Gestalt
 *   der Scheiben 11.5d und 11.5d-2, unveraendert und byte-gleich.
 * - "revoke" — derselbe Aufbau, in der Huelle von `wrapRevoke`: kein Aufbau beim Laden,
 *   sondern eine Funktion unter CONSENT_REVOKE_API.
 *
 * ER IST EIN PFLICHT-PARAMETER OHNE VORGABEWERT, aus demselben Grund wie bei
 * `injectPageViewEmitter` und `buildPageViewScript`: Ein Vorgabewert liesse jeden kuenftigen
 * Aufrufer die Gestalt stillschweigend uebergehen, und der Compiler fragte nicht mehr.
 * ACHTUNG: Vitest prueft keine Typen — ein vergessenes Argument fiele dort still in den
 * Lade-Zweig; allein `tsc` meldet es.
 */
export type ConsentSurfaceMode = "load" | "revoke";

/**
 * Kennung des Blocks, `__ps_`-namespaced wie `__ps_cnr`, `__ps_clb`, `__ps_cmo`,
 * `__ps_cns` und `__ps_pve`. SIE DARF KEINE DER ZEICHENKETTEN ENTHALTEN, NACH DENEN DER
 * BESTAND IM AUSGELIEFERTEN TEXT SUCHT: `pagesmith-consent`, `pagesmith-mappings`,
 * `pagesmith-bar`, `pagesmith-modal`, `__ps_cnr`, `__ps_cns`, `__ps_pv`, `__ps_clb`,
 * `__ps_cmo`. W4 in consent-revoke.test.ts haelt das, in beide Richtungen.
 */
export const CONSENT_REVOKE_SCRIPT_ID = "__ps_crv";

/**
 * DER GLOBALE NAME, DEN DER BETREIBER RUFT (Setzung der Scheibe 11.5e-2).
 *
 * ER TRAEGT KEIN `__ps`-PRAEFIX, UND DAS IST ABSICHT: Was NACH AUSSEN gehoert, traegt
 * `pagesmith`; unser eigener Namensraum traegt `__ps`. Heute ist `pagesmithConsent` — der
 * Betreiber-Hook — der EINZIGE globale Name ohne `__ps`, und er ist zugleich das Einzige,
 * was ein Betreiber anfassen soll. Dieser Name ist der zweite.
 *
 * DIE SETZUNG IST AUF GLOBALE JS-NAMEN BESCHRAENKT, UND DIE EINSCHRAENKUNG GEHOERT IN
 * DENSELBEN KOMMENTAR, sonst wird sie mit einer Messung verwechselt: AUF DER ACHSE DER
 * KENNUNGEN TRAEGT SIE NICHT. `pagesmith-consent` (CONSENT_SCRIPT_ID), `pagesmith-mappings`,
 * `pagesmith-bar` und `pagesmith-modal` tragen alle `pagesmith` und sind KEIN
 * Betreiber-Kontrakt; daneben tragen `__ps_cnr`, `__ps_clb`, `__ps_cmo`, `__ps_cns` und
 * `__ps_pve` dieselbe Rolle mit dem anderen Praefix. Wer die Setzung auf Kennungen
 * ausdehnt, dehnt sie auf eine Achse aus, auf der der Bestand ihr widerspricht.
 *
 * ER IST EINE EINBAHNSTRASSE, aus demselben Grund wie ANALYTICS_CONSENT_TARGET: Ab dieser
 * Scheibe steht er in AUSGELIEFERTEM Code, und Betreiber schreiben ihn in ihre eigene
 * Seite. Eine spaetere Umbenennung macht jeden eingebauten Aufruf still zu einem
 * TypeError, den nur der BESUCHER sieht.
 */
export const CONSENT_REVOKE_API = "pagesmithConsentRevoke";

/**
 * Die Warnung, wenn der Widerruf laeuft und es nichts zu widerrufen gibt.
 * WORTLAUT FREIGEGEBEN (G6, Owner 2026-09-16); umlautfrei wie der uebrige Quelltext.
 *
 * SIE IST DIE MEISTGESEHENE MELDUNG DIESER SCHEIBE, NICHT DER TypeError bei
 * ausgeschaltetem Dialog: Der Integrationsfall ist, dass der Betreiber den Link baut, seine
 * Seite laedt, nie entschieden hat und klickt — dann liefert read() "never", und DIESER
 * Text erscheint. Den TypeError sieht er nur, wenn der Schalter auf "Aus" steht.
 *
 * DER ZWEITE SATZ TRAEGT EINEN FALL, DEN DER ERSTE FALSCH BESCHRIEBE: Ruft jemand den
 * Widerruf, WAEHREND DER LADE-DIALOG OFFEN STEHT, liefert read() ebenfalls "never" — der
 * Besucher hat ja noch nicht entschieden. Die Warnung feuert dann und sagt "nichts zu
 * widerrufen", obwohl der Dialog sichtbar auf der Seite steht. DAS IST KEIN DEFEKT UND WIRD
 * NICHT GELOEST, SONDERN BENANNT; der Satz "Steht der Dialog gerade offen, entscheide dort"
 * ist die Antwort darauf. W9 in consent-revoke.test.ts fuehrt den Fall im Kommentar.
 */
export const CONSENT_REVOKE_WARNING =
  "pagesmithConsentRevoke: Es liegt keine gespeicherte Entscheidung vor, die zu widerrufen waere. Steht der Dialog gerade offen, entscheide dort.";

/**
 * Die Huelle des Widerruf-Blocks. `aufbau` ist der AUFBAU-String der jeweiligen
 * Oberflaeche — derselbe, den ihr "load"-Zweig verwendet, nur mit `return false;` als
 * Abbruch und mit der Vormerkung vor dem Einhaengen.
 *
 * BEIM LADEN GESCHIEHT HIER NICHTS AUSSER EINER ZUWEISUNG. Der Block liest weder Hook noch
 * Speicher; er legt eine Funktion an und endet. DAS IST DIE UNTERSCHEIDUNG ZUM NORMALEN
 * WEG, und sie ist kein Zustand, sondern ein AUFRUF VON AUSSEN: Kein Baustein des
 * ausgelieferten Textes ruft diese Funktion. W2 haelt das ueber eine Zaehlung auf den
 * ERZEUGTEN BLOECKEN.
 *
 * DIE VORBEDINGUNG IST DIE UMKEHRUNG DER ZWEITEN WACHE DES LADE-WEGS: dort
 * `read().state !== "never"` -> Abbruch, hier `read().state !== "decided"` -> Abbruch. Die
 * zwei Wege pruefen ENTGEGENGESETZTE Bedingungen; keine Bedingung wird gelockert, und keine
 * Stelle faellt zwei Urteile. Die zwei Wachen des Lade-Wegs bleiben unveraendert, wo sie
 * sind — M15 haelt sie zeichengleich in beiden Oberflaechen-Bloecken.
 *
 * DER HOOK WIRD HIER NICHT ANGEFASST. Das alte Urteil des Besuchers gilt weiter, bis er ein
 * neues faellt; erst ein Knopf ruft write(), und von dort traegt die bindende Entscheidung
 * (11). Der Speicher bleibt unberuehrt (Invariante I6 der Scheibe).
 *
 * `offen` IST DAS ZULETZT EINGEHAENGTE HOST-ELEMENT UND SONST NICHTS — es gibt KEINE
 * zweite Wahrheit ueber die Frage "steht ein Host im Dokument?". Beantwortet wird sie
 * ausschliesslich von seinem EIGENEN `parentNode`, also vom Element selbst. Ein Merker, der
 * "offen" behauptet, koennte davon abweichen, sobald irgendetwas den Host entfernt, ohne ihn
 * mitzufuehren — und entfernt wird er im `finally` von makeButton (consent-choice.ts), das
 * diese Scheibe nicht anfasst. DESHALB WIRD NICHTS "GELEERT": Das Entfernen des Hosts IST
 * das Leeren. W7 und W8 halten beide Richtungen.
 * KEIN `document.querySelector`, KEIN `getElementById`: Gefragt wird nur das Element, das
 * dieser Block selbst angelegt hat — nie das Dokument (Invariante I1).
 *
 * WAS DER RUECKGABEWERT DEM BETREIBER SAGT: `true` — der Dialog steht jetzt auf der Seite.
 * `false` — er steht nicht: es lag keine Entscheidung vor (dann zusaetzlich die Warnung),
 * er stand schon offen, oder der Aufbau war nicht moeglich. EIN AUSGANG FUER MEHRERE
 * URSACHEN IST ABSICHT: Der Betreiber hat genau eine Frage ("steht er?"), und die eine
 * Ursache, die er beheben kann, meldet die Warnung.
 */
export function wrapRevoke(aufbau: string): string {
  return `<script id="${CONSENT_REVOKE_SCRIPT_ID}">
(function(){
  var offen = null;
  window.${CONSENT_REVOKE_API} = function () {
    var api = window.${CONSENT_STORE_API};
    if (!api || typeof api.read !== "function" || typeof api.write !== "function") return false;
    if (offen && offen.parentNode) return false;
    if (api.read().state !== "decided") {
      console.warn(${embedInScript(CONSENT_REVOKE_WARNING)});
      return false;
    }
${aufbau}    return true;
  };
})();
</script>`;
}
