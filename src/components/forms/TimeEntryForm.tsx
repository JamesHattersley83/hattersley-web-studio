"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { PlusIcon } from "@/components/icons";
import { createTimeEntry } from "@/lib/actions";
import { TIME_CATEGORIES } from "@/lib/constants";
import { todayISO } from "@/lib/format";
import { Field, Options, Select, TextArea, TextInput } from "./fields";
import type { Project } from "@/lib/types";

export function LogTimeButton({
  projects,
  fixedProjectId,
  defaultDate,
  variant = "primary",
  label = "Log Time",
}: {
  projects: { id: string; client_name: string }[] | Project[];
  fixedProjectId?: string;
  defaultDate?: string;
  variant?: "primary" | "secondary";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handle(fd: FormData) {
    startTransition(async () => {
      await createTimeEntry(fd);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        className={variant === "primary" ? "btn-primary" : "btn-secondary"}
        onClick={() => setOpen(true)}
      >
        <PlusIcon size={18} /> {label}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Log Time">
        <form action={handle} className="space-y-4">
          {fixedProjectId ? (
            <input type="hidden" name="project_id" value={fixedProjectId} />
          ) : (
            <Field label="Project">
              <Select name="project_id" defaultValue="">
                <Options
                  placeholder="Select project (or leave blank for admin)"
                  items={projects.map((p) => ({ value: p.id, label: p.client_name }))}
                />
              </Select>
            </Field>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <TextInput name="entry_date" type="date" defaultValue={defaultDate ?? todayISO()} required />
            </Field>
            <Field label="Hours">
              <TextInput name="hours" type="number" step="0.25" min="0" required />
            </Field>
          </div>
          <Field label="Task description">
            <TextArea name="task_description" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Select name="category" defaultValue="dev">
                <Options items={TIME_CATEGORIES} />
              </Select>
            </Field>
            <Field label="Billable">
              <label className="mt-1 flex items-center gap-2 text-sm text-navy">
                <input
                  type="checkbox"
                  name="billable"
                  defaultChecked
                  className="h-4 w-4 rounded border-line text-brand focus:ring-brand"
                />
                Billable to client
              </label>
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Saving…" : "Log Time"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
