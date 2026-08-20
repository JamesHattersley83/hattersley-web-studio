import Link from "next/link";
import {
  getInvoices,
  getLeads,
  getAllPhases,
  getProjects,
  getTimeEntries,
} from "@/lib/queries";
import {
  effectiveInvoiceStatus,
  phaseProgress,
  totalHours,
} from "@/lib/derive";
import {
  INVOICE_STATUSES,
  PIPELINE_STAGES,
  PROJECT_STATUSES,
  labelFor,
  toneFor,
} from "@/lib/constants";
import {
  formatCurrency,
  formatDateShort,
  formatHours,
  toISODate,
} from "@/lib/format";
import {
  BusinessUnitTag,
  PageHeader,
  ProgressBar,
  SectionHeader,
  StatCard,
  StatusBadge,
  EmptyState,
} from "@/components/ui";
import {
  ArrowRightIcon,
  FolderIcon,
  InvoiceIcon,
  PoundIcon,
  TimeIcon,
} from "@/components/icons";
import type { TimeEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

const OPEN_STAGES = ["new", "contacted", "proposal_sent", "contract_signed"];
const ACTIVE_STATUSES = ["proposal", "active", "awaiting_content", "on_hold"];

export default async function DashboardPage() {
  const now = new Date();
  const monthStart = toISODate(new Date(now.getFullYear(), now.getMonth(), 1));

  const [leads, projects, phases, invoices, monthEntries, recentEntries] =
    await Promise.all([
      getLeads(),
      getProjects(),
      getAllPhases(),
      getInvoices(),
      getTimeEntries({ from: monthStart }),
      getTimeEntries({ limit: 5 }),
    ]);

  const activeProjects = projects.filter((p) =>
    ACTIVE_STATUSES.includes(p.status),
  );

  const pipelineValue = leads
    .filter((l) => OPEN_STAGES.includes(l.stage))
    .reduce((s, l) => s + (l.estimated_value ?? 0), 0);

  const hoursThisMonth = totalHours(monthEntries);

  const outstanding = invoices.filter((i) =>
    ["sent", "overdue"].includes(effectiveInvoiceStatus(i)),
  );
  const outstandingTotal = outstanding.reduce((s, i) => s + i.amount, 0);

  const projectById = new Map(projects.map((p) => [p.id, p]));
  const phasesByProject = new Map<string, typeof phases>();
  for (const ph of phases) {
    const arr = phasesByProject.get(ph.project_id) ?? [];
    arr.push(ph);
    phasesByProject.set(ph.project_id, arr);
  }
  const hoursByProject = new Map<string, number>();
  for (const e of monthEntries) {
    if (!e.project_id) continue;
    hoursByProject.set(
      e.project_id,
      (hoursByProject.get(e.project_id) ?? 0) + Number(e.hours),
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your studio at a glance — leads, projects, hours and invoices."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Projects"
          value={activeProjects.length}
          sub={`${projects.length} total`}
          icon={<FolderIcon size={20} />}
          tone="blue"
        />
        <StatCard
          label="Hours This Month"
          value={formatHours(hoursThisMonth)}
          sub={now.toLocaleDateString("en-GB", { month: "long" })}
          icon={<TimeIcon size={20} />}
          tone="green"
        />
        <StatCard
          label="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          sub={`${leads.filter((l) => OPEN_STAGES.includes(l.stage)).length} open leads`}
          icon={<PoundIcon size={20} />}
          tone="amber"
        />
        <StatCard
          label="Outstanding Invoices"
          value={formatCurrency(outstandingTotal)}
          sub={`${outstanding.length} unpaid`}
          icon={<InvoiceIcon size={20} />}
          tone={outstanding.length ? "red" : "slate"}
        />
      </div>

      {/* Pipeline rail */}
      <div className="mt-8">
        <SectionHeader
          title="Lead Pipeline"
          action={
            <Link href="/leads" className="text-sm font-semibold text-brand hover:underline">
              View all leads
            </Link>
          }
        />
        <div className="card rail-scroll overflow-x-auto p-4">
          <div className="flex min-w-max gap-3">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = leads.filter((l) => l.stage === stage.value);
              const value = stageLeads.reduce(
                (s, l) => s + (l.estimated_value ?? 0),
                0,
              );
              return (
                <div key={stage.value} className="w-56 shrink-0">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {stage.label}
                    </span>
                    <span className="rounded-full bg-canvas px-2 py-0.5 text-xs font-semibold text-muted">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {stageLeads.length === 0 && (
                      <div className="rounded-lg border border-dashed border-line px-3 py-4 text-center text-xs text-muted/70">
                        No leads
                      </div>
                    )}
                    {stageLeads.map((l) => (
                      <Link
                        key={l.id}
                        href="/leads"
                        className="block rounded-lg border border-line bg-canvas/60 p-3 transition-colors hover:border-brand/40 hover:bg-white"
                      >
                        <p className="truncate text-sm font-semibold text-navy">
                          {l.business_name}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {formatCurrency(l.estimated_value)}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {value > 0 && (
                    <p className="mt-2 px-1 text-xs text-muted">
                      {formatCurrency(value)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active projects + right column */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader
            title="Active Projects"
            action={
              <Link href="/projects" className="text-sm font-semibold text-brand hover:underline">
                All projects
              </Link>
            }
          />
          {activeProjects.length === 0 ? (
            <div className="card">
              <EmptyState
                title="No active projects"
                message="Convert a won lead or add a project to get started."
                icon={<FolderIcon size={28} />}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {activeProjects.map((p) => {
                const pPhases = phasesByProject.get(p.id) ?? [];
                const progress = phaseProgress(pPhases);
                return (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="card block p-5 transition-shadow hover:shadow-raised"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-heading font-semibold text-navy">
                          {p.client_name}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {p.project_type ?? "—"}
                        </p>
                      </div>
                      <StatusBadge
                        label={labelFor(PROJECT_STATUSES, p.status)}
                        tone={toneFor(PROJECT_STATUSES, p.status)}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-xs text-muted">
                        <span>{progress}% complete</span>
                        <span>{formatHours(hoursByProject.get(p.id) ?? 0)} this month</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <BusinessUnitTag unit={p.business_unit} />
                      {p.next_milestone && (
                        <span className="truncate text-xs text-muted">
                          Next: {p.next_milestone}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Recent time entries */}
          <div className="mt-8">
            <SectionHeader
              title="Recent Time Entries"
              action={
                <Link href="/time" className="text-sm font-semibold text-brand hover:underline">
                  Time log
                </Link>
              }
            />
            <div className="card overflow-hidden">
              {recentEntries.length === 0 ? (
                <EmptyState title="No time logged yet" icon={<TimeIcon size={28} />} />
              ) : (
                <RecentEntriesTable
                  entries={recentEntries}
                  projectName={(id) => projectById.get(id ?? "")?.client_name ?? "No project"}
                />
              )}
            </div>
          </div>
        </div>

        {/* Invoices panel */}
        <div>
          <SectionHeader
            title="Invoices"
            action={
              <Link href="/invoices" className="text-sm font-semibold text-brand hover:underline">
                All
              </Link>
            }
          />
          <div className="card divide-y divide-line">
            {invoices.slice(0, 6).length === 0 && (
              <EmptyState title="No invoices yet" icon={<InvoiceIcon size={28} />} />
            )}
            {invoices.slice(0, 6).map((inv) => {
              const eff = effectiveInvoiceStatus(inv);
              return (
                <div key={inv.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">
                      {projectById.get(inv.project_id ?? "")?.client_name ?? "—"}
                    </p>
                    <p className="text-xs text-muted">
                      {inv.invoice_number} · due {formatDateShort(inv.due_date)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-navy">
                      {formatCurrency(inv.amount)}
                    </span>
                    <StatusBadge
                      label={labelFor(INVOICE_STATUSES, eff)}
                      tone={toneFor(INVOICE_STATUSES, eff)}
                      dot={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function RecentEntriesTable({
  entries,
  projectName,
}: {
  entries: TimeEntry[];
  projectName: (id: string | null) => string;
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
          <th className="px-4 py-3 font-semibold">Date</th>
          <th className="px-4 py-3 font-semibold">Project</th>
          <th className="px-4 py-3 font-semibold">Task</th>
          <th className="px-4 py-3 text-right font-semibold">Hours</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {entries.map((e) => (
          <tr key={e.id}>
            <td className="whitespace-nowrap px-4 py-3 text-muted">
              {formatDateShort(e.entry_date)}
            </td>
            <td className="px-4 py-3 font-medium text-navy">{projectName(e.project_id)}</td>
            <td className="px-4 py-3 text-muted">{e.task_description}</td>
            <td className="px-4 py-3 text-right font-semibold text-navy">
              {formatHours(Number(e.hours))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
