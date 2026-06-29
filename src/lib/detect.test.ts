import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  anchorMappingTarget,
  annotateAndDetect,
  detectElements,
  filterElements,
  stabilizeIds,
  LISTENER_SCRIPT,
} from "./detect";

// Format der code-residenten ps-IDs: "ps-" + 6x [a-z0-9].
const PS_ID_RE = /^ps-[a-z0-9]{6}$/;

// Aus dem Projekt-Root aufgeloest: import.meta.url ist im jsdom-Env keine
// file://-URL, daher bewusst ueber den cwd der Test-Runs.
const fixture = readFileSync(
  resolve(process.cwd(), "src/lib/__fixtures__/sample-landingpage.html"),
  "utf-8"
);

describe("detectElements – defensive Garantien", () => {
  it("liefert [] fuer leeren String", () => {
    expect(detectElements("")).toEqual([]);
  });

  it("liefert [] fuer reinen Whitespace", () => {
    expect(detectElements("   \n\t  ")).toEqual([]);
  });

  it("wirft nicht bei kaputtem/unvollstaendigem HTML", () => {
    expect(() =>
      detectElements('<button>Klick<form action="/x"><a href=')
    ).not.toThrow();
    // DOMParser ist tolerant – wir wollen nur GARANTIERT keinen Absturz.
    expect(Array.isArray(detectElements("<<>></ </button"))).toBe(true);
  });

  it("verkraftet riesigen Input (~hunderttausende Knoten) ohne Crash", () => {
    const block =
      '<a href="/x" role="button">CTA</a><form action="/f"></form><a href="/nav">Nav</a>';
    const huge = block.repeat(5000); // grob im 100-300 KB-Bereich
    const result = detectElements(huge);
    expect(result.length).toBe(5000 * 3); // 1 Button + 1 Form + 1 Link je Block
  });
});

describe("detectElements – Korrektheit", () => {
  it("zaehlt <a href role=button> genau einmal (als Button, nicht zusaetzlich Link)", () => {
    const result = detectElements('<a href="/buy" role="button">Kaufen</a>');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ type: "button", tag: "a" });
  });

  it("erkennt input[type=submit|button|image] als Buttons", () => {
    const result = detectElements(
      '<input type="submit" value="Senden">' +
        '<input type="button" value="Klick">' +
        '<input type="image" src="/go.png" alt="Los">'
    );
    expect(result.filter((e) => e.type === "button")).toHaveLength(3);
    // input[type=image] nutzt das alt-Attribut als Label.
    expect(result.some((e) => e.label === "Los")).toBe(true);
  });

  it("erkennt mehrere Formulare und nutzt action als Label", () => {
    const result = detectElements(
      '<form action="/a"></form><form></form><form action="/c"></form>'
    );
    const forms = result.filter((e) => e.type === "form");
    expect(forms).toHaveLength(3);
    expect(forms.map((f) => f.label)).toEqual([
      "/a",
      "(keine action gesetzt)",
      "/c",
    ]);
  });
});

describe("detectElements – echte Landingpage (Fixture)", () => {
  const result = detectElements(fixture);
  const count = (t: string) => result.filter((e) => e.type === t).length;

  it("findet die erwarteten Buttons, Forms und Links", () => {
    expect(count("button")).toBe(7);
    expect(count("form")).toBe(2);
    expect(count("link")).toBe(11);
  });

  it("dedupliziert die role=button-Anchors aus den Links heraus", () => {
    // /checkout und /checkout?plan=pro sind role=button -> Buttons, keine Links.
    const linkLabels = result
      .filter((e) => e.type === "link")
      .map((e) => e.label);
    expect(linkLabels).not.toContain("Programm sichern – 49 €");
    expect(linkLabels).not.toContain("Pro waehlen");
  });
});

