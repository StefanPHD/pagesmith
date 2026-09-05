import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// =========================================================================
// SCHEIBE 1b-2a — DIE RETTUNG AM BEACON, AM HANDLER GEMESSEN
//
// WAS HIER ATTRAPPE IST UND WARUM, denn davon haengt ab, was diese Datei ueberhaupt
// misst:
//   ATTRAPPE: der Resolver (er ist in token.test.ts eigens geprueft), die Klammer
//             runRefresh (sie ist in refresh-run.test.ts geprueft und wird von dieser
//             Scheibe GERUFEN, nicht angefasst), die Nach-Aufloesung, der
//             google-Adapter und der Analytics-Persist.
//   ECHT:     handleIngest selbst — die Anordnung der Zweige, das Consent-Gate, die
//             geoeffnete Forward-Wache und der Registrierungs-Schutz.
// DIESE DATEI PRUEFT DIE ANORDNUNG, NICHT DIE ERNEUERUNG. Dass eine Erneuerung am
// deployten Pfad wirklich stattfindet, kann kein Lauf gegen Attrappen zeigen; das ist
// die Live-Test-Achse.
//
// KEINE UMLAUTE IM QUELLTEXT — ae/oe/ue/ss, wie in den Nachbardateien.
// =========================================================================

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey, resolveRefreshedTarget } = vi.hoisted(
  () => ({
    getCapiConfigByTrackingKey: vi.fn(),
    resolveRefreshedTarget: vi.fn(),
  }),
);
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  resolveRefreshedTarget,
  META_TARGET: "meta",
}));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

// DIE KLAMMER ALS ATTRAPPE — UND SIE IST DER PRUEFSTEIN FUER (I-7): Diese Scheibe
// RUFT sie, sie fasst sie nicht an. Ein Lauf, der die echte Klammer fuehre, pruefte
// deren Wiederholungslogik ein zweites Mal und dieselbe Sache an zwei Orten.
const { runRefresh } = vi.hoisted(() => ({ runRefresh: vi.fn() }));
vi.mock("@/lib/oauth/refresh-run", () => ({ runRefresh }));

// DER GOOGLE-ADAPTER ALS BEOBACHTER: Er ist der einzige Ort, an dem sichtbar wird,
// WELCHES Zugangsdatum nach einer Rettung tatsaechlich ankommt.
// DIE ARGUMENTE SIND MITGETYPT, WEIL SIE GELESEN WERDEN: H1 vergleicht den WERT des
// Zugangsdatums, das ankommt — eine Attrappe ohne Parameter liesse sich zwar rufen,
// aber ihre Aufrufliste waere leer getypt, und der Vergleich fiele weg.
const { forwardToGoogle } = vi.hoisted(() => ({
  forwardToGoogle: vi.fn<(...args: unknown[]) => Promise<void>>(async () => {}),
}));
vi.mock("@/lib/capi/google-forward", () => ({ forwardToGoogle }));

const { forwardToMeta } = vi.hoisted(() => ({
  forwardToMeta: vi.fn(async () => {}),
}));
vi.mock("@/lib/capi/meta-forward", () => ({ forwardToMeta }));

const { persistEvent } = vi.hoisted(() => ({ persistEvent: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent }));

// DIE after-ATTRAPPE IST UMSCHALTBAR, UND DAS IST DER GANZE GRUND FUER DIESE
// KONSTRUKTION: Die sechs bestehenden ingest.*.test.ts ersetzen after durch eine
// Attrappe, die die Callbacks nur EINSAMMELT — die kann gar nicht werfen, und deshalb
// hat KEINE von ihnen den Wurf bei der REGISTRIERUNG je decken koennen
// (Vorrats-Eintrag 35, GEMESSEN 2026-09-01). H9 braucht eine, die wirft.
const { after, scheduled, afterWirft } = vi.hoisted(() => {
  const scheduled: Array<() => Promise<void> | void> = [];
  const afterWirft = { an: false };
  return {
    scheduled,
    afterWirft,
    after: vi.fn((cb: () => Promise<void> | void) => {
      if (afterWirft.an) throw new Error("ERFUNDEN: Registrierung kaputt");
      scheduled.push(cb);
    }),
  };
});
vi.mock("next/server", () => ({ after }));

