import { describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung; connect-return.ts zieht es ueber
// isProjectIdShape (google-authorize.ts) mit herein. Die FORMPRUEFUNG laeuft dabei ECHT —
// sie ist der Gegenstand von T2, und mit einer Attrappe pruefte T2 nur den Mock.
vi.mock("server-only", () => ({}));

import { resolveConnectReturn } from "./connect-return";

const PROJEKT_A = { id: "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa", name: "A" };
const PROJEKT_B = { id: "bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb", name: "B" };

/**
 * Ein Lader, der protokolliert, WOMIT er gerufen wurde.
 *
 * DAS PROTOKOLL IST DER GANZE PUNKT und nicht Beifang: An ihm haengt die Unterscheidung
 * zwischen "die Kennung wurde verworfen, BEVOR geladen wurde" (Fall b) und "sie wurde
 * benutzt und lud nichts" (Fall c). Am Ergebnis allein sehen die beiden gleich aus.
 */
function lader(antworten: Record<string, unknown>, rueckfall: unknown) {
  const rufe: (string | undefined)[] = [];
  const load = vi.fn(async (id?: string) => {
    rufe.push(id);
    if (id === undefined) return rueckfall as never;
    return (antworten[id] ?? null) as never;
  });
  return { load, rufe };
}

describe("resolveConnectReturn — die vier Faelle der Rueckkehr", () => {
  it("T1 (a): KEIN Parameter -> Rueckfall, Meldung ERLAUBT", () => {
    // WIRD ROT, WENN jemand die Unterdrueckung auf "kein Parameter" ausweitet. Das waere
    // der teuerste Fehlgriff der Scheibe: `denied` und `no_state` tragen keine Kennung,
    // und ihre Meldung ist die einzige, die ein Betreiber heute ueberhaupt zu sehen
    // bekommt.
    const { load, rufe } = lader({}, PROJEKT_A);
    return resolveConnectReturn({
      rawProject: undefined,
      hasOutcome: true,
      load,
    }).then((r) => {
      expect(r.project).toBe(PROJEKT_A);
      expect(r.showOutcome).toBe(true);
      expect(rufe).toEqual([undefined]);
    });
  });

  it("T1b (a): kein Parameter UND kein Ergebniscode -> Rueckfall, nichts zu zeigen", () => {
    // POSITIVKONTROLLE zu T1: Ohne sie zeigte T1 nur, dass IRGENDETWAS true liefert —
    // auch eine Funktion, die showOutcome fest auf true setzt, saehe dort richtig aus.
    const { load } = lader({}, PROJEKT_A);
    return resolveConnectReturn({
      rawProject: undefined,
      hasOutcome: false,
      load,
    }).then((r) => expect(r.showOutcome).toBe(false));
  });

  it("T2 (b): formwidriger Parameter -> Lader NICHT mit der Kennung gerufen, Meldung UNTERDRUECKT", async () => {
    // ROT DURCH DIE PFLICHT-MUTATION "die Formpruefung entfernen".
    // DIE BEOBACHTUNG IST DER LADER-AUFRUF, NICHT NUR DAS ERGEBNIS, und das ist die
    // Auflage aus dem Zuschnitt: Ohne die Formpruefung erzeugte eine verbogene Kennung in
    // der Datenbank einen Typfehler, und der waere von einem echten Fehler nicht zu
    // unterscheiden. Am Ergebnis allein waere Fall (b) von Fall (c) nicht zu trennen.
    const { load, rufe } = lader({}, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: "kein-uuid",
      hasOutcome: true,
      load,
    });
    expect(r.project).toBe(PROJEKT_A);
    expect(r.showOutcome).toBe(false);
    expect(rufe).toEqual([undefined]);
  });

  it("T2b (b): auch der LEERE Parameter ist Fall (b), nicht Fall (a)", async () => {
    // `?project=` steht in der Adresse — eine Kennung WAR da. WIRD ROT, WENN jemand den
    // leeren Wert wie ein fehlendes Feld behandelt; dann erschiene die Meldung an einem
    // Projekt, das mit dem Vorgang nichts zu tun hat.
    const { load, rufe } = lader({}, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: "",
      hasOutcome: true,
      load,
    });
    expect(r.showOutcome).toBe(false);
    expect(rufe).toEqual([undefined]);
  });

  it("T3 (b'): ein ARRAY ist Fall (b) — eine Kennung war da, sie ist nur nicht eindeutig", async () => {
    // ?project=a&project=b. WIRD ROT, WENN jemand ihn wie "nicht da" behandelt.
    // DIE REGEL IST FUER BEIDE PARAMETER DIESELBE: Was der Wert nicht eindeutig hergibt,
    // wird nicht behauptet. Beim Ergebniscode fuehrt ein Array zu keiner Meldung, hier
    // ueber die Unterdrueckung ebenfalls — nur der Weg unterscheidet sich, weil der eine
    // Parameter die AUSSAGE ist und der andere ihren ORT.
    const { load, rufe } = lader({}, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: [PROJEKT_B.id, PROJEKT_A.id],
      hasOutcome: true,
      load,
    });
    expect(r.project).toBe(PROJEKT_A);
    expect(r.showOutcome).toBe(false);
    expect(rufe).toEqual([undefined]);
  });

  it("T4 (c): formgueltig, laedt NICHT -> Rueckfall UND Meldung UNTERDRUECKT", async () => {
    // ROT DURCH DIE PFLICHT-MUTATION "die Unterdrueckung im nicht-aufloesenden Fall
    // entfernen". Er ist der Lauf, der den GRUNDSATZ der Scheibe haelt: Ohne die
    // Unterdrueckung reproduzierte der Rueckfall genau den Fehler, gegen den sie gebaut
    // ist — der Betreiber stuende in A und saehe dort den Ergebniscode eines Vorgangs
    // aus B.
    // BEIDE AUFRUFE WERDEN GEPRUEFT: erst mit der Kennung (sie war formgueltig, also
    // wurde sie benutzt), dann der Rueckfall. Genau das trennt (c) von (b).
    const { load, rufe } = lader({}, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: PROJEKT_B.id,
      hasOutcome: true,
      load,
    });
    expect(r.project).toBe(PROJEKT_A);
    expect(r.showOutcome).toBe(false);
    expect(rufe).toEqual([PROJEKT_B.id, undefined]);
  });

  it("T5 (d): loest auf -> DIESES Projekt, Meldung ERLAUBT, KEIN Rueckfall-Aufruf", async () => {
    // WIRD ROT, WENN die Kennung ignoriert wird — dann laeuft der Rueckfall, und das
    // Ergebnis waere A statt B. Der fehlende zweite Aufruf ist die schaerfere Haelfte:
    // Ein zweiter Lade-Vorgang waere eine Abfrage zuviel auf einem Pfad, der bei jedem
    // Seitenaufruf laeuft.
    const { load, rufe } = lader({ [PROJEKT_B.id]: PROJEKT_B }, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: PROJEKT_B.id,
      hasOutcome: true,
      load,
    });
    expect(r.project).toBe(PROJEKT_B);
    expect(r.showOutcome).toBe(true);
    expect(rufe).toEqual([PROJEKT_B.id]);
  });

  it("T5b (d): loest auf, aber es gibt keinen Ergebniscode -> Projekt ja, Meldung nein", async () => {
    // Die zweite Achse getrennt gefuehrt: Welches Projekt geladen wird und ob eine
    // Meldung erscheint, sind ZWEI Entscheidungen. Ein Lauf, der nur (d) mit Meldung
    // prueft, liesse offen, ob showOutcome ueberhaupt am Ergebniscode haengt.
    const { load } = lader({ [PROJEKT_B.id]: PROJEKT_B }, PROJEKT_A);
    const r = await resolveConnectReturn({
      rawProject: PROJEKT_B.id,
      hasOutcome: false,
      load,
    });
    expect(r.project).toBe(PROJEKT_B);
    expect(r.showOutcome).toBe(false);
  });

  it("hat der Nutzer GAR KEIN Projekt, bleibt es bei null — ohne Wurf", async () => {
    // Der Erst-Nutzer-Fall. WIRD ROT, WENN jemand aus dem null des Laders einen Fehler
    // macht; der leere Editor ist hier der richtige Zustand.
    const { load } = lader({}, null);
    const r = await resolveConnectReturn({
      rawProject: undefined,
      hasOutcome: true,
      load,
    });
    expect(r.project).toBeNull();
    expect(r.showOutcome).toBe(true);
  });
});
