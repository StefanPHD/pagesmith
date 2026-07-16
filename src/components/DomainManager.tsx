"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addCustomDomain,
  checkDomainStatusAction,
  listProjectDomains,
  removeCustomDomainAction,
  type CustomDomainListItem,
} from "@/app/projects/domain-actions";
import type { DomainStatus } from "@/lib/domains/status";
import type { FineState } from "@/lib/domains/config";
import { REGISTRAR_TERMS } from "@/lib/domains/registrar-terms";

// Minimale Custom-Domain-UI (7c-2c): verdrahtet die bereits getesteten Server-Funktionen
// (addCustomDomain, checkDomainStatusAction, listProjectDomains) — bewusst KEINE Politur
// (kein Paging, keine Feature-Sortierung). Zeigt pro Domain die dynamischen DNS-
// Anweisungen (Apex -> A / Subdomain -> CNAME), einen abgeleiteten Fein-Zustand und einen
// Status-Refresh (Client-Cooldown 10s zusaetzlich zur tragenden Server-Cache-Bremse).

const AUTO_POLL_MS = 60_000; // Auto-Poll-Intervall; via Page Visibility API pausiert.
const COOLDOWN_MS = 10_000; // Client-Cooldown des manuellen "Status pruefen"-Buttons.

export default function DomainManager({ projectId }: { projectId: string | null }) {
  const [domains, setDomains] = useState<CustomDomainListItem[]>([]);
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  // "Laden fehlgeschlagen" — bewusst GETRENNT vom Leerzustand (domains.length===0):
  // "leer" und "kaputt" duerfen nicht gleich aussehen (das verbarg den id-Bug).
  const [loadError, setLoadError] = useState<string | null>(null);
  // Zaehler, den die Zeilen als Auto-Poll-Signal beobachten.
  const [pollTick, setPollTick] = useState(0);

  // Reload nach dem Hinzufuegen (Event-Handler-Kontext). setState erst nach await.
  const loadList = useCallback(async () => {
    if (!projectId) return;
    const res = await listProjectDomains(projectId);
    if (res.ok) {
      setDomains(res.domains);
      setLoadError(null);
    } else {
      setLoadError(res.error);
    }
  }, [projectId]);

  // Liste beim Projektwechsel (neu) laden. setState AUSSCHLIESSLICH nach await (kein
  // synchroner setState im Effekt); bei fehlendem projectId gar kein Load.
  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    void (async () => {
      const res = await listProjectDomains(projectId);
      if (cancelled) return;
      if (res.ok) {
        setDomains(res.domains);
        setLoadError(null);
      } else {
        setLoadError(res.error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // Auto-Poll: alle 60s ein Tick — aber NUR wenn der Tab sichtbar ist (Page Visibility
  // API). Ein unsichtbarer Tab erzeugt keinen Poll-Traffic.
  useEffect(() => {
    if (!projectId) return;
    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setPollTick((t) => t + 1);
    }, AUTO_POLL_MS);
    return () => clearInterval(id);
  }, [projectId]);

  async function handleAdd() {
    if (!projectId || !input.trim() || adding) return;
    setAdding(true);
    setAddError(null);
    const res = await addCustomDomain(projectId, input);
    setAdding(false);
    if (res.ok) {
      setInput("");
      await loadList();
    } else {
      setAddError(res.error);
    }
  }

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <h2 className="mb-1 text-sm font-medium text-gray-700">
        Eigene Domain verbinden
      </h2>
      <p className="mb-3 text-xs text-gray-500">
        Verbinde eine eigene Domain. Trage danach die angezeigten DNS-Einträge bei
        deinem Domain-Anbieter ein — die Seite geht automatisch live, sobald sie greifen.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!projectId || adding}
          placeholder="z. B. angebot.meine-domain.de"
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!projectId || !input.trim() || adding}
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {adding ? "Füge hinzu…" : "Domain hinzufügen"}
        </button>
      </div>
      {!projectId && (
        <p className="mt-2 text-xs text-gray-500">
          Erst speichern, dann ist eine Domain verbindbar.
        </p>
      )}
      {addError && <p className="mt-2 text-xs text-red-600">{addError}</p>}

      {/* "kaputt" != "leer": eigener Fehlerzustand, optisch getrennt vom Leerfall. */}
      {loadError && (
        <p className="mt-3 text-xs text-red-600">
          {loadError} — bitte lade die Seite neu.
        </p>
      )}

      {domains.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3">
          {domains.map((d) => (
            <DomainRow
              key={d.label}
              domain={d}
              pollTick={pollTick}
              onChanged={loadList}
            />
          ))}
        </ul>
      )}

      {domains.length > 0 && <RegistrarHelp />}
    </div>
  );
}

