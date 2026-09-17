/**
 * KOMPATIBILITAETS-RIEGEL FUER DIE ZWEI EDITOR-RAHMEN (Scheibe 11.12a).
 *
 * Reiner String-Bau: kein DOM, kein React, kein Netzwerk.
 *
 * WAS ER LOEST: Beide Editor-Rahmen laufen mit sandbox="allow-scripts" OHNE
 * allow-same-origin. Dort wirft JEDER Zugriff auf document.cookie, localStorage
 * und sessionStorage einen SecurityError — auch das blosse LESEN der Eigenschaft.
 * Importierter Fremdcode faengt das meist nicht ab; steht der Seitenaufbau im
 * SELBEN Skript hinter dem Wurf, entfaellt er, und der Rahmen bleibt leer
 * (GEMESSEN, Chromium 153, docs/claude-history/phase-11.12-vorschau-blocker.md,
 * VERMERK P11.12-1, Teile A-C).
 * Dieser Riegel ersetzt die drei Schnittstellen durch Speicher im
 * Arbeitsspeicher, bevor Fremdcode sie erreicht.
 *
 * ER IST EIN KOMPATIBILITAETS-MITTEL UND KEINE SICHERHEITSSCHICHT
 * (Entscheidung P11.12-1). Die Grenze bleibt der Sandkasten. Er ist ueber
 * Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.call(document)
 * umgehbar — DAS IST KEIN MANGEL: wer ihn umgeht, bekommt den Fehler, nicht den
 * Zugang. Es gibt nichts zu erbeuten, was ohne ihn verschlossen waere.
 *
 * ===================================================================
 * DIESE DATEI WIRD VON GENAU ZWEI srcDoc-MEMOS IN CodeImporter GERUFEN
 * UND VON NIRGENDWO SONST.
 * Wer sie in generate.ts, detect.ts oder app/projects/actions.ts importiert,
 * hebt die Bauart-Trennung aus Entscheidung P11.12-2 auf — und ein
 * Modus-Parameter waere dieselbe Aufhebung mit Verzierung. Der Riegel darf in
 * KEINEM Export-, Download- oder Veroeffentlichungsdokument stehen: was einmal
 * im ausgelieferten Text steht, bekommen wir nicht mehr herunter
 * (docs/immer-beachten.md, WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE
 * EINBAHNSTRASSE). Waechter: die zwei ARTEFAKT-RIEGEL-Laeufe in
 * CodeImporter.test.tsx, je mit Positivkontrolle in BEIDEN Rahmen.
 * ===================================================================
 *
 * DREI BENANNTE GRENZEN — keine davon ist ein Defekt, und ungeschrieben haelt
 * die naechste Runde jede davon fuer einen:
 *
 * (1) indexedDB IST NICHT ABGEDECKT und wirft im Rahmen weiter
 *     (ARCHITEKT-ENTSCHEIDUNG 2026-09-17). Gemessen: null Fundstellen in src/,
 *     nichts von uns braucht es. Ein HALBER IndexedDB-Ersatz waere schlechter
 *     als keiner — Code, der ihn feature-detected und spaeter an einer kaputten
 *     Transaktion scheitert, scheitert unklarer als Code, der sofort den
 *     SecurityError sieht.
 *
 * (2) "ERSTES SKRIPT DES DOKUMENTS" GILT FUER DEN NORMALISIERTEN FALL.
 *     annotateAndDetect und generateFunctional geben einen DOMParser-Rundlauf
 *     zurueck; dort verschiebt der Parser jedes Skript in head oder body, vor
 *     <head> kann also keines stehen. NUR im catch-Pfad von generateFunctional
 *     kommt ROHES Kunden-HTML an — dort kann ein Skript zwischen <html> und
 *     <head> stehen, und dann greift der Riegel zu spaet.
 *
 * (3) DER EIGENSCHAFTS-ZUGRIFF IST NACHGEBILDET, NICHT ECHT. localStorage.foo,
 *     "foo" in localStorage, for..in, Object.keys und JSON.stringify gehen ueber
 *     Proxy-Traps. AUFLAGE, OHNE DIE DER RIEGEL SCHLIMMER WAERE ALS GAR KEINER:
 *     getOwnPropertyDescriptor MUSS configurable:true UND enumerable:true
 *     liefern, sonst wirft Object.keys(localStorage) einen
 *     Proxy-Invarianten-TypeError. Ein eigener Lauf deckt das ab.
 *
 * WARUM DAS START-TAG ZEICHENWEISE GELESEN WIRD UND NICHT PER indexOf(">"):
 * GEMESSEN (CC, 2026-09-17, Chromium 153): Der Serialisierer dieses Browsers
 * escaped in Attributwerten auch "<" und ">" (a>b wird zu a&gt;b). Ein naives
 * indexOf(">") waere auf dem normalisierten Pfad DIESES Browsers also zufaellig
 * sicher. Verlassen wird sich darauf NICHT: der Editor laeuft im Browser des
 * Betreibers, und der catch-Pfad liefert rohes HTML, in dem ein ">" im
 * Attributwert unescaped stehen kann. Ein zerschnittenes Start-Tag zerstoerte
 * das Dokument — der Scanner kostet zehn Zeilen und macht die Klasse unmoeglich.
 */

