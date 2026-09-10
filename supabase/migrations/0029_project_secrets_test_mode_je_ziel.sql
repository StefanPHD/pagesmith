-- Phase 11.3, Scheibe 11.3c — DER PAAR-CHECK WIRD ZIEL-ABHAENGIG ERSETZT.
-- Manuell im Supabase-SQL-Editor ausfuehren. Es gibt zu dieser Migration KEINEN
-- Code-Deploy (s. "NO-OP" weiter unten), die Reihenfolge-Regel bindet hier also
-- nichts — wohl aber die NAECHSTE Scheibe, die pinterest in den Testmodus aufnimmt.
--
-- WAS SIE TUT: Sie droppt den CHECK project_secrets_test_mode_paar aus 0028 und legt an
-- seiner Stelle project_secrets_test_mode_je_ziel an — eine Bedingung, die je nach
-- target verschieden urteilt. Sonst NICHTS.
--
-- WARUM ZIEL-ABHAENGIG UND NICHT GENERISCH, in einem Satz (der Volltext steht in
-- docs/aktiver-stand.md, Abschnitt "Scheibe 11.3c — Der Paar-CHECK wird ersetzt", und
-- als bindende Entscheidung (12) ebendort; er wird hier NICHT verdoppelt): DIESELBE
-- SPALTENKOMBINATION IST BEI MANCHEN ZIELEN EIN SCHADEN UND BEI ANDEREN DER NORMALFALL.
-- "Frist gesetzt, Code leer" ist bei meta und tiktok reiner Datenverlust — der Riegel
-- feuerte, das Ereignis verschwaende aus events, UND der Anbieter bekaeme keine
-- Test-Markierung. Bei pinterest ist genau dieser Zustand der einzige, den sein
-- Testmodus annehmen kann: er ist ein QUERY-PARAMETER OHNE Code (testModeQuery in
-- src/lib/capi/pinterest-forward.ts, GEMESSEN am Repo, CC, 2026-09-10).
--
-- DIE VERWORFENE BAUFORM B — als ZEIGER, nicht als zweite Fassung: "ein Code ohne Frist
-- ist verboten, sonst alles erlaubt", also ohne jede Ziel-Aufzaehlung. Sie ist erwogen
-- und mit Grund verworfen; der Ausscheidungsgrund steht in docs/aktiver-stand.md an der
-- genannten Stelle. Wer sie neu vorschlaegt, traegt gegen JENEN Grund vor.
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE — GEMESSEN am Repo (CC, 2026-09-10) und nicht
-- angenommen: TARGETS_WITH_TEST_MODE (src/lib/tracking/credential-state.ts) ist
-- ["meta", "tiktok"], festgenagelt von einem Waechter in credential-state.test.ts;
-- startTestMode und stopTestMode (src/app/projects/actions.ts) weisen jedes Ziel ab, das
-- nicht darin steht. KEIN Schreibpfad kann heute einen Testzustand an pinterest, google
-- oder linkedin ablegen — die neue, STRENGERE Haelfte dieser Bedingung ist fuer den
-- deployten Code unerreichbar, die LOCKERERE Haelfte (pinterest) hat noch keinen Nutzer.
-- Die Datei ist damit gefahrlos frueh einspielbar, dieselbe Lage wie bei 0026 und 0028.
--
-- 0021 BIS 0028 WERDEN NICHT UMGESCHRIEBEN, auch kein Kommentar. Eine angewandte
-- Migration dokumentiert, was TATSAECHLICH gelaufen ist. 0028 sagt diese Ersetzung an
-- ihrem Schritt (S3) sogar selbst voraus ("dann wird dieser CHECK ERSETZT, in einer
-- eigenen Migration, nicht hier nachtraeglich geaendert") — wer sie aendert, bricht eine
-- Auflage, die in der Datei selbst steht.
--
-- KEIN BACKFILL, KEIN update, KEIN delete. Die einzige schreibende Anweisung ausserhalb
-- des DDL ist der Protokoll-Eintrag am Ende.
-- WAS DAS VORAUSSETZT, und es ist ein PFLICHT-STOPP und keine Vorsichtsgeste: "add
-- constraint" VALIDIERT den Bestand. Eine bestehende Zeile, die die neue Bedingung
-- verletzt, laesst diese Migration scheitern. Der heutige CHECK erlaubt "Code UND Frist"
-- an JEDEM Ziel — an pinterest, google und linkedin waere eine solche Zeile heute
-- gueltig und morgen verletzend. OB ES SIE GIBT, IST NICHT GEMESSEN; die Erhebung dazu
-- wird VOR dieser Datei gefahren (Anleitung der Scheibe 11.3c).
--
-- KEINE POLICY: project_secrets behaelt RLS aktiv und NULL Policies. Das ist die
-- TRAGENDE Kontrolle dieser Tabelle und keine Luecke — unter aktiver RLS ohne jede
-- Policy ist sie fuer anon und authenticated vollstaendig verschlossen, nur service_role
-- kommt durch. Diese Datei legt keine an; die Probe (3) unten ist die Gegenkontrolle.
-- GELESEN 2026-09-10, supabase.com/docs/guides/database/postgres/row-level-security,
-- Abschnitte "Enable RLS and set the grants" und "Bypassing Row Level Security",
-- woertlich: "Once RLS is enabled, no data is accessible through the API when using a
-- publishable key, until you create policies" und "A secret key authorizes access
-- through the service_role Postgres role, which has the bypassrls attribute".
-- FOLGE FUER DEN BAU: NICHTS aendert sich; die Lesung bestaetigt die bestehende Lage.
-- ABWESENHEIT MIT BENANNTER REICHWEITE: Jene Seite sagt zu DDL, zu ALTER TABLE und zu
-- CHECK-Constraints NICHTS — fuer die Bauform dieser Datei ist sie nicht die Quelle.
--
-- KEIN INDEX. Die Auflage aus docs/db-stand.md gilt woertlich ("Wer hier spaeter einen
-- Index ergaenzt, sollte vorher einen Zugriff nennen koennen, der ihn braucht"): Ein
-- CHECK wird bei KEINER Abfrage ausgewertet, sondern nur beim Schreiben. Es liess sich
-- also gerade kein Zugriff nennen.
--
-- KEIN updated_at IN DIESER DATEI: Diese Migration schreibt keine Zeile; der Row-Trigger
-- project_secrets_set_updated_at ist davon unberuehrt.
--
-- ---------------------------------------------------------------------------
-- DAS lock_timeout — Bauform und Begruendung stehen im Kopf von 0025 und werden hier
-- NICHT verdoppelt, nur benannt: project_secrets liegt auf dem heissesten Pfad der
-- Plattform, der Schritt unten nimmt eine ACCESS-EXCLUSIVE-Sperre, und ist die Sperre
-- nicht sofort zu bekommen, soll die Migration ABBRECHEN statt eine Warteschlange auf
-- dem Ingest-Pfad aufzubauen. "set" und nicht "set local", weil NICHT gemessen ist, ob
-- der SQL-Editor das Skript in EINE Transaktion klammert; das schlichte "set" wirkt
-- unter beiden Annahmen. Keine Ruecksetz-Zeile, weil der Protokoll-Insert die LETZTE
-- Anweisung sein muss.
--
-- ---------------------------------------------------------------------------
-- WAS DIE GUARDS LEISTEN UND WAS NICHT:
--
--   (S1) DER DROP — Katalog-Guard auf conname UND conrelid, Bauform woertlich nach
--   0026 (S1). "drop constraint" ohne Guard waere beim zweiten Lauf bereits
--   abgebrochen.
--   WARUM DIESER ANKER VORHER VON NACHHER TRENNT: Der Guard prueft den ALTEN Namen.
--   Vor dem Lauf gibt es ihn, nach dem Lauf nicht mehr — und diese Migration legt ihn
--   nirgends wieder an. Ein Guard auf den NEUEN Namen an dieser Stelle waere der Fehler,
--   den 0025 an ihrem Primaerschluessel beschreibt: er traefe nach dem ersten Lauf zu
--   und droppte den eigenen Schutz.
--
--   (S2) DAS ADD — BEWUSST OHNE GUARD. Der zweite Lauf scheitert hier laut mit 42710
--   (duplicate_object), und das ist die gewaehlte Bauform (0026), nicht eine vergessene
--   Zeile. DER GRUND, damit er beim naechsten Aufraeumen nicht als Nachlaessigkeit
--   "ergaenzt" wird (OWNER-ENTSCHEIDUNG 2026-09-10): EIN GUARD AUF EINEN NAMEN KANN DIE
--   RICHTIGE BEDINGUNG NICHT VON EINER FRUEHEREN, FALSCHEN DESSELBEN NAMENS
--   UNTERSCHEIDEN — er ueberspringt beide und meldet Erfolg. 0028 darf ihn tragen, weil
--   sie ANLEGT; diese Datei ERSETZT. Ein lauter Abbruch ist hier billiger als ein
--   stiller Durchlass.
--
--   DIE ATOMARITAET IST DIE TRAGENDE ZUSICHERUNG DIESER DATEI, und sie haengt NICHT
--   daran, wie der Editor das Skript klammert: (S1) und (S2) liegen in EINEM do-Block.
--   Ein do-Block ist EINE Anweisung und damit EINE Transaktion. Scheitert (S2) — an
--   einer verletzenden Bestandszeile oder beim zweiten Lauf —, wird (S1) MIT
--   zurueckgenommen. DIE TABELLE STEHT DANACH MIT DEM ALTEN CHECK DA, NIE OHNE.
--
--   WAS SIE NICHT LEISTEN: Der Guard prueft den NAMEN, nicht die BEDINGUNG. Existierte
--   bereits ein Constraint namens project_secrets_test_mode_je_ziel mit ANDEREM Inhalt,
--   scheiterte (S2) mit 42710 — laut, aber ohne zu sagen, dass der Inhalt abweicht.
--   DAS IST DER GRUND, WARUM DIE PRUEFUNG UNTEN DIE DEFINITION IM WORTLAUT ABLIEST UND
--   NICHT DIE ANWESENHEIT.
--
-- ---------------------------------------------------------------------------
-- WARUM DER AUSDRUCK FUER KEINE EINGABE NULL LIEFERN KANN — und warum das zaehlt:
-- EIN CHECK LAESST EINE ZEILE DURCH, WENN SEIN AUSDRUCK true ODER NULL LIEFERT. Ein
-- Ausdruck, der NULL werden kann, ist an dieser Stelle ein stiller Durchlass.
-- DIESER KANN ES NICHT, UND DIE BEGRUENDUNG BRAUCHT KEINE ANNAHME UEBER target: Die
-- einfache case-Form vergleicht auf GLEICHHEIT. Traegt target einen Wert, den kein when
-- nennt — oder gar keinen —, greift der else-Zweig; ein Vergleich gegen NULL ist nicht
-- wahr und waehlt deshalb kein when aus. Jeder der vier Zweige besteht ausschliesslich
-- aus "is null"-Praedikaten, und die liefern nie NULL. Der Ausdruck ist damit total.
--
-- ---------------------------------------------------------------------------
-- PRUEFUNG NACH DEM EINSPIELEN — sie ist NICHT optional, weil am Repo NICHT entscheidbar
-- ist, ob diese Datei gelaufen ist (docs/immer-beachten.md, "OB EINE MIGRATION IN DER
-- LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT ENTSCHEIDBAR"):
--
--   (1) DER ALTE CHECK IST WEG. Erwartet: GENAU NULL Zeilen.
--
--       select con.conname, pg_get_constraintdef(con.oid)
--       from pg_constraint con
--       where con.conrelid = 'public.project_secrets'::regclass
--         and con.conname  = 'project_secrets_test_mode_paar';
--
--   (2) DER NEUE CHECK IM WORTLAUT, UND GENAU EINMAL. Die ZEILENZAHL gehoert zur
--       Pruefung: ZWEI waeren der Doppel-Constraint-Fall. Abgelesen wird die
--       DEFINITION, nicht die Anwesenheit — ein gleichnamiger Constraint mit anderem
--       Inhalt saehe an einer Anwesenheits-Pruefung identisch aus.
--       ERWARTET (Postgres normalisiert die Schreibung; geprueft wird der SINN, nicht
--       das Zeichenbild): eine CASE-Form ueber target mit vier Zweigen — meta und
--       tiktok je "(test_event_code IS NULL) = (test_mode_expires_at IS NULL)",
--       pinterest "test_event_code IS NULL", ELSE "test_event_code IS NULL AND
--       test_mode_expires_at IS NULL". KEIN "NOT VALID" im Text: stuende es da, waere
--       der Bestand NICHT geprueft worden.
--
--       select con.conname, pg_get_constraintdef(con.oid)
--       from pg_constraint con
--       where con.conrelid = 'public.project_secrets'::regclass
--         and con.conname  = 'project_secrets_test_mode_je_ziel';
--
--   (3) KEINE POLICY IST ENTSTANDEN: die Zahl der Policies auf project_secrets bleibt
--       NULL. Diese Datei legt keine an; die Probe ist die Gegenkontrolle dazu.
--
--       select count(*) from pg_policies
--       where schemaname = 'public' and tablename = 'project_secrets';
--
--   DIE WIRKUNGS-PROBE STEHT NICHT IN DIESER DATEI. Die drei Abfragen oben lesen den
--   KATALOG; ob die Bedingung auch WIRKT, zeigt erst eine Wegwerf-Probe mit Einfuege-
--   versuchen. Sie faehrt die vollstaendige Wahrheitstabelle (18 Faelle) und liegt
--   bewusst in KEINER Datei: sie schreibt in eine BESTEHENDE Tabelle und passt damit in
--   keine der zwei Bauformen, die supabase/checks/README.md zulaesst. Ihr Text steht im
--   Bau-Bericht der Scheibe 11.3c, ihr Ergebnis gehoert nach docs/db-stand.md.

set lock_timeout = '3s';

do $$
begin
  -- (S1) DEN ALTEN PAAR-CHECK DROPPEN. Er stammt aus 0028 und verlangt Code und Frist
  --      gemeinsam oder beide leer — an JEDEM Ziel. Genau das verbietet den Zustand,
  --      den pinterests Testmodus braucht.
  if exists (
    select 1
    from pg_constraint
    where conname  = 'project_secrets_test_mode_paar'
      and conrelid = 'public.project_secrets'::regclass
  ) then
    alter table public.project_secrets
      drop constraint project_secrets_test_mode_paar;
  end if;

  -- (S2) DIE ZIEL-ABHAENGIGE BEDINGUNG. NEUER Name, kein Guard (s. Kopf).
  --      VIER ZWEIGE, je EINE Aussage ueber die Null-Zustaende der zwei Spalten —
  --      Bauform woertlich nach projects_variant_b_pair (0016) und 0028 (S3): eine
  --      Aussage, nicht zwei getrennte Bedingungen.
  --      DIE DOPPELUNG ZWISCHEN meta UND tiktok IST ABSICHT UND KEIN COPY-PASTE, das
  --      jemand zu "target in ('meta','tiktok')" zusammenziehen sollte: Es sind ZWEI
  --      unabhaengig begruendete Aussagen, die heute uebereinstimmen. Beide Ziele
  --      tragen den Testcode in der NUTZLAST, jedes aus einer eigenen Quelle. Wer sie
  --      gruppiert, behauptet eine KOPPLUNG, die es nicht gibt, und macht eine spaetere
  --      Divergenz zu einem Umbau statt zu einer Zeile.
  alter table public.project_secrets
    add constraint project_secrets_test_mode_je_ziel
    check (
      case target
        -- meta: Traeger ist das Nutzlast-Feld test_event_code. Ohne Code gibt es
        --       nichts zu senden; eine Frist ohne Code waere reiner Datenverlust
        --       (der Riegel feuert, der Anbieter bekommt keine Markierung).
        when 'meta'      then (test_event_code is null) = (test_mode_expires_at is null)
        -- tiktok: derselbe Traeger, eigene Quelle, dieselbe Bedingung.
        when 'tiktok'    then (test_event_code is null) = (test_mode_expires_at is null)
        -- pinterest: Traeger ist ein QUERY-PARAMETER OHNE Code. Ein abgelegter Code
        --       waere tote Daten — eine Oberflaeche koennte ihn anzeigen, obwohl der
        --       Adapter ihn nie sendet. Die Frist bleibt frei; sie allein traegt hier
        --       den Zustand.
        when 'pinterest' then test_event_code is null
        -- sonst (heute google und linkedin): FAIL-CLOSED. Fuer diese Ziele ist kein
        --       brauchbarer Testmodus bekannt, also ist auch kein Zustand ablegbar.
        --       ALS else UND NICHT ALS AUFZAEHLUNG, und das ist der Grund: Ein
        --       sechstes Ziel erweitert project_secrets_target_valid und muesste diese
        --       Bedingung NICHT anfassen. Mit else laeuft es fail-closed an; eine
        --       Aufzaehlung liesse es durch die Maschen fallen, und zwar still.
        else (test_event_code is null) and (test_mode_expires_at is null)
      end
    );
end $$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018, docs/db-regeln.md): entsteht
-- nur bei erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile,
-- die einen nie vollzogenen Lauf behauptet.
-- PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: Es gibt keinen Migrations-Runner, der aus
-- schema_migrations liest, und es soll keinen geben.
insert into public.schema_migrations (version, filename, applied_at)
values ('0029', '0029_project_secrets_test_mode_je_ziel.sql', now())
on conflict (version) do nothing;
