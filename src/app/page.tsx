import CodeImporter from "@/components/CodeImporter";
import { signOut } from "@/app/auth/actions";
import { listProjects, loadProject } from "@/app/projects/actions";
import { createClient } from "@/lib/supabase/server";

// DER ERGEBNISCODE DES GOOGLE-AUTORISIERUNGS-FLUSSES (Scheibe 3).
//
// HIER UND NICHT IM BROWSER: Diese Seite reicht schon neun server-geladene Werte als
// initial*-Props hinein; der Parameter folgt demselben Weg. Ein Lesen im Client waere
// beim ersten Render auf Server und Client verschieden.
//
// DER NAME DES PARAMETERS IST DAS EINZIGE ZIEL-LITERAL DIESES WEGES und steht bewusst
// HIER: Er ist der URL-Vertrag der Callback-Route (dort RESULT_PARAM), keine Aussage
// darueber, welches Ziel eine Karte hat. Weiter unten kennt ihn niemand mehr — die Karte
// zeigt ihn an ihrer eigenen Gestalt, nicht an einem Zielnamen.
//
// GEDEUTET WIRD ER HIER NICHT: kein Abgleich gegen eine Code-Liste, keine Uebersetzung.
// Was ankommt, geht als Zeichenkette weiter; die drei Faelle unterscheidet die Karte.
// Ein Array (?google=a&google=b) waere kein string -> null, statt eine Anzeige zu raten.
const RESULT_PARAM = "google";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params[RESULT_PARAM];
  const connectOutcome = typeof raw === "string" && raw !== "" ? raw : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Auto-Load (3.3): das zuletzt bearbeitete Projekt + die volle Liste fuer den
  // Switcher. Kein Projekt -> null/leer, Editor startet im leeren Zustand.
  const [project, projects] = await Promise.all([loadProject(), listProjects()]);

  return (
    <main className="mx-auto w-full max-w-[1800px] px-4 py-8 lg:px-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">Pagesmith</h1>
          <p className="text-gray-500">
            Mach deinen KI-generierten Code funktional.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {user?.email && (
            <span className="text-sm text-gray-500">{user.email}</span>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
      <CodeImporter
        initialCode={project?.html ?? ""}
        initialProjectId={project?.id ?? null}
        initialProjects={projects}
        initialMappings={project?.mappings ?? []}
        initialSettings={project?.settings ?? {}}
        initialVariantBHtml={project?.html_b ?? null}
        initialVariantBMappings={project?.mappings_b ?? null}
        initialAbTestActive={project?.ab_test_active ?? false}
        initialAbTestStartedAt={project?.ab_test_started_at ?? null}
        initialConnectOutcome={connectOutcome}
      />
    </main>
  );
}
