import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest) -> hier durch ein leeres Modul ersetzen, damit der Adapter laedt.
vi.mock("server-only", () => ({}));

import { forwardToGoogle } from "./google-forward";

/**
 * WAS HIER ECHT LAEUFT UND WAS ATTRAPPE IST — die Trennung ist der Grund, warum diese
 * Laeufe etwas messen:
 *   ECHT:     extractGoogleClickIds, buildGoogleEvent und buildIngestEventsRequest.
 *             Sie SIND der Gegenstand: Diese Scheibe gibt ihnen ihren ersten Aufrufer
 *             im Produktivcode, und ein Mock haette genau das wieder verdeckt.
 *   ATTRAPPE: allein global.fetch.
 * WAERE DER NUTZLAST-BAU GEMOCKT, pruefte diese Datei die Verdrahtung gegen sich
 * selbst — und die Schuld aus VERMERK 2 waere formal eingeloest, ohne dass eine Zeile
 * jener beiden Dateien je gelaufen waere.
 */

const TOKEN = "ERFUNDEN-access-token-GF-nicht-echt-0001";
const KUNDENNUMMER = "9876543210";
const ZIEL_KENNUNG = "1234567890";
const GCLID = "ERFUNDEN-gclid-GF-nicht-echt-0001";
const ENDPUNKT = "https://datamanager.googleapis.com/v1/events:ingest";

/** Die feste Uhr dieser Datei. */
const JETZT = 1_800_000_000;

type Aufruf = { url: string; init: RequestInit };

let aufrufe: Aufruf[];
let antwort: () => Promise<Response>;

function config(ueberschreibungen: Record<string, unknown> = {}) {
  return {
    operatingAccountId: KUNDENNUMMER,
    token: TOKEN,
    conversionRules: { Purchase: ZIEL_KENNUNG },
    ...ueberschreibungen,
  };
}

function rumpf(ueberschreibungen: Record<string, unknown> = {}) {
  return {
    eventSourceUrl: `https://kunde.example/danke?gclid=${GCLID}`,
    ...ueberschreibungen,
  };
}

/** Die gesendete Nutzlast des EINZIGEN Aufrufs — oder ein lauter Fehlschlag. */
function gesendet(): Record<string, unknown> {
  expect(aufrufe).toHaveLength(1);
  return JSON.parse(String(aufrufe[0].init.body)) as Record<string, unknown>;
}

