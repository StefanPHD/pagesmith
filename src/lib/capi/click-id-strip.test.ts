import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import type { TrackingTarget } from "@/lib/settings";
import {
  CLICK_ID_TABLE,
  extractEpik,
  extractFbclid,
  extractLiFatId,
  extractTtclid,
  stripForeignClickIds,
} from "./click-id-strip";
import { forwardToMeta } from "./meta-forward";
import { forwardToPinterest } from "./pinterest-forward";
import { forwardToTiktok } from "./tiktok-forward";
import { forwardToLinkedin } from "./linkedin-forward";
import { forwardToGoogle } from "./google-forward";

// ===========================================================================
// FREMDE KLICK-KENNUNGEN (Phase 11.7, S4) — DIE FUNKTION UND DER ZENTRALE WAECHTER.
//
// DIE ERWARTUNG STEHT HIER VON HAND, AUS DER QUELLE, NIE AUS DEM CODE. Jede Zeile ist
// vor dem Bau zeichengleich gegen ihre Ziel-Datei gehalten worden. Ein Waechter, der
// seine Erwartung aus CLICK_ID_TABLE bezoege, bestaetigte jeden Tippfehler dort.
// EIN Record UEBER ALLE ZIELE: Ein neues Ziel kompiliert hier erst mit einer Zeile.
// ===========================================================================

const ERWARTUNG: Record<TrackingTarget, readonly string[]> = {
  // docs/ziel-befunde/meta.md, Teil (h): "…if an fbclid query parameter is in the URL…"
  meta: ["fbclid"],
  // docs/ziel-befunde/pinterest.md, Teil (ac): "`&epik=` query parameter in the URL."
  pinterest: ["epik"],
  // docs/ziel-befunde/tiktok.md, Teil (j): "TikTok only appends the ttclid parameter
  // to the landing page URL of an ad."
  tiktok: ["ttclid"],
  // docs/ziel-befunde/linkedin.md, Teil (an): "Capture Click ID li_fat_id by parsing
  // from the Click URLs"
  linkedin: ["li_fat_id"],
  // CLICK_ID_PARAMS (capi/google-click-ids.ts) — die Schreibung als URL-Parameter ist
  // dort als UNBELEGT gefuehrt; der Zuschnitt (D2) nimmt die Namen von dort.
  google: ["gclid", "gbraid", "wbraid"],
};

const ZIELE = Object.keys(ERWARTUNG) as TrackingTarget[];

/** Zeichen, die im Quelltext nicht als Escape stehen sollen, werden GEBAUT. */
const TAB = String.fromCharCode(9);
const LONE_SURROGATE = String.fromCharCode(0xd800);

describe("Die Tabelle", () => {
  it("T1: jede Zeile gleicht der Entscheidung und traegt eine Quelle", () => {
    for (const ziel of ZIELE) {
      expect([...CLICK_ID_TABLE[ziel].params]).toEqual(ERWARTUNG[ziel]);
      expect(CLICK_ID_TABLE[ziel].quelle.trim()).not.toBe("");
    }
  });

  it("T2: alle Namen sind kleingeschrieben und kommen genau einmal vor", () => {
    const alle = ZIELE.flatMap((ziel) => [...CLICK_ID_TABLE[ziel].params]);
    for (const name of alle) expect(name).toBe(name.toLowerCase());
    expect(new Set(alle).size).toBe(alle.length);
  });
});