import { handleIngest } from "./ingest";
// BEWUSST DIE ECHTEN KONSTANTEN, KEINE KOPIEN — dieselbe Disziplin wie in
// fan-out.test.ts: Feldname und Ziel-Schluessel muessen dieselben sein, die Erzeuger
// und Leser benutzen. Ein handgeschriebenes Literal liesse eine Divergenz gruen
// durchrutschen, und der Ausgang waere fail-closed und lautlos.
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";
import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";

const GOOGLE_EINTRAG = {
  target: "google" as const,
  pixelId: "111",
  lage: "expired" as const,
};

const GOOGLE_VORSORGE = { ...GOOGLE_EINTRAG, lage: "lead" as const };

const META_EMPFAENGER = {
  target: "meta" as const,
  config: { pixelId: "PIXEL-123", token: "META-SECRET" },
};

const FRISCHER_EMPFAENGER = {
  target: "google" as const,
  config: { pixelId: "111", token: "FRISCH-NACH-RETTUNG" },
};

function aufloesung(
  ueberschreibungen: Partial<{
    projectId: string;
    blocked: boolean;
    abTestActive: boolean;
    targets: unknown[];
    renewable: unknown[];
  }> = {},
) {
  return {
    projectId: "proj-1",
    blocked: false,
    abTestActive: false,
    targets: [],
    renewable: [],
    ...ueberschreibungen,
  };
}

/** Ein Beacon, dessen Einwilligungs-Draht ALLE bekannten Ziele erlaubt. */
function beacon(felder: Record<string, unknown> = {}): Request {
  const cns: Record<string, boolean> = {};
  for (const schluessel of Object.values(CONSENT_KEY_BY_TARGET)) {
    cns[schluessel] = true;
  }
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify({
      trackingKey: "tk-abc",
      eventID: "evt-1",
      event: "Lead",
      [CONSENT_WIRE_FIELD]: cns,
      ...felder,
    }),
    headers: { "content-type": "text/plain" },
  });
}

async function laufeHintergrund(): Promise<void> {
  for (const cb of scheduled.splice(0)) await cb();
}

