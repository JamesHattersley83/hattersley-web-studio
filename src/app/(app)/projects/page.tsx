import Link from "next/link";
import { getAllPhases, getProjects } from "@/lib/queries";
import { phaseProgress } from "@/lib/derive";
import { PROJECT_STATUSES, labelFor, toneFor } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  BusinessUnitTag,
  EmptyState,
  PageHeader,
  ProgressBar,
  StatusBadge,
} from "@/components/ui";
import { ProjectFormButton } from "@/components/forms/ProjectForm";
import { FolderIcon } from "@/components/icons";
import type { Project, ProjectPhase } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_ORDER = ["active", "awaiting_content", "proposal", "on_hold", "complete"];

export default async function ProjectsPage() {
  const [projects, phases] = await Promise.all([getProjects(), getAllPhases()]);

  const phasesByProject = new Map<string, ProjectPhase[]>();
  for (const ph of phases) {
    const arr = phasesByProject.get(ph.project_id) ?? [];
    arr.push(ph);
    phasesByProject.set(ph.project_id, arr);
  }

  const groups = STATUS_ORDER.map((status) => ({
    status,
    label: labelFor(PROJECT_STATUSES, status as Project["status"]),
    items: projects.filter((p) => p.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Every active and completed engagement, grouped by status."
        action={<ProjectFormButton />}
      />

      {projects.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No projects yet"
            message="Add a project or convert a won lead to create one."
            icon={<FolderIcon size={28} />}
          />
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.status}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
                  {group.label}
                </h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-muted">
                  {group.items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((p) => {
                  const progress = phaseProgress(phasesByProject.get(p.id) ?? []);
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
                          <span className="capitalize">{p.pricing_model}</span>
                        </div>
                        <ProgressBar value={progress} />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <BusinessUnitTag unit={p.business_unit} />
                        <span className="text-xs text-muted">
                          {p.pricing_model === "fixed"
                            ? formatCurrency(p.fixed_fee)
                            : p.pricing_model === "hourly"
                              ? `${formatCurrency(p.hourly_rate)}/hr`
                              : "Retainer"}
                        </span>
                      </div>

                      {p.target_launch_date && (
                        <p className="mt-3 border-t border-line pt-3 text-xs text-muted">
                          Target launch: {formatDate(p.target_launch_date)}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
