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

// =============================================================================
// LEER-RIEGEL (Scheibe Leere-Variante-Riegel)
//
// Der Befund: publishProject injiziert NACH jeder Pruefung den PageView-Emitter.
// injectPageViewEmitter("", key, form) liefert fuer JEDE Form einen nicht-leeren String —
// mindestens den Consent-Gate-Block und das PageView-Script, bei "bar" und "modal" dazu
// Wiederherstellung, Oberflaeche und Setzer -> das
// Ergebnis ist NICHT leer, nonEmptyHtml haelt es fuer auslieferbar, und der
// Besucher bekommt eine visuell leere Seite. Der Riegel greift deshalb VOR der
// Injektion, auf dem EINGEHENDEN functionalHtml beider Varianten.
//
// WARUM DIE INSERT-ASSERTIONEN HIER DIE EIGENTLICHE ARBEIT MACHEN: "res.ok ===
// false" allein waere auch von einem Riegel erfuellt, der ZU SPAET sitzt — der
// Label-Block darueber SCHREIBT bereits. rec.inserts misst die PLATZIERUNG
// (Auflage 1); ohne diese Assertion ist der Test als Waechter wertlos.
// =============================================================================
describe("publishProject — Leer-Riegel", () => {
  const B = (html: string) => ({ functionalHtml: html, mappings: [] });

  it("T1 A leer, kein B -> Ablehnung, KEIN update UND KEIN domains-insert (Platzierung vor dem Label-Block)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      // Bewusst OHNE settings.hosting und OHNE labelRows: das ist der ERSTE
      // Publish, also genau der Fall, in dem der Label-Block ein FRISCHES Label
      // vergeben wuerde. Ein Riegel hinter dem Block hinterliesse hier eine
      // Live-Adresse, die nie Inhalt bekommt.
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "", snapshot);
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.error).toContain("Die Seite ist leer");

    // Invariante (i): ein abgelehnter Publish schreibt GAR NICHTS.
    expect(rec.updatePatch).toBeNull();
    // AUFLAGE 1 — die Assertion, die die Platzierung misst.
    expect(rec.inserts).toHaveLength(0);
    // Und die domains-Tabelle wurde gar nicht erst angefasst.
    expect(rec.fromTables).not.toContain("domains");
  });

  it("T2 A gefuellt, B leer -> Ablehnung, Meldung nennt Variante B UND den Ausweg", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: { id: "proj-1", name: "P", settings: {}, html_b: "<h1>b</h1>" },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>A</h1>", snapshot, B(""));
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.error).toContain("Variante B ist leer");
    // AUFLAGE 6: ohne den Ausweg waere das Projekt komplett unveroeffentlichbar
    // ohne erkennbaren Weg zurueck.
    expect(res.error).toContain("entferne sie");
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });

  it("T3 DER SCHLIMMERE FALL: A leer, B gefuellt -> Ablehnung, Meldung nennt Variante A", async () => {
    // Real erreichbar, wenn der Editor auf B steht und der A-Stash leer ist: der
    // alte Button-Guard las code (= B, gefuellt) und war frei, waehrend pairA aus
    // dem Stash kam. Ohne aktiven Test liefert die Route immer A -> ALLE Besucher
    // bekaemen die leere Seite, nicht nur Bucket B.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: { id: "proj-1", name: "P", settings: {}, html_b: "<h1>b</h1>" },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "   \n\t  ", snapshot, B("<h1>B</h1>"));
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.error).toContain("Variante A ist leer");
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });

  it("T4 REGRESSION + POSITIV-GEGENPROBE: A gefuellt, kein B -> Publish gelingt, exakt vier Keys, Emitter drin", async () => {
    // OHNE diesen Test waeren T1-T3/T5 auch von einem Riegel erfuellt, der JEDEN
    // Publish ablehnt. Er belegt, dass die negativen Tests aus dem RICHTIGEN Grund
    // gruen sind.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>ECHTER INHALT</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { published_content: Record<string, unknown> };
    // Invariante (ii): kein Schema-Drift fuer Projekte ohne B.
    expect(Object.keys(patch.published_content).sort()).toEqual([
      "html",
      "mappings",
      "publishedAt",
      "settings",
    ]);
    const html = patch.published_content.html as string;
    expect(html).toContain("<h1>ECHTER INHALT</h1>");
    expect(html).toContain('id="__ps_pve"');
  });

  it("T5 WHITESPACE-ONLY zaehlt als leer (die Regel ist nonEmptyHtml, kein handgeschriebenes === \"\")", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "   \n\t  ", snapshot);
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });

  it("T10 AUFLAGE 4: hasVariantB false + Client schickt LEERES variantB -> Publish GELINGT (der Riegel spiegelt die Write-Bedingung)", async () => {
    // Der reale Ausloeser: ein Tab, der nach dem Entfernen der Variante noch ein
    // variantB im Zustand haelt. Es wird nicht geschrieben (html_b ist null), also
    // darf es auch nicht geprueft werden — sonst blockiert der Riegel einen
    // voellig legitimen Publish.
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {}, html_b: null }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>A</h1>", snapshot, B(""));
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { published_content: Record<string, unknown> };
    // Das ignorierte B taucht auch nicht als Key auf (Server ist Autoritaet).
    expect(patch.published_content).not.toHaveProperty("variantB");
  });
});

