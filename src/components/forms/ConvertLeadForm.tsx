"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { ArrowRightIcon } from "@/components/icons";
import { convertLeadToProject } from "@/lib/actions";
import { BUSINESS_UNITS, PRICING_MODELS, PROJECT_STATUSES } from "@/lib/constants";
import { Field, Options, Select, TextInput } from "./fields";
import type { Lead } from "@/lib/types";

export function ConvertLeadButton({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        onClick={() => setOpen(true)}
      >
        Convert <ArrowRightIcon size={14} />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Convert Lead to Project"
        widthClass="max-w-2xl"
      >
        <p className="mb-4 text-sm text-muted">
          This marks <span className="font-semibold text-navy">{lead.business_name}</span> as
          won and creates a linked project, pre-filled below.
        </p>
        <form action={convertLeadToProject} className="space-y-4">
          <input type="hidden" name="lead_id" value={lead.id} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Client name">
              <TextInput name="client_name" defaultValue={lead.business_name} required />
            </Field>
            <Field label="Business unit">
              <Select name="business_unit" defaultValue={lead.business_unit}>
                <Options
                  items={BUSINESS_UNITS.map((b) => ({ value: b.value, label: b.label }))}
                />
              </Select>
            </Field>
            <Field label="Contact name">
              <TextInput name="contact_name" defaultValue={lead.contact_name ?? ""} />
            </Field>
            <Field label="Contact email">
              <TextInput name="contact_email" defaultValue={lead.contact_email ?? ""} />
            </Field>
            <Field label="Project type">
              <TextInput name="project_type" placeholder="e.g. 6-page rebuild" />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="active">
                <Options
                  items={PROJECT_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
                />
              </Select>
            </Field>
            <Field label="Pricing model">
              <Select name="pricing_model" defaultValue="fixed">
                <Options items={PRICING_MODELS} />
              </Select>
            </Field>
            <Field label="Fixed fee (£)">
              <TextInput
                name="fixed_fee"
                type="number"
                step="0.01"
                min="0"
                defaultValue={lead.estimated_value ?? ""}
              />
            </Field>
            <Field label="Hourly rate (£)">
              <TextInput name="hourly_rate" type="number" step="0.01" min="0" />
            </Field>
            <Field label="Start date">
              <TextInput name="start_date" type="date" />
            </Field>
            <Field label="Target launch date">
              <TextInput name="target_launch_date" type="date" />
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
