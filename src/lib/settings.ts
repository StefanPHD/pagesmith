// Reine Projekt-Einstellungs-Logik (kein React, kein Server). Unit-testbar, siehe
// settings.test.ts.
//
// Projektweite Einstellungen, plattform-GENESTET (Owner-Direktive Omnichannel):
//   settings.pixels.<platform>.<config>
// In 1b existiert NUR Meta (settings.pixels.meta.pixelId). Die Nest-FORM traegt
// weitere Plattformen (Google/TikTok/Pinterest/Custom-Code) spaeter daneben, OHNE
// flache Keys und OHNE Migration pro Plattform. Bewusst KEINE generische Registry,
// solange nur Meta existiert ("Abstraktion erst bei 2+ Faellen").
//
// PHASE 11, SECHSTE SCHEIBE — DIE ZIEL-DIMENSION IST DA. Der Satz darueber
// ("solange nur Meta existiert") beschreibt den Stand BIS hierher und bleibt als
// Begruendung stehen: Die Nest-Form wurde fuer genau diesen Moment gebaut, und sie
// wird jetzt benutzt, statt ersetzt. Was sich aendert, ist die Zahl der Mitglieder,
// NICHT die Form.

/**
 * Die bekannten Tracking-Ziele. EINE Quelle fuer die Laufzeit-Pruefung in den
 * Server-Actions und fuer die spaetere Karte je Plattform.
 *
 * WARUM HIER UND NICHT IN capi/token.ts (wo META_TARGET liegt): Jene Datei traegt
 * `import "server-only"` und ist aus Client-Code nicht erreichbar; die Oberflaeche
 * braucht die Liste aber. Und NICHT in actions.ts: eine "use server"-Datei darf
 * AUSSCHLIESSLICH async-Funktionen exportieren, keine Konstante.
 *
 * BEFUND, DER DAZUGEHOERT UND GEMELDET IST: Damit steht der Wert "meta" im Repo an
 * einer VIERTEN Stelle (neben META_TARGET, META_CONSENT_TARGET und dem CHECK der
 * Geheimnis-Tabelle). Die Zusammenlegung der Kopien ist aus dieser Scheibe
 * AUSDRUECKLICH ausgeschlossen ("melden, nicht mitbauen") — sie waere ein eigener
 * Gegenstand, weil sie zwei Vokabulare vereinigt (Consent-Schluessel und
 * Ziel-Wert der Geheimnis-Tabelle), die heute nur zufaellig gleich lauten.
 */
export const TRACKING_TARGETS = ["meta", "pinterest"] as const;

/** Ein bekanntes Tracking-Ziel. */
export type TrackingTarget = (typeof TRACKING_TARGETS)[number];

/**
 * Laufzeit-Pruefung: ist das ein bekanntes Ziel?
 *
 * NOETIG, WEIL DER TYP ZUR LAUFZEIT NICHT EXISTIERT. Eine Server Action nimmt
 * entgegen, was ueber die Leitung kommt; `target: TrackingTarget` ist eine
 * Behauptung des Compilers, keine Kontrolle. Ohne diese Pruefung faenge erst der
 * CHECK der Geheimnis-Tabelle den Fehler — und zwar NACH dem Instanziieren des
 * privilegierten Clients. Vergleich per exaktem Wert, nicht per Praefix oder
 * Laenge: "pintrest" faellt durch, "Meta" ebenso.
 */
export function isTrackingTarget(value: unknown): value is TrackingTarget {
  return (
    typeof value === "string" &&
    (TRACKING_TARGETS as readonly string[]).includes(value)
  );
}