describe("Der Vertrag von stripForeignClickIds", () => {
  // V-a IST NICHT DER EINZIGE WAECHTER GEGEN "SIE WIRFT", und das ist gemessen (Mutation m6
  // der Phase 11.7, S4: die Parse-Probe wirft weiter -> 103 rote Faelle statt zwei): Die
  // HAEUFIGSTE Eingabe ist die LEERE Adresse — jeder Adapter-Aufruf ohne eventSourceUrl
  // reicht "" herein, und `new URL("")` wirft. Die Zusage "wirft nie" ist fuer sie ueber
  // den Bestand mitbewacht: rund hundert Adapter- und Ingest-Tests ohne Adresse werden
  // dann rot, weil kein Forward mehr hinausgeht. Die Antwort des Ingest blieb dabei eine
  // leere 204 (ingest.persist.test.ts, Fall (d)) — der Wurf wird im async-Adapter zur
  // Ablehnung, und allSettled faengt sie.
  it("V-a: sie wirft bei keiner feindlichen Eingabe und liefert immer eine Zeichenkette", () => {
    const werfendesToString = {
      toString(): string {
        throw new Error("boom");
      },
    };
    const eingaben: unknown[] = [
      undefined,
      null,
      42,
      true,
      {},
      [],
      werfendesToString,
      "",
      "?",
      "#",
      "??&&==",
      "http://[::1",
      "%",
      LONE_SURROGATE,
      `https://x.com/?${LONE_SURROGATE}=1&gclid=2`,
      `https://x.com/?${"&".repeat(100_000)}gclid=1`,
      `https://x.com/?${"%".repeat(1_000)}=1`,
      `https://x.com/?gc${TAB}lid=1`,
    ];
    for (const ziel of ZIELE) {
      for (const eingabe of eingaben) {
        expect(() => stripForeignClickIds(eingabe, ziel)).not.toThrow();
        expect(typeof stripForeignClickIds(eingabe, ziel)).toBe("string");
      }
    }
  });

  it("V-b: wird nichts entfernt, ist die Ausgabe die Eingabe — auch unnormalisiert", () => {
    for (const url of [
      "HTTPS://EXAMPLE.COM:443/a b?x=1 2&y=%zz&z=a+b&&#f",
      "https://x.com/p?",
      "https://x.com/p?fbclid=EIGEN&utm_source=s",
      "https://x.com/p",
    ]) {
      expect(stripForeignClickIds(url, "meta")).toBe(url);
    }
  });

  it("V-c1: beim Entfernen bleibt jedes andere Zeichen erhalten", () => {
    expect(
      stripForeignClickIds(
        "HTTPS://Example.COM:443/Pfad%20x?utm_source=a b&gclid=G1&x=%zz&y=a+b&&z#frag?gclid=H",
        "meta",
      ),
    ).toBe("HTTPS://Example.COM:443/Pfad%20x?utm_source=a b&x=%zz&y=a+b&&z#frag?gclid=H");
  });

  it("V-c2: derselbe fremde Name mehrfach — jedes Vorkommen faellt", () => {
    expect(stripForeignClickIds("https://x.com/p?gclid=1&a=2&gclid=3", "meta")).toBe(
      "https://x.com/p?a=2",
    );
  });

  it("V-c3: Stellung, Trenner und Parameter ohne Wert", () => {
    const faelle: [string, string][] = [
      ["https://x.com/p?gclid=1&a=2", "https://x.com/p?a=2"],
      ["https://x.com/p?a=2&gclid", "https://x.com/p?a=2"],
      ["https://x.com/p?a=2&gclid=&b=3", "https://x.com/p?a=2&b=3"],
      ["https://x.com/p?&&gclid=1", "https://x.com/p?&"],
      // Faellt das letzte Segment, bleibt das "?" (Zusage (c) ohne Ausnahme).
      ["https://x.com/p?gclid=1", "https://x.com/p?"],
      ["https://x.com/p?gclid=1#f", "https://x.com/p?#f"],
    ];
    for (const [ein, aus] of faelle) expect(stripForeignClickIds(ein, "meta")).toBe(aus);
  });

  it("V-c4: fremde Namen fallen in jeder Schreibung, die eigene bleibt in jeder", () => {
    expect(
      stripForeignClickIds(
        "https://x.com/p?GCLID=1&Fbclid=2&TtClId=3&EPIK=4&Li_Fat_Id=5&GBraid=6&wBRAID=7&utm=8",
        "pinterest",
      ),
    ).toBe("https://x.com/p?EPIK=4&utm=8");
  });

  it("V-c5: der Name wird verglichen, wie ein Standard-Parser ihn liest", () => {
    // %67clid ist "gclid", ein rohes Tab entfaellt beim Parsen; gclid%3D1 ist
    // "gclid=1" und gclid+ ist "gclid " — beide KEINE Kennung.
    expect(
      stripForeignClickIds(
        `https://x.com/p?%67clid=1&gclid%3D1=2&gc${TAB}lid=3&gclid+=4`,
        "meta",
      ),
    ).toBe("https://x.com/p?gclid%3D1=2&gclid+=4");
  });

  it("V-c6: je Ziel faellt genau das Fremde, das Eigene und das Unbekannte bleiben", () => {
    const alle = ZIELE.flatMap((ziel) => ERWARTUNG[ziel].map((name) => `${name}=v`));
    const url = `https://x.com/p?utm_source=u&${alle.join("&")}`;
    for (const ziel of ZIELE) {
      const soll = ["utm_source=u", ...ERWARTUNG[ziel].map((name) => `${name}=v`)];
      expect(stripForeignClickIds(url, ziel)).toBe(`https://x.com/p?${soll.join("&")}`);
    }
  });

  it("V-d: nicht parsebar — alles ab dem ersten ? oder # faellt, auch das Eigene", () => {
    const faelle: [string, string][] = [
      ["/relativ?gclid=1&a=2", "/relativ"],
      ["http://[::1?gclid=1", "http://[::1"],
      ["nicht parsebar#gclid=1", "nicht parsebar"],
      ["/x?fbclid=EIGEN", "/x"],
      ["/a#b?c", "/a"],
      ["nicht parsebar", "nicht parsebar"],
      ["?gclid=1", ""],
    ];
    for (const [ein, aus] of faelle) expect(stripForeignClickIds(ein, "meta")).toBe(aus);
  });

  it("V-e: keine Zeichenkette ergibt die leere Zeichenkette", () => {
    for (const eingabe of [undefined, null, 42, {}, ["https://x.com/?gclid=1"]]) {
      expect(stripForeignClickIds(eingabe, "meta")).toBe("");
    }
  });

  it("V-f: das Fragment bleibt unberuehrt, auch mit einer Kennung darin", () => {
    // EINZIGER TEST GEGEN "das Fragment wird mitbearbeitet" neben dem Fall "?gclid=1#f"
    // in V-c3.
    for (const url of [
      "https://x.com/p?a=1#frag&gclid=G1",
      "https://x.com/p#?gclid=1&ttclid=2",
    ]) {
      expect(stripForeignClickIds(url, "meta")).toBe(url);
    }
  });
});

