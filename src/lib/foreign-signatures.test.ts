// DIE SIGNATURLISTE — WORTLAUT UND STRUKTUR (Phase 11.11, Scheibe 11.11b).
//
// ZWEI ARTEN VON LAEUFEN, UND SIE DUERFEN VERSCHIEDENES:
//
// F1 bis F4 pruefen WORTLAUTE. Ihre Erwartung ist aus dem BELEG GETIPPT und NIE aus
// foreign-signatures.ts importiert (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE
// BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE). Weicht etwas ab, wird die LISTE
// korrigiert, nie die Erwartung. Ein Import machte diese Datei zum SPIEGEL, der jeden
// Tippfehler bestaetigt — und ein Tippfehler in einer Adresse ist ein Fehltreffer, der
// in 11.11c fremden Code zum Loeschen anboete.
//
// F5 und F6 pruefen STRUKTUR. Sie DUERFEN die Liste lesen, weil sie keine Wortlaute
// pruefen, sondern Eigenschaften: jeder Eintrag traegt einen Beleg; keine Adresse
// kommt in zwei Eintraegen vor.
//
// DIE BELEGE, aus denen F1 bis F4 getippt sind:
// - docs/ziel-befunde.md, Meta (g) · Pinterest (ab) · TikTok (i) · LinkedIn (am) ·
//   Google (cs) und (ct).
// - docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK P11.11-13 (Cookiebot, Usercentrics, Klaro) und
//   VERMERK P11.11-25 (OneTrust, consentmanager, CookieYes).

import { describe, expect, it } from "vitest";
import { FOREIGN_SIGNATURES } from "./foreign-signatures";

const von = (anbieter: string) => {
  const s = FOREIGN_SIGNATURES.find((x) => x.anbieter === anbieter);
  if (!s) throw new Error(`Kein Eintrag fuer ${anbieter}`);
  return s;
};

