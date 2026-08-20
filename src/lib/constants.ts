import type {
  BusinessUnit,
  InvoiceStatus,
  LeadStage,
  PhaseStatus,
  PricingModel,
  ProjectStatus,
  TimeCategory,
} from "./types";

type Tone = "green" | "amber" | "slate" | "red" | "blue";

export const BUSINESS_UNITS: { value: BusinessUnit; label: string; short: string }[] = [
  { value: "web_studio", label: "Hattersley Web Studio", short: "Web Studio" },
  { value: "cad_services", label: "Hattersley CAD Services", short: "CAD Services" },
];

export function businessUnitLabel(bu: BusinessUnit, short = true): string {
  const found = BUSINESS_UNITS.find((b) => b.value === bu);
  if (!found) return bu;
  return short ? found.short : found.label;
}

export const LEAD_STAGES: { value: LeadStage; label: string; tone: Tone }[] = [
  { value: "new", label: "New", tone: "blue" },
  { value: "contacted", label: "Contacted", tone: "slate" },
  { value: "proposal_sent", label: "Proposal Sent", tone: "amber" },
  { value: "contract_signed", label: "Contract Signed", tone: "blue" },
  { value: "won", label: "Won", tone: "green" },
  { value: "lost", label: "Lost", tone: "red" },
];

// The horizontal pipeline rail on the dashboard (excludes won/lost).
export const PIPELINE_STAGES: { value: LeadStage; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "contract_signed", label: "Contract Signed" },
];

export const PROJECT_STATUSES: { value: ProjectStatus; label: string; tone: Tone }[] = [
  { value: "proposal", label: "Proposal", tone: "slate" },
  { value: "active", label: "Active", tone: "blue" },
  { value: "awaiting_content", label: "Awaiting Content", tone: "amber" },
  { value: "on_hold", label: "On Hold", tone: "amber" },
  { value: "complete", label: "Complete", tone: "green" },
];

export const PRICING_MODELS: { value: PricingModel; label: string }[] = [
  { value: "fixed", label: "Fixed fee" },
  { value: "hourly", label: "Hourly" },
  { value: "retainer", label: "Retainer" },
];

export const PHASE_STATUSES: { value: PhaseStatus; label: string; tone: Tone }[] = [
  { value: "todo", label: "To do", tone: "slate" },
  { value: "active", label: "Active", tone: "blue" },
  { value: "done", label: "Done", tone: "green" },
  { value: "blocked", label: "Blocked", tone: "red" },
];

export const TIME_CATEGORIES: { value: TimeCategory; label: string; color: string }[] = [
  { value: "design", label: "Design", color: "#0096FF" },
  { value: "dev", label: "Dev", color: "#001E3C" },
  { value: "seo", label: "SEO", color: "#1F8A5F" },
  { value: "admin", label: "Admin", color: "#5B6B7D" },
  { value: "client_comms", label: "Client Comms", color: "#B87A16" },
];

export function timeCategoryMeta(cat: TimeCategory) {
  return TIME_CATEGORIES.find((c) => c.value === cat) ?? TIME_CATEGORIES[1];
}

export const INVOICE_STATUSES: { value: InvoiceStatus; label: string; tone: Tone }[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "sent", label: "Sent", tone: "amber" },
  { value: "paid", label: "Paid", tone: "green" },
  { value: "overdue", label: "Overdue", tone: "red" },
];

export const LEAD_SOURCES = [
  "referral",
  "cold_outreach",
  "gbp",
  "facebook",
  "direct",
  "other",
];

export function labelFor<T extends string>(
  list: { value: T; label: string }[],
  value: T | null | undefined,
): string {
  if (!value) return "—";
  return list.find((i) => i.value === value)?.label ?? value;
}

export function toneFor(
  list: { value: string; tone: Tone }[],
  value: string,
): Tone {
  return list.find((i) => i.value === value)?.tone ?? "slate";
}