// ===========================================================================
// DER ZENTRALE WAECHTER W — ALLE FUENF ECHTEN ADAPTER.
//
// Jeder Adapter bekommt eine Adresse mit ALLEN Kennungen der Tabelle und einem
// utm-Parameter; gesucht wird in dem, was tatsaechlich hinausgeht (URL + Rumpf), nach
// dem WERT jeder Kennung. Die Werte sind eindeutig und kommen sonst nirgends vor.
// POSITIVKONTROLLE: genau ein fetch je Adapter — sonst waere "fremd fehlt" trivial wahr.
// ===========================================================================

const IP = "203.0.113.7";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
/** ERFUNDENES Testgeheimnis — kein echtes Zugangsdatum. */
const TOKEN = "ERFUNDEN_s4_waechter_token_0001";

/** Der gesendete WERT je Name — eindeutig, damit ein Treffer genau eine Kennung meint. */
const wert = (name: string) => `WV${name.replace(/_/g, "")}Q`;
const UTM = "WVutmQ";

/** Die abweichende Schreibung je Name, VON HAND. */
const ABWEICHEND: Record<string, string> = {
  fbclid: "FBCLID",
  epik: "Epik",
  ttclid: "TtClId",
  li_fat_id: "LI_Fat_ID",
  gclid: "GClid",
  gbraid: "GBRAID",
  wbraid: "wBraid",
};

type Lauf = "tabelle" | "abweichend";

function adresse(lauf: Lauf): string {
  const teile = ZIELE.flatMap((ziel) =>
    ERWARTUNG[ziel].map(
      (name) => `${lauf === "tabelle" ? name : ABWEICHEND[name]}=${wert(name)}`,
    ),
  );
  return `https://kunde.de/lp?utm_source=${UTM}&${teile.join("&")}`;
}

/**
 * EIN FALL JE ZIEL. Die drei Erwartungen stammen aus der ENTSCHEIDUNG, nicht aus dem Code:
 * VERMERK P11.7-15 (Adressfluss je Adapter) und die Zuschnitte D4, D7, D9 der Phase 11.7;
 * fuer linkedin seit S6a die Zuschnitte L3 und L6 (eigene Kennung je Lauf getrennt).
 */