describe("detectElements – Textkandidaten (Phase 5, In-Place-Copywriting)", () => {
  it("reines <h1> ist ein Textkandidat (Label + voller text)", () => {
    const result = detectElements("<h1>Willkommen</h1>");
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      type: "text",
      tag: "h1",
      label: "Willkommen",
      text: "Willkommen",
    });
  });

  it("erkennt <p> und <h1>..<h6> als Textkandidaten", () => {
    const result = detectElements(
      "<h1>A</h1><h2>B</h2><h3>C</h3><h4>D</h4><h5>E</h5><h6>F</h6><p>G</p>"
    );
    expect(result.filter((e) => e.type === "text")).toHaveLength(7);
  });

  it("<p> MIT Kind-Element (<strong>) ist KEIN Textkandidat", () => {
    const result = detectElements("<p>Hallo <strong>Welt</strong></p>");
    expect(result.filter((e) => e.type === "text")).toHaveLength(0);
  });

  it("<p> mit nur <br> bleibt Textkandidat (harmlose Inline-Umbrueche)", () => {
    const result = detectElements("<p>Zeile eins<br>Zeile zwei</p>");
    const text = result.filter((e) => e.type === "text");
    expect(text).toHaveLength(1);
    expect(text[0].tag).toBe("p");
  });

  it("KATEGORIENTRENNUNG: <a>Nur Text</a> bleibt Link, wird KEIN Textkandidat", () => {
    const result = detectElements('<a href="/x">Nur Text</a>');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("link");
    expect(result.some((e) => e.type === "text")).toBe(false);
  });

  it("KATEGORIENTRENNUNG: <h1 role=button> bleibt Button, wird KEIN Textkandidat", () => {
    const result = detectElements('<h1 role="button">Klick</h1>');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("button");
    expect(result.some((e) => e.type === "text")).toBe(false);
  });

  it("ein <p> mit Kindern bekommt KEINE ps-ID (kein Code-Ballast)", () => {
    const { html } = annotateAndDetect("<p>x <strong>y</strong></p>");
    // Das injizierte Listener-Script enthaelt den Attributnamen als Literal ->
    // ueber das geparste DOM pruefen, nicht per String-Substring.
    const p = new DOMParser().parseFromString(html, "text/html").querySelector("p");
    expect(p?.hasAttribute("data-pagesmith-id")).toBe(false);
  });

  it("ein reiner Textkandidat bekommt eine gueltige ps-ID", () => {
    const { elements } = annotateAndDetect("<h2>Titel</h2>");
    expect(elements).toHaveLength(1);
    expect(elements[0].id).toMatch(PS_ID_RE);
  });
});

describe("filterElements – Kategorie-Filter der Elementliste (Scheibe 1b)", () => {
  // Gemischt: Button, Link, Form (interaktiv) + zwei Textkandidaten.
  const mixed = detectElements(
    '<button>B</button><a href="/x">L</a><form action="/f"></form>' +
      "<h1>Titel</h1><p>Absatz</p>"
  );

  it("Vorbedingung: die gemischte Liste hat alle Kategorien", () => {
    expect(mixed.filter((e) => e.type === "button")).toHaveLength(1);
    expect(mixed.filter((e) => e.type === "link")).toHaveLength(1);
    expect(mixed.filter((e) => e.type === "form")).toHaveLength(1);
    expect(mixed.filter((e) => e.type === "text")).toHaveLength(2);
  });

  it("'all' liefert die unveraenderte Menge", () => {
    expect(filterElements(mixed, "all")).toHaveLength(mixed.length);
  });

  it("'interactive' enthaelt NUR button/link/form, kein text", () => {
    const interactive = filterElements(mixed, "interactive");
    expect(interactive).toHaveLength(3);
    expect(interactive.every((e) => e.type !== "text")).toBe(true);
  });

  it("'text' enthaelt NUR Textkandidaten", () => {
    const texts = filterElements(mixed, "text");
    expect(texts).toHaveLength(2);
    expect(texts.every((e) => e.type === "text")).toBe(true);
  });

  it("mutiert die Eingabe nicht", () => {
    const before = mixed.length;
    filterElements(mixed, "text");
    expect(mixed).toHaveLength(before);
  });
});

describe("annotateAndDetect – IDs & Annotation", () => {
  it("vergibt eindeutige ps-IDs im gueltigen Format", () => {
    const { elements } = annotateAndDetect(fixture);
    const ids = elements.map((e) => e.id);
    for (const id of ids) expect(id).toMatch(PS_ID_RE);
    expect(new Set(ids).size).toBe(ids.length); // alle eindeutig
  });

  it("schreibt data-pagesmith-id passend zu den Element-IDs ins HTML", () => {
    const { html, elements } = annotateAndDetect(
      '<button>Kaufen</button><a href="/x">Mehr</a>'
    );
    for (const el of elements) {
      expect(html).toContain(`${"data-pagesmith-id"}="${el.id}"`);
    }
  });

  it("injiziert das Listener-Script ins HTML", () => {
    const { html } = annotateAndDetect("<button>Kaufen</button>");
    expect(html).toContain("ELEMENT_CLICKED");
    expect(html).toContain("addEventListener");
    expect(html).toContain("<script>");
  });

  it("injiziert das Highlight-Style-Tag (.pagesmith-highlight via outline)", () => {
    const { html } = annotateAndDetect("<button>Kaufen</button>");
    expect(html).toContain(".pagesmith-highlight");
    expect(html).toContain("outline");
  });

  it("injiziert den SET_SELECTED_ID-Handler und den IFRAME_READY-Handshake", () => {
    const { html } = annotateAndDetect("<button>Kaufen</button>");
    expect(html).toContain("SET_SELECTED_ID");
    expect(html).toContain("IFRAME_READY");
  });

  it("liefert fuer leeren/whitespace Input leeres HTML + keine Elemente", () => {
    expect(annotateAndDetect("")).toEqual({ html: "", elements: [] });
    expect(annotateAndDetect("   \n\t ")).toEqual({ html: "", elements: [] });
  });
});

