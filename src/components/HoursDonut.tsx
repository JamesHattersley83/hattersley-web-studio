"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatHours } from "@/lib/format";

export function HoursDonut({
  data,
  total,
}: {
  data: { label: string; color: string; hours: number }[];
  total: number;
}) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">No time logged yet.</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-40 w-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="hours"
              nameKey="label"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.label} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-xl font-bold text-navy">
            {formatHours(total)}
          </span>
          <span className="text-xs text-muted">total</span>
        </div>
      </div>
      <ul className="flex-1 space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-navy">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
              {d.label}
            </span>
            <span className="font-semibold text-muted">{formatHours(d.hours)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