type WaechterFall = {
  senden: (adresse: string) => Promise<void>;
  /** Reicht der Adapter die Adresse weiter? (meta, pinterest, tiktok) */
  adresseGeht: boolean;
  /** Steht die EIGENE Kennung in der Nutzlast (Lauf "tabelle", und "abweichend", wenn
   *  eigeneGehtAbweichend fehlt)? linkedin sendet li_fat_id seit S6a der Phase 11.7. */
  eigeneGeht: boolean;
  /** Abweichende Erwartung fuer den Lauf "abweichend". Nur linkedin: exakt gelesen (L3),
   *  also geht LI_Fat_ID NICHT hinaus. Fehlt das Feld, gilt eigeneGeht. */
  eigeneGehtAbweichend?: boolean;
  /** Sendet er bei abweichender Schreibung? google liest exakt heraus (D4) und nicht. */
  sendetAbweichend: boolean;
};

const rumpf = (eventSourceUrl: string) => ({
  value: 49.9,
  currency: "EUR",
  eventSourceUrl,
});

const WAECHTER: Record<TrackingTarget, WaechterFall> = {
  meta: {
    senden: (a) =>
      forwardToMeta({ pixelId: "PIXEL-S4", token: TOKEN }, "Purchase", "evt-s4", rumpf(a), IP, UA),
    adresseGeht: true,
    eigeneGeht: true,
    sendetAbweichend: true,
  },
  pinterest: {
    senden: (a) =>
      forwardToPinterest(
        { adAccountId: "123456789012", token: TOKEN },
        "Purchase",
        "evt-s4",
        rumpf(a),
        IP,
        UA,
      ),
    adresseGeht: true,
    eigeneGeht: true,
    sendetAbweichend: true,
  },
  tiktok: {
    senden: (a) =>
      forwardToTiktok({ pixelId: "PIXEL-S4", token: TOKEN }, "Purchase", "evt-s4", rumpf(a), IP, UA),
    adresseGeht: true,
    eigeneGeht: true,
    sendetAbweichend: true,
  },
  linkedin: {
    senden: (a) =>
      forwardToLinkedin(
        { token: TOKEN, conversionRules: { Purchase: "urn:lla:llaPartnerConversion:987654" } },
        "Purchase",
        "evt-s4",
        rumpf(a),
        IP,
      ),
    adresseGeht: false,
    eigeneGeht: true,
    eigeneGehtAbweichend: false,
    sendetAbweichend: true,
  },
  google: {
    senden: (a) =>
      forwardToGoogle(
        {
          operatingAccountId: "9876543210",
          token: TOKEN,
          conversionRules: { Purchase: "1234567890" },
        },
        "Purchase",
        "evt-s4",
        rumpf(a),
      ),
    adresseGeht: false,
    eigeneGeht: true,
    sendetAbweichend: false,
  },
};

describe("Waechter W — was jeder echte Adapter hinausschickt", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            code: 0,
            num_events_received: 1,
            num_events_processed: 1,
            events: [{ status: "processed" }],
          }),
          { status: 200 },
        ),
    );
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const faelle = ZIELE.flatMap((ziel) =>
    (["tabelle", "abweichend"] as const).map((lauf) => [ziel, lauf] as const),
  );

  it.each(faelle)("W: %s, Schreibung %s", async (ziel, lauf) => {
    const fall = WAECHTER[ziel];
    await fall.senden(adresse(lauf));

    if (lauf === "abweichend" && !fall.sendetAbweichend) {
      expect(fetchMock).not.toHaveBeenCalled();
      return;
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [unknown, { body?: unknown }];
    const hinaus = `${String(url)}\n${String(init.body)}`;

    const eigeneGeht =
      lauf === "abweichend"
        ? (fall.eigeneGehtAbweichend ?? fall.eigeneGeht)
        : fall.eigeneGeht;
    for (const andere of ZIELE) {
      for (const name of ERWARTUNG[andere]) {
        const soll = andere === ziel && eigeneGeht;
        expect(hinaus.includes(wert(name)), `${ziel}/${lauf}: ${name}`).toBe(soll);
      }
    }
    expect(hinaus.includes(UTM), `${ziel}/${lauf}: utm_source`).toBe(fall.adresseGeht);
  });
});

// ===========================================================================
// META fbc UEBER DEN ADRESSWEG (Phase 11.7, S5) — DIE FUNKTION UND DER ADAPTER.
//
// W OBEN BEWACHT fbc NICHT: meta's eigener fbclid-Wert steht ohnehin in event_source_url,
// W bliebe also ohne fbc gruen. Die Faelle hier fordern fbc POSITIV. Dass kein ANDERES
// Ziel fbc traegt, deckt W unveraendert: ein fremdes fbc enthielte den fbclid-Wert, und W
// sucht ihn im ganzen ausgehenden Text jedes anderen Ziels.
// ===========================================================================

