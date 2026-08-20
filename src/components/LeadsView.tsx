"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./icons";
import { StatusBadge, BusinessUnitTag } from "./ui";
import { ConvertLeadButton } from "./forms/ConvertLeadForm";
import { LEAD_STAGES, labelFor, toneFor } from "@/lib/constants";
import { formatCurrency, formatDate, daysUntil } from "@/lib/format";
import { updateLeadStage } from "@/lib/actions";
import type { Lead, LeadStage } from "@/lib/types";

const FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "contract_signed", label: "Signed" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export function LeadsView({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter !== "all" && l.stage !== filter) return false;
      if (!q) return true;
      return (
        l.business_name.toLowerCase().includes(q) ||
        (l.contact_name ?? "").toLowerCase().includes(q) ||
        (l.source ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, filter, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: leads.length };
    for (const l of leads) map[l.stage] = (map[l.stage] ?? 0) + 1;
    return map;
  }, [leads]);

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
            placeholder="Search leads…"
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
                <th className="px-4 py-3 font-semibold">Business</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 text-right font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Next Action</th>
                <th className="px-4 py-3 font-semibold">Due</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted">
                    No leads match.
                  </td>
                </tr>
              )}
              {filtered.map((l) => (
                <LeadRow key={l.id} lead={l} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const due = daysUntil(lead.next_action_date);
  const overdue = due != null && due < 0 && !["won", "lost"].includes(lead.stage);
  const soon = due != null && due >= 0 && due <= 3;

  return (
    <tr className="align-top">
      <td className="px-4 py-3">
        <p className="font-semibold text-navy">{lead.business_name}</p>
        <p className="text-xs text-muted">{lead.contact_name ?? "—"}</p>
        <div className="mt-1">
          <BusinessUnitTag unit={lead.business_unit} />
        </div>
      </td>
      <td className="px-4 py-3">
        <StageSelect lead={lead} />
        {lead.stage === "lost" && lead.lost_reason && (
          <p className="mt-1 max-w-[160px] text-xs text-muted">{lead.lost_reason}</p>
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-navy">
        {formatCurrency(lead.estimated_value)}
      </td>
      <td className="px-4 py-3 capitalize text-muted">
        {lead.source?.replace(/_/g, " ") ?? "—"}
      </td>
      <td className="px-4 py-3 text-muted">{lead.next_action ?? "—"}</td>
      <td className="whitespace-nowrap px-4 py-3">
        {lead.next_action_date ? (
          <span
            className={
              overdue
                ? "font-semibold text-status-red"
                : soon
                  ? "font-semibold text-status-amber"
                  : "text-muted"
            }
          >
            {formatDate(lead.next_action_date)}
          </span>
        ) : (
          <span className="text-muted">—</span>
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        {["contacted", "proposal_sent", "contract_signed"].includes(lead.stage) && (
          <ConvertLeadButton lead={lead} />
        )}
      </td>
    </tr>
  );
}

function StageSelect({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onChange(next: LeadStage) {
    if (next === lead.stage) return;
    const fd = new FormData();
    fd.set("id", lead.id);
    fd.set("stage", next);
    if (next === "lost") {
      const reason = window.prompt("Reason for losing this lead?") ?? "";
      fd.set("lost_reason", reason);
    }
    startTransition(async () => {
      await updateLeadStage(fd);
      router.refresh();
    });
  }

  const tone = toneFor(LEAD_STAGES, lead.stage);
  return (
    <div className="flex items-center gap-2">
      <StatusBadge label={labelFor(LEAD_STAGES, lead.stage)} tone={tone} />
      <select
        aria-label="Change stage"
        value={lead.stage}
        disabled={pending}
        onChange={(e) => onChange(e.target.value as LeadStage)}
        className="rounded-md border border-line bg-white px-1.5 py-1 text-xs text-muted focus:border-brand focus:outline-none"
      >
        {LEAD_STAGES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
