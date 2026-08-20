"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

// Helpers -----------------------------------------------------------------
function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

function num(fd: FormData, key: string): number | null {
  const s = str(fd, key);
  if (s == null) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}

// ---- Leads ---------------------------------------------------------------
export async function createLead(fd: FormData) {
  const supabase = createClient();
  await supabase.from("leads").insert({
    business_unit: str(fd, "business_unit") ?? "web_studio",
    business_name: str(fd, "business_name"),
    contact_name: str(fd, "contact_name"),
    contact_email: str(fd, "contact_email"),
    contact_phone: str(fd, "contact_phone"),
    stage: str(fd, "stage") ?? "new",
    source: str(fd, "source"),
    estimated_value: num(fd, "estimated_value"),
    notes: str(fd, "notes"),
    next_action: str(fd, "next_action"),
    next_action_date: str(fd, "next_action_date"),
    last_contact_date: str(fd, "last_contact_date"),
  });
  revalidatePath("/leads");
  revalidatePath("/");
}

export async function updateLeadStage(fd: FormData) {
  const supabase = createClient();
  const id = str(fd, "id");
  const stage = str(fd, "stage");
  if (!id || !stage) return;
  const patch: Record<string, unknown> = { stage };
  if (stage === "lost") patch.lost_reason = str(fd, "lost_reason");
  await supabase.from("leads").update(patch).eq("id", id);
  revalidatePath("/leads");
  revalidatePath("/");
}

/**
 * Convert a won lead into a project, pre-filling client + business unit.
 * Redirects to the new project detail page.
 */
export async function convertLeadToProject(fd: FormData) {
  const supabase = createClient();
  const leadId = str(fd, "lead_id");
  if (!leadId) return;

  await supabase.from("leads").update({ stage: "won" }).eq("id", leadId);

  const { data: project } = await supabase
    .from("projects")
    .insert({
      lead_id: leadId,
      business_unit: str(fd, "business_unit") ?? "web_studio",
      client_name: str(fd, "client_name"),
      contact_name: str(fd, "contact_name"),
      contact_email: str(fd, "contact_email"),
      project_type: str(fd, "project_type"),
      status: str(fd, "status") ?? "active",
      pricing_model: str(fd, "pricing_model") ?? "fixed",
      fixed_fee: num(fd, "fixed_fee"),
      hourly_rate: num(fd, "hourly_rate"),
      start_date: str(fd, "start_date"),
      target_launch_date: str(fd, "target_launch_date"),
    })
    .select("id")
    .single();

  revalidatePath("/leads");
  revalidatePath("/projects");
  revalidatePath("/");
  if (project?.id) redirect(`/projects/${project.id}`);
}

// ---- Projects ------------------------------------------------------------
export async function createProject(fd: FormData) {
  const supabase = createClient();
  const isRecurring = bool(fd, "is_recurring");
  const { data: project } = await supabase
    .from("projects")
    .insert({
      business_unit: str(fd, "business_unit") ?? "web_studio",
      client_name: str(fd, "client_name"),
      contact_name: str(fd, "contact_name"),
      contact_email: str(fd, "contact_email"),
      project_type: str(fd, "project_type"),
      status: str(fd, "status") ?? "active",
      pricing_model: str(fd, "pricing_model") ?? "fixed",
      fixed_fee: num(fd, "fixed_fee"),
      hourly_rate: num(fd, "hourly_rate"),
      is_recurring: isRecurring,
      billing_frequency: isRecurring ? str(fd, "billing_frequency") : null,
      next_renewal_date: str(fd, "next_renewal_date"),
      start_date: str(fd, "start_date"),
      target_launch_date: str(fd, "target_launch_date"),
      next_milestone: str(fd, "next_milestone"),
      tech_stack: str(fd, "tech_stack"),
      drive_folder_url: str(fd, "drive_folder_url"),
    })
    .select("id")
    .single();
  revalidatePath("/projects");
  revalidatePath("/");
  if (project?.id) redirect(`/projects/${project.id}`);
}

