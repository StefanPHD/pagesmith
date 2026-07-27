import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Authenticated-SSR-Client mocken (kein echter next/headers-Servercode).
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));
// Admin-Client existiert im Modul (setCapiToken), wird hier NICHT gebraucht — mocken,
// damit der Import nicht den echten service_role-Pfad laedt. Spy beweist zugleich:
// publishProject fasst service_role NIE an (Write laeuft ueber den authenticated-Client).
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { publishProject } from "./actions";

/**
 * Chainbarer Client-Mock. Unterstuetzt select().maybeSingle() (Ownership),
 * update() (thenable) UND insert() (thenable, mit konfigurierbarer Ergebnis-Queue
 * fuer den Kollisions-Retry). Zeichnet auf, was geschrieben wird.
 */
function makeClient(opts: {
  user: { id: string } | null;
  ownRow?: { data: unknown; error: unknown };
  updateResult?: { error: unknown };
  insertResults?: { error: unknown }[]; // pro insert-Aufruf, der Reihe nach
  // Scheibe "domains-Wahrheit": das Ergebnis der Label-Zeilen-Abfrage
  // (select label,created_at from domains where project_id=… and custom_host is null).
  // Default: leer + kein Fehler -> Verhalten wie "Projekt hat noch keine Zeile".
  labelRows?: { data: unknown; error: unknown };
}) {
  const rec = {
    fromTables: [] as string[],
    updatePatch: null as unknown,
    inserts: [] as unknown[],
  };
  const insertQueue = [...(opts.insertResults ?? [])];

  function builder(table: string) {
    let awaited: { data?: unknown; error: unknown } = { error: null };
    const b: Record<string, unknown> = {};
    b.select = vi.fn(() => {
      // Der domains-SELECT wird OHNE maybeSingle awaited (er liefert eine Liste) ->
      // das Ergebnis muss am thenable haengen, nicht an maybeSingle.
      if (table === "domains") {
        awaited = opts.labelRows ?? { data: [], error: null };
      }
      return b;
    });
    b.eq = vi.fn(() => b);
    b.is = vi.fn(() => b);
    b.order = vi.fn(() => b);
    b.maybeSingle = vi.fn(async () =>
      table === "projects"
        ? opts.ownRow ?? { data: null, error: null }
        : { data: null, error: null }
    );
    b.update = vi.fn((patch: unknown) => {
      rec.updatePatch = patch;
      awaited = opts.updateResult ?? { error: null };
      return b;
    });
    b.insert = vi.fn((row: unknown) => {
      rec.inserts.push(row);
      awaited = insertQueue.shift() ?? { error: null };
      return b;
    });
    b.then = (onF: (v: unknown) => unknown) => onF(awaited);
    return b;
  }

  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn((table: string) => {
      rec.fromTables.push(table);
      return builder(table);
    }),
  };
  createClient.mockResolvedValue(client);
  return { client, rec };
}

const snapshot = { html: "<h1 data-pagesmith-id='ps-1'>x</h1>", mappings: [], settings: {} };

beforeEach(() => {
  process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "lvh.me:3000";
});
afterEach(() => vi.clearAllMocks());

