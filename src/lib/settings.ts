// Reine Projekt-Einstellungs-Logik (kein React, kein Server). Unit-testbar, siehe
// settings.test.ts.
//
// Projektweite Einstellungen, plattform-GENESTET (Owner-Direktive Omnichannel):
//   settings.pixels.<platform>.<config>
// In 1b existiert NUR Meta (settings.pixels.meta.pixelId). Die Nest-FORM traegt
// weitere Plattformen (Google/TikTok/Pinterest/Custom-Code) spaeter daneben, OHNE
// flache Keys und OHNE Migration pro Plattform. Bewusst KEINE generische Registry,
// solange nur Meta existiert ("Abstraktion erst bei 2+ Faellen").
export type ProjectSettings = {
  pixels?: {
    meta?: {
      // Meta-Pixel-ID ist OEFFENTLICH (steht im ausgelieferten Snippet) -> kein
      // Secret, plain gespeichert. Der echte Secret (CAPI-Token) ist Scheibe 2.
      pixelId?: string;
    };
  };
};

// Die getrimmte Meta-Pixel-ID oder "" (nicht gesetzt). EINE Quelle fuer "ist ein
// Pixel konfiguriert?" — Engine-Aufrufer, UI und Dirty-Vergleich ziehen hierdurch.
export function getMetaPixelId(settings: ProjectSettings): string {
  return settings.pixels?.meta?.pixelId?.trim() ?? "";
}

// Immutabel + nest-erhaltend: schreibt pixels.meta.pixelId, ohne andere (kuenftige)
// Plattform-Zweige unter pixels anzutasten. Leerer/whitespace Wert wird zu "".
export function setMetaPixelId(
  settings: ProjectSettings,
  pixelId: string
): ProjectSettings {
  return {
    ...settings,
    pixels: {
      ...settings.pixels,
      meta: { ...settings.pixels?.meta, pixelId: pixelId.trim() },
    },
  };
}

// Dirty-Vergleich. In 1b BEWUSST eng: nur die Meta-Pixel-ID existiert, also genuegt
// ihr Vergleich. Weitere Plattform-Felder wachsen hier mit (je ein Vergleich), wenn
// sie dazukommen — bis dahin waere ein tiefer JSON-Vergleich nur Schein-Allgemeinheit.
export function settingsEqual(a: ProjectSettings, b: ProjectSettings): boolean {
  return getMetaPixelId(a) === getMetaPixelId(b);
}
