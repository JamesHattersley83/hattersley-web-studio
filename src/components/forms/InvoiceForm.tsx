"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { PlusIcon } from "@/components/icons";
import { createInvoice } from "@/lib/actions";
import { todayISO } from "@/lib/format";
import { Field, Options, Select, TextArea, TextInput } from "./fields";
import type { Project } from "@/lib/types";

export function NewInvoiceButton({
  projects,
  fixedProjectId,
  variant = "primary",
  label = "New Invoice",
}: {
  projects: { id: string; client_name: string }[] | Project[];
  fixedProjectId?: string;
  variant?: "primary" | "secondary";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handle(fd: FormData) {
    startTransition(async () => {
      await createInvoice(fd);
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
      <Modal open={open} onClose={() => setOpen(false)} title="New Invoice">
        <form action={handle} className="space-y-4">
          {fixedProjectId ? (
            <input type="hidden" name="project_id" value={fixedProjectId} />
          ) : (
            <Field label="Project / client">
              <Select name="project_id" defaultValue="" required>
                <Options
                  placeholder="Select project"
                  items={projects.map((p) => ({ value: p.id, label: p.client_name }))}
                />
              </Select>
            </Field>
          )}
          <Field label="Description">
            <TextArea name="description" placeholder="e.g. 50% deposit — 6-page rebuild" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Amount (£)">
              <TextInput name="amount" type="number" step="0.01" min="0" required />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="draft">
                <Options
                  items={[
                    { value: "draft", label: "Draft" },
                    { value: "sent", label: "Sent" },
                  ]}
                />
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Issue date">
              <TextInput name="issue_date" type="date" defaultValue={todayISO()} />
            </Field>
            <Field label="Due date">
              <TextInput name="due_date" type="date" />
            </Field>
          </div>
          <p className="text-xs text-muted">
            Invoice number is assigned automatically (next in the INV-#### sequence).
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Saving…" : "Create Invoice"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