describe("publishProject (Scheibe 7a)", () => {
  it("Happy-Path (neu): Label vergeben, published_content gesetzt, Live-URL zurück", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "Mein Shop", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>LIVE</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    // Genau EIN domains-insert (neues Label auf Basis des Namens).
    expect(rec.inserts).toHaveLength(1);
    expect(rec.inserts[0]).toMatchObject({ project_id: "proj-1" });
    expect((rec.inserts[0] as { label: string }).label).toMatch(/^mein-shop-[a-z0-9]{6}$/);

    // published_content trägt das CLIENT-generierte funktionale HTML. Seit Scheibe 2b-1
    // wird zusätzlich der PageView-Emitter server-injiziert -> toContain statt toBe (der
    // Client-Inhalt bleibt erhalten, der Emitter kommt DANEBEN).
    const patch = rec.updatePatch as {
      published_content: { html: string; publishedAt: string };
      settings: { hosting: { label: string } };
    };
    expect(patch.published_content.html).toContain("<h1>LIVE</h1>");
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    expect(patch.published_content.publishedAt).toBeTruthy();
    // Label in settings.hosting gespiegelt.
    expect(patch.settings.hosting.label).toBe(res.label);

    // URL absolut aus env-Basis + Label.
    expect(res.url).toBe(`http://${res.label}.lvh.me:3000`);
    // KEIN service_role beteiligt.
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("IDEMPOTENZ: bestehendes Label -> KEIN neuer insert, gleiche URL", async () => {
    // FIXTURE NACHGEZOGEN, ASSERTIONS UNVERAENDERT: frueher trug diese Fixture NUR
    // settings.hosting.label und KEINE domains-Zeile — sie kodierte damit genau die
    // falsche Annahme, die der Divergenz-Bug ausnutzte ("settings-Label allein heisst
    // veroeffentlicht"). Seit die domains-Zeile die alleinige Wahrheit ist, IST dieser
    // Zustand die Divergenz und wird korrekt GEHEILT (Insert) — was den Test
    // fehlschlagen liess. Ein Projekt, das wirklich "bestehendes Label" hat, hat auch
    // die Zeile; genau das bildet die Fixture jetzt ab. Der Test prueft damit endlich,
    // was sein Name sagt.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
        },
        error: null,
      },
      labelRows: {
        data: [{ label: "mein-shop-abc123", created_at: "2026-07-01T00:00:00Z" }],
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>v2</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    // Re-Publish erzeugt KEINE zweite domains-Row.
    expect(rec.inserts).toHaveLength(0);
    expect(res.label).toBe("mein-shop-abc123");
    expect(res.url).toBe("http://mein-shop-abc123.lvh.me:3000");
    // Seit 2b-1 traegt published_content zusaetzlich den injizierten Emitter -> toContain.
    const patch = rec.updatePatch as { published_content: { html: string } };
    expect(patch.published_content.html).toContain("<h1>v2</h1>");
  });

  it("Scheibe 2b-0 DURABILITY: publishProject setzt tracking_key in der Spalte (Update-Patch, truthy)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "Mein Shop", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>LIVE</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as {
      tracking_key?: string;
      settings: { hosting: { label: string }; capi?: unknown };
    };
    // Die server-autoritative Spalte wird gesetzt (vorher NULL).
    expect(patch.tracking_key).toBeTruthy();
    // Der Key liegt NICHT in settings (Autoritaet ist die Spalte; settings unberuehrt
    // vom capi-Key hier) -> der naechste saveProject kann ihn nicht ueberschreiben.
    expect((patch.settings as { capi?: { trackingKey?: string } }).capi?.trackingKey).toBeUndefined();
    // Andockung bricht den Publish nicht: Label weiterhin korrekt gespiegelt.
    expect(patch.settings.hosting.label).toBe(res.ok ? res.label : "");
  });

  it("Scheibe 2b-0 IDEMPOTENZ: bestehender tracking_key bleibt 1:1 (nicht neu gewuerfelt)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>v2</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { tracking_key?: string };
    // ensureTrackingKey('keep-me') short-circuited -> Spaltenwert unveraendert.
    expect(patch.tracking_key).toBe("keep-me");
  });

  it("Scheibe 2b-1 End-to-End: der PageView-Emitter wird ins published_content injiziert und traegt den SPALTEN-Key", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
        },
        error: null,
      },
    });

    const res = await publishProject(
      "proj-1",
      "<html><body>LIVE</body></html>",
      snapshot
    );
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { published_content: { html: string } };
    // Der Emitter ist im gespeicherten HTML …
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    // … und traegt den SPALTEN-Key (nicht settings) — die 2b-0->2b-1-Naht.
    expect(patch.published_content.html).toContain(JSON.stringify("keep-me"));
    // Der Client-HTML-Inhalt bleibt erhalten (Injektion, kein Ersatz).
    expect(patch.published_content.html).toContain("LIVE");
  });

  it("Label-Kollision -> Retry mit neuem Kandidaten (zweiter insert gelingt)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
      insertResults: [{ error: { code: "23505" } }, { error: null }],
    });

    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    expect(rec.inserts).toHaveLength(2); // erster kollidiert, zweiter gelingt
  });

  it("IDOR: fremde project_id -> error, KEIN insert, KEIN update", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: null, error: null }, // Ownership-Query leer
    });

    const res = await publishProject("foreign", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/nicht gefunden/i);
    // Kern: nach fehlgeschlagenem Gate wird nichts geschrieben.
    expect(rec.inserts).toHaveLength(0);
    expect(rec.updatePatch).toBeNull();
    expect(rec.fromTables).not.toContain("domains");
  });

  it("nicht eingeloggt -> error, kein DB-Write", async () => {
    const { rec } = makeClient({ user: null });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });
});

