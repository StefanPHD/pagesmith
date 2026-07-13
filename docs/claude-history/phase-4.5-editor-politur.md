## Phase 4.5 — Editor-Politur: Datei-Upload + Zen-Modus (ABGESCHLOSSEN)
Status: fertig, live getestet (Upload + Zen + Politur), Pipeline grün (npm test
68 grün inkl. validateUploadFile, tsc, lint, build). Zwei kleine, getrennte
Bausteine, NACHEINANDER gebaut (erst Upload, dann Zen-Collapse obendrauf), danach
zwei Live-Test-Korrekturen (uploadError-Reset, Placeholder) + ein A11y-Politur-Fix
(Fokus-Ring). Beide Bausteine sind reiner lokaler UI-View-State, KEIN Daten-/
Mapping-Zustand — sie berühren dirty-Tracking, DB und Mapping-Modell NICHT.
Leitplanke: nichts hiervon wird persistiert (reiner Session-/View-State); Engine,
Wiring, Mapping-Lookup, Orphan-Netz, Export, Auth, RLS bleiben unberührt.

### A) Datei-Upload / Drag-Drop (zweiter Import-Weg neben Copy-Paste)
- Upload-Zone im Code-Panel ("HTML-Datei hochladen oder hierher ziehen") neben der
  bestehenden Textarea. Beides: Klick-Upload UND Drag-Drop.
- Datei wird CLIENTSEITIG via FileReader gelesen, Inhalt in die Textarea gekippt ->
  ab da EXAKT derselbe Pfad wie Paste (Detektion, Stabilisierung, Sandbox-Preview).
  KEIN Server-Upload, KEIN neuer Verarbeitungsweg.
- Grenzen (reine validateUploadFile-Logik, unit-getestet): nur .html / text/html,
  max ~2 MB. Alles andere (falscher Typ, zu groß) -> freundliche, sichtbare
  Fehlermeldung (uploadError), KEIN stilles Schlucken, kein Browser-Hänger.
- uploadError-Handling (Live-Test-Korrektur, projekt-ungebundener View-State):
  am kanonischen Ort zurückgesetzt (im selben Helper applyZenForLoadedCode, der
  bei jedem Projekt-Kontext-Wechsel läuft) UND am ANFANG jedes
  Import-Versuchs (Paste/Upload) gecleart, BEVOR validiert wird. Sonst leuchtet ein
  Fehler aus Projekt A in B weiter / steht neben einer schon ladenden gültigen Datei.
- Placeholder (marketer-tauglich, deutsch, ohne plattform-ungenaue Tastenkombi):
  "Füge hier deinen HTML-Code ein – oder nutze den Datei-Upload unten."

### B) Zen-Modus (Auto-Collapse — versteckt NUR die Code-EINGABE)
PRÄZISIERT nach Live-Test (wichtigste Korrektur ggü. erster Bau-Notiz): Der
Zen-Collapse versteckt NUR die Code-EINGABE (Textarea + Upload-Zone), NICHT das
ganze Panel. Die Liste der erkannten Elemente bleibt IMMER sichtbar — sie ist das
Arbeitswerkzeug des Marketers, nur der rohe Code ist die Ablenkung. Der frühere
ÄUSSERE Gesamtpanel-Collapse (Panel schrumpfte auf einen Zähler-Streifen) wurde
ENTFERNT: EIN Mechanismus, keine zwei konkurrierenden Pfeile.
- Panel-Reihenfolge: (1) Code-Eingabe-Block als Akkordeon — eingeklappt = schlanke
  Zeile "Code anzeigen/editieren", ausgeklappt = Textarea + Upload-Zone (Inhalt
  bleibt STETS gemountet, nur display:none -> Textarea behält State + Debounce);
  (2) Zähler (Buttons/Forms/Links); (3) Elementliste, IMMER sichtbar/scrollbar als
  stabiler DOM-Knoten (Collapse hängt sie nie ab -> Scroll-Position/Höhe springen
  beim Auf-/Zuklappen nicht).
- Zen-Trigger-Regeln (unverändert, steuern jetzt nur den kleineren Eingabe-Bereich):
  Auto-Collapse GENAU EINMAL pro Import-EREIGNIS (onPaste ODER erfolgreicher Upload),
  NICHT an den Detektions-State gehängt (sonst feuert es bei jedem Tastendruck).
  Manuell schlägt Auto dauerhaft (userExpandedManually bleibt sticky bis zum
  Projekt-Kontext-Wechsel). Projekt MIT Code öffnet EINGEKLAPPT, leeres Projekt
  offen (isInputCollapsed deterministisch aus initialCode -> kein
  Hydration-Mismatch). Kein Merken pro Projekt, nichts persistiert.

### Politur (A11y-Fix am Code-Toggle)
- Abgerundeter focus-visible-Fokus-Ring statt nativem rechteckigem outline: der
  rechteckige Browser-outline folgte dem border-radius nicht -> "Eselsohren" über
  die runden Ecken. Fix: focus:outline-none + focus-visible:ring (inset, am
  border-radius des Headers ausgerichtet). focus-VISIBLE (nicht focus): Ring nur bei
  Tastatur-Navigation, kein "blauer Kasten" nach Maus-Klick -> Tastatur-
  Zugänglichkeit bleibt erhalten.