/** Kennung des Riegel-Blocks. Anker aller Waechter-Laeufe. */
export const PREVIEW_STORAGE_SHIM_ID = "__ps_sbx";

// (?=[\s/>]) IST TRAGEND, NICHT KOSMETISCH: ohne den Lookahead matcht <head auch
// <header>, und das steht auf fast jeder importierten Landingpage — der Riegel
// landete dann MITTEN im <header>-Start-Tag. GEMESSEN (CC, 2026-09-17).
const HTML_START = /<html(?=[\s/>])/i;
const HEAD_START = /<head(?=[\s/>])/i;

/**
 * Index HINTER dem ">" des Start-Tags, das bei `tagStart` beginnt, oder -1.
 * Liest zeichenweise und achtet auf Anfuehrungszeichen, damit ein ">" INNERHALB
 * eines Attributwerts das Tag nicht vorzeitig beendet.
 */
function endOfStartTag(html: string, tagStart: number): number {
  let quote = "";
  for (let i = tagStart; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = "";
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === ">") return i + 1;
  }
  return -1;
}

/** Einsetz-Index (hinter dem <head…>-Start-Tag) oder -1, wenn es keinen gibt. */
function headInsertIndex(html: string): number {
  // ANKER ZUERST: ab hinter dem <html>-Start-Tag suchen. Das schliesst ohne
  // Parser zwei Faelle aus — ein "<head " in einem Kommentar VOR <html>, und
  // eines in einem Attributwert AM <html>-Tag.
  let from = 0;
  const htmlHit = HTML_START.exec(html);
  if (htmlHit) {
    const end = endOfStartTag(html, htmlHit.index);
    if (end < 0) return -1;
    from = end;
  }

  const headHit = HEAD_START.exec(html.slice(from));
  if (!headHit) return -1;
  return endOfStartTag(html, from + headHit.index);
}

/**
 * Der Riegel-Block. NIMMT KEINE ARGUMENTE UND LIEFERT EINE KONSTANTE.
 *
 * Das ist eine Auflage, keine Stilfrage: Eine gewuerfelte Kennung oder ein
 * Zeitstempel erzeugte bei JEDEM Neuberechnen des Memos einen anderen String.
 * Beim functionalHtml-Memo faellt das ins Gewicht — settings steht in seiner
 * Dep-Liste und wechselt an mehreren Saat-Punkten die Referenz, es rechnet also
 * auch dann neu, wenn der Inhalt gleich bleibt. Jeder solche Lauf ergaebe ein
 * neues srcDoc und damit einen iframe-Reload ohne Anlass.
 *
 * WAS DEN DETERMINISMUS NICHT DECKT — GEMESSEN, NICHT ANGENOMMEN (CC,
 * 2026-09-17, Mutation "Kennung gewuerfelt"): der Bestandstest "Text-Mapping-
 * Aenderung bei unveraendertem Code erzeugt KEIN neues srcDoc" bleibt dabei
 * GRUEN. Er kann es nicht fangen, weil das editHtml-Memo bei unveraenderten Deps
 * gar nicht neu rechnet und den zwischengespeicherten String wiederverwendet.
 * DER EINZIGE WAECHTER IST DER DETERMINISMUS-LAUF in preview-storage-shim.test.ts.
 *
 * Der Text enthaelt kein literales Schluss-Tag eines Skripts (Praezedenz:
 * src/lib/tracking/consent-setter.ts) und wirft in keinem Zweig.
 */
