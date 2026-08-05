-- Phase 11 Scheibe 1 (Bau A) — Geheimnisse je (Projekt, Ziel): neue Tabelle project_secrets.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Es liest heute NIEMAND aus project_secrets. Solange
-- der Lese-/Schreibpfad (Bau B) nicht deployt ist, aendert diese Datei KEIN Verhalten —
-- sie ist deshalb gefahrlos frueh einspielbar. Genau darin liegt der Zuschnitt dieser
-- Scheibe: die riskanteste Aenderung der Phase faehrt ALLEIN, nicht gebuendelt mit einem
-- neuen Ziel. Scheitert spaeter etwas, ist die Ursache nicht zwischen zwei Wirkungen zu
-- raten.
--
-- DIE ALTE TABELLE project_tokens WIRD HIER NUR GELESEN. Kein alter, kein drop, kein
-- Schreibzugriff. Sie bleibt vollstaendig funktionsfaehig — der heutige Code liest und
-- schreibt sie unveraendert weiter, und ein Code-Rollback nach Bau B findet sie
-- unberuehrt vor.
--
-- KEINE POLICY IST ABSICHT, KEIN VERSAEUMNIS. RLS ist aktiviert, die Policy-Liste ist
-- LEER: unter aktiver RLS ohne JEDE Policy ist die Tabelle fuer anon und authenticated
-- vollstaendig verschlossen, nur service_role kommt durch. Wer hier spaeter eine
-- WITH-CHECK-Policy ergaenzt, gewinnt KEINEN Schutz: "auth.uid() = user_id" prueft nur,
-- dass jemand die EIGENE Nutzer-ID eintraegt — genau das taete ein Angreifer ohnehin —,
-- und ueber die Ownership des PROJEKTS sagt es nichts. Mit (Projekt, Ziel) als Schluessel
-- waere es noch schwaecher: gegen das Schreiben auf ein fremdes ZIEL im EIGENEN Projekt
-- griffe es gar nicht. Ein Instrument, das Schutz ANZEIGT ohne zu schuetzen, ist
-- schlimmer als keins.
--   DARAUS DIE VERPFLICHTENDE FOLGE, und sie ist der Grund fuer diesen Absatz:
--   DAS OWNERSHIP-GATE IN DEN SERVER-ACTIONS (setCapiToken / removeCapiToken in
--   src/app/projects/actions.ts) IST DIE EINZIGE TRAGENDE SCHREIB-KONTROLLE. Es prueft
--   ueber den authentifizierten Client, dass das Projekt dem Nutzer gehoert, und
--   instanziiert den privilegierten Client ERST DANACH. Wer dieses Gate spaeter fuer
--   redundant haelt, weil "die Datenbank das ja prueft", irrt: sie prueft nichts.
--
-- DESHALB AUCH KEINE user_id-SPALTE. In project_tokens existiert sie ausschliesslich, um
-- jene WITH-CHECK-Policies zu bedienen — der Spaltenkommentar dort sagt es woertlich.
-- Ohne die Policies haette sie nur noch einen denkbaren Zweck: den LOESCHPFAD. Und genau
-- der ist gemessen, damit die fehlende Spalte nicht spaeter fuer ein Versehen gehalten
-- wird.
--
-- LOESCHPFAD — GEMESSEN an 0001_projects.sql: projects.user_id traegt dort
-- "references auth.users (id) on delete cascade". Eine Nutzerloeschung raeumt also die
-- projects-Zeilen ab, und project_secrets.project_id haengt mit demselben
-- "on delete cascade" an projects. Die Kette auth.users -> projects -> project_secrets
-- traegt damit OHNE eigene user_id-Spalte. Wer die Kaskade an projects je entfernt,
-- nimmt dieser Tabelle ihren Loeschpfad mit — dann ist HIER nachzuziehen.
--
-- WIEDERHOLBAR, FOLGENLOS, OHNE ZU UEBERSCHREIBEN: jeder Schritt unten traegt sein
-- eigenes Idempotenz-Mittel (if not exists / Katalog-Guard / on conflict do nothing).
-- Ein zweiter Lauf bricht NICHT ab und aendert KEINE bestehende Zeile. Das "do nothing"
-- bei der Uebernahme ist bewusst KEIN "do update": ein nach dem ersten Lauf geaendertes
-- Geheimnis wuerde sonst auf den alten Wert zurueckgesetzt — stiller Datenverlust im
-- Gewand einer Idempotenz-Massnahme, und niemand saehe einen Fehler, weil die Migration
-- ja "durchgelaufen" ist.
--
-- PRUEFUNG NACH DEM EINSPIELEN: supabase/checks/project-secrets-umstellung.sql.
-- ACHTUNG: Probe 0 dort MUSS VOR diesem Lauf erhoben werden — ohne die vorher notierte
-- Ausgangszahl sind "null uebernommen, weil die Quelle leer war" und "null uebernommen,
-- weil der Lesezugriff nicht griff" am Ergebnis nicht zu unterscheiden.