export type ProjectSettings = {
  // Partial<Record<…>> statt fester Mitglieder: dieselbe Nest-FORM wie zuvor, nur
  // ueber die bekannten Ziele geschluesselt. Ein Blob aus der Zeit davor
  // (`{ pixels: { meta: { pixelId } } }`) passt UNVERAENDERT hinein — es gibt
  // keinen Alt-Blob-Pfad und keinen Lese-Rueckfall, weil sich die Form nicht
  // geaendert hat. Das ist der Grund, warum diese Ablage-Form gewaehlt wurde.
  pixels?: Partial<
    Record<
      TrackingTarget,
      {
        // Pixel-ID ist OEFFENTLICH (steht im ausgelieferten Snippet) -> kein
        // Secret, plain gespeichert. Der echte Secret liegt in project_secrets.
        pixelId?: string;
      }
    >
  >;
  // CAPI-Server-Side-Infra (Scheibe 2a). BEWUSST plattform-AGNOSTISCH neben pixels
  // (nicht darunter): es ist keine Pixel-Config, sondern der server-seitige
  // Forward-Kanal.
  //   trackingKey = OEFFENTLICHER Zufalls-Handle. Loest server-seitig -> project_id
  //                 -> geheimen Token auf (Read-Pfad in Scheibe 2b). Darf im Client
  //                 stehen / spaeter in den Export gebacken werden.
  //   tokenSet    = NICHT-sensibler Indikator "CAPI-Token gesetzt?" fuer die
  //                 write-only-UI ("••• gesetzt").
  // Der ECHTE Token liegt NIE hier — nur server-only in den Geheimnis-Tabellen
  // project_secrets (gelesen) und project_tokens (mitgeschrieben, Rollback-Reserve).
  // Die tragende Zusage ist der erste Halbsatz und bleibt unveraendert; nachgezogen
  // ist nur, WO er stattdessen liegt.
  capi?: {
    trackingKey?: string;
    tokenSet?: boolean;
  };
  // Hosting-Zustand (Phase 7 Scheibe 7a). BEWUSST plattform-agnostisch neben pixels
  // (wie capi): kein Pixel, sondern die Auslieferungs-Metadaten.
  //   label       = OEFFENTLICHES Subdomain-Label (label.publayer.net). Nicht geheim.
  //                 Vom Publish vergeben (idempotent: einmal gesetzt, wiederverwendet)
  //                 und hierher gespiegelt, damit der Client die Live-URL ueber
  //                 Sessions hinweg kennt, OHNE domains selbst abzufragen.
  //   publishedAt = Zeitstempel des letzten Publish (nur Anzeige).
  hosting?: {
    label?: string;
    publishedAt?: string;
  };
};

// Die getrimmte Pixel-ID EINES Ziels oder "" (nicht gesetzt).
//
// KEIN ALT-BLOB-RUECKFALL, und das ist kein Vergessen: Ein Blob aus der Zeit vor
// dieser Scheibe traegt `pixels.meta.pixelId` — genau den Pfad, den diese Funktion
// fuer das Ziel "meta" liest. Alt und neu sind DIESELBE Form. Waere die Ablage
// stattdessen flach geworden, braeuchte es hier dauerhaft einen zweiten Lesepfad.
export function getPixelId(
  settings: ProjectSettings,
  target: TrackingTarget
): string {
  return settings.pixels?.[target]?.pixelId?.trim() ?? "";
}

// Immutabel + nest-erhaltend: schreibt pixels.<ziel>.pixelId, ohne die Zweige
// ANDERER Ziele anzutasten. Leerer/whitespace Wert wird zu "".
export function setPixelId(
  settings: ProjectSettings,
  target: TrackingTarget,
  pixelId: string
): ProjectSettings {
  return {
    ...settings,
    pixels: {
      ...settings.pixels,
      [target]: { ...settings.pixels?.[target], pixelId: pixelId.trim() },
    },
  };
}

// Die getrimmte Meta-Pixel-ID oder "" (nicht gesetzt). EINE Quelle fuer "ist ein
// Pixel konfiguriert?" — Engine-Aufrufer, UI und Dirty-Vergleich ziehen hierdurch.
//
// BLEIBT BESTEHEN, ist aber nur noch der Sonderfall der Funktion darueber. Der
// Grund gehoert dazu: capi/token.ts ruft sie im Aufloesungs-Pfad des Forwards auf
// und ist in dieser Scheibe UNANTASTBAR. Sie hier zu entfernen hiesse, eine Datei
// anzufassen, die diese Scheibe nicht anfassen darf.
export function getMetaPixelId(settings: ProjectSettings): string {
  return getPixelId(settings, "meta");
}

// Immutabel + nest-erhaltend, Sonderfall von setPixelId — s. die Begruendung dort.
export function setMetaPixelId(
  settings: ProjectSettings,
  pixelId: string
): ProjectSettings {
  return setPixelId(settings, "meta", pixelId);
}