describe("extractFbclid — exakt, wurffrei, ohne Formpruefung", () => {
  it("X-a: sie wirft bei keiner feindlichen Eingabe und liefert immer eine Zeichenkette", () => {
    const werfendesToString = {
      toString(): string {
        throw new Error("boom");
      },
    };
    for (const eingabe of [
      undefined,
      null,
      42,
      {},
      [],
      werfendesToString,
      "",
      "?",
      "#",
      "http://[::1?fbclid=x",
      "%",
      LONE_SURROGATE,
      `https://x.com/?fbclid=${LONE_SURROGATE}`,
      `https://x.com/?${"&".repeat(100_000)}fbclid=x`,
      `https://x.com/?fbclid=${"%".repeat(1_000)}`,
    ]) {
      expect(() => extractFbclid(eingabe)).not.toThrow();
      expect(typeof extractFbclid(eingabe)).toBe("string");
    }
  });

  it("X-b: der Wert kommt unveraendert heraus, auch in gemischter Schreibung", () => {
    expect(extractFbclid("https://x.com/?utm_source=u&fbclid=AbC-_9")).toBe("AbC-_9");
  });

  it("X-c: der NAME wird exakt verglichen — FBCLID und Fbclid treffen nicht", () => {
    expect(extractFbclid("https://x.com/?FBCLID=x")).toBe("");
    expect(extractFbclid("https://x.com/?Fbclid=x")).toBe("");
  });

  it("X-d: leer oder fehlend ergibt die leere Zeichenkette", () => {
    expect(extractFbclid("https://x.com/?fbclid=")).toBe("");
    expect(extractFbclid("https://x.com/?utm_source=u")).toBe("");
    expect(extractFbclid("https://x.com/")).toBe("");
  });

  it("X-e: mehrfach vorhanden — das erste Vorkommen", () => {
    expect(extractFbclid("https://x.com/?fbclid=a&fbclid=b")).toBe("a");
  });

  it("X-f: der Wert kommt dekodiert, wie der Standard-Parser ihn liefert", () => {
    expect(extractFbclid("https://x.com/?fbclid=a%2Bb+c")).toBe("a+b c");
  });

  it("X-g: nicht parsebar oder keine Zeichenkette ergibt die leere Zeichenkette", () => {
    expect(extractFbclid("/relativ?fbclid=x")).toBe("");
    expect(extractFbclid(undefined)).toBe("");
    expect(extractFbclid(42)).toBe("");
  });

  it("X-h: das Fragment wird nicht gelesen", () => {
    expect(extractFbclid("https://x.com/#fbclid=x")).toBe("");
  });
});

// ===========================================================================
// LINKEDIN li_fat_id UEBER DEN ADRESSWEG (Phase 11.7, S6a) — DIE ZWEITE HUELLE.
//
// Sie und extractFbclid teilen den modulprivaten Kern readClickIdExact. X-a bis X-h oben
// bleiben unveraendert und belegen, dass die Delegation den Vertrag von extractFbclid
// nicht beruehrt; L-a bis L-h belegen denselben Vertrag fuer den zweiten Namen.
// ===========================================================================