describe("publishProject — Variante B (Phase 9 Scheibe 9a)", () => {
  const variantB = {
    functionalHtml: "<html><body>VARIANTE B</body></html>",
    mappings: [
      { elementId: "ps-b", type: "track" as const, config: { event: "Lead" } },
    ],
  };

  it("Projekt MIT B: published_content traegt BEIDE Varianten (ein Publish, ein atomarer Write)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
          html_b: "<h1>B draft</h1>",
        },
        error: null,
      },
    });

    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      snapshot,
      variantB
    );
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as {
      published_content: {
        html: string;
        variantB: { html: string; mappings: unknown[] };
      };
    };
    // A unveraendert am gewohnten Platz — der Serve-Pfad liest weiterhin nur .html.
    expect(patch.published_content.html).toContain("VARIANTE A");
    // B als ADDITIVER Geschwister-Key.
    expect(patch.published_content.variantB.html).toContain("VARIANTE B");
    expect(patch.published_content.variantB.mappings).toEqual(variantB.mappings);
    // GEGENPROBE: die beiden Varianten sind nicht dieselbe (kein Copy-Paste-Fehler,
    // bei dem B mit A's Dokument befuellt wird).
    expect(patch.published_content.variantB.html).not.toContain("VARIANTE A");
    expect(patch.published_content.html).not.toContain("VARIANTE B");
  });

  it("Invariante (iv): der PageView-Emitter steckt in BEIDEN Varianten und traegt DENSELBEN Spalten-Key", async () => {
    // Ohne diesen Test bliebe eine Injektion nur auf dem A-Zweig unbemerkt: der
    // Publish-Test oben waere gruen, aber B's PageViews verschwaenden still, sobald
    // 9b splittet (kein Fehler, nur fehlende Zahlen).
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
          html_b: "<h1>B draft</h1>",
        },
        error: null,
      },
    });

    await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      snapshot,
      variantB
    );

    const patch = rec.updatePatch as {
      published_content: { html: string; variantB: { html: string } };
    };
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    expect(patch.published_content.variantB.html).toContain('id="__ps_pve"');
    // Invariante (v): der trackingKey gilt pro PROJEKT, nicht pro Variante.
    expect(patch.published_content.html).toContain(JSON.stringify("keep-me"));
    expect(patch.published_content.variantB.html).toContain(
      JSON.stringify("keep-me")
    );
  });

  it("Invariante (i): Projekt OHNE B -> published_content traegt EXAKT die vier bisherigen Keys (kein Schema-Drift)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
          html_b: null,
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>nur A</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { published_content: Record<string, unknown> };
    // Sortierter Key-Vergleich (reihenfolge-unabhaengig, aber EXAKT): ein
    // mitgeschriebenes variantB: undefined/null waere Schema-Drift fuer jedes
    // Bestandsprojekt.
    expect(Object.keys(patch.published_content).sort()).toEqual(
      ["html", "mappings", "publishedAt", "settings"].sort()
    );
    expect(patch.published_content).not.toHaveProperty("variantB");
  });

  it("SERVER IST AUTORITAET: Client schickt ein B-Artefakt, obwohl die Spalte leer ist -> ignoriert, kein variantB-Key", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          html_b: null,
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>nur A</h1>", snapshot, variantB);
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as { published_content: Record<string, unknown> };
    // Per Publish laesst sich keine Variante erfinden, die es in der Zeile nicht gibt.
    expect(patch.published_content).not.toHaveProperty("variantB");
  });

  it("FAIL-CLOSED: Spalte sagt 'B existiert', der Aufruf bringt kein B-Artefakt -> Fehler, NICHTS geschrieben", async () => {
    // Realistischer Ausloeser: ein veralteter Browser-Tab mit gecachtem JS nach
    // einem Deploy. Wuerde hier einfach ohne B publiziert, verschwaende die
    // veroeffentlichte Variante B STILL — die Live-Seite liefe weiter, nur B waere
    // weg. Genau die Falle, die published_content als GANZHEITLICH ersetzter Blob
    // aufstellt.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          html_b: "<h1>B draft</h1>",
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>nur A</h1>", snapshot);
    expect(res.ok).toBe(false);
    // HANDLUNGSLEITEND, nicht generisch: der Text nennt Ursache UND naechsten Schritt.
    if (!res.ok) {
      expect(res.error).toMatch(/veralteten Stand/i);
      expect(res.error).toMatch(/neu laden/i);
    }
    // Fail-closed: kein Write, kein neues Label.
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });
});

