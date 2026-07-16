import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

// Server-Actions durch Spies ersetzen (verhindert das Laden des echten server-only-Codes).
const { addCustomDomain, checkDomainStatusAction, listProjectDomains } = vi.hoisted(
  () => ({
    addCustomDomain: vi.fn(),
    checkDomainStatusAction: vi.fn(),
    listProjectDomains: vi.fn(),
  }),
);
vi.mock("@/app/projects/domain-actions", () => ({
  addCustomDomain,
  checkDomainStatusAction,
  listProjectDomains,
}));

import DomainManager from "@/components/DomainManager";

const writeText = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function statusStub(over: Record<string, unknown>) {
  return {
    ok: true as const,
    status: {
      label: "kunde-de-abc",
      host: "kunde.de",
      isApex: true,
      recordName: "@",
      fineState: "waiting_dns",
      grobStatus: "pending",
      dns: { type: "none" },
      seen: { a: [], cname: [] },
      syncedAt: null,
      fromCache: false,
      refreshFailed: false,
      ...over,
    },
  };
}

describe("DomainManager (7c-2c)", () => {
  it("Multi-IP: recommendedIPv4 mit 2 rank-1-Werten -> BEIDE A-Records gerendert, nicht nur der erste", async () => {
    listProjectDomains.mockResolvedValue({
      ok: true,
      domains: [
        { label: "kunde-de-abc", host: "kunde.de", verificationStatus: "pending", syncedAt: null },
      ],
    });
    checkDomainStatusAction.mockResolvedValue(
      statusStub({
        isApex: true,
        recordName: "@",
        dns: { type: "A", values: ["216.198.79.1", "64.29.17.1"] },
      }),
    );

    render(<DomainManager projectId="proj-1" />);

    expect(await screen.findByText("216.198.79.1")).toBeTruthy();
    expect(screen.getByText("64.29.17.1")).toBeTruthy(); // der zweite, nicht verschluckt
  });

  it("Copy-Button: Wert mit fuehrendem/folgendem Leerzeichen -> Clipboard erhaelt getrimmten Wert (Trailing-Dot bleibt)", async () => {
    listProjectDomains.mockResolvedValue({
      ok: true,
      domains: [
        {
          label: "www-kunde-de-abc",
          host: "www.kunde.de",
          verificationStatus: "pending",
          syncedAt: null,
        },
      ],
    });
    checkDomainStatusAction.mockResolvedValue(
      statusStub({
        host: "www.kunde.de",
        isApex: false,
        recordName: "www",
        dns: { type: "CNAME", value: "  cname.vercel-dns.com.  " },
      }),
    );

    render(<DomainManager projectId="proj-1" />);

    const btn = await screen.findByRole("button", {
      name: /cname\.vercel-dns\.com/,
    });
    fireEvent.click(btn);

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    // Nur Whitespace getrimmt — der FQDN-Trailing-Dot bleibt erhalten.
    expect(writeText).toHaveBeenCalledWith("cname.vercel-dns.com.");
  });

  it("kein projectId -> Add-Feld deaktiviert, keine Liste geladen", async () => {
    render(<DomainManager projectId={null} />);
    expect(listProjectDomains).not.toHaveBeenCalled();
    expect(
      screen.getByPlaceholderText(/meine-domain/i).hasAttribute("disabled"),
    ).toBe(true);
  });

  it("ruft checkDomainStatusAction mit domain.label auf (nicht undefined) — Regression falls wieder .id", async () => {
    listProjectDomains.mockResolvedValue({
      ok: true,
      domains: [
        { label: "kunde-de-abc", host: "kunde.de", verificationStatus: "pending", syncedAt: null },
      ],
    });
    checkDomainStatusAction.mockResolvedValue(statusStub({}));

    render(<DomainManager projectId="proj-1" />);

    await waitFor(() => expect(checkDomainStatusAction).toHaveBeenCalled());
    // Wuerde bei Rueckfall auf domain.id mit `undefined` aufgerufen -> rot.
    expect(checkDomainStatusAction).toHaveBeenCalledWith("kunde-de-abc");
  });

  it("listProjectDomains { ok:false } -> zeigt 'Laden fehlgeschlagen', nicht leere Liste", async () => {
    listProjectDomains.mockResolvedValue({
      ok: false,
      error: "Domains konnten nicht geladen werden.",
    });

    render(<DomainManager projectId="proj-1" />);

    expect(
      await screen.findByText(/Domains konnten nicht geladen werden/),
    ).toBeTruthy();
    // Kein Domain-Status-Call, weil keine Zeile gerendert wurde.
    expect(checkDomainStatusAction).not.toHaveBeenCalled();
  });
});