describe("extractLiFatId — exakt, wurffrei, ohne Formpruefung", () => {
  it("L-a: sie wirft bei keiner feindlichen Eingabe und liefert immer eine Zeichenkette", () => {
    // WIRD ROT, WENN: der Kern bei kaputter Eingabe weiterwirft.
    const werfendesToString = {
      toString(): string {
        throw new Error("boom");
      },
    };
    for (const eingabe of [
      undefined,
      null,
      42,
      {},
      [],
      werfendesToString,
      "",
      "?",
      "#",
      "http://[::1?li_fat_id=x",
      "%",
      LONE_SURROGATE,
      `https://x.com/?li_fat_id=${LONE_SURROGATE}`,
      `https://x.com/?${"&".repeat(100_000)}li_fat_id=x`,
      `https://x.com/?li_fat_id=${"%".repeat(1_000)}`,
    ]) {
      expect(() => extractLiFatId(eingabe)).not.toThrow();
      expect(typeof extractLiFatId(eingabe)).toBe("string");
    }
  });

  it("L-b: der Wert kommt unveraendert heraus — Schreibung bleibt, dekodiert wie der Parser", () => {
    expect(extractLiFatId("https://x.com/?utm_source=u&li_fat_id=Ab7-Xy_9")).toBe("Ab7-Xy_9");
    expect(extractLiFatId("https://x.com/?li_fat_id=a%2Bb+c")).toBe("a+b c");
  });

  it("L-c: der NAME wird exakt verglichen — auf dem dekodierten Namen", () => {
    // WIRD ROT, WENN: der Kern den Namen ohne Schreibung vergleicht (L3).
    expect(extractLiFatId("https://x.com/?LI_FAT_ID=x")).toBe("");
    expect(extractLiFatId("https://x.com/?Li_Fat_Id=x")).toBe("");
    expect(extractLiFatId("https://x.com/?li%5Ffat%5Fid=x")).toBe("x");
  });

  it("L-d: leer oder fehlend ergibt die leere Zeichenkette", () => {
    expect(extractLiFatId("https://x.com/?li_fat_id=")).toBe("");
    expect(extractLiFatId("https://x.com/?utm_source=u")).toBe("");
    expect(extractLiFatId("https://x.com/")).toBe("");
  });

  it("L-e: mehrfach vorhanden — das erste Vorkommen", () => {
    expect(extractLiFatId("https://x.com/?li_fat_id=Erst&li_fat_id=Zwei")).toBe("Erst");
  });

  it("L-f: nicht parsebar oder keine Zeichenkette ergibt die leere Zeichenkette", () => {
    expect(extractLiFatId("/relativ?li_fat_id=x")).toBe("");
    expect(extractLiFatId(undefined)).toBe("");
    expect(extractLiFatId(42)).toBe("");
  });

  it("L-g: das Fragment wird nicht gelesen", () => {
    expect(extractLiFatId("https://x.com/#li_fat_id=x")).toBe("");
  });

  it("L-h: jede Huelle liest nur ihren eigenen Namen", () => {
    // WIRD ROT, WENN: eine Huelle dem Kern den falschen Namen reicht.
    const url = "https://x.com/?fbclid=a&li_fat_id=b";
    expect(extractFbclid(url)).toBe("a");
    expect(extractLiFatId(url)).toBe("b");
  });
});

// ===========================================================================
// TIKTOK ttclid UEBER DEN ADRESSWEG (Phase 11.7, S8) — DIE DRITTE HUELLE.
//
// Derselbe Kern wie extractFbclid und extractLiFatId; X-a bis X-h und L-a bis L-h bleiben
// unveraendert. W OBEN BEWACHT user.ttclid NICHT: tiktoks eigener Wert steht ohnehin in
// page.url, W bliebe ohne das Feld gruen. Das Feld selbst fordern TT-a bis TT-j in
// tiktok-forward.test.ts. Dass kein ANDERES Ziel ttclid traegt, deckt W unveraendert.
// ===========================================================================