-- (1) DIE TABELLE. Schluessel ist das PAAR (Projekt, Ziel): ein Geheimnis pro Zeile,
--     einzeln setzbar, loeschbar und rotierbar, ohne bestehende Datensaetze zu beruehren.
--     Ein zweites Ziel ist damit eine weitere ZEILE statt einer weiteren Spalte — bei
--     Spalten waere ein zusaetzlicher Slot eine Sackgasse.
create table if not exists public.project_secrets (
  -- on delete cascade wie in project_tokens: Projekt weg -> Geheimnisse weg. Traegt
  -- zugleich den Nutzer-Loeschpfad (s. Kopf).
  project_id uuid not null references public.projects (id) on delete cascade,
  -- DAS ZIEL. Fachvokabular aus dem bestehenden Namensraum settings.pixels.<platform>:
  -- der Betreiber pflegt seine Ziele in den Einstellungen und soll nicht zwei Vokabulare
  -- lernen muessen. Der CHECK unten ist die ERSTE Stelle im Produkt, an der dieser
  -- Namensraum DURCHGESETZT wird statt nur dokumentiert zu sein.
  target text not null,
  -- KLARTEXT, wie in project_tokens. Tragende Kontrolle ist die ISOLATION (eigene
  -- Tabelle + RLS ohne jede Policy), NICHT Verschluesselung. Ein Envelope mit echtem
  -- Schluesselmanagement bleibt ein spaeterer Haertungsschritt und wird hier bewusst
  -- NICHT vorweggenommen; ein Schluessel in derselben DB waere Theater.
  secret text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (project_id, target),
  -- NUR der Meta-Schluessel. Die volle Schluesselliste stuende hier falsch: sie enthaelt
  -- Ziele, deren Zugangsdaten-FORM ungeprueft ist oder bekannt NICHT auf "ein Geheimnis
  -- pro Zeile" passt (OAuth-artige Anmeldungen brauchen mehrere Werte nebeneinander).
  -- Ein Constraint, der so einen Wert zuliesse, behauptete eine Passung, die es nicht
  -- gibt — und eine Zeile fuer ein Ziel ohne Code saehe aus wie funktionierende
  -- Konfiguration, ohne dass jemand dem Betreiber meldet, dass sie keiner liest.
  -- JEDES weitere Ziel bringt seine EIGENE Constraint-Erweiterung mit. Das ist der
  -- BEABSICHTIGTE Preis: der sichtbare Moment, in dem ein Ziel real wird.
  constraint project_secrets_target_valid check (target in ('meta'))
);

-- (2) RLS MIT DER TABELLE ZUSAMMEN, nie "spaeter" — und ausdruecklich HIER in der
--     Migration, nicht dem Event-Trigger rls_auto_enable ueberlassen: der existiert nur
--     in der laufenden DB und entsteht bei einem Neuaufbau allein aus den Migrationen
--     NICHT. Fuer BESTEHENDE Tabellen ist das ein bekanntes Restrisiko; fuer eine
--     GEHEIMNIS-Tabelle waere es der Unterschied zwischen unwahrscheinlich und
--     unmoeglich. Die Anweisung selbst ist wiederholbar.
alter table public.project_secrets enable row level security;

-- (3) KEINE POLICY. Hier steht bewusst kein "create policy" — die leere Policy-Liste IST
--     die Kontrolle (s. Kopf). Wer an dieser Stelle eine ergaenzt, macht die Tabelle
--     nicht sicherer, sondern nur den Anschein davon.

-- (4) updated_at bei jedem UPDATE aktuell halten. Wiederverwendung von set_updated_at()
--     (aus 0001, in 0003 gegen search-path-Hijacking gehaertet) — KEINE neue Funktion.
--     KATALOG-GUARD statt "if not exists": create trigger kennt keine solche Form. Der
--     Guard ist versionsunabhaengig und deshalb dem Nachschlagen vorgezogen.
--     BEWUSST KEIN "drop trigger ... ; create trigger ...": das oeffnete bei einem
--     Wiederholungslauf ein Fenster ohne Trigger und ist als Muster gefaehrlicher, als
--     der Guard umstaendlich ist.
--     tgisinternal schliesst die vom System erzeugten Constraint-Trigger aus, damit der
--     Guard genau diesen einen Trigger meint.
do $$
begin
  if not exists (
    select 1
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'project_secrets'
      and t.tgname = 'project_secrets_set_updated_at'
      and not t.tgisinternal
  ) then
    create trigger project_secrets_set_updated_at
      before update on public.project_secrets
      for each row
      execute function public.set_updated_at();
  end if;
end
$$;

-- (5) UEBERNAHME der Bestandszeilen als Meta-Ziel. project_tokens wird dabei NUR
--     GELESEN.
--     "on conflict (project_id, target) do nothing" traegt beide Haelften der
--     Wiederholbarkeit in EINER Klausel: der zweite Lauf bricht nicht ab UND ruehrt
--     keine bestehende Zeile an.
--     ZEITSTEMPEL WERDEN MITGENOMMEN statt neu gesetzt: es ist DASSELBE Geheimnis, nur
--     an anderer Stelle gespeichert. Ein created_at von heute behauptete, es sei heute
--     entstanden. Ab dem naechsten echten UPDATE fuehrt der Trigger aus (4) updated_at
--     weiter.
insert into public.project_secrets (project_id, target, secret, created_at, updated_at)
select t.project_id, 'meta', t.meta_capi_token, t.created_at, t.updated_at
from public.project_tokens t
on conflict (project_id, target) do nothing;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die einen
-- nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0021', '0021_project_secrets.sql', now())
on conflict (version) do nothing;