// --- SCHEIBE 11.5a: DER SCHALTER ERREICHT BEIDE VARIANTEN -----------------------
describe("publishProject — der Einwilligungs-Schalter (Scheibe 11.5a)", () => {
  const variantB11_5a = {
    functionalHtml: "<html><body>VARIANTE B</body></html>",
    mappings: [
      { elementId: "ps-b", type: "track" as const, config: { event: "Lead" } },
    ],
  };

  function client() {
    return makeClient({
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
  }

  // T8. DIE FEHLERKLASSE, DIE NUR DIESER TEST FAENGT: ein vergessener zweiter
  // Aufruf. Variante B laeuft ueber eine EIGENE Aufrufstelle in publishProject; sie
  // sieht der ersten zum Verwechseln aehnlich, und wer nur A prueft, liefert eine B
  // ohne Setzer aus — auf genau der Haelfte des Traffics, und ohne dass irgendwo
  // etwas rot wird.
  it("T8: Schalter AN -> der Setzer steht in BEIDEN Varianten", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { gate: true } } },
      variantB11_5a
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as {
      published_content: { html: string; variantB: { html: string } };
    };
    expect(patch.published_content.html).toContain('id="__ps_cns"');
    expect(patch.published_content.variantB.html).toContain('id="__ps_cns"');
  });

  // DIE POSITIVKONTROLLE ZUM TEST DARUEBER: ohne sie waere "kein Setzer" von
  // "publishProject hat gar nichts geschrieben" nicht zu unterscheiden.
  it("T8b: Schalter AUS -> KEIN Setzer, in keiner der beiden Varianten", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      snapshot,
      variantB11_5a
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as {
      published_content: { html: string; variantB: { html: string } };
    };
    expect(patch.published_content.html).not.toContain('id="__ps_cns"');
    expect(patch.published_content.variantB.html).not.toContain('id="__ps_cns"');
    // POSITIVKONTROLLE: geschrieben wurde sehr wohl etwas.
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    expect(patch.published_content.variantB.html).toContain('id="__ps_pve"');
  });

  // R12 (Scheibe 11.5b). Dieselbe Fehlerklasse wie T8 — ein vergessener zweiter Aufruf —,
  // an der Wiederherstellung. Die Aufrufstellen tragen den Schalter bereits; der Test
  // haelt, dass der Block an BEIDEN ankommt.
  it("R12: Schalter AN -> die Wiederherstellung steht in BEIDEN Varianten", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { gate: true } } },
      variantB11_5a
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as {
      published_content: { html: string; variantB: { html: string } };
    };
    expect(patch.published_content.html).toContain('id="__ps_cnr"');
    expect(patch.published_content.variantB.html).toContain('id="__ps_cnr"');
  });

  it("R12b: Schalter AUS -> KEINE Wiederherstellung, in keiner der beiden Varianten", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      snapshot,
      variantB11_5a
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as {
      published_content: { html: string; variantB: { html: string } };
    };
    expect(patch.published_content.html).not.toContain('id="__ps_cnr"');
    expect(patch.published_content.variantB.html).not.toContain('id="__ps_cnr"');
    // POSITIVKONTROLLE: geschrieben wurde sehr wohl etwas.
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    expect(patch.published_content.variantB.html).toContain('id="__ps_pve"');
  });
});

