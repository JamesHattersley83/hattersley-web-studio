import Link from "next/link";
import { getProjects, getTimeEntries } from "@/lib/queries";
import {
  billableHours,
  nonBillableHours,
  round2,
  totalHours,
} from "@/lib/derive";
import { TIME_CATEGORIES, timeCategoryMeta } from "@/lib/constants";
import {
  addDays,
  formatDate,
  formatHours,
  startOfWeek,
  toISODate,
} from "@/lib/format";
import { PageHeader, SectionHeader, StatCard } from "@/components/ui";
import { LogTimeButton } from "@/components/forms/TimeEntryForm";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TimeIcon,
} from "@/components/icons";
import type { TimeEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function TimePage({
  searchParams,
}: {
  searchParams: { week?: string };
}) {
  const anchor = searchParams.week
    ? new Date(searchParams.week + "T00:00:00")
    : new Date();
  const weekStart = startOfWeek(
    Number.isNaN(anchor.getTime()) ? new Date() : anchor,
  );
  const weekEnd = addDays(weekStart, 6);
  const fromISO = toISODate(weekStart);
  const toISOEnd = toISODate(weekEnd);

  const [entries, projects] = await Promise.all([
    getTimeEntries({ from: fromISO, to: toISOEnd }),
    getProjects(),
  ]);

  const projectById = new Map(projects.map((p) => [p.id, p] as const));
  const projectName = (id: string | null) =>
    id ? projectById.get(id)?.client_name ?? "Unknown" : "Admin / internal";

  const total = totalHours(entries);
  const billable = billableHours(entries);
  const internal = nonBillableHours(entries);
  const avgPerDay = round2(total / 7);

  // Entries per day
  const byDay: TimeEntry[][] = Array.from({ length: 7 }, () => []);
  for (const e of entries) {
    const idx = Math.round(
      (new Date(e.entry_date + "T00:00:00").getTime() - weekStart.getTime()) /
        86_400_000,
    );
    if (idx >= 0 && idx < 7) byDay[idx].push(e);
  }

  // Hours by project
  const projectHours = new Map<string, number>();
  for (const e of entries) {
    const key = projectName(e.project_id);
    projectHours.set(key, (projectHours.get(key) ?? 0) + Number(e.hours));
  }
  const projectBars = [...projectHours.entries()]
    .map(([name, hours]) => ({ name, hours: round2(hours) }))
    .sort((a, b) => b.hours - a.hours);
  const maxBar = Math.max(1, ...projectBars.map((b) => b.hours));

  const prevWeek = toISODate(addDays(weekStart, -7));
  const nextWeek = toISODate(addDays(weekStart, 7));

  return (
    <>
      <PageHeader
        title="Time Log"
        subtitle="Track billable and internal hours across every project."
        action={<LogTimeButton projects={projects} defaultDate={toISODate(weekStart)} />}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Logged This Week" value={formatHours(total)} icon={<TimeIcon size={20} />} tone="blue" />
        <StatCard label="Billable" value={formatHours(billable)} tone="green" />
        <StatCard label="Internal / Admin" value={formatHours(internal)} tone="slate" />
        <StatCard label="Avg Hours / Day" value={formatHours(avgPerDay)} tone="amber" />
      </div>

      {/* Week navigation */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-navy">
          {formatDate(fromISO)} – {formatDate(toISOEnd)}
        </h2>
        <div className="flex items-center gap-2">
          <Link href={`/time?week=${prevWeek}`} className="btn-secondary" aria-label="Previous week">
            <ChevronLeftIcon size={18} />
          </Link>
          <Link href="/time" className="btn-secondary">
            This week
          </Link>
          <Link href={`/time?week=${nextWeek}`} className="btn-secondary" aria-label="Next week">
            <ChevronRightIcon size={18} />
          </Link>
        </div>
      </div>

      {/* Category legend */}
      <div className="mb-3 flex flex-wrap gap-3">
        {TIME_CATEGORIES.map((c) => (
          <span key={c.value} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} />
            {c.label}
          </span>
        ))}
      </div>

      {/* Week grid */}
      <div className="card mb-8 overflow-x-auto p-4">
        <div className="grid min-w-[900px] grid-cols-7 gap-3">
          {DAYS.map((day, i) => {
            const date = addDays(weekStart, i);
            const dayEntries = byDay[i];
            const dayTotal = round2(dayEntries.reduce((s, e) => s + Number(e.hours), 0));
            const isToday = toISODate(date) === toISODate(new Date());
            return (
              <div key={day} className="min-w-0">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span
                    className={`text-xs font-semibold ${isToday ? "text-brand" : "text-muted"}`}
                  >
                    {day} {date.getDate()}
                  </span>
                  {dayTotal > 0 && (
                    <span className="text-xs font-semibold text-navy">{dayTotal}h</span>
                  )}
                </div>
                <div className="space-y-2">
                  {dayEntries.length === 0 && (
                    <div className="rounded-lg border border-dashed border-line py-4" />
                  )}
                  {dayEntries.map((e) => {
                    const meta = timeCategoryMeta(e.category);
                    return (
                      <div
                        key={e.id}
                        className="rounded-lg border border-line bg-white p-2"
                        style={{ borderLeft: `3px solid ${meta.color}` }}
                      >
                        <p className="truncate text-xs font-semibold text-navy">
                          {projectName(e.project_id)}
                        </p>
                        <p className="truncate text-xs text-muted">{e.task_description}</p>
                        <p className="mt-1 text-xs font-semibold" style={{ color: meta.color }}>
                          {formatHours(Number(e.hours))}
                          {!e.billable && (
                            <span className="ml-1 font-normal text-muted">· internal</span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hours by project */}
        <div className="card p-6">
          <SectionHeader title="Hours by Project" />
          {projectBars.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No time logged this week.</p>
          ) : (
            <ul className="space-y-3">
              {projectBars.map((b) => (
                <li key={b.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="truncate text-navy">{b.name}</span>
                    <span className="font-semibold text-muted">{formatHours(b.hours)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${(b.hours / maxBar) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* All entries */}
        <div className="card p-6">
          <SectionHeader title="All Entries" />
          {entries.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No entries this week.</p>
          ) : (
            <ul className="divide-y divide-line">
              {entries.map((e) => {
                const meta = timeCategoryMeta(e.category);
                return (
                  <li key={e.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy">
                        {e.task_description}
                      </p>
                      <p className="text-xs text-muted">
                        {formatDate(e.entry_date)} · {projectName(e.project_id)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-semibold"
                        style={{ background: `${meta.color}1a`, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      <span className="w-12 text-right text-sm font-semibold text-navy">
                        {formatHours(Number(e.hours))}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
