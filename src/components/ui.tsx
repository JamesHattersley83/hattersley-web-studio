import type { ReactNode } from "react";
import { businessUnitLabel } from "@/lib/constants";
import type { BusinessUnit } from "@/lib/types";

type Tone = "green" | "amber" | "slate" | "red" | "blue";

const toneClasses: Record<Tone, string> = {
  green: "bg-status-green-bg text-status-green",
  amber: "bg-status-amber-bg text-status-amber",
  slate: "bg-status-slate-bg text-status-slate",
  red: "bg-status-red-bg text-status-red",
  blue: "bg-status-blue-bg text-status-blue",
};

const dotClasses: Record<Tone, string> = {
  green: "bg-status-green",
  amber: "bg-status-amber",
  slate: "bg-status-slate",
  red: "bg-status-red",
  blue: "bg-status-blue",
};

export function StatusBadge({
  label,
  tone,
  dot = true,
}: {
  label: string;
  tone: Tone;
  dot?: boolean;
}) {
  return (
    <span className={`pill ${toneClasses[tone]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} />}
      {label}
    </span>
  );
}

export function BusinessUnitTag({ unit }: { unit: BusinessUnit }) {
  const isWeb = unit === "web_studio";
  return (
    <span
      className={`pill ${
        isWeb ? "bg-status-blue-bg text-status-blue" : "bg-navy/5 text-navy"
      }`}
    >
      {businessUnitLabel(unit)}
    </span>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  tone = "blue",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-navy">{value}</p>
          {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
        </div>
        {icon && (
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneClasses[tone]}`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  className = "",
}: {
  value: number; // 0..100
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-line ${className}`}>
      <div
        className="h-full rounded-full bg-brand transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-heading text-lg font-semibold text-navy">{title}</h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  icon,
}: {
  title: string;
  message?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      {icon && <span className="text-muted/60">{icon}</span>}
      <p className="font-heading font-semibold text-navy">{title}</p>
      {message && <p className="max-w-sm text-sm text-muted">{message}</p>}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