// --- SCHEIBE 11.5d: DIE WERTE DES SCHALTERS UND DIE VERWEIGERUNG -----------------
//
// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NICHT AUS DEM CODE: Ein unbekannter
// Wert verweigert das Veroeffentlichen, und zwar BEVOR irgendetwas geschrieben wird —
// auch keine Label-Zeile. "bar" und der Altbestand `gate: true` liefern die Leiste in
// BEIDEN Varianten; "off" liefert sie in keiner.
// T8, T8b, R12 und R12b darueber bleiben unveraendert: Sie schreiben `gate: true` und
// laufen seit dieser Scheibe ueber den Altbestands-Zweig des Lesers.
describe("publishProject — die Werte des Schalters (Scheibe 11.5d)", () => {
  const variantB11_5d = {
    functionalHtml: "<html><body>VARIANTE B</body></html>",
    mappings: [
      { elementId: "ps-b", type: "track" as const, config: { event: "Lead" } },
    ],
  };
  const MESSAGE_UNBEKANNT =
    "Die Einwilligungs-Einstellung dieses Projekts hat einen unbekannten Wert. Bitte unter „Einwilligung“ neu wählen. Es wurde nichts veröffentlicht.";

  function client() {
    return makeClient({
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
  }

  type Patch = { published_content: { html: string; variantB: { html: string } } };

  // P1. DER EINZIGE TEST, DER DIE VERWEIGERUNG FAENGT (Pflicht-Mutation (iii)). Er prueft
  // zugleich die STELLUNG: Laege die Verweigerung hinter dem Label-Block, stuende
  // "domains" in fromTables und eine Label-Zeile in inserts.
  it("P1: ein unbekannter Wert verweigert, BEVOR irgendetwas geschrieben wird — Positivkontrolle im selben Lauf", async () => {
    const unbekannt = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      // DER UNBEKANNT-BELEG TRAEGT DAS PRAEFIX `__ps_` (seit Scheibe 11.5d-2): Ein realistischer
      // String, der nie ein Schalter-Wert wird, weil der Namensraum eigenen Kennungen gehoert —
      // Plan-Setzung am Docblock von CONSENT_DIALOGS. Bis dahin stand hier "modal".
      { ...snapshot, settings: { consent: { dialog: "__ps_unknown" } } },
      variantB11_5d
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_UNBEKANNT });
    expect(unbekannt.rec.updatePatch).toBeNull();
    expect(unbekannt.rec.inserts).toHaveLength(0);
    expect(unbekannt.rec.fromTables).not.toContain("domains");

    // POSITIVKONTROLLE: derselbe Aufbau mit einem gebauten Wert schreibt.
    const bekannt = client();
    const ok = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar" } } },
      variantB11_5d
    );
    expect(ok.ok).toBe(true);
    expect(bekannt.rec.updatePatch).not.toBeNull();
    expect(bekannt.rec.fromTables).toContain("domains");
  });

  it("P2: 'bar' -> die Leiste in BEIDEN Varianten, zwischen Wiederherstellung und Setzer", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar" } } },
      variantB11_5d
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as Patch;
    for (const html of [patch.published_content.html, patch.published_content.variantB.html]) {
      expect(html).toContain('id="__ps_clb"');
      expect(html.indexOf('id="__ps_cnr"')).toBeLessThan(html.indexOf('id="__ps_clb"'));
      expect(html.indexOf('id="__ps_clb"')).toBeLessThan(html.indexOf('id="__ps_cns"'));
      // Leiste und Modal schliessen einander aus (Scheibe 11.5d-2).
      expect(html).not.toContain('id="__ps_cmo"');
    }
  });

  // P4 UND P4b (Scheibe 11.5d-2): das Modal in BEIDEN Varianten, an der Stelle der Leiste.
  // Die Erwartungen stammen aus dem Zuschnitt: zwischen Wiederherstellung und Setzer,
  // und nie zusammen mit der Leiste.
  it("P4: 'modal' -> das Modal in BEIDEN Varianten, zwischen Wiederherstellung und Setzer, keine Leiste", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "modal" } } },
      variantB11_5d
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as Patch;
    for (const html of [patch.published_content.html, patch.published_content.variantB.html]) {
      expect(html).toContain('id="__ps_cmo"');
      expect(html.indexOf('id="__ps_cnr"')).toBeGreaterThan(-1);
      expect(html.indexOf('id="__ps_cnr"')).toBeLessThan(html.indexOf('id="__ps_cmo"'));
      expect(html.indexOf('id="__ps_cmo"')).toBeLessThan(html.indexOf('id="__ps_cns"'));
      expect(html).not.toContain('id="__ps_clb"');
    }
  });

  it("P4b: 'modal' neben dem Altbestand `gate: true` -> der neue gewinnt, Modal statt Leiste", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { gate: true, dialog: "modal" } } },
      variantB11_5d
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as Patch;
    for (const html of [patch.published_content.html, patch.published_content.variantB.html]) {
      expect(html).toContain('id="__ps_cmo"');
      expect(html).not.toContain('id="__ps_clb"');
      // Das Modal traegt dieselben Nachbarn wie die Leiste: Wiederherstellung und Setzer.
      expect(html.indexOf('id="__ps_cnr"')).toBeGreaterThan(-1);
      expect(html.indexOf('id="__ps_cnr"')).toBeLessThan(html.indexOf('id="__ps_cmo"'));
      expect(html.indexOf('id="__ps_cmo"')).toBeLessThan(html.indexOf('id="__ps_cns"'));
    }
  });

  it("P2b: 'off' -> keine Leiste, in keiner der beiden Varianten (Positivkontrolle: Emitter da)", async () => {
    const { rec } = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "off" } } },
      variantB11_5d
    );
    expect(res.ok).toBe(true);
    const patch = rec.updatePatch as Patch;
    for (const html of [patch.published_content.html, patch.published_content.variantB.html]) {
      expect(html).not.toContain('id="__ps_clb"');
      expect(html).not.toContain('id="__ps_cmo"');
      expect(html).not.toContain('id="__ps_cns"');
      // SEIT SCHEIBE 11.5e-2: bei AUS entsteht auch KEIN Widerruf-Block und KEIN globaler
      // Name (Invariante (8) der Scheibe).
      expect(html).not.toContain('id="__ps_crv"');
      expect(html).not.toContain("pagesmithConsentRevoke");
      expect(html).toContain('id="__ps_pve"');
    }
  });

  // P5 (Scheibe 11.5e-2). DER WIDERRUF-BLOCK STEHT IN BEIDEN VARIANTEN, an derselben
  // Stelle wie die Oberflaeche — zwischen ihr und dem Setzer. Die Erwartungen stammen aus
  // dem Zuschnitt, nicht aus dem Code.
  // WARUM BEIDE VARIANTEN: publishProject ruft injectPageViewEmitter fuer A und B mit
  // DEMSELBEN Schalter; ein Widerruf, den nur eine Variante traegt, waere ein stiller
  // Ausfall fuer die Haelfte des Traffics.
  it("P5: 'bar' und 'modal' -> der Widerruf-Block in BEIDEN Varianten, zwischen Oberflaeche und Setzer", async () => {
    for (const [form, dialogId] of [
      ["bar", 'id="__ps_clb"'],
      ["modal", 'id="__ps_cmo"'],
    ] as const) {
      const { rec } = client();
      const res = await publishProject(
        "proj-1",
        "<html><body>VARIANTE A</body></html>",
        { ...snapshot, settings: { consent: { dialog: form } } },
        variantB11_5d
      );
      expect(res.ok).toBe(true);
      const patch = rec.updatePatch as Patch;
      for (const html of [
        patch.published_content.html,
        patch.published_content.variantB.html,
      ]) {
        expect(html).toContain('id="__ps_crv"');
        expect(html).toContain("pagesmithConsentRevoke");
        expect(html.indexOf(dialogId)).toBeLessThan(html.indexOf('id="__ps_crv"'));
        expect(html.indexOf('id="__ps_crv"')).toBeLessThan(
          html.indexOf('id="__ps_cns"')
        );
      }
    }
  });

  it("P3: Altbestand `gate: true` -> Leiste; daneben `dialog: 'off'` -> der neue gewinnt, weder Leiste noch Setzer", async () => {
    const alt = client();
    const resAlt = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { gate: true } } },
      variantB11_5d
    );
    expect(resAlt.ok).toBe(true);
    const patchAlt = alt.rec.updatePatch as Patch;
    expect(patchAlt.published_content.html).toContain('id="__ps_clb"');
    expect(patchAlt.published_content.variantB.html).toContain('id="__ps_clb"');

    const vorrang = client();
    const resVorrang = await publishProject(
      "proj-1",
      "<html><body>VARIANTE A</body></html>",
      { ...snapshot, settings: { consent: { gate: true, dialog: "off" } } },
      variantB11_5d
    );
    expect(resVorrang.ok).toBe(true);
    const patchVorrang = vorrang.rec.updatePatch as Patch;
    expect(patchVorrang.published_content.html).not.toContain('id="__ps_clb"');
    expect(patchVorrang.published_content.html).not.toContain('id="__ps_cns"');
    // POSITIVKONTROLLE: geschrieben wurde sehr wohl etwas.
    expect(patchVorrang.published_content.html).toContain('id="__ps_pve"');
  });
});