describe("extractTtclid — exakt, wurffrei, ohne Formpruefung", () => {
  it("TX-a: sie wirft bei keiner feindlichen Eingabe und liefert immer eine Zeichenkette", () => {
    // WIRD ROT, WENN: der Kern bei kaputter Eingabe weiterwirft.
    const werfendesToString = {
      toString(): string {
        throw new Error("boom");
      },
    };
    for (const eingabe of [
      undefined,
      null,
      42,
      {},
      [],
      werfendesToString,
      "",
      "?",
      "#",
      "http://[::1?ttclid=x",
      "%",
      LONE_SURROGATE,
      `https://x.com/?ttclid=${LONE_SURROGATE}`,
      `https://x.com/?${"&".repeat(100_000)}ttclid=x`,
      `https://x.com/?ttclid=${"%".repeat(1_000)}`,
    ]) {
      expect(() => extractTtclid(eingabe)).not.toThrow();
      expect(typeof extractTtclid(eingabe)).toBe("string");
    }
  });

  it("TX-b: der Wert kommt unveraendert heraus — Schreibung, Laenge, dekodiert wie der Parser", () => {
    // WIRD ROT, WENN: gekuerzt, eine Form geprueft oder die Schreibung veraendert wird.
    expect(extractTtclid("https://x.com/?utm_source=u&ttclid=Ab7-Xy_9")).toBe("Ab7-Xy_9");
    expect(extractTtclid("https://x.com/?ttclid=a%2Bb+c")).toBe("a+b c");
    const lang = ("E.C.P." + "Ab9_-x".repeat(200)).slice(0, 1_000);
    expect(extractTtclid(`https://x.com/?ttclid=${lang}`)).toBe(lang);
  });

  it("TX-c: der NAME wird exakt verglichen — auf dem dekodierten Namen", () => {
    // WIRD ROT, WENN: der Kern den Namen ohne Schreibung vergleicht.
    expect(extractTtclid("https://x.com/?TTCLID=x")).toBe("");
    expect(extractTtclid("https://x.com/?TtClId=x")).toBe("");
    expect(extractTtclid("https://x.com/?tt%63lid=x")).toBe("x");
  });

  it("TX-d: leer oder fehlend ergibt die leere Zeichenkette", () => {
    expect(extractTtclid("https://x.com/?ttclid=")).toBe("");
    expect(extractTtclid("https://x.com/?utm_source=u")).toBe("");
    expect(extractTtclid("https://x.com/")).toBe("");
  });

  it("TX-e: mehrfach vorhanden — das erste Vorkommen", () => {
    expect(extractTtclid("https://x.com/?ttclid=Erst&ttclid=Zwei")).toBe("Erst");
  });

  it("TX-f: nicht parsebar oder keine Zeichenkette ergibt die leere Zeichenkette", () => {
    expect(extractTtclid("/relativ?ttclid=x")).toBe("");
    expect(extractTtclid(undefined)).toBe("");
    expect(extractTtclid(42)).toBe("");
  });

  it("TX-g: das Fragment wird nicht gelesen", () => {
    expect(extractTtclid("https://x.com/#ttclid=x")).toBe("");
  });

  it("TX-h: extractFbclid, extractLiFatId und extractTtclid lesen je nur ihren eigenen Namen", () => {
    // WIRD ROT, WENN: eine Huelle dem Kern den falschen Namen reicht.
    const url = "https://x.com/?fbclid=a&li_fat_id=b&ttclid=c";
    expect(extractFbclid(url)).toBe("a");
    expect(extractLiFatId(url)).toBe("b");
    expect(extractTtclid(url)).toBe("c");
  });
});

// ===========================================================================
// PINTEREST epik UEBER DEN ADRESSWEG (Phase 11.7, S9) — DIE VIERTE HUELLE.
//
// Derselbe Kern wie die Huellen darueber; deren Faelle bleiben unveraendert. W OBEN
// BEWACHT user_data.click_id NICHT: pinterests eigener Wert steht ohnehin in
// event_source_url, W bliebe ohne das Feld gruen. Das Feld selbst fordern PC-a bis PC-i in
// pinterest-forward.test.ts. Dass kein ANDERES Ziel epik traegt, deckt W unveraendert.
// ===========================================================================