export async function updateProject(fd: FormData) {
  const supabase = createClient();
  const id = str(fd, "id");
  if (!id) return;
  const isRecurring = bool(fd, "is_recurring");
  await supabase
    .from("projects")
    .update({
      client_name: str(fd, "client_name"),
      contact_name: str(fd, "contact_name"),
      contact_email: str(fd, "contact_email"),
      project_type: str(fd, "project_type"),
      status: str(fd, "status") ?? "active",
      pricing_model: str(fd, "pricing_model") ?? "fixed",
      fixed_fee: num(fd, "fixed_fee"),
      hourly_rate: num(fd, "hourly_rate"),
      is_recurring: isRecurring,
      billing_frequency: isRecurring ? str(fd, "billing_frequency") : null,
      next_renewal_date: str(fd, "next_renewal_date"),
      start_date: str(fd, "start_date"),
      target_launch_date: str(fd, "target_launch_date"),
      next_milestone: str(fd, "next_milestone"),
      tech_stack: str(fd, "tech_stack"),
      drive_folder_url: str(fd, "drive_folder_url"),
    })
    .eq("id", id);
  revalidatePath(`/projects/${id}`);
  revalidatePath("/projects");
}

// ---- Phases --------------------------------------------------------------
export async function addPhase(fd: FormData) {
  const supabase = createClient();
  const projectId = str(fd, "project_id");
  if (!projectId) return;
  const { data: max } = await supabase
    .from("project_phases")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  await supabase.from("project_phases").insert({
    project_id: projectId,
    name: str(fd, "name"),
    description: str(fd, "description"),
    status: str(fd, "status") ?? "todo",
    sort_order: (max?.sort_order ?? -1) + 1,
  });
  revalidatePath(`/projects/${projectId}`);
}

export async function setPhaseStatus(fd: FormData) {
  const supabase = createClient();
  const id = str(fd, "id");
  const projectId = str(fd, "project_id");
  const status = str(fd, "status");
  if (!id || !status) return;
  await supabase
    .from("project_phases")
    .update({
      status,
      completed_at: status === "done" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (projectId) revalidatePath(`/projects/${projectId}`);
  revalidatePath("/");
}

// ---- Time entries --------------------------------------------------------
export async function createTimeEntry(fd: FormData) {
  const supabase = createClient();
  await supabase.from("time_entries").insert({
    project_id: str(fd, "project_id"),
    entry_date: str(fd, "entry_date"),
    task_description: str(fd, "task_description"),
    hours: num(fd, "hours"),
    billable: bool(fd, "billable"),
    category: str(fd, "category") ?? "dev",
  });
  revalidatePath("/time");
  revalidatePath("/");
  const projectId = str(fd, "project_id");
  if (projectId) revalidatePath(`/projects/${projectId}`);
}

export async function deleteTimeEntry(fd: FormData) {
  const supabase = createClient();
  const id = str(fd, "id");
  if (!id) return;
  await supabase.from("time_entries").delete().eq("id", id);
  revalidatePath("/time");
}

// ---- Invoices ------------------------------------------------------------
export async function createInvoice(fd: FormData) {
  const supabase = createClient();
  const status = str(fd, "status") ?? "draft";
  await supabase.from("invoices").insert({
    project_id: str(fd, "project_id"),
    description: str(fd, "description"),
    amount: num(fd, "amount") ?? 0,
    status,
    issue_date: status === "draft" ? str(fd, "issue_date") : str(fd, "issue_date"),
    due_date: str(fd, "due_date"),
  });
  revalidatePath("/invoices");
  revalidatePath("/");
  const projectId = str(fd, "project_id");
  if (projectId) revalidatePath(`/projects/${projectId}`);
}

export async function updateInvoiceStatus(fd: FormData) {
  const supabase = createClient();
  const id = str(fd, "id");
  const status = str(fd, "status");
  if (!id || !status) return;
  const patch: Record<string, unknown> = { status };
  if (status === "paid") patch.paid_date = str(fd, "paid_date") ?? new Date().toISOString().slice(0, 10);
  if (status === "sent" && str(fd, "issue_date")) patch.issue_date = str(fd, "issue_date");
  await supabase.from("invoices").update(patch).eq("id", id);
  revalidatePath("/invoices");
  revalidatePath("/");
}
