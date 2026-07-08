import { afterEach, describe, expect, it } from "vitest";
import { getCapiProxyUrl } from "./proxy";

const ORIGINAL = process.env.NEXT_PUBLIC_APP_URL;

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL;
});

describe("getCapiProxyUrl", () => {
  it("bildet die ABSOLUTE /api/e-URL aus NEXT_PUBLIC_APP_URL (7b-Trichter)", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pagesmith.io";
    expect(getCapiProxyUrl()).toBe("https://app.pagesmith.io/api/e");
  });

  it("normalisiert trailing slashes der Basis", () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000/";
    expect(getCapiProxyUrl()).toBe("http://localhost:3000/api/e");
  });

  it("FAIL-LOUD: fehlt die env -> '' (KEIN relativer Fallback)", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    expect(getCapiProxyUrl()).toBe("");
  });

  it("FAIL-LOUD: leere/whitespace env -> '' (KEIN relativer Fallback)", () => {
    process.env.NEXT_PUBLIC_APP_URL = "   ";
    expect(getCapiProxyUrl()).toBe("");
  });
});