beforeEach(() => {
  aufrufe = [];
  antwort = async () => new Response(null, { status: 200 });
  global.fetch = vi.fn(async (url: unknown, init: unknown) => {
    aufrufe.push({ url: String(url), init: init as RequestInit });
    return antwort();
  }) as unknown as typeof fetch;
  vi.useFakeTimers();
  vi.setSystemTime(JETZT * 1000);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("forwardToGoogle — die Nutzlast", () => {
  it("GF-1: Adresse, Gestalt und die benannte eventSource-Konstante", async () => {
    // WIRD ROT, WENN: die Adresse wandert, ein Schluessel umbenannt wird, die
    // Klick-Kennung nicht aus eventSourceUrl geloest wird — oder wenn jemand die
    // eventSource-Konstante aendert. Genau das soll ein sichtbarer Diff sein: Der Wert
    // ist eine OWNER-ENTSCHEIDUNG auf einem GEMESSENEN TYP, aber einem UNGEMESSENEN
    // WERT (Teil (br)).
    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());

    expect(aufrufe[0].url).toBe(ENDPUNKT);
    expect(aufrufe[0].init.method).toBe("POST");
    expect(gesendet()).toEqual({
      destinations: [
        {
          operatingAccount: {
            accountType: "GOOGLE_ADS",
            accountId: KUNDENNUMMER,
          },
          productDestinationId: ZIEL_KENNUNG,
        },
      ],
      events: [
        {
          eventTimestamp: new Date(JETZT * 1000).toISOString(),
          eventSource: "WEB",
          adIdentifiers: { gclid: GCLID },
        },
      ],
    });
  });

  it("GF-2: das Zugangsdatum reist in der Authorization-Kopfzeile — NIE in URL oder Rumpf", async () => {
    // DER TRAEGER IST GEMESSEN (OWNER, 2026-08-28, Messung A; Teil (bk)). Die zweite
    // Haelfte ist die schaerfere: Bei Meta steht das Geheimnis im Query-String, und ein
    // abgeschriebener Adapter braechte es hierher mit.
    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());

    const kopf = aufrufe[0].init.headers as Record<string, string>;
    expect(kopf.Authorization).toBe(`Bearer ${TOKEN}`);
    expect(kopf["Content-Type"]).toBe("application/json");
    expect(aufrufe[0].url).not.toContain(TOKEN);
    expect(String(aufrufe[0].init.body)).not.toContain(TOKEN);
  });

  it("GF-5: transactionId und x-goog-user-project werden ausdruecklich NICHT gesendet", async () => {
    // ZWEI ABWESENHEITEN MIT POSITIVKONTROLLE IM SELBEN LAUF: Der Aufruf FINDET statt
    // (die Zusicherung darunter belegt es), also sind die beiden Nicht-Treffer echte
    // Nicht-Treffer und kein leerer Durchgang.
    // WARUM KEIN transactionId: optional in dieser Gestalt (Teil (l)/D5); eventID ist
    // UNSERE Dedup-Kennung, nicht Googles Transaktion.
    // WARUM KEIN x-goog-user-project: ungemessen in beide Richtungen (Teil (bu)).
    await forwardToGoogle(config(), "Purchase", "evt-DEDUP-1", rumpf());

    const kopf = aufrufe[0].init.headers as Record<string, string>;
    expect(Object.keys(kopf)).toEqual(["Authorization", "Content-Type"]);
    const nutzlast = gesendet();
    const ereignis = (nutzlast.events as Record<string, unknown>[])[0];
    expect(ereignis.transactionId).toBeUndefined();
    expect(String(aufrufe[0].init.body)).not.toContain("evt-DEDUP-1");
  });

  it("GF-1b: Betrag und Waehrung reisen nur, wenn sie brauchbar sind", async () => {
    // WIRD ROT, WENN jemand String(v) statt einer Typpruefung baut: Aus einem Objekt
    // entstuende "[object Object]", aus NaN die Zeichenkette "NaN" — beides saehe in
    // der Nutzlast wie ein Wert aus.
    await forwardToGoogle(
      config(),
      "Purchase",
      "evt-1",
      rumpf({ value: 19.9, currency: " EUR " }),
    );
    const mit = (gesendet().events as Record<string, unknown>[])[0];
    expect(mit.conversionValue).toBe(19.9);
    expect(mit.currency).toBe("EUR");

    aufrufe = [];
    await forwardToGoogle(
      config(),
      "Purchase",
      "evt-1",
      rumpf({ value: Number.NaN, currency: 42 }),
    );
    const ohne = (gesendet().events as Record<string, unknown>[])[0];
    expect(ohne.conversionValue).toBeUndefined();
    expect(ohne.currency).toBeUndefined();
  });
});