describe("stabilizeIds – code-residente, stabile ps-IDs (3.0)", () => {
  // (a) Neu: verknuepfbares Element ohne ID bekommt eine frische ps-ID.
  it("(a) vergibt einem neuen Element eine ps-ID", () => {
    const { elements } = annotateAndDetect("<button>Kaufen</button>");
    expect(elements).toHaveLength(1);
    expect(elements[0].id).toMatch(PS_ID_RE);
  });

  // (b) Stabilitaet: derselbe (bereits stabilisierte) Code zweimal durch die
  // Funktion -> IDs IDENTISCH. Nur neue Elemente bekommen neue IDs.
  it("(b) haelt bestehende ps-IDs ueber wiederholte Laeufe identisch", () => {
    const once = stabilizeIds(fixture);
    const idsAfterOnce = detectElements(once).map((e) => e.id);
    const twice = stabilizeIds(once);
    const idsAfterTwice = detectElements(twice).map((e) => e.id);
    expect(idsAfterTwice).toEqual(idsAfterOnce);
  });

  // (b') Einfuegen ANDERER Elemente verschiebt eine bestehende ID NICHT.
  it("(b') laesst bestehende IDs unveraendert, wenn andere Elemente dazukommen", () => {
    const stable = stabilizeIds("<button>Kaufen</button>");
    const originalId = detectElements(stable)[0].id;

    // Ein weiteres Element VOR dem bestehenden einfuegen und neu stabilisieren.
    const grown = stabilizeIds(`<a href="/neu">Neu</a>${stable}`);
    const ids = detectElements(grown).map((e) => e.id);

    expect(ids).toContain(originalId); // bestehende ID bleibt erhalten
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2); // neue ID ist eine andere
  });

  // (c) Bekannt: vorbestehende gueltige ps-ID wird uebernommen, nicht neu vergeben.
  it("(c) uebernimmt eine vorbestehende gueltige ps-ID unveraendert", () => {
    const { elements } = annotateAndDetect(
      '<button data-pagesmith-id="ps-abc123">Kaufen</button>'
    );
    expect(elements).toHaveLength(1);
    expect(elements[0].id).toBe("ps-abc123");
  });

  // (d) Dupliziert: gleiche ID mehrfach -> erstes Vorkommen behaelt, Rest frisch;
  // danach ist jede ID eindeutig.
  it("(d) loest duplizierte ps-IDs auf, sodass jede ID eindeutig ist", () => {
    const { elements } = annotateAndDetect(
      '<button data-pagesmith-id="ps-abc123">A</button>' +
        '<button data-pagesmith-id="ps-abc123">B</button>'
    );
    expect(elements).toHaveLength(2);
    expect(elements[0].id).toBe("ps-abc123"); // erstes Vorkommen behaelt
    expect(elements[1].id).toMatch(PS_ID_RE);
    expect(elements[1].id).not.toBe("ps-abc123"); // zweites neu + eindeutig
  });

  // (e) User-id="..." wird NIE wiederverwendet; bleibt im Code unberuehrt.
  it("(e) ignoriert das user-id-Attribut und vergibt eine eigene ps-ID", () => {
    const { html, elements } = annotateAndDetect('<button id="buy-now">X</button>');
    expect(elements[0].id).toMatch(PS_ID_RE);
    expect(elements[0].id).not.toBe("buy-now");
    expect(html).toContain('id="buy-now"'); // user-Attribut unangetastet
  });

  // Ungueltiges/altes Format (z.B. Legacy "el-0") gilt als "Neu" -> neu vergeben.
  it("behandelt ungueltige/alte IDs (el-N) wie 'Neu' und vergibt eine ps-ID", () => {
    const { elements } = annotateAndDetect(
      '<button data-pagesmith-id="el-0">Alt</button>'
    );
    expect(elements[0].id).toMatch(PS_ID_RE);
    expect(elements[0].id).not.toBe("el-0");
  });

  // Defensive Garantie: eine code-mutierende Funktion darf User-Code nie loeschen.
  it("liefert '' fuer leeren/whitespace Input", () => {
    expect(stabilizeIds("")).toBe("");
    expect(stabilizeIds("   \n\t ")).toBe("");
  });
});