describe("extractEpik — exakt, wurffrei, ohne Formpruefung", () => {
  it("EX-a: sie wirft bei keiner feindlichen Eingabe und liefert immer eine Zeichenkette", () => {
    // WIRD ROT, WENN: der Kern bei kaputter Eingabe weiterwirft.
    const werfendesToString = {
      toString(): string {
        throw new Error("boom");
      },
    };
    for (const eingabe of [
      undefined,
      null,
      42,
      {},
      [],
      werfendesToString,
      "",
      "?",
      "#",
      "http://[::1?epik=x",
      "%",
      LONE_SURROGATE,
      `https://x.com/?epik=${LONE_SURROGATE}`,
      `https://x.com/?${"&".repeat(100_000)}epik=x`,
      `https://x.com/?epik=${"%".repeat(1_000)}`,
    ]) {
      expect(() => extractEpik(eingabe)).not.toThrow();
      expect(typeof extractEpik(eingabe)).toBe("string");
    }
  });

  it("EX-b: der Wert kommt unveraendert heraus — Schreibung, Laenge, dekodiert wie der Parser", () => {
    // WIRD ROT, WENN: gekuerzt, eine Form geprueft oder die Schreibung veraendert wird.
    expect(extractEpik("https://x.com/?utm_source=u&epik=Ab7-Xy_9")).toBe("Ab7-Xy_9");
    expect(extractEpik("https://x.com/?epik=a%2Bb+c")).toBe("a+b c");
    const lang = ("dj0y" + "Ab9_-x".repeat(200)).slice(0, 1_000);
    expect(extractEpik(`https://x.com/?epik=${lang}`)).toBe(lang);
  });

  it("EX-c: der NAME wird exakt verglichen — auf dem dekodierten Namen", () => {
    // WIRD ROT, WENN: der Kern den Namen ohne Schreibung vergleicht.
    expect(extractEpik("https://x.com/?EPIK=x")).toBe("");
    expect(extractEpik("https://x.com/?Epik=x")).toBe("");
    expect(extractEpik("https://x.com/?ep%69k=x")).toBe("x");
  });

  it("EX-d: leer oder fehlend ergibt die leere Zeichenkette", () => {
    expect(extractEpik("https://x.com/?epik=")).toBe("");
    expect(extractEpik("https://x.com/?utm_source=u")).toBe("");
    expect(extractEpik("https://x.com/")).toBe("");
  });

  it("EX-e: mehrfach vorhanden — das erste Vorkommen", () => {
    expect(extractEpik("https://x.com/?epik=Erst&epik=Zwei")).toBe("Erst");
  });

  it("EX-f: nicht parsebar oder keine Zeichenkette ergibt die leere Zeichenkette", () => {
    expect(extractEpik("/relativ?epik=x")).toBe("");
    expect(extractEpik(undefined)).toBe("");
    expect(extractEpik(42)).toBe("");
  });

  it("EX-g: das Fragment wird nicht gelesen", () => {
    expect(extractEpik("https://x.com/#epik=x")).toBe("");
  });

  it("EX-h: jede Huelle liest nur ihren eigenen Namen", () => {
    // WIRD ROT, WENN: eine Huelle dem Kern den falschen Namen reicht.
    const url = "https://x.com/?fbclid=a&li_fat_id=b&ttclid=c&epik=d";
    expect(extractFbclid(url)).toBe("a");
    expect(extractLiFatId(url)).toBe("b");
    expect(extractTtclid(url)).toBe("c");
    expect(extractEpik(url)).toBe("d");
  });
});

describe("forwardToMeta — fbc in user_data", () => {
  /** Die feste Uhr: Sekunden 1 800 000 000, dazu 123 Millisekunden. */
  const JETZT_MS = 1_800_000_000_123;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.useFakeTimers();
    vi.setSystemTime(JETZT_MS);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  /** Sendet genau ein Ereignis mit dieser Adresse und liefert das gesendete Ereignis. */
  async function gesendet(eventSourceUrl: string): Promise<Record<string, unknown>> {
    await forwardToMeta(
      { pixelId: "PIXEL-S5", token: TOKEN },
      "Purchase",
      "evt-s5",
      { eventSourceUrl },
      IP,
      UA,
    );
    // POSITIVKONTROLLE: ohne genau einen Aufruf waere "kein fbc" trivial wahr.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [unknown, { body: string }];
    const payload = JSON.parse(init.body) as { data: Record<string, unknown>[] };
    return payload.data[0];
  }

  it("M-a: mit fbclid entsteht fbc exakt als fb.1.<Millisekunden>.<Wert>", async () => {
    const ereignis = await gesendet("https://kunde.de/lp?utm_source=u&fbclid=AbC-_9");
    const userData = ereignis.user_data as Record<string, unknown>;
    expect(userData.fbc).toBe("fb.1.1800000000123.AbC-_9");
    // DERSELBE MOMENT: event_time sind die Sekunden derselben Uhr-Lesung.
    expect(ereignis.event_time).toBe(1_800_000_000);
  });

  it("M-b: ohne fbclid entsteht kein fbc", async () => {
    const ereignis = await gesendet("https://kunde.de/lp?utm_source=u");
    expect(ereignis.user_data as Record<string, unknown>).not.toHaveProperty("fbc");
  });

  it("M-c: FBCLID in anderer Schreibung ergibt kein fbc", async () => {
    const ereignis = await gesendet("https://kunde.de/lp?FBCLID=AbC-_9");
    expect(ereignis.user_data as Record<string, unknown>).not.toHaveProperty("fbc");
  });

  it("M-e: eine nicht parsebare Adresse ergibt kein fbc — und der Forward laeuft", async () => {
    const ereignis = await gesendet("/lp?fbclid=AbC-_9");
    expect(ereignis.user_data as Record<string, unknown>).not.toHaveProperty("fbc");
  });
});
