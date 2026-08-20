"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { PlusIcon } from "@/components/icons";
import { createProject, updateProject } from "@/lib/actions";
import { BUSINESS_UNITS, PRICING_MODELS, PROJECT_STATUSES } from "@/lib/constants";
import { Field, Options, Select, TextArea, TextInput } from "./fields";
import type { Project } from "@/lib/types";

const BILLING = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

export function ProjectFormButton({
  project,
  variant = "primary",
}: {
  project?: Project;
  variant?: "primary" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  const editing = Boolean(project);
  const action = editing ? updateProject : createProject;

  return (
    <>
      <button
        className={variant === "primary" ? "btn-primary" : "btn-secondary"}
        onClick={() => setOpen(true)}
      >
        {editing ? "Edit Project" : (
          <>
            <PlusIcon size={18} /> Add Project
          </>
        )}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Project" : "Add Project"}
        widthClass="max-w-2xl"
      >
        <form action={action} className="space-y-4">
          {editing && <input type="hidden" name="id" value={project!.id} />}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Client name">
              <TextInput name="client_name" defaultValue={project?.client_name ?? ""} required />
            </Field>
            <Field label="Business unit">
              <Select name="business_unit" defaultValue={project?.business_unit ?? "web_studio"}>
                <Options items={BUSINESS_UNITS.map((b) => ({ value: b.value, label: b.label }))} />
              </Select>
            </Field>
            <Field label="Contact name">
              <TextInput name="contact_name" defaultValue={project?.contact_name ?? ""} />
            </Field>
            <Field label="Contact email">
              <TextInput name="contact_email" defaultValue={project?.contact_email ?? ""} />
            </Field>
            <Field label="Project type">
              <TextInput name="project_type" defaultValue={project?.project_type ?? ""} />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue={project?.status ?? "active"}>
                <Options items={PROJECT_STATUSES.map((s) => ({ value: s.value, label: s.label }))} />
              </Select>
            </Field>
            <Field label="Pricing model">
              <Select name="pricing_model" defaultValue={project?.pricing_model ?? "fixed"}>
                <Options items={PRICING_MODELS} />
              </Select>
            </Field>
            <Field label="Fixed fee (£)">
              <TextInput name="fixed_fee" type="number" step="0.01" defaultValue={project?.fixed_fee ?? ""} />
            </Field>
            <Field label="Hourly rate (£)">
              <TextInput name="hourly_rate" type="number" step="0.01" defaultValue={project?.hourly_rate ?? ""} />
            </Field>
            <Field label="Recurring / retainer">
              <label className="mt-1 flex items-center gap-2 text-sm text-navy">
                <input
                  type="checkbox"
                  name="is_recurring"
                  defaultChecked={project?.is_recurring ?? false}
                  className="h-4 w-4 rounded border-line text-brand focus:ring-brand"
                />
                This project bills on a recurring cycle
              </label>
            </Field>
            <Field label="Billing frequency">
              <Select name="billing_frequency" defaultValue={project?.billing_frequency ?? ""}>
                <Options placeholder="—" items={BILLING} />
              </Select>
            </Field>
            <Field label="Next renewal date">
              <TextInput name="next_renewal_date" type="date" defaultValue={project?.next_renewal_date ?? ""} />
            </Field>
            <Field label="Start date">
              <TextInput name="start_date" type="date" defaultValue={project?.start_date ?? ""} />
            </Field>
            <Field label="Target launch date">
              <TextInput name="target_launch_date" type="date" defaultValue={project?.target_launch_date ?? ""} />
            </Field>
          </div>
          <Field label="Next milestone">
            <TextInput name="next_milestone" defaultValue={project?.next_milestone ?? ""} />
          </Field>
          <Field label="Tech stack" hint="Hosting, CMS, key plugins/integrations">
            <TextInput name="tech_stack" defaultValue={project?.tech_stack ?? ""} />
          </Field>
          <Field label="Google Drive folder URL">
            <TextInput name="drive_folder_url" type="url" defaultValue={project?.drive_folder_url ?? ""} />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