describe("forwardToGoogle — die drei Riegel", () => {
  it("GF-3: keine Klick-Kennung -> KEIN fetch", async () => {
    // DIE BINDENDE ENTSCHEIDUNG (3): Kann keine Kennung gebildet werden, entsteht KEINE
    // halbe Nutzlast. Der Grund ist FAST-FAIL beim Anbieter — ein einziger
    // Pflichtfeld-Fehler verwirft die GANZE Anfrage (Teil (l)/D5).
    // DREI EINGABEN, DIE ALLE KEINE KENNUNG ERGEBEN, und die dritte ist die
    // unauffaelligste: ein LEERER Parameterwert.
    for (const url of [
      "https://kunde.example/danke",
      "kein-absoluter-pfad?gclid=X",
      "https://kunde.example/danke?gclid=",
    ]) {
      await forwardToGoogle(config(), "Purchase", "evt-1", { eventSourceUrl: url });
    }
    expect(aufrufe).toHaveLength(0);

    // POSITIVKONTROLLE: mit Kennung geht derselbe Weg hinaus.
    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());
    expect(aufrufe).toHaveLength(1);
  });

  it("GF-4: keine Conversion-Regel fuer DIESES Ereignis -> KEIN fetch", async () => {
    // DIE BEDINGUNG IST BREITER ALS "kein Eintrag": fehlend, leer und
    // nicht-Zeichenkette fallen alle heraus. Ein Riegel, der nur auf undefined
    // pruefte, liesse eine Zahl aus dem CLIENT-besessenen Blob bis zum Trim durch — und
    // ein Wurf dort braeche die leere 204 des Aufrufers.
    const faelle: Record<string, string>[] = [
      { Lead: ZIEL_KENNUNG },
      { Purchase: "" },
      { Purchase: "   " },
      { Purchase: 42 as unknown as string },
      {},
    ];
    for (const rules of faelle) {
      await forwardToGoogle(config({ conversionRules: rules }), "Purchase", "e", rumpf());
    }
    expect(aufrufe).toHaveLength(0);

    // POSITIVKONTROLLE im selben Lauf.
    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());
    expect(aufrufe).toHaveLength(1);
  });

  it("GF-4b: keine Kundennummer -> KEIN fetch", async () => {
    // DER FALL IST REAL UND NICHT KONSTRUIERT: Er ist der Zustand UNMITTELBAR NACH DEM
    // VERBINDEN — Zugangsdaten hinterlegt, Kennungs-Feld noch leer.
    await forwardToGoogle(config({ operatingAccountId: "" }), "Purchase", "e", rumpf());
    expect(aufrufe).toHaveLength(0);

    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());
    expect(aufrufe).toHaveLength(1);
  });
});