// Der oeffentliche trackingKey (getrimmt) oder "" (nicht gesetzt).
export function getTrackingKey(settings: ProjectSettings): string {
  return settings.capi?.trackingKey?.trim() ?? "";
}

// Idempotente Ableitung der server-autoritativen Tracking-Identitaet (Phase 8 Scheibe
// 2b-0): existierender Spaltenwert wird 1:1 BEHALTEN, nur bei Abwesenheit frisch
// erzeugt ('||' short-circuited -> kein randomUUID bei vorhandenem Key). Bewusst
// settings-AGNOSTISCH: nimmt den ROHEN Spaltenwert (projects.tracking_key), nicht
// ProjectSettings — die Spalte ist die Autoritaet, settings nur noch die Client-
// Einbettung. Geteilt von setCapiToken UND publishProject (eine Implementierung).
export function ensureTrackingKey(existing: string | null | undefined): string {
  return existing?.trim() || crypto.randomUUID();
}

// Nicht-sensibler Indikator "CAPI-Token gesetzt?" fuer die write-only-UI.
export function getCapiTokenSet(settings: ProjectSettings): boolean {
  return settings.capi?.tokenSet === true;
}

// Immutabel + pixels-erhaltend: schreibt capi.{trackingKey,tokenSet}, ohne die
// Pixel-Config (oder kuenftige Plattform-Zweige unter pixels) anzutasten. Wird von
// der setCapiToken-Server-Action UND vom Client (Spiegelung nach Erfolg) genutzt.
export function setCapiState(
  settings: ProjectSettings,
  capi: { trackingKey: string; tokenSet: boolean }
): ProjectSettings {
  return {
    ...settings,
    capi: { ...settings.capi, ...capi },
  };
}

// Das oeffentliche Hosting-Label (getrimmt) oder "" (noch nie publiziert). EINE
// Quelle fuer "ist dieses Projekt schon publiziert / welches Label hat es?".
export function getHostingLabel(settings: ProjectSettings): string {
  return settings.hosting?.label?.trim() ?? "";
}

// Immutabel + pixels/capi-erhaltend: schreibt hosting.{label,publishedAt}, ohne die
// anderen Zweige anzutasten. Wird von der publishProject-Server-Action UND vom Client
// (Spiegelung nach Erfolg) genutzt.
export function setHostingState(
  settings: ProjectSettings,
  hosting: { label: string; publishedAt: string }
): ProjectSettings {
  return {
    ...settings,
    hosting: { ...settings.hosting, ...hosting },
  };
}

// Dirty-Vergleich. BEWUSST eng: nur die Pixel-IDs existieren als user-editierbare
// Felder im grossen Speichern-Flow. capi.* ist HIER ABSICHTLICH AUSGENOMMEN: es wird
// nicht ueber den Dirty-/Big-Save-Weg gepflegt, sondern von seiner eigenen
// Sofort-Persist-Action (setCapiToken) geschrieben und danach in settings UND
// savedSettings gespiegelt -> ohne Ausschluss gaebe es einen false-dirty-Alarm.
// hosting.* ist AUS DEMSELBEN Grund ausgenommen: von publishProject geschrieben +
// in settings/savedSettings gespiegelt, kein Big-Save-Feld.
//
// UEBER ALLE ZIELE, seit Phase 11 Scheibe 6. Der Kommentar hier sagte
// "Weitere user-editierbare Plattform-Felder wachsen hier mit (je ein Vergleich)" —
// das ist jetzt eingeloest, und zwar als SCHLEIFE statt als weiterer Vergleich, damit
// ein kuenftiges Ziel nicht vergessen werden KANN.
// WAS EIN VERGESSEN GEKOSTET HAETTE, gehoert dazu, sonst wirkt die Schleife wie
// Kosmetik: Der Nutzer aendert die Pixel-ID des zweiten Ziels, der Vergleich meldet
// "nicht dirty", der Speichern-Knopf bleibt inaktiv — und die Eingabe ist beim
// naechsten Projektwechsel weg, ohne Warnung.
// Bestandsverhalten unveraendert: Fuer ein Projekt ohne zweites Ziel liefern beide
// Seiten dort "" und der Vergleich faellt aus wie zuvor.
export function settingsEqual(a: ProjectSettings, b: ProjectSettings): boolean {
  return TRACKING_TARGETS.every((t) => getPixelId(a, t) === getPixelId(b, t));
}