describe("anchorMappingTarget – geteilte ps-ID-Anker-Logik (Assign + Re-Link)", () => {
  // DISKRIMINIEREND: der eigentliche Wert der Index-Ausrichtung ist, dass die
  // Config am RICHTIGEN Element landet. Wir verknuepfen gezielt mit dem ZWEITEN
  // Button und pruefen, dass die canonicalId zum ZWEITEN gehoert, nicht zum ersten.
  // Ein Test, der nur "irgendeine ID kam zurueck" prueft, faenge diesen Bug nicht.
  it("frische Elemente: richtet per INDEX aus -> canonicalId ist die des GEWAEHLTEN (zweiten) Elements", () => {
    const code = "<button>Erste</button><button>Zweite</button>";
    const elements = annotateAndDetect(code).elements;
    expect(elements).toHaveLength(2);
    const target = elements[1]; // bewusst der ZWEITE Button

    const { code: nextCode, canonicalId } = anchorMappingTarget(
      code,
      elements,
      target.id
    );

    // Fabrikneuer Code -> stabilisiert (ps-IDs eingeschrieben) -> veraendert.
    expect(nextCode).not.toBe(code);
    expect(canonicalId).toMatch(PS_ID_RE);

    // KERN: canonicalId zeigt auf den ZWEITEN Button ("Zweite"), nicht den ersten.
    const anchored = annotateAndDetect(nextCode).elements;
    expect(anchored[0].label).toBe("Erste");
    expect(anchored[1].label).toBe("Zweite");
    expect(canonicalId).toBe(anchored[1].id);
    expect(canonicalId).not.toBe(anchored[0].id);
  });

  it("bereits stabiler Code: Rueckgabe code unveraendert, canonicalId === targetElementId", () => {
    const stable = stabilizeIds("<button>Erste</button><button>Zweite</button>");
    const elements = annotateAndDetect(stable).elements;
    const target = elements[1];

    const result = anchorMappingTarget(stable, elements, target.id);
    expect(result.code).toBe(stable);
    expect(result.canonicalId).toBe(target.id);
  });
});

describe("LISTENER_SCRIPT – PS_SET_TEXT Live-Patch-Handler (Scheibe 3)", () => {
  // Fuehrt das Bruecken-Script ISOLIERT aus: window/document werden als Parameter
  // GESHADOWED (new Function), statt den globalen jsdom-State anzufassen — so ist
  // der inbound message-Handler greifbar und Tests kollidieren nicht. Reiner
  // Test-Seam; das Laufzeitverhalten des Scripts ist davon unberuehrt.
  function runBridge() {
    const messageHandlers: Array<(e: { data: unknown }) => void> = [];
    const container = document.createElement("div");
    document.body.appendChild(container);
    const win = {
      addEventListener: (type: string, fn: (e: { data: unknown }) => void) => {
        if (type === "message") messageHandlers.push(fn);
      },
      parent: { postMessage: () => {} },
    };
    const doc = {
      addEventListener: () => {},
      querySelector: (sel: string) => container.querySelector(sel),
    };
    new Function("window", "document", LISTENER_SCRIPT)(win, doc);
    const send = (data: unknown) => messageHandlers.forEach((h) => h({ data }));
    return { container, send, cleanup: () => container.remove() };
  }

  it("setzt textContent per ps-id auf den Override-Text", () => {
    const { container, send, cleanup } = runBridge();
    container.innerHTML = '<h1 data-pagesmith-id="ps-aaaaaa">Alt</h1>';
    send({ type: "PS_SET_TEXT", elementId: "ps-aaaaaa", content: "Neu" });
    expect(container.querySelector("h1")?.textContent).toBe("Neu");
    cleanup();
  });

  it("ignoriert eine unbekannte id ohne Throw (kein Element veraendert)", () => {
    const { container, send, cleanup } = runBridge();
    container.innerHTML = '<h1 data-pagesmith-id="ps-aaaaaa">Alt</h1>';
    expect(() =>
      send({ type: "PS_SET_TEXT", elementId: "ps-ffffff", content: "X" })
    ).not.toThrow();
    expect(container.querySelector("h1")?.textContent).toBe("Alt");
    cleanup();
  });
});
