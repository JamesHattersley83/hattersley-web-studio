"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { PlusIcon } from "@/components/icons";
import { createLead } from "@/lib/actions";
import { BUSINESS_UNITS, LEAD_SOURCES, LEAD_STAGES } from "@/lib/constants";
import { Field, Options, Select, TextArea, TextInput } from "./fields";

export function AddLeadButton() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handle(fd: FormData) {
    startTransition(async () => {
      await createLead(fd);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        <PlusIcon size={18} /> Add Lead
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Lead" widthClass="max-w-2xl">
        <form action={handle} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Business name">
              <TextInput name="business_name" required />
            </Field>
            <Field label="Business unit">
              <Select name="business_unit" defaultValue="web_studio">
                <Options
                  items={BUSINESS_UNITS.map((b) => ({ value: b.value, label: b.label }))}
                />
              </Select>
            </Field>
            <Field label="Contact name">
              <TextInput name="contact_name" />
            </Field>
            <Field label="Contact email">
              <TextInput name="contact_email" type="email" />
            </Field>
            <Field label="Contact phone">
              <TextInput name="contact_phone" />
            </Field>
            <Field label="Source">
              <Select name="source" defaultValue="">
                <Options
                  placeholder="Select source"
                  items={LEAD_SOURCES.map((s) => ({
                    value: s,
                    label: s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                  }))}
                />
              </Select>
            </Field>
            <Field label="Stage">
              <Select name="stage" defaultValue="new">
                <Options
                  items={LEAD_STAGES.filter((s) => s.value !== "won").map((s) => ({
                    value: s.value,
                    label: s.label,
                  }))}
                />
              </Select>
            </Field>
            <Field label="Estimated value (£)">
              <TextInput name="estimated_value" type="number" step="0.01" min="0" />
            </Field>
            <Field label="Next action">
              <TextInput name="next_action" placeholder="e.g. Send proposal" />
            </Field>
            <Field label="Next action date">
              <TextInput name="next_action_date" type="date" />
            </Field>
          </div>
          <Field label="Notes">
            <TextArea name="notes" />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={pending}>
              {pending ? "Saving…" : "Add Lead"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
