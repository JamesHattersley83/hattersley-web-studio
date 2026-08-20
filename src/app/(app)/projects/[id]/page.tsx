import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getInvoices,
  getPhases,
  getProject,
  getProjects,
  getRenewals,
  getTimeEntries,
} from "@/lib/queries";
import {
  effectiveInvoiceStatus,
  hoursByCategory,
  phaseProgress,
  totalHours,
} from "@/lib/derive";
import {
  INVOICE_STATUSES,
  PRICING_MODELS,
  PROJECT_STATUSES,
  labelFor,
  toneFor,
} from "@/lib/constants";
import {
  formatCurrency,
  formatDate,
  formatDateShort,
  formatHours,
  initials,
} from "@/lib/format";
import {
  BusinessUnitTag,
  ProgressBar,
  SectionHeader,
  StatusBadge,
} from "@/components/ui";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  MailIcon,
} from "@/components/icons";
import { PhaseChecklist } from "@/components/PhaseChecklist";
import { HoursDonut } from "@/components/HoursDonut";
import { LogTimeButton } from "@/components/forms/TimeEntryForm";
import { NewInvoiceButton } from "@/components/forms/InvoiceForm";
import { ProjectFormButton } from "@/components/forms/ProjectForm";

export const dynamic = "force-dynamic";

type ActivityItem = {
  date: string;
  kind: "time" | "phase";
  title: string;
  detail: string;
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);
  if (!project) notFound();

  const [phases, entries, allInvoices, renewals, allProjects] = await Promise.all([
    getPhases(project.id),
    getTimeEntries({ projectId: project.id }),
    getInvoices(),
    getRenewals(),
    getProjects(),
  ]);

  const invoices = allInvoices.filter((i) => i.project_id === project.id);
  const projectRenewals = renewals.filter((r) => r.project_id === project.id);
  const progress = phaseProgress(phases);
  const catData = hoursByCategory(entries);
  const hoursTotal = totalHours(entries);

  // Activity feed: recent time entries + phase completions, newest first.
  const activity: ActivityItem[] = [
    ...entries.map((e) => ({
      date: e.entry_date,
      kind: "time" as const,
      title: e.task_description,
      detail: `${formatHours(Number(e.hours))} · ${e.category.replace(/_/g, " ")}`,
    })),
    ...phases
      .filter((p) => p.completed_at)
      .map((p) => ({
        date: p.completed_at!.slice(0, 10),
        kind: "phase" as const,
        title: `Completed: ${p.name}`,
        detail: "Phase done",
      })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  const priceLabel =
    project.pricing_model === "fixed"
      ? formatCurrency(project.fixed_fee)
      : project.pricing_model === "hourly"
        ? `${formatCurrency(project.hourly_rate)} / hr`
        : `Retainer${project.billing_frequency ? ` · ${project.billing_frequency}` : ""}`;

  return (
    <>
      <Link
        href="/projects"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-navy"
      >
        <ChevronLeftIcon size={16} /> Projects
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-navy">
              {project.client_name}
            </h1>
            <StatusBadge
              label={labelFor(PROJECT_STATUSES, project.status)}
              tone={toneFor(PROJECT_STATUSES, project.status)}
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
            <BusinessUnitTag unit={project.business_unit} />
            <span>{project.project_type ?? "—"}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <LogTimeButton projects={allProjects} fixedProjectId={project.id} variant="secondary" />
          <NewInvoiceButton projects={allProjects} fixedProjectId={project.id} variant="secondary" />
          <ProjectFormButton project={project} variant="secondary" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Progress + phases */}
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-navy">Phases</h2>
              <span className="text-sm font-semibold text-brand">{progress}% complete</span>
            </div>
            <ProgressBar value={progress} className="mb-5" />
            <PhaseChecklist projectId={project.id} phases={phases} />
          </div>

          {/* Hours breakdown */}
          <div className="card p-6">
            <SectionHeader title="Hours by Category" />
            <HoursDonut data={catData} total={hoursTotal} />
          </div>

          {/* Activity feed */}
          <div className="card p-6">
            <SectionHeader title="Recent Activity" />
            {activity.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">No activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {activity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        a.kind === "phase" ? "bg-status-green" : "bg-brand"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy">{a.title}</p>
                      <p className="text-xs text-muted">
                        {formatDateShort(a.date)} · {a.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Contact card */}
          <div className="card p-6">
            <SectionHeader title="Client" />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-white">
                {initials(project.contact_name ?? project.client_name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-navy">
                  {project.contact_name ?? "—"}
                </p>
                <p className="truncate text-xs text-muted">{project.client_name}</p>
              </div>
            </div>
            {project.contact_email && (
              <a
                href={`mailto:${project.contact_email}`}
                className="mt-4 flex items-center gap-2 text-sm text-brand hover:underline"
              >
                <MailIcon size={16} /> {project.contact_email}
              </a>
            )}
            {project.drive_folder_url && (
              <a
                href={project.drive_folder_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-sm text-brand hover:underline"
              >
                <ExternalLinkIcon size={16} /> Drive folder
              </a>
            )}
          </div>

          {/* Details */}
          <div className="card p-6">
            <SectionHeader title="Details" />
            <dl className="space-y-3 text-sm">
              <Detail label="Pricing" value={`${labelFor(PRICING_MODELS, project.pricing_model)} · ${priceLabel}`} />
              <Detail label="Start date" value={formatDate(project.start_date)} />
              <Detail label="Target launch" value={formatDate(project.target_launch_date)} />
              <Detail label="Next milestone" value={project.next_milestone ?? "—"} />
              {project.is_recurring && (
                <Detail label="Next renewal" value={formatDate(project.next_renewal_date)} />
              )}
              <Detail label="Tech stack" value={project.tech_stack ?? "—"} />
            </dl>
          </div>

          {/* Invoices */}
          <div className="card p-6">
            <SectionHeader title="Invoices" />
            {invoices.length === 0 ? (
              <p className="py-2 text-sm text-muted">No invoices raised.</p>
            ) : (
              <ul className="space-y-2">
                {invoices.map((inv) => {
                  const eff = effectiveInvoiceStatus(inv);
                  return (
                    <li key={inv.id} className="flex items-center justify-between gap-2 text-sm">
                      <div className="min-w-0">
                        <p className="font-medium text-navy">{inv.invoice_number}</p>
                        <p className="truncate text-xs text-muted">
                          due {formatDateShort(inv.due_date)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-semibold text-navy">
                          {formatCurrency(inv.amount)}
                        </span>
                        <StatusBadge
                          label={labelFor(INVOICE_STATUSES, eff)}
                          tone={toneFor(INVOICE_STATUSES, eff)}
                          dot={false}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Renewals */}
          {projectRenewals.length > 0 && (
            <div className="card p-6">
              <SectionHeader title="Renewals" />
              <ul className="space-y-2 text-sm">
                {projectRenewals.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-medium capitalize text-navy">{r.renewal_type}</p>
                      <p className="text-xs text-muted">{r.provider ?? "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted">{formatDate(r.expiry_date)}</p>
                      <p className="text-xs font-semibold text-navy">{formatCurrency(r.cost)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}