describe("publishProject — die Darstellung (Scheibe 11.13b)", () => {
  // DIE ERWARTUNGEN DIESES BLOCKS SIND AUS DEN ENTSCHEIDUNGEN P11.13-6 UND P11.13-7
  // GESCHRIEBEN, NICHT AUS DEM CODE (docs/immer-beachten.md, "EIN WAECHTER UEBER DIE
  // SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"). Die Meldung steht hier als
  // Literal und nicht als Import derselben Konstante, die der Produktivcode zurueckgibt —
  // sonst waere der Test ein Spiegel und bestaetigte jeden Tippfehler.
  const MESSAGE_THEMA =
    "Die Darstellung des Einwilligungs-Dialogs hat einen unbekannten Wert. Bitte unter „Darstellung“ neu wählen. Es wurde nichts veröffentlicht.";
  const MESSAGE_DIALOG =
    "Die Einwilligungs-Einstellung dieses Projekts hat einen unbekannten Wert. Bitte unter „Einwilligung“ neu wählen. Es wurde nichts veröffentlicht.";
  const MESSAGE_FARBEN =
    "Die eigenen Farben des Einwilligungs-Dialogs sind unvollständig oder ungültig. Bitte unter „Darstellung“ beide Farben neu wählen. Es wurde nichts veröffentlicht.";
  const MESSAGE_SACHTEXT =
    "Der eigene Text des Einwilligungs-Dialogs ist ungültig. Bitte unter „Darstellung“ einen Text ohne Steuerzeichen und innerhalb der Längengrenze eingeben oder das Feld leeren. Es wurde nichts veröffentlicht.";
  const MESSAGE_SPRACHE =
    "Die Sprache des Einwilligungs-Dialogs hat einen unbekannten Wert. Bitte unter „Sprache“ neu wählen. Es wurde nichts veröffentlicht.";

  function client() {
    return makeClient({
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
  }

  type Patch = { published_content: { html: string } };

  // PT1. DER EINZIGE TEST, DER DIE VERWEIGERUNG BEI EINGESCHALTETEM DIALOG FAENGT
  // (Pflicht-Mutation Mu3). Er prueft zugleich die STELLUNG: Laege der Abbruch hinter dem
  // Label-Block, stuende "domains" in fromTables.
  it("PT1: unbekanntes Thema + 'bar' -> Abbruch mit der EIGENEN Meldung, und nichts wird angelegt", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "bar", theme: "__ps_unknown" } },
      },
      undefined
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_THEMA });
    expect(c.rec.updatePatch).toBeNull();
    expect(c.rec.inserts).toHaveLength(0);
    expect(c.rec.fromTables).not.toContain("domains");
  });

  // PT2. DER EINZIGE TEST, DER DIE ASYMMETRIE AUS P11.13-7 FAENGT (Pflicht-Mutation Mu2).
  // ER TRAEGT ZUGLEICH DEN BELEG FUER DEN PLATZHALTER IN actions.ts: Bei "off" ist ein
  // unbekanntes Thema unschaedlich, WEIL kein Oberflaechen-Baustein entsteht — der
  // Ersatzwert "light" erreicht also keine ausgelieferte Zeile.
  it("PT2: unbekanntes Thema + 'off' -> veroeffentlicht, und kein Dialog-Baustein im Text", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "off", theme: "__ps_unknown" } },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    const patch = c.rec.updatePatch as Patch;
    for (const kennung of ["__ps_clb", "__ps_cmo", "__ps_crv", "__ps_cns", "__ps_cnr"]) {
      expect(patch.published_content.html).not.toContain(`id="${kennung}"`);
    }
    // POSITIVKONTROLLE: geschrieben wurde sehr wohl etwas.
    expect(patch.published_content.html).toContain('id="__ps_pve"');
  });

  // PT3 (POSITIVKONTROLLE zu PT1): ein gebautes Thema geht durch UND wirkt im Text.
  it("PT3: 'dark' + 'bar' -> veroeffentlicht, und die dunkle Palette steht im Text", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar", theme: "dark" } } },
      undefined
    );
    expect(res.ok).toBe(true);
    const html = (c.rec.updatePatch as Patch).published_content.html;
    expect(html).toContain("#111827;color-scheme:dark");
    expect(html).toContain("#60a5fa");
    // GEGENPROBE IM SELBEN LAUF: mit "light" steht sie NICHT da.
    const hell = client();
    await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar", theme: "light" } } },
      undefined
    );
    const htmlHell = (hell.rec.updatePatch as Patch).published_content.html;
    expect(htmlHell).not.toContain("color-scheme:dark");
    expect(htmlHell).not.toContain("#60a5fa");
  });

  // PT4. DIE REIHENFOLGE DER ZWEI PRUEFUNGEN: Bei einem unbekannten DIALOG faellt die
  // Dialog-Meldung, nicht die Themen-Meldung — sonst schickte der Abbruch den Betreiber an
  // die falsche Stelle der Oberflaeche.
  it("PT4: unbekannter Dialog + unbekanntes Thema -> die DIALOG-Meldung", async () => {
    client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "__ps_x", theme: "__ps_y" } },
      },
      undefined
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_DIALOG });
  });

  // ===== DIE ZWEI FREIEN FARBEN (Scheibe 11.13c) ==================================
  // DIE MELDUNG STEHT OBEN ALS LITERAL, nicht als Import derselben Konstante — sonst
  // waere der Test ein Spiegel.

  // PT5. DER EINZIGE TEST, DER DIE VERWEIGERUNG BEI EINER KAPUTTEN FARBE FAENGT
  // (Pflicht-Mutation M-b). Er prueft zugleich die STELLUNG des Abbruchs: Laege er hinter
  // dem Label-Block, stuende "domains" in fromTables — und eine Label-Zeile bliebe zurueck.
  // DIE FEINDLICHE EINGABE IST DIE AUS INVARIANTE Z8, nicht eine erfundene: Der Wert
  // `#000000;}.bar{display:none` waere ohne den Anker im Muster eine ZWEITE CSS-Regel im
  // Schattenbaum.
  it("PT5: kaputte Farbe + 'custom' + 'bar' -> Abbruch mit der EIGENEN Meldung, nichts angelegt", async () => {
    for (const [hg, tx] of [
      ["#000000;}.bar{display:none", "#111827"],
      ["#fff", "#111827"],
      ["#FFFFFF", "#111827"],
      ["#ffffff", "</script>"],
      ["#ffffff", "url(x)"],
      ["#ffffff", ""],
    ]) {
      const c = client();
      const res = await publishProject(
        "proj-1",
        "<html><body>A</body></html>",
        {
          ...snapshot,
          settings: {
            consent: {
              dialog: "bar",
              theme: "custom",
              colorBackground: hg,
              colorText: tx,
            },
          },
        },
        undefined
      );
      expect(res, `${hg} / ${tx}`).toEqual({ ok: false, error: MESSAGE_FARBEN });
      expect(c.rec.updatePatch).toBeNull();
      expect(c.rec.inserts).toHaveLength(0);
      expect(c.rec.fromTables).not.toContain("domains");
    }
  });

  // PT5b. DAS FEHLENDE FELD ist derselbe Fall — und er ist der wahrscheinlichere: ein
  // Projekt, dessen Blob "custom" traegt, aber nie eine Farbe bekommen hat.
  it("PT5b: fehlende Farbe + 'custom' + 'modal' -> Abbruch, nichts angelegt", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "modal", theme: "custom" } } },
      undefined
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_FARBEN });
    expect(c.rec.updatePatch).toBeNull();
    expect(c.rec.fromTables).not.toContain("domains");
  });

  // PT6. DIE ASYMMETRIE AUS P11.13-7, FORTGESCHRIEBEN AUF DIE FARBEN: Bei "off" entsteht
  // kein Oberflaechen-Block, der Farbwert erreicht also keine ausgelieferte Zeile — und
  // ein Abbruch dort sperrte das Veroeffentlichen fuer eine Einstellung ohne jede Wirkung.
  // ER TRAEGT ZUGLEICH DEN BELEG FUER DEN PLATZHALTER in actions.ts.
  it("PT6: kaputte Farbe + 'custom' + 'off' -> veroeffentlicht, und kein Dialog-Baustein", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: { dialog: "off", theme: "custom", colorBackground: "kaputt" },
        },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    const patch = c.rec.updatePatch as Patch;
    for (const kennung of ["__ps_clb", "__ps_cmo", "__ps_crv", "__ps_cns", "__ps_cnr"]) {
      expect(patch.published_content.html).not.toContain(`id="${kennung}"`);
    }
    expect(patch.published_content.html).toContain('id="__ps_pve"');
  });

  // PT-T1. DER EINZIGE TEST, DER DIE VERWEIGERUNG BEI EINEM KAPUTTEN SACHTEXT FAENGT
  // (Phase 11.13, Scheibe 11.13d; Pflicht-Mutation M-f). Er prueft zugleich die STELLUNG
  // des Abbruchs: Laege er hinter dem Label-Block, stuende "domains" in fromTables — und
  // eine Label-Zeile bliebe zurueck.
  // DIE EINGABEN SIND DIE ZEICHENKLASSEN AUS ENTSCHEIDUNG P11.13-26, nicht erfundene.
  // DIE ZEICHEN WERDEN IM CODE GEBAUT: Ein Unicode-Escape im Quelltext ist in diesem
  // Projekt am 2026-09-18 mehrfach still in sein Zeichen verwandelt worden.
  it("PT-T1: kaputter Sachtext + 'bar' -> Abbruch mit der EIGENEN Meldung, nichts angelegt", async () => {
    for (const text of [
      "a" + String.fromCharCode(0x0a) + "b",
      "a" + String.fromCharCode(0x09) + "b",
      "a" + String.fromCharCode(0x202e) + "b",
      "",
      "   ",
      "W".repeat(5000),
    ]) {
      const c = client();
      const res = await publishProject(
        "proj-1",
        "<html><body>A</body></html>",
        {
          ...snapshot,
          settings: { consent: { dialog: "bar", text } },
        },
        undefined
      );
      expect(res, JSON.stringify(text)).toEqual({
        ok: false,
        error: MESSAGE_SACHTEXT,
      });
      expect(c.rec.updatePatch).toBeNull();
      expect(c.rec.inserts).toHaveLength(0);
      expect(c.rec.fromTables).not.toContain("domains");
    }
  });

  // PT-T2. DIE ASYMMETRIE AUS P11.13-7, auf den Sachtext angewandt (Pflicht-Mutation
  // M-f, Gegenrichtung): Bei "off" entsteht kein Oberflaechen-Block, der Wert erreicht
  // keine ausgelieferte Zeile, und es gibt keinen Besucher-Preis. EIN ABBRUCH DORT
  // SPERRTE DAS VEROEFFENTLICHEN FUER EINE EINSTELLUNG OHNE JEDE WIRKUNG.
  // ER IST ZUGLEICH DER WAECHTER DER GRENZE: Wer bei "off" je einen Sachtext
  // ausliefert, macht diesen Test rot und muss die Entscheidung anfassen, nicht den Test.
  it("PT-T2: kaputter Sachtext + 'off' -> veroeffentlicht, und kein Dialog-Baustein im Text", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "off", text: "a" + String.fromCharCode(0x0a) + "b" } },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    const html = String(
      (c.rec.updatePatch as Patch).published_content.html
    );
    expect(html).not.toContain("__ps_clb");
    expect(html).not.toContain("__ps_cmo");
    expect(html).not.toContain("__ps_crv");
    // POSITIVKONTROLLE im selben Lauf: der Emitter steht sehr wohl drin.
    expect(html).toContain("__ps_pve");
  });

  // PT-T3 (POSITIVKONTROLLE zu PT-T1): ein GUELTIGER eigener Sachtext geht durch UND
  // steht woertlich im ausgelieferten Text — auch der feindliche, denn ihn faengt nicht
  // das Tor, sondern der Einbettungs-Helfer maskiert ihn (Invariante S4, zwei Linien).
  it("PT-T3: eigener Sachtext -> veroeffentlicht und woertlich im Text; kein Ausbruch", async () => {
    const c = client();
    const eigen = "Wir setzen <3 Cookies.";
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar", text: eigen } } },
      undefined
    );
    expect(res.ok).toBe(true);
    const html = String(
      (c.rec.updatePatch as Patch).published_content.html
    );
    // Der Satz steht drin — maskiert, nicht roh: das "<" ist ein Unicode-Escape.
    expect(html).toContain("Wir setzen ");
    expect(html).not.toContain(eigen);
    // UND UNSER STANDARDTEXT STEHT NICHT MEHR DRIN.
    expect(html).not.toContain(
      "Diese Seite kann Tracking-Dienste einbinden."
    );
  });
  // PT7 (POSITIVKONTROLLE zu PT5): ein gueltiges Paar geht durch UND wirkt im Text.
  // DIE ERWARTUNG IST AUS DEN ENTSCHEIDUNGEN P11.13-13, -20 und -21 ABGESCHRIEBEN.
  it("PT7: gueltige Farben + 'custom' + 'bar' -> veroeffentlicht, und beide stehen im Text", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#0a0b0c",
            colorText: "#f0f1f2",
          },
        },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    const html = (c.rec.updatePatch as Patch).published_content.html;
    expect(html).toContain(".bar,.dialog{color:#f0f1f2;background-color:#0a0b0c;");
    expect(html).toContain(".bar{border-top-color:#f0f1f2;}");
    expect(html).toContain("button:focus-visible{outline-color:#f0f1f2;}");
    // DER DUNKLE HINTERGRUND LEITET color-scheme AUF dark AB (P11.13-21).
    expect(html).toContain("color-scheme:dark;");
    // GEGENPROBE IM SELBEN LAUF: mit "light" steht nichts davon da.
    const hell = client();
    await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar", theme: "light" } } },
      undefined
    );
    const htmlHell = (hell.rec.updatePatch as Patch).published_content.html;
    expect(htmlHell).not.toContain("#0a0b0c");
    expect(htmlHell).not.toContain("#f0f1f2");
  });

  // PT8. GESPEICHERTE FARBEN OHNE "custom" ERREICHEN DEN TEXT NICHT — Entscheidung
  // P11.13-14 im Wortlaut: "Ist die Darstellung nicht eigene Farben, werden gespeicherte
  // Farben weder gelesen noch ausgeliefert."
  // DER VERGLEICH IST EINE BYTE-GLEICHHEIT gegen denselben Lauf OHNE die zwei Felder —
  // ein `not.toContain` allein liesse eine Wirkung an anderer Stelle durchgehen.
  it("PT8: Farben gespeichert, Darstellung 'light' -> Ausgabe byte-gleich zu ohne Farben", async () => {
    const mit = client();
    await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: {
            dialog: "bar",
            theme: "light",
            colorBackground: "#0a0b0c",
            colorText: "#f0f1f2",
          },
        },
      },
      undefined
    );
    const ohne = client();
    await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      { ...snapshot, settings: { consent: { dialog: "bar", theme: "light" } } },
      undefined
    );
    expect((mit.rec.updatePatch as Patch).published_content.html).toBe(
      (ohne.rec.updatePatch as Patch).published_content.html
    );
    // POSITIVKONTROLLE im selben Lauf: MIT "custom" unterscheiden sich die zwei sehr wohl.
    const eigen = client();
    await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#0a0b0c",
            colorText: "#f0f1f2",
          },
        },
      },
      undefined
    );
    expect((eigen.rec.updatePatch as Patch).published_content.html).not.toBe(
      (ohne.rec.updatePatch as Patch).published_content.html
    );
  });

  // PT9. DIE REIHENFOLGE DER DREI ABBRUECHE: Bei unbekanntem THEMA faellt die
  // Themen-Meldung, nicht die Farb-Meldung — sonst schickte der Abbruch den Betreiber an
  // die falsche Stelle. Spiegel von PT4 eine Ebene tiefer.
  it("PT9: unbekanntes Thema + kaputte Farben -> die THEMEN-Meldung", async () => {
    client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: { dialog: "bar", theme: "__ps_y", colorBackground: "kaputt" },
        },
      },
      undefined
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_THEMA });
  });

  // ===================================================================================
  // DIE SPRACHE (Phase 11.13, Scheibe 11.13e; bindende Entscheidung P11.13-37).
  // Die Meldung steht auch hier als LITERAL und nicht als Import — sonst waere der Test
  // ein Spiegel.
  // ===================================================================================

  // PT-L1. DER FUENFTE ABBRUCH. EINZELSTUECK fuer die Pflicht-Mutation "Abbruch 5
  // entfernt": Kein anderer Test faengt einen ungueltigen Sprachwert auf dem Publish-Weg.
  // WODURCH ROT: ein fehlender Abbruch, eine falsche Meldung, ein Abbruch, der trotzdem
  // schreibt.
  it("PT-L1: unbekannte Sprache + 'bar' -> Abbruch mit der EIGENEN Meldung, nichts angelegt", async () => {
    for (const language of [null, "", "DE", "de-DE", "fr", "__ps_x", true, 1]) {
      const c = client();
      const res = await publishProject(
        "proj-1",
        "<html><body>A</body></html>",
        {
          ...snapshot,
          settings: { consent: { dialog: "bar", language } },
        },
        undefined
      );
      expect(res, JSON.stringify(language)).toEqual({
        ok: false,
        error: MESSAGE_SPRACHE,
      });
      expect(c.rec.updatePatch).toBeNull();
      expect(c.rec.inserts).toHaveLength(0);
      expect(c.rec.fromTables).not.toContain("domains");
    }
  });

  // PT-L2. DIE ASYMMETRIE AUS P11.13-7, auf die Sprache angewandt: Bei "off" entsteht kein
  // Oberflaechen-Block, der Wert erreicht keine ausgelieferte Zeile, und es gibt keinen
  // Besucher-Preis — also wird NICHT abgebrochen.
  // WODURCH ROT: ein zu breites Tor, das auch bei ausgeschaltetem Dialog sperrt.
  it("PT-L2: unbekannte Sprache + 'off' -> KEIN Abbruch", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "off", language: "__ps_x" } },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    // POSITIVKONTROLLE: es ist wirklich geschrieben worden — sonst waere `ok: true`
    // auch bei einem stillen Nichtstun gruen.
    expect(c.rec.updatePatch).not.toBeNull();
  });

  // PT-L3. DIE STELLUNG IN DER KETTE. Die Sprache steht ans ENDE (bindende Entscheidung
  // P11.13-37), und das ist pruefbar: Sind Thema UND Sprache unbekannt, kommt die
  // THEMEN-Meldung. Eine vertauschte Kette schickte den Betreiber an die falsche Stelle
  // der Oberflaeche.
  // WODURCH ROT: jede Umstellung der fuenf Abbrueche.
  it("PT-L3: Thema UND Sprache unbekannt -> die Themen-Meldung, nicht die der Sprache", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: {
          consent: { dialog: "bar", theme: "__ps_x", language: "__ps_y" },
        },
      },
      undefined
    );
    expect(res).toEqual({ ok: false, error: MESSAGE_THEMA });
    expect(c.rec.updatePatch).toBeNull();
  });

  // PT-L4. DIE SPRACHE WIRKT BIS IN DEN AUSGELIEFERTEN TEXT — die einzige Stelle, an der
  // das auf dem PUBLISH-Weg geprueft wird (L26/M26 pruefen es am Erzeuger).
  // DIE ERWARTUNGEN SIND LITERALE AUS ENTSCHEIDUNG P11.13-31 (Invariante Q5).
  // WODURCH ROT: eine Sprache, die publishProject zwar liest, aber nicht durchreicht.
  it("PT-L4: 'en' + 'bar' -> der englische Text steht drin, der deutsche nicht", async () => {
    const c = client();
    const res = await publishProject(
      "proj-1",
      "<html><body>A</body></html>",
      {
        ...snapshot,
        settings: { consent: { dialog: "bar", language: "en" } },
      },
      undefined
    );
    expect(res.ok).toBe(true);
    const html = String((c.rec.updatePatch as Patch).published_content.html);
    expect(html).toContain(
      "This site can use tracking services. You decide whether that happens."
    );
    expect(html).toContain("Accept all");
    expect(html).toContain("Reject all");
    expect(html).toContain('lang", "en"');
    expect(html).not.toContain(
      "Diese Seite kann Tracking-Dienste einbinden."
    );
    expect(html).not.toContain("Alle akzeptieren");
  });
});