describe("Signaturliste — die Wortlaute stammen aus den Belegen", () => {
  // F1. Die fuenf Fan-Out-Ziele. Jede Adresse und jeder Name GETIPPT aus dem
  // jeweiligen Teil in docs/ziel-befunde.md.
  it("F1: die fuenf Ziele tragen die belegten Adressen und Namen", () => {
    expect(von("Meta").adressen).toEqual(["connect.facebook.net"]);
    expect(von("Meta").namen).toEqual(["fbq(", "_fbq"]);

    expect(von("Pinterest").adressen).toEqual(["s.pinimg.com/ct/core.js"]);
    expect(von("Pinterest").namen).toEqual(["pintrk("]);

    expect(von("TikTok").adressen).toEqual([
      "analytics.tiktok.com/i18n/pixel/events.js",
    ]);
    expect(von("TikTok").namen).toEqual(["TiktokAnalyticsObject", "ttq.load("]);

    expect(von("LinkedIn").adressen).toEqual([
      "snap.licdn.com/li.lms-analytics/insight.min.js",
    ]);
    expect(von("LinkedIn").namen).toEqual(["_linkedin_partner_id", "lintrk("]);

    expect(von("Google-Tag").adressen).toEqual(["googletagmanager.com/gtag/js"]);
    expect(von("Google-Tag").namen).toEqual(["gtag("]);
  });

  // F2. DIE RUECKFALL-ADRESSEN, und die drei LEEREN sind der eigentliche Inhalt
  // dieses Laufs: Bei TikTok und beim Google-Tag ist auf den gelesenen Seiten KEIN
  // noscript-Gegenstueck gefunden worden (Nicht-Treffer mit benannter Achse). Eine
  // erfundene Adresse dort waere genau der Fehltreffer, den P11.11-15 verbietet.
  it("F2: die Rueckfall-Adressen — drei belegte, zwei ausdruecklich leere", () => {
    expect(von("Meta").rueckfall).toEqual(["www.facebook.com/tr?"]);
    expect(von("Pinterest").rueckfall).toEqual(["ct.pinterest.com/v3/"]);
    expect(von("LinkedIn").rueckfall).toEqual(["px.ads.linkedin.com/collect/"]);
    expect(von("Google Tag Manager").rueckfall).toEqual([
      "googletagmanager.com/ns.html",
    ]);
    expect(von("TikTok").rueckfall).toEqual([]);
    expect(von("Google-Tag").rueckfall).toEqual([]);
  });

  // F3. DIE ZWEI GOOGLE-EINTRAEGE TRENNEN SICH AM PFAD, NICHT AM HOST. Der Host ist
  // bei beiden derselbe; eine Signatur allein auf `googletagmanager.com` koennte sie
  // nicht unterscheiden, und der Tag Manager bekaeme das Etikett eines Pixels.
  it("F3: Google-Tag und Tag Manager trennen sich am Pfad", () => {
    expect(von("Google-Tag").adressen[0]).toContain("/gtag/js");
    expect(von("Google Tag Manager").adressen[0]).toContain("/gtm.js");
    expect(von("Google-Tag").klasse).toBe("pixel");
    expect(von("Google Tag Manager").klasse).toBe("container");
  });

  // F4. DIE SECHS CMPs. CookieYes traegt BEIDE Hosts (P11.11-28) — die Doku des
  // Anbieters schreibt ihn auf DERSELBEN Seite einmal mit PUNKT und einmal mit
  // BINDESTRICH; beide sind belegt, keiner widerlegt.
  it("F4: die sechs CMPs, und CookieYes mit BEIDEN belegten Hosts", () => {
    expect(von("Cookiebot").adressen).toEqual(["consent.cookiebot.com/"]);
    expect(von("Usercentrics").adressen).toEqual(["app.usercentrics.eu/"]);
    expect(von("Klaro").adressen).toEqual(["cdn.kiprotect.com/klaro/"]);
    expect(von("OneTrust").adressen).toEqual(["cdn.cookielaw.org"]);
    expect(von("consentmanager").adressen).toEqual([
      "delivery.consentmanager.net",
      "cdn.consentmanager.net",
    ]);
    expect(von("CookieYes").adressen).toEqual([
      "cdn.cookieyes.com",
      "cdn-cookieyes.com",
    ]);

    for (const a of [
      "Cookiebot",
      "Usercentrics",
      "Klaro",
      "OneTrust",
      "consentmanager",
      "CookieYes",
    ]) {
      expect(von(a).klasse).toBe("cmp");
    }

    // DIE VERSIONSANGABE AUS DER ONETRUST-MESSUNG STEHT NICHT IN DER SIGNATUR. Sie
    // altert; tauglich ist der Host.
    expect(von("OneTrust").adressen.join(" ")).not.toContain("202602");
  });
});

describe("Signaturliste — Struktur", () => {
  // F5. OHNE BELEG KEINE SIGNATUR (P11.11-15). Dieser Lauf DARF die Liste lesen: er
  // prueft eine Eigenschaft, keinen Wortlaut.
  it("F5: jeder Eintrag traegt einen Beleg und mindestens ein Merkmal", () => {
    expect(FOREIGN_SIGNATURES.length).toBeGreaterThan(0);
    for (const s of FOREIGN_SIGNATURES) {
      expect(s.anbieter.trim()).not.toBe("");
      expect(s.beleg.trim()).not.toBe("");
      expect(s.adressen.length + s.namen.length).toBeGreaterThan(0);
    }
  });

  // F6. KEINE ADRESSE IN ZWEI EINTRAEGEN. Eine doppelte Adresse machte die
  // Klassenzuordnung mehrdeutig — derselbe Knoten waere Pixel UND Container, und
  // welche Marke gewaenne, haenge an der Sortierung der Liste.
  it("F6: keine Adresse und keine Rueckfall-Adresse kommt zweimal vor", () => {
    const alle = FOREIGN_SIGNATURES.flatMap((s) => [
      ...s.adressen,
      ...s.rueckfall,
    ]);
    expect(new Set(alle).size).toBe(alle.length);

    // UND KEINE IST PRAEFIX EINER ANDEREN: Die Erkennung arbeitet mit
    // Teilzeichenketten. Waere "googletagmanager.com" ein Eintrag und
    // "googletagmanager.com/gtm.js" ein zweiter, traefe der erste immer mit.
    for (const a of alle) {
      for (const b of alle) {
        if (a !== b) expect(b.includes(a)).toBe(false);
      }
    }
  });
});
