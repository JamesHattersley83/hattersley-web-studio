import { TIME_CATEGORIES } from "./constants";
import { isEffectivelyOverdue } from "./format";
import type {
  Invoice,
  InvoiceStatus,
  ProjectPhase,
  TimeCategory,
  TimeEntry,
} from "./types";

/** Percentage of phases marked done (0..100). */
export function phaseProgress(phases: ProjectPhase[]): number {
  if (phases.length === 0) return 0;
  const done = phases.filter((p) => p.status === "done").length;
  return Math.round((done / phases.length) * 100);
}

/** Sum of hours across entries. */
export function totalHours(entries: TimeEntry[]): number {
  return round2(entries.reduce((sum, e) => sum + Number(e.hours), 0));
}

export function billableHours(entries: TimeEntry[]): number {
  return round2(
    entries.filter((e) => e.billable).reduce((s, e) => s + Number(e.hours), 0),
  );
}

export function nonBillableHours(entries: TimeEntry[]): number {
  return round2(
    entries.filter((e) => !e.billable).reduce((s, e) => s + Number(e.hours), 0),
  );
}

/** Hours grouped by category, ordered by the canonical category list. */
export function hoursByCategory(
  entries: TimeEntry[],
): { category: TimeCategory; label: string; color: string; hours: number }[] {
  return TIME_CATEGORIES.map((c) => ({
    category: c.value,
    label: c.label,
    color: c.color,
    hours: round2(
      entries
        .filter((e) => e.category === c.value)
        .reduce((s, e) => s + Number(e.hours), 0),
    ),
  })).filter((c) => c.hours > 0);
}

/** The status an invoice should *display* as (flips sent→overdue past due). */
export function effectiveInvoiceStatus(inv: Invoice): InvoiceStatus {
  return isEffectivelyOverdue(inv.status, inv.due_date) ? "overdue" : inv.status;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