// --- Eine Domain-Zeile: Status + DNS-Anweisungen -------------------------------------

function DomainRow({
  domain,
  pollTick,
  onChanged,
}: {
  domain: CustomDomainListItem;
  pollTick: number;
  onChanged: () => void | Promise<void>;
}) {
  const [status, setStatus] = useState<DomainStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  // Zweistufige Inline-Bestaetigung (destruktiv, kein window.confirm).
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);

  async function handleRemove() {
    setRemoving(true);
    setRemoveError(null);
    const res = await removeCustomDomainAction(domain.label);
    if (res.ok) {
      // Zeile verschwindet ueber den Parent-Reload -> kein lokaler setState danach noetig.
      await onChanged();
    } else {
      setRemoving(false);
      setConfirming(false);
      setRemoveError(res.error);
    }
  }

  // Initial + bei jedem Auto-Poll-Tick aktualisieren (die Server-Cache-Bremse verhindert
  // dabei ueberzaehlige Vercel-Calls, unabhaengig vom Tab/Client). setState AUSSCHLIESSLICH
  // nach await -> kein synchroner setState im Effekt. Das Lade-Flag (setChecking) gehoert
  // in den manuellen Button (Event-Handler), nicht in den Auto-Refresh.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await checkDomainStatusAction(domain.label);
      if (!cancelled && res.ok) setStatus(res.status);
    })();
    return () => {
      cancelled = true;
    };
  }, [domain.label, pollTick]);

  // Cooldown herunterzaehlen.
  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    };
  }, []);

  function handleManualCheck() {
    if (checking || cooldownLeft > 0) return;
    setChecking(true);
    void checkDomainStatusAction(domain.label).then((res) => {
      setChecking(false);
      if (res.ok) setStatus(res.status);
    });
    let left = COOLDOWN_MS;
    setCooldownLeft(left);
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    cooldownTimer.current = setInterval(() => {
      left -= 1000;
      if (left <= 0) {
        setCooldownLeft(0);
        if (cooldownTimer.current) clearInterval(cooldownTimer.current);
      } else {
        setCooldownLeft(left);
      }
    }, 1000);
  }

  const badge = statusBadge(domain.verificationStatus, status?.fineState);

  return (
    <li className="rounded-lg border border-gray-200 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="break-all text-sm font-medium text-gray-800">
          {domain.host}
        </span>
        <span className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs ${badge.className}`}>
            {badge.label}
          </span>
          <button
            type="button"
            onClick={handleManualCheck}
            disabled={checking || cooldownLeft > 0}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checking
              ? "Prüfe…"
              : cooldownLeft > 0
                ? `Status prüfen (${Math.ceil(cooldownLeft / 1000)}s)`
                : "Status prüfen"}
          </button>
          {!confirming && (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              disabled={removing}
              className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Entfernen
            </button>
          )}
        </span>
      </div>

      {/* Zweistufige Bestaetigung — destruktive Aktion. */}
      {confirming && (
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
          <span className="text-xs text-red-700">
            Domain wirklich entfernen? Sie wird bei Vercel gelöscht.
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {removing ? "Entferne…" : "Ja, entfernen"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={removing}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Abbrechen
          </button>
        </div>
      )}
      {removeError && <p className="mt-2 text-xs text-red-600">{removeError}</p>}

      {status && (
        <>
          <StatusMessage status={status} />
          {status.fineState !== "live" && <DnsInstructions status={status} />}
          {status.refreshFailed && (
            <p className="mt-2 text-xs text-amber-600">
              Konnte gerade nicht bei Vercel prüfen — angezeigt ist der letzte bekannte
              Stand.
            </p>
          )}
        </>
      )}
    </li>
  );
}

// --- Fein-Zustand-Meldung (Support-Praevention: sagt, was zu TUN ist) ----------------

function StatusMessage({ status }: { status: DomainStatus }) {
  if (status.fineState === "live") {
    return (
      <p className="mt-2 text-xs text-green-700">
        ✓ Live — DNS korrekt, TLS-Zertifikat aktiv. Nichts weiter zu tun.
      </p>
    );
  }
  if (status.fineState === "proxy_detected") {
    return (
      <p className="mt-2 text-xs text-amber-700">
        Deine Domain läuft über einen Proxy/CDN (z. B. Cloudflare). Schalte den Proxy
        (orange Wolke) auf „DNS only“ / grau, damit das Zertifikat ausgestellt werden
        kann.
      </p>
    );
  }
  if (status.fineState === "wrong_record") {
    const seenParts: string[] = [];
    if (status.seen.a.length) seenParts.push(`A → ${status.seen.a.join(", ")}`);
    if (status.seen.cname.length)
      seenParts.push(`CNAME → ${status.seen.cname.join(", ")}`);
    return (
      <p className="mt-2 text-xs text-red-600">
        Wir sehen bereits einen DNS-Eintrag, aber er zeigt nicht auf uns
        {seenParts.length ? ` (aktuell: ${seenParts.join("; ")})` : ""}. Bitte
        korrigiere/lösche ihn und trage stattdessen den unten stehenden Wert ein.
      </p>
    );
  }
  // waiting_dns
  return (
    <p className="mt-2 text-xs text-gray-600">
      Trage die unten stehenden Einträge bei deinem Domain-Anbieter ein. Sobald sie sich
      verbreitet haben (kann bis zu einer Stunde dauern), wird die Domain automatisch
      live.
    </p>
  );
}

// --- DNS-Anweisungen (dynamisch aus Vercels Empfehlung, NIE hardcoded) ---------------

function DnsInstructions({ status }: { status: DomainStatus }) {
  const { dns, recordName } = status;
  if (dns.type === "none") {
    return (
      <p className="mt-2 text-xs text-gray-500">
        Noch keine DNS-Empfehlung von Vercel verfügbar — bitte in Kürze erneut „Status
        prüfen“.
      </p>
    );
  }
  const rows =
    dns.type === "A"
      ? dns.values.map((v) => ({ type: "A", name: recordName, value: v }))
      : [{ type: "CNAME", name: recordName, value: dns.value }];

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-gray-500">
            <th className="pb-1 pr-3 font-medium">Typ</th>
            <th className="pb-1 pr-3 font-medium">Name / Host</th>
            <th className="pb-1 font-medium">Wert / Ziel</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-middle">
              <td className="py-1 pr-3 font-mono text-gray-800">{r.type}</td>
              <td className="py-1 pr-3">
                <CopyValue value={r.name} />
              </td>
              <td className="py-1">
                <CopyValue value={r.value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Copy-Button: trimmt NUR Whitespace (Trailing-Dot eines FQDN bleibt erhalten) ----

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    // .trim() entfernt nur fuehrende/folgende Leerzeichen (eine reale, schwer
    // auffindbare Fehlerquelle) — den Trailing-Dot eines FQDN NICHT (er ist Teil des
    // Werts, den manche Registrare erwarten).
    const clean = value.trim();
    try {
      await navigator.clipboard?.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard nicht verfuegbar -> stiller No-Op (der Wert ist sichtbar/markierbar).
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      title="Kopieren"
      className="inline-flex items-center gap-1 rounded border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-gray-800 hover:bg-gray-100"
    >
      <span className="break-all">{value}</span>
      <span className="text-gray-400">{copied ? "✓" : "⧉"}</span>
    </button>
  );
}

// --- Registrar-Terminologie-Hilfe (statisch, kein Live-Bezug) ------------------------

function RegistrarHelp() {
  return (
    <details className="mt-4 text-xs text-gray-600">
      <summary className="cursor-pointer text-gray-500">
        Andere Bezeichnungen bei deinem Anbieter?
      </summary>
      <table className="mt-2 w-full text-left">
        <tbody>
          {REGISTRAR_TERMS.map((t) => (
            <tr key={t.concept} className="align-top">
              <td className="py-1 pr-3 font-medium text-gray-700">{t.concept}</td>
              <td className="py-1">
                {t.aliases.join(" · ")}
                {t.note && <span className="block text-gray-400">{t.note}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

// --- Badge-Ableitung -----------------------------------------------------------------

function statusBadge(
  grob: CustomDomainListItem["verificationStatus"],
  fine: FineState | undefined,
): { label: string; className: string } {
  if (fine === "live" || grob === "verified") {
    return { label: "Live", className: "bg-green-100 text-green-800" };
  }
  if (fine === "wrong_record" || fine === "proxy_detected" || grob === "misconfigured") {
    return { label: "Aktion nötig", className: "bg-red-100 text-red-800" };
  }
  return { label: "Wartet auf DNS", className: "bg-gray-100 text-gray-700" };
}