describe("forwardToGoogle — Deckel, Containment und TRANSIT-ONLY", () => {
  it("GF-6: haengender Empfaenger -> Abbruch bei 3000ms, echter Fehlername, kein Wurf", async () => {
    // VIER ACHSEN IN EINEM LAUF: der Deckel greift, er greift bei DIESEM Wert, der
    // Fehlername ist der echte (AbortError statt "unknown" — errorName liest .name,
    // und ein Abbruch ist eine DOMException, keine Error-Instanz), und die Funktion
    // wirft nicht.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    antwort = () =>
      new Promise((_ok, nein) => {
        const signal = aufrufe[0].init.signal;
        signal?.addEventListener("abort", () => {
          const e = new Error("aborted");
          e.name = "AbortError";
          nein(e);
        });
      });

    const lauf = forwardToGoogle(config(), "Purchase", "evt-1", rumpf());
    await vi.advanceTimersByTimeAsync(2999);
    expect(fehler).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await expect(lauf).resolves.toBeUndefined();
    expect(fehler).toHaveBeenCalledWith("[capi] Google forward error: AbortError");
  });

  it("GF-8: sie wirft nie — auch bei feindlichen Eingaben und werfendem fetch", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    antwort = async () => {
      throw new Error("netz kaputt");
    };
    await expect(
      forwardToGoogle(config(), "Purchase", "evt-1", rumpf()),
    ).resolves.toBeUndefined();

    const feindlich = [
      { eventSourceUrl: null },
      { eventSourceUrl: 42 },
      { eventSourceUrl: {} },
      { eventSourceUrl: rumpf().eventSourceUrl, value: {}, currency: [] },
    ];
    for (const b of feindlich) {
      await expect(
        forwardToGoogle(config(), "Purchase", "evt-1", b as never),
      ).resolves.toBeUndefined();
    }
  });

  it("GF-7 (TRANSIT-ONLY): ein Anbieter-Rumpf, der die Klick-Kennung zurueckspiegelt, erreicht KEINE Logzeile", async () => {
    // DER WAECHTER DER SCHAERFSTEN AUFLAGE DIESER SCHEIBE. Die drei bestehenden Adapter
    // deuten den Anbieter-Rumpf und schreiben Teile davon ins Log; hier waere der
    // zurueckgespiegelte Wert die KLICK-KENNUNG.
    // WIRD ROT, WENN jemand den Rumpf liest und loggt — egal ob roh, gedeutet oder
    // geschwaerzt: eine Schwaerzung nach FORM kennt die Form einer gclid nicht.
    // DIE POSITIVKONTROLLE IM SELBEN LAUF: Eine Zeile MIT dem Statuscode erscheint.
    // Ohne sie waere "die Kennung steht in keinem Log" auch dann wahr, wenn ueberhaupt
    // nichts geloggt wuerde — und dann pruefte der Lauf nichts.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    antwort = async () =>
      new Response(
        JSON.stringify({
          error: {
            code: 400,
            message: `Invalid value at 'events[0].ad_identifiers.gclid' (${GCLID})`,
            details: [{ fieldViolations: [{ field: "gclid", description: GCLID }] }],
          },
        }),
        { status: 400 },
      );

    await forwardToGoogle(config(), "Purchase", "evt-1", rumpf());

    const ausgaben = fehler.mock.calls.map((a) => JSON.stringify(a)).join("\n");
    expect(ausgaben).toContain("HTTP 400");
    expect(ausgaben).not.toContain(GCLID);
    expect(ausgaben).not.toContain("fieldViolations");
    expect(ausgaben).not.toContain("ad_identifiers");
  });

  it("GF-7b: kein Riegel und kein Fehlerpfad traegt einen WERT — nur den Grund", async () => {
    // DIE ZWEITE HAELFTE VON I3, und sie trifft die Faelle, in denen gar kein Aufruf
    // stattfindet: Der EREIGNIS-NAME ist ein vom Betreiber FREI getippter String, die
    // KUNDENNUMMER und die ZIEL-KENNUNG sind Kundendaten. Keiner der drei darf in eine
    // Zeile geraten.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    const EREIGNIS = "ErfundenerKundenEreignisName";

    // DIE DREI RIEGEL EINZELN, UND DIE FIXTURE MUSS SIE EINZELN ERREICHEN: Sie greifen
    // in FESTER Reihenfolge (Kundennummer, Ziel-Kennung, Klick-Kennung), und wer den
    // dritten messen will, muss die ersten beiden passieren lassen. Ein Aufruf, der
    // schon am zweiten haengenbleibt, meldet dessen Grund — und der Lauf pruefte dann
    // zweimal denselben.
    await forwardToGoogle(config({ conversionRules: {} }), EREIGNIS, "e", rumpf());
    await forwardToGoogle(config({ operatingAccountId: "" }), EREIGNIS, "e", rumpf());
    await forwardToGoogle(
      config({ conversionRules: { [EREIGNIS]: ZIEL_KENNUNG } }),
      EREIGNIS,
      "e",
      { eventSourceUrl: "https://k.example/d" },
    );

    const ausgaben = fehler.mock.calls.map((a) => JSON.stringify(a)).join("\n");
    expect(ausgaben).not.toContain(EREIGNIS);
    expect(ausgaben).not.toContain(KUNDENNUMMER);
    expect(ausgaben).not.toContain(ZIEL_KENNUNG);
    expect(ausgaben).not.toContain(TOKEN);
    expect(ausgaben).not.toContain(GCLID);
    // POSITIVKONTROLLE: drei Zeilen sind entstanden, und sie nennen ihren GRUND.
    expect(fehler).toHaveBeenCalledTimes(3);
    expect(ausgaben).toContain("no destination for event");
    expect(ausgaben).toContain("missing account id");
    expect(ausgaben).toContain("no_click_id");
  });
});