describe("publishProject — domains-Zeile ist die alleinige Wahrheit", () => {
  const ROW = (label: string, created: string) => ({ label, created_at: created });

  it("TEST 1 NORMALFALL: Zeile vorhanden -> dieselbe URL, KEIN Insert", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "P",
          settings: { hosting: { label: "p-abc123" } },
        },
        error: null,
      },
      labelRows: { data: [ROW("p-abc123", "2026-07-01T00:00:00Z")], error: null },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.label).toBe("p-abc123");
    expect(rec.inserts).toHaveLength(0);
    // Ohne Divergenz ist die Antwort byte-gleich zu vorher (Invariante i).
    expect(res).not.toHaveProperty("restored");
  });

  it("TEST 2 HEILUNG: settings-Label da, Zeile FEHLT -> Insert mit DEMSELBEN Label", async () => {
    // Der Kernfall. Vorher lief publishProject hier durch, OHNE die Zeile anzulegen —
    // die Live-URL blieb dauerhaft 404 (live gemessen).
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "P",
          settings: { hosting: { label: "scheibe-7b-test-ef6dh9" } },
        },
        error: null,
      },
      labelRows: { data: [], error: null },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    // DASSELBE Label — die URL bleibt stabil (Invariante iii).
    expect(res.label).toBe("scheibe-7b-test-ef6dh9");
    expect(rec.inserts).toEqual([
      { label: "scheibe-7b-test-ef6dh9", project_id: "proj-1" },
    ]);
    // Der Heilungsfall ist am Ergebnis erkennbar.
    expect(res.restored).toBe(true);
    // Und published_content wurde geschrieben.
    const patch = rec.updatePatch as { published_content: unknown };
    expect(patch.published_content).toBeTruthy();
  });

  it("TEST 3 KEIN DIEBSTAHL: Label gehoert fremdem Projekt (23505) -> fail-closed", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "P",
          settings: { hosting: { label: "fremd-abc123" } },
        },
        error: null,
      },
      labelRows: { data: [], error: null },
      insertResults: [{ error: { code: "23505" } }],
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    if (!res.ok) {
      // Der Text nennt die ADRESSE und die FOLGE — und verspricht keinen
      // Support-Kanal, den es nicht gibt.
      expect(res.error).toContain("fremd-abc123");
      expect(res.error).toMatch(/anderweitig vergeben/i);
      expect(res.error).toMatch(/NICHTS veröffentlicht/i);
      expect(res.error).not.toMatch(/melde dich|kontaktiere|support/i);
    }
    // NICHTS geschrieben: kein published_content, keine Uebernahme der Fremdzeile.
    expect(rec.updatePatch).toBeNull();
  });

  it("TEST 4 UMGEKEHRTE DIVERGENZ: Zeile da, settings LEER -> Zeile gewinnt, KEIN zweites Label", async () => {
    // Ohne den Fix vergab dieser Zustand ein ZWEITES Label; die alte Zeile wurde zur
    // Waise und servte weiter alten Inhalt.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
      labelRows: { data: [ROW("alt-abc123", "2026-07-01T00:00:00Z")], error: null },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.label).toBe("alt-abc123");
    expect(rec.inserts).toHaveLength(0);
    // settings wird mit DIESEM Label geschrieben (Spiegel, nicht Quelle).
    const patch = rec.updatePatch as { settings: { hosting: { label: string } } };
    expect(patch.settings.hosting.label).toBe("alt-abc123");
  });

  it("TEST 5 ERSTER PUBLISH: weder Zeile noch settings -> frisches Label", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "Mein Shop", settings: {} }, error: null },
      labelRows: { data: [], error: null },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.label).toMatch(/^mein-shop-[a-z0-9]{6}$/);
    expect(rec.inserts).toHaveLength(1);
    expect(res).not.toHaveProperty("restored");
  });

  it("TEST 6 FAIL-CLOSED: Label-Ermittlung liefert DB-Fehler -> KEIN Publish", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: { id: "proj-1", name: "P", settings: { hosting: { label: "p-abc" } } },
        error: null,
      },
      labelRows: { data: null, error: { message: "boom" } },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/nicht geprüft werden/i);
    // Lieber kein Publish als eines, das die Divergenz fortschreibt.
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });

  it("TEST 7a MEHRERE ZEILEN: die aus settings gewinnt (URL-Kontinuitaet)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: { id: "proj-1", name: "P", settings: { hosting: { label: "neu-222222" } } },
        error: null,
      },
      // AELTESTE zuerst (order created_at asc) — die settings-Zeile ist die juengere.
      labelRows: {
        data: [ROW("alt-111111", "2026-07-01T00:00:00Z"), ROW("neu-222222", "2026-07-20T00:00:00Z")],
        error: null,
      },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.label).toBe("neu-222222");
    expect(rec.inserts).toHaveLength(0);
  });

  it("TEST 7b MEHRERE ZEILEN OHNE settings-Label: die AELTESTE gewinnt, nicht die erste beliebige", async () => {
    // Deterministik-Riegel: die DB erlaubt mehrere Label-Zeilen (0007 deckt nur
    // custom_host ab). Ohne Ordnung entschiede der Zufall ueber die Live-URL.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
      labelRows: {
        data: [ROW("aelteste-111111", "2026-07-01T00:00:00Z"), ROW("juengere-222222", "2026-07-20T00:00:00Z")],
        error: null,
      },
    });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.label).toBe("aelteste-111111");
    expect(rec.inserts).toHaveLength(0);
  });

  it("PROJEKTION: die Label-Abfrage liest NUR label/created_at und filtert auf custom_host IS NULL", async () => {
    const { client } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
      labelRows: { data: [ROW("p-abc123", "2026-07-01T00:00:00Z")], error: null },
    });
    await publishProject("proj-1", "<h1>x</h1>", snapshot);
    // domains wurde befragt (eigener Roundtrip, bewusst kein Join auf projects).
    expect(client.from).toHaveBeenCalledWith("domains");
  });
});
