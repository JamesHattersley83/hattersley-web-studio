import { createClient } from "./supabase/server";
import type {
  Invoice,
  Lead,
  Project,
  ProjectPhase,
  Renewal,
  TimeEntry,
} from "./types";

// ---- Leads ---------------------------------------------------------------
export async function getLeads(): Promise<Lead[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("next_action_date", { ascending: true, nullsFirst: false });
  return (data as Lead[]) ?? [];
}

export async function getLead(id: string): Promise<Lead | null> {
  const supabase = createClient();
  const { data } = await supabase.from("leads").select("*").eq("id", id).single();
  return (data as Lead) ?? null;
}

// ---- Projects ------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Project[]) ?? [];
}

export async function getProject(id: string): Promise<Project | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return (data as Project) ?? null;
}

export async function getPhases(projectId: string): Promise<ProjectPhase[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("project_phases")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  return (data as ProjectPhase[]) ?? [];
}

export async function getAllPhases(): Promise<ProjectPhase[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("project_phases")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as ProjectPhase[]) ?? [];
}

// ---- Time entries --------------------------------------------------------
export async function getTimeEntries(opts?: {
  from?: string;
  to?: string;
  projectId?: string;
  limit?: number;
}): Promise<TimeEntry[]> {
  const supabase = createClient();
  let q = supabase
    .from("time_entries")
    .select("*")
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (opts?.from) q = q.gte("entry_date", opts.from);
  if (opts?.to) q = q.lte("entry_date", opts.to);
  if (opts?.projectId) q = q.eq("project_id", opts.projectId);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return (data as TimeEntry[]) ?? [];
}

// ---- Invoices ------------------------------------------------------------
export async function getInvoices(): Promise<Invoice[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Invoice[]) ?? [];
}

// ---- Renewals ------------------------------------------------------------
export async function getRenewals(): Promise<Renewal[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("renewals")
    .select("*")
    .order("expiry_date", { ascending: true });
  return (data as Renewal[]) ?? [];
}

/** Lookup map of project id -> client name, for labelling. */
export function projectNameMap(projects: Project[]): Map<string, Project> {
  return new Map(projects.map((p) => [p.id, p]));
}