export function buildPreviewStorageShimScript(): string {
  return `<script id="${PREVIEW_STORAGE_SHIM_ID}">
(function () {
  function makeStore() {
    // Object.create(null), NICHT {}: sonst gaebe getItem("toString") eine
    // Funktion zurueck statt null.
    var m = Object.create(null);
    function keys() { return Object.keys(m); }
    var api = {
      getItem: function (k) { k = String(k); return k in m ? m[k] : null; },
      setItem: function (k, v) { m[String(k)] = String(v); },
      removeItem: function (k) { delete m[String(k)]; },
      clear: function () { m = Object.create(null); },
      key: function (i) { var ks = keys(); i = Number(i) >>> 0; return i < ks.length ? ks[i] : null; }
    };
    function isApi(p) { return Object.prototype.hasOwnProperty.call(api, p); }
    // Ziel ist ein LEERES Objekt: es traegt keine eigenen Eigenschaften, also
    // kann keine Proxy-Invariante ueber das Ziel verletzt werden.
    return new Proxy({}, {
      get: function (t, p) {
        if (typeof p !== "string") return undefined;
        if (p === "length") return keys().length;
        if (isApi(p)) return api[p];
        return p in m ? m[p] : undefined;
      },
      set: function (t, p, v) {
        if (typeof p === "string" && p !== "length" && !isApi(p)) m[p] = String(v);
        return true;
      },
      has: function (t, p) {
        if (typeof p !== "string") return false;
        return p === "length" || isApi(p) || p in m;
      },
      deleteProperty: function (t, p) { if (typeof p === "string") delete m[p]; return true; },
      ownKeys: function () { return keys(); },
      getOwnPropertyDescriptor: function (t, p) {
        if (typeof p === "string" && p in m) {
          return { value: m[p], writable: true, enumerable: true, configurable: true };
        }
        return undefined;
      }
    });
  }

  // DREI UNABHAENGIGE EINBAUTEN, jeder fuer sich gefangen: scheitert einer,
  // laufen die anderen. Jeder Fehlschlag heisst "kein Riegel an dieser Stelle"
  // und damit das heutige Verhalten — nie ein Wurf aus dem Riegel selbst.
  function install(name) {
    try {
      // defineProperty, KEINE Zuweisung: localStorage ist ein Accessor ohne
      // Setter, window.localStorage = x schluege still fehl. Der Altwert wird
      // NIE gelesen — das Lesen IST der Wurf.
      Object.defineProperty(window, name, { value: makeStore(), configurable: true });
    } catch (e) {}
  }
  install("localStorage");
  install("sessionStorage");

  try {
    var jar = [];
    function at(n) { for (var i = 0; i < jar.length; i++) { if (jar[i][0] === n) return i; } return -1; }
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: function () {
        var out = [];
        for (var i = 0; i < jar.length; i++) { out.push(jar[i][0] + "=" + jar[i][1]); }
        return out.join("; ");
      },
      set: function (raw) {
        var s = String(raw);
        var semi = s.indexOf(";");
        var pair = semi < 0 ? s : s.slice(0, semi);
        var eq = pair.indexOf("=");
        if (eq <= 0) return;
        var name = pair.slice(0, eq).trim();
        if (!name) return;
        var value = pair.slice(eq + 1).trim();
        // LOESCHEN IST PFLICHT-ZWEIG: 'x=; expires=Thu, 01 Jan 1970 …' ist die
        // verbreitetste Loesch-Zeile ueberhaupt; ohne sie wird eine Seite einen
        // Wert nie wieder los.
        var dead = false;
        var attrs = semi < 0 ? [] : s.slice(semi + 1).split(";");
        for (var j = 0; j < attrs.length; j++) {
          var a = attrs[j].trim();
          var ae = a.indexOf("=");
          var an = (ae < 0 ? a : a.slice(0, ae)).trim().toLowerCase();
          var av = ae < 0 ? "" : a.slice(ae + 1).trim();
          if (an === "max-age") { if (Number(av) <= 0) dead = true; }
          else if (an === "expires") { var t2 = Date.parse(av); if (t2 === t2 && t2 <= Date.now()) dead = true; }
        }
        var idx = at(name);
        if (dead) { if (idx >= 0) jar.splice(idx, 1); return; }
        if (idx >= 0) jar[idx][1] = value; else jar.push([name, value]);
      }
    });
  } catch (e) {}
})();
</` + `script>`;
}

/**
 * Setzt den Riegel als ERSTEN Knoten in den <head> des uebergebenen Dokuments.
 *
 * FINDET SIE KEINEN EINSETZPUNKT, GIBT SIE DIE EINGABE UNVERAENDERT ZURUECK —
 * und das ist der tragende Grund, warum hier eine String-Operation genuegt und
 * kein zweiter DOMParser-Rundlauf noetig ist: Der schlimmste Ausgang ist "kein
 * Riegel", also das heutige Verhalten. Kein Loch, keine Verschlechterung, nur
 * keine Verbesserung (Entscheidung P11.12-1).
 *
 * EIN ZWEITER RUNDLAUF WAERE ZUDEM AKTIV SCHAEDLICH: editHtml traegt HINTER
 * </html> den Varianten-Marker (editPreviewHtml, src/lib/generate.ts). Ein
 * erneutes Parsen zoege den Kommentar INNERHALB von </html> — der Marker bliebe
 * auffindbar, seine begruendete Position waere still zerstoert.
 */
export function withPreviewStorageShim(html: string): string {
  if (!html) return html;
  const at = headInsertIndex(html);
  if (at < 0) return html;
  return html.slice(0, at) + buildPreviewStorageShimScript() + html.slice(at);
}