beforeEach(() => {
  afterWirft.an = false;
  scheduled.length = 0;
  runRefresh.mockResolvedValue({ outcome: { kind: "ok" }, attempts: 1 });
  resolveRefreshedTarget.mockResolvedValue(FRISCHER_EMPFAENGER);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Scheibe 1b-2a — die Rettung im Anfrage-Weg", () => {
  it("H1: Lage 'expired' -> die Klammer laeuft IM Request, und der Adapter bekommt den FRISCHEN Token", async () => {
    // WIRD ROT, WENN: die Rettung fehlt (kein runRefresh) · sie nach dem Fan-Out
    // liegt (der Adapter bekaeme nichts) · die Nach-Aufloesung fehlt (der Adapter
    // bekaeme den ALTEN Wert oder gar keinen).
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ renewable: [GOOGLE_EINTRAG] }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(runRefresh).toHaveBeenCalledWith({
      projectId: "proj-1",
      target: "google",
    });
    expect(resolveRefreshedTarget).toHaveBeenCalledWith(
      "proj-1",
      GOOGLE_EINTRAG,
    );
    // DER WERT WIRD VERGLICHEN UND NICHT BLOSS DIE ANWESENHEIT: Ein Adapter, der den
    // alten Token bekaeme, saehe an einer blossen Aufruf-Zaehlung identisch aus.
    expect(forwardToGoogle).toHaveBeenCalledTimes(1);
    expect(forwardToGoogle.mock.calls[0]?.[0]).toMatchObject({
      token: "FRISCH-NACH-RETTUNG",
      operatingAccountId: "111",
    });
  });

  it("H2: Lage 'lead' -> KEINE Erneuerung im Request, genau EINE zusaetzliche Hintergrund-Registrierung, Fan-Out mit dem ALTEN Token", async () => {
    // DIE VORSORGE KOSTET DEN LAUFENDEN BEACON NICHTS. WIRD ROT, WENN: sie inline
    // gemacht wird (dann warteten Besucher auf eine Erneuerung, die sie nicht
    // brauchen) · sie ganz entfaellt (dann laeuft jedes trafficstarke Projekt
    // stuendlich in die Rettung).
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [META_EMPFAENGER],
        renewable: [GOOGLE_VORSORGE],
      }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(runRefresh).not.toHaveBeenCalled();
    expect(resolveRefreshedTarget).not.toHaveBeenCalled();
    // ZWEI REGISTRIERUNGEN: der Persist (Bestand) und die Vorsorge (neu).
    expect(scheduled).toHaveLength(2);
    // DER FAN-OUT LAEUFT MIT DEM BESTAND — die Vorsorge aendert an DIESEM Beacon
    // nichts.
    expect(forwardToMeta).toHaveBeenCalledTimes(1);

    await laufeHintergrund();
    expect(runRefresh).toHaveBeenCalledWith({
      projectId: "proj-1",
      target: "google",
    });
  });

  it("H3: gesperrtes Projekt -> WEDER Rettung NOCH Vorsorge (I-2)", async () => {
    // DER KILL-SWITCH BLEIBT EIN EIGENER ZWEIG VOR PERSIST UND FORWARD. WIRD ROT,
    // WENN: er hinter die Erneuerung geschoben wird.
    // DER RESOLVER LIEFERT HIER BEWUSST EINE NICHT-LEERE renewable-MENGE, obwohl er
    // das in der Wirklichkeit nie tut (er kehrt VOR der Geheimnis-Abfrage zurueck):
    // Sonst waere der Lauf trivial wahr und pruefte die Anordnung im Handler gar nicht
    // (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG ... (2) SIE IST TRIVIAL
    // WAHR").
    // BEIDE LAGEN STEHEN IN DER FIXTURE, und das ist Absicht: Der Kill-Switch muss
    // VOR BEIDEN Erneuerungs-Punkten liegen. Mit nur einer Lage fiele der Lauf bei
    // einer Verschiebung, die den anderen Punkt passieren laesst, NICHT auf.
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        blocked: true,
        renewable: [GOOGLE_EINTRAG, GOOGLE_VORSORGE],
      }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(runRefresh).not.toHaveBeenCalled();
    // NICHTS EINGEPLANT — weder der Persist noch die Vorsorge.
    expect(scheduled).toHaveLength(0);
    expect(after).not.toHaveBeenCalled();
  });

  it("H4: wirft die Klammer, bleibt die 204 stehen UND der Handler laeuft zu Ende (I-1)", async () => {
    // DIE ZWEITE HAELFTE IST PFLICHT: Ein Lauf, der nur "kein Wurf" prueft,
    // unterscheidet ein wirksames Gate nicht von einem abgestuerzten Handler
    // (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG ... (3)"). Deshalb wird
    // zusaetzlich geprueft, dass der Fan-Out fuer das UEBRIGE Ziel noch stattfindet.
    runRefresh.mockRejectedValue(new Error("ERFUNDEN: Klammer kaputt"));
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [META_EMPFAENGER],
        renewable: [GOOGLE_EINTRAG],
      }),
    );
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const res = await handleIngest(beacon());

      expect(res.status).toBe(204);
      expect(forwardToMeta).toHaveBeenCalledTimes(1);
      expect(forwardToGoogle).not.toHaveBeenCalled();
      // KEIN LEERER catch (I-8): der Wurf wird geloggt, nicht verschluckt.
      expect(JSON.stringify(fehler.mock.calls)).toContain(
        "refresh inline error",
      );
    } finally {
      fehler.mockRestore();
    }
  });

  it("H5: dead/misconfigured -> KEINE Nach-Aufloesung, kein Forward fuer dieses Ziel", async () => {
    // WIRD ROT, WENN: "erneuerbar, tot" wie ein geglueckter Lauf behandelt wird —
    // dann laese der Handler eine Zeile nach, die es frisch gar nicht gibt, und
    // bezahlte dafuer eine Datenbank-Runde auf Verdacht.
    for (const ausgang of [
      { kind: "dead", reason: "invalid_grant" },
      { kind: "misconfigured", reason: "write_failed" },
      { kind: "retry", reason: "unexpected" },
    ]) {
      vi.clearAllMocks();
      runRefresh.mockResolvedValue({ outcome: ausgang, attempts: 3 });
      resolveRefreshedTarget.mockResolvedValue(FRISCHER_EMPFAENGER);
      getCapiConfigByTrackingKey.mockResolvedValue(
        aufloesung({ renewable: [GOOGLE_EINTRAG] }),
      );

      const res = await handleIngest(beacon());

      expect(res.status, ausgang.kind).toBe(204);
      expect(runRefresh, ausgang.kind).toHaveBeenCalledTimes(1);
      expect(resolveRefreshedTarget, ausgang.kind).not.toHaveBeenCalled();
      expect(forwardToGoogle, ausgang.kind).not.toHaveBeenCalled();
    }
  });

  it("H6: der Bestaetigungs-Beacon erneuert NIE — weder inline noch im Hintergrund", async () => {
    // DER FRUEHE RETURN DES CONFIRM-ZWEIGS BLEIBT STRUKTURELL VOR ALLEM ANDEREN.
    // WIRD ROT, WENN: die Erneuerung vor den Confirm-Zweig geschoben wird.
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ renewable: [GOOGLE_EINTRAG, GOOGLE_VORSORGE] }),
    );

    const res = await handleIngest(beacon({ obs: BROWSER_CONFIRM_MARKER }));

    expect(res.status).toBe(204);
    expect(runRefresh).not.toHaveBeenCalled();
    // GENAU EINE Registrierung — der Persist des Confirm-Zweigs, keine Vorsorge.
    expect(scheduled).toHaveLength(1);
  });

  it("H7: ein nicht forwardbares Ereignis rettet NICHT, sorgt aber VOR", async () => {
    // DIE ZWEI LAGEN LIEGEN AN VERSCHIEDENEN STELLEN, UND DIESER LAUF IST DER EINZIGE,
    // DER DEN UNTERSCHIED SICHTBAR MACHT:
    //  · Die RETTUNG liegt hinter isForwardable — fuer einen PageView waere sie ein
    //    Netzruf ohne jeden Gegenwert, auf dem Volumen-Pfad.
    //  · Die VORSORGE liegt DAVOR — sie soll den Inline-Fall strukturell selten
    //    machen, und "trafficstark" heisst BEACONS, nicht Conversions.
    // WIRD ROT, WENN: eine der beiden auf die Seite der anderen wandert.
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ renewable: [GOOGLE_EINTRAG, GOOGLE_VORSORGE] }),
    );

    const res = await handleIngest(beacon({ event: "__ps_pageview" }));

    expect(res.status).toBe(204);
    expect(runRefresh).not.toHaveBeenCalled();
    expect(forwardToGoogle).not.toHaveBeenCalled();

    await laufeHintergrund();
    // NUR die Vorsorge, NICHT das rettbare Ziel.
    expect(runRefresh).toHaveBeenCalledTimes(1);
    expect(runRefresh).toHaveBeenCalledWith({
      projectId: "proj-1",
      target: "google",
    });
  });

  it("H8: ein rettbares Ziel OHNE Einwilligung wird NICHT gerettet", async () => {
    // WIRD ROT, WENN: die Rettung vor das Consent-Gate gezogen wird — dann kostete
    // ein Beacon einen Netzruf fuer ein Ziel, an das anschliessend garantiert nichts
    // hinausgeht.
    // DER DRAHT IST VORHANDEN UND VERWEIGERT — das ist etwas anderes als ein
    // ABWESENDER Draht (dort greift die Altbestands-Regel).
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ renewable: [GOOGLE_EINTRAG] }),
    );

    const res = await handleIngest(
      beacon({ [CONSENT_WIRE_FIELD]: { [CONSENT_KEY_BY_TARGET.google]: false } }),
    );

    expect(res.status).toBe(204);
    expect(runRefresh).not.toHaveBeenCalled();
    expect(forwardToGoogle).not.toHaveBeenCalled();
  });

  it("H9: ein WERFENDES after kippt die 204 nicht — fuer BEIDE Registrierungen, und der Wurf wird geloggt", async () => {
    // DER LAUF, DEN DER BESTAND NICHT HABEN KONNTE. Alle sechs ingest.*.test.ts
    // ersetzen after durch eine sammelnde Attrappe; DIE KANN NICHT WERFEN. Erst diese
    // umschaltbare Attrappe macht die Luecke aus Vorrats-Eintrag 35 messbar.
    // WIRD ROT, WENN: scheduleAfter ausgebaut oder sein catch geleert wird.
    // ER IST DAS EINZIGE STUECK FUER DIESE FEHLERKLASSE, GEMESSEN (Mutationsprobe 4
    // vom 2026-09-03: scheduleAfter auf ein nacktes after() zurueckgebaut -> GENAU
    // dieser Lauf faellt, 1 von 1487; ALLE SECHS bestehenden ingest.*.test.ts bleiben
    // gruen). Der Satz steht hier, damit ihn niemand als redundant entfernt und dabei
    // die einzige Abdeckung der Registrierung mitnimmt (docs/immer-beachten.md,
    // Lektion (f) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").
    afterWirft.an = true;
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [META_EMPFAENGER],
        renewable: [GOOGLE_VORSORGE],
      }),
    );
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const res = await handleIngest(beacon());

      expect(res.status).toBe(204);
      // BEIDE Registrierungen haben es versucht und sind beide gefangen worden.
      expect(after).toHaveBeenCalledTimes(2);
      const geloggt = JSON.stringify(fehler.mock.calls);
      expect(geloggt).toContain("after registration failed");
      expect(geloggt).toContain("persist");
      expect(geloggt).toContain("refresh-lead");
      // DER HANDLER LAEUFT ZU ENDE: der Fan-Out findet trotzdem statt.
      expect(forwardToMeta).toHaveBeenCalledTimes(1);
    } finally {
      fehler.mockRestore();
    }
  });

  it("H10: die geoeffnete Forward-Wache — targets LEER und ein rettbares Ziel betritt den Block", async () => {
    // DIE GEFAEHRLICHSTE STELLE DIESER SCHEIBE, WEIL SIE LAUTLOS FALSCH WIRD: Mit der
    // alten Wache (targets.length > 0) wuerde der ganze Block uebersprungen, die
    // Rettung liefe NIE — und KEIN Compiler und KEIN Bestandstest saehe es.
    // WIRD ROT, WENN: der rettbar-Term aus der Wache entfernt wird.
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ targets: [], renewable: [GOOGLE_EINTRAG] }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(runRefresh).toHaveBeenCalledTimes(1);
    expect(forwardToGoogle).toHaveBeenCalledTimes(1);
  });

  it("H11: bleibt nach einer gescheiterten Nach-Aufloesung niemand uebrig, endet der Handler sauber mit 204", async () => {
    // FAIL-CLOSED BIS ZUM SCHLUSS. WIRD ROT, WENN: ein null aus der Nach-Aufloesung in
    // den Fan-Out gereicht wird — dann liefe ein Adapter auf einem Wert, den es nicht
    // gibt.
    resolveRefreshedTarget.mockResolvedValue(null);
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ targets: [], renewable: [GOOGLE_EINTRAG] }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(forwardToGoogle).not.toHaveBeenCalled();
    expect(forwardToMeta).not.toHaveBeenCalled();
  });

  it("H12: EIN VERLORENES RENNEN BRICHT DEN INGEST NICHT AB — der Handler laeuft zu Ende, und ein zweites Ziel wird weiter geforwardet", async () => {
    // DIE DRITTE ACHSE DES TESTPLANS DER SCHEIBE 1b-2b, UND SIE IST NICHT OPTIONAL:
    // Ohne diesen Lauf sieht "geblockt" aus wie "abgestuerzt" (docs/immer-beachten.md,
    // "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL", dritte Weise).
    //
    // WAS HIER DER VERLIERER IST, und das gehoert erklaert, weil man es der Attrappe
    // nicht ansieht: Der Riegel gibt bei einem verlorenen Rennen den BESTEHENDEN
    // ok-Ausgang zurueck — er hat ein brauchbares Zugangsdatum beschafft, es steht nur
    // nicht in der Zeile. AUS SICHT DIESES HANDLERS IST DAS UNUNTERSCHEIDBAR VON EINEM
    // GEWONNENEN RENNEN, UND GENAU DAS IST DER ZWECK DER WAHL: Die Nach-Aufloesung
    // liest die Zeile neu und findet dort das Zugangsdatum des GEWINNERS.
    //
    // WARUM DIESER LAUF TROTZDEM ETWAS PRUEFT: Er nagelt die FOLGE der Wahl fest. Jeder
    // Nicht-ok-Ausgang wuerde hier uebersprungen (das ist H5), und die Conversion ginge
    // still verloren. WIRD ROT, WENN: der Riegel je einen anderen Ausgang liefert und
    // jemand ihn hier durchreicht · der Verlierer-Zweig wirft und der Wurf den Handler
    // verlaesst · das zweite, gesunde Ziel mit ausfaellt.
    //
    // DAS ZWEITE ZIEL IST DER EIGENTLICHE WAECHTER: Ein Handler, der beim Verlust
    // abbraeche, naehme Meta mit — und ein Lauf ohne zweites Ziel saehe das nicht.
    resolveRefreshedTarget.mockResolvedValue({
      target: "google" as const,
      // DAS ZUGANGSDATUM DES GEWINNERS, nicht das eigene. Der Name sagt es, damit ein
      // spaeterer Leser die zwei nicht verwechselt.
      config: { pixelId: "111", token: "VOM-GEWINNER-GESCHRIEBEN" },
    });
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ targets: [META_EMPFAENGER], renewable: [GOOGLE_EINTRAG] }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(runRefresh).toHaveBeenCalledTimes(1);
    // DER GERETTETE EMPFAENGER LAEUFT — mit dem Wert aus der Zeile.
    expect(forwardToGoogle).toHaveBeenCalledTimes(1);
    expect(forwardToGoogle.mock.calls[0]?.[0]).toMatchObject({
      token: "VOM-GEWINNER-GESCHRIEBEN",
    });
    // UND DAS ZWEITE ZIEL EBENFALLS. Ohne diese Zusicherung bliebe der Lauf gruen,
    // wenn der Handler nach der Rettung stumm abbraeche.
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
    // DER PERSIST IST REGISTRIERT — der Handler ist wirklich bis ans Ende gelaufen und
    // nicht bloss mit 204 herausgefallen.
    await laufeHintergrund();
    expect(persistEvent).toHaveBeenCalledTimes(1);
  });
});
