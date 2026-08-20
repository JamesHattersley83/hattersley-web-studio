"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, PlusIcon } from "./icons";
import { StatusBadge } from "./ui";
import { PHASE_STATUSES, labelFor, toneFor } from "@/lib/constants";
import { addPhase, setPhaseStatus } from "@/lib/actions";
import { formatDateShort } from "@/lib/format";
import type { PhaseStatus, ProjectPhase } from "@/lib/types";

const NEXT_STATUS: Record<PhaseStatus, PhaseStatus> = {
  todo: "active",
  active: "done",
  done: "todo",
  blocked: "active",
};

export function PhaseChecklist({
  projectId,
  phases,
}: {
  projectId: string;
  phases: ProjectPhase[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  function update(phase: ProjectPhase, status: PhaseStatus) {
    const fd = new FormData();
    fd.set("id", phase.id);
    fd.set("project_id", projectId);
    fd.set("status", status);
    startTransition(async () => {
      await setPhaseStatus(fd);
      router.refresh();
    });
  }

  function submitNew(fd: FormData) {
    startTransition(async () => {
      await addPhase(fd);
      setName("");
      setAdding(false);
      router.refresh();
    });
  }

  return (
    <div>
      <ul className="space-y-2">
        {phases.length === 0 && (
          <li className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
            No phases yet — add the first one below.
          </li>
        )}
        {phases.map((phase) => {
          const done = phase.status === "done";
          return (
            <li
              key={phase.id}
              className="flex items-start gap-3 rounded-lg border border-line p-3"
            >
              <button
                type="button"
                disabled={pending}
                onClick={() => update(phase, done ? "todo" : "done")}
                aria-label={done ? "Mark not done" : "Mark done"}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  done
                    ? "border-status-green bg-status-green text-white"
                    : "border-line bg-white text-transparent hover:border-brand"
                }`}
              >
                <CheckIcon size={14} />
              </button>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${
                    done ? "text-muted line-through" : "text-navy"
                  }`}
                >
                  {phase.name}
                </p>
                {phase.description && (
                  <p className="text-xs text-muted">{phase.description}</p>
                )}
                {phase.completed_at && (
                  <p className="mt-0.5 text-xs text-status-green">
                    Completed {formatDateShort(phase.completed_at)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  label={labelFor(PHASE_STATUSES, phase.status)}
                  tone={toneFor(PHASE_STATUSES, phase.status)}
                  dot={false}
                />
                <select
                  aria-label="Phase status"
                  value={phase.status}
                  disabled={pending}
                  onChange={(e) => update(phase, e.target.value as PhaseStatus)}
                  className="rounded-md border border-line bg-white px-1.5 py-1 text-xs text-muted focus:border-brand focus:outline-none"
                >
                  {PHASE_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          );
        })}
      </ul>

      {adding ? (
        <form action={submitNew} className="mt-3 flex items-center gap-2">
          <input type="hidden" name="project_id" value={projectId} />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Phase name"
            className="input flex-1"
            autoFocus
            required
          />
          <button type="submit" className="btn-primary" disabled={pending || !name.trim()}>
            Add
          </button>
          <button type="button" className="btn-secondary" onClick={() => setAdding(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          <PlusIcon size={16} /> Add phase
        </button>
      )}
    </div>
  );
}
