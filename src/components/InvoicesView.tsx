"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";
import { StatusBadge } from "./ui";
import { INVOICE_STATUSES, labelFor, toneFor } from "@/lib/constants";
import { effectiveInvoiceStatus } from "@/lib/derive";
import { formatCurrency, formatDate } from "@/lib/format";
import { updateInvoiceStatus } from "@/lib/actions";
import type { Invoice, InvoiceStatus } from "@/lib/types";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent / Due" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
];

export function InvoicesView({
  invoices,
  clientName,
}: {
  invoices: Invoice[];
  clientName: Record<string, string>;
}) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      invoices.map((inv) => ({
        inv,
        eff: effectiveInvoiceStatus(inv),
        client: inv.project_id ? clientName[inv.project_id] ?? "—" : "—",
      })),
    [invoices, clientName],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(({ inv, eff, client }) => {
      if (filter !== "all" && eff !== filter) return false;
      if (!q) return true;
      return (
        client.toLowerCase().includes(q) ||
        inv.invoice_number.toLowerCase().includes(q) ||
        (inv.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, filter, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: rows.length };
    for (const r of rows) map[r.eff] = (map[r.eff] ?? 0) + 1;
    return map;
  }, [rows]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`chip ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-muted hover:border-brand/40 hover:text-navy"
                }`}
              >
                {f.label}
                <span className={`ml-1.5 ${active ? "text-white/80" : "text-muted/70"}`}>
                  {counts[f.value] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative ml-auto min-w-[200px] flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <SearchIcon size={16} />
          </span>
          <input
            className="input pl-9"
            placeholder="Search invoices…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold">Invoice</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Issued</th>
                <th className="px-4 py-3 font-semibold">Due</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Amount</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted">
                    No invoices match.
                  </td>
                </tr>
              )}
              {filtered.map(({ inv, eff, client }) => (
                <tr key={inv.id} className="align-top">
                  <td className="px-4 py-3 font-semibold text-navy">{client}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-muted">
                    {inv.invoice_number}
                  </td>
                  <td className="px-4 py-3 text-muted">{inv.description ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {formatDate(inv.issue_date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {formatDate(inv.due_date)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={labelFor(INVOICE_STATUSES, eff)}
                      tone={toneFor(INVOICE_STATUSES, eff)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-navy">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <InvoiceStatusControl invoice={inv} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InvoiceStatusControl({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setStatus(next: InvoiceStatus) {
    const fd = new FormData();
    fd.set("id", invoice.id);
    fd.set("status", next);
    startTransition(async () => {
      await updateInvoiceStatus(fd);
      router.refresh();
    });
  }

  return (
    <select
      aria-label="Update invoice status"
      value={invoice.status}
      disabled={pending}
      onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
      className="rounded-md border border-line bg-white px-2 py-1 text-xs text-muted focus:border-brand focus:outline-none"
    >
      <option value="draft">Draft</option>
      <option value="sent">Mark sent</option>
      <option value="paid">Mark paid</option>
      <option value="overdue">Overdue</option>
    </select>
  );
}
