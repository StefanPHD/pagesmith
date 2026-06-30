import CodeImporter from "@/components/CodeImporter";
import { signOut } from "@/app/auth/actions";
import { listProjects, loadProject } from "@/app/projects/actions";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
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
      />
    </main>
  );
}
