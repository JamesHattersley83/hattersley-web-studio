export type BusinessUnit = "web_studio" | "cad_services";

export type LeadStage =
  | "new"
  | "contacted"
  | "proposal_sent"
  | "contract_signed"
  | "won"
  | "lost";

export type ProjectStatus =
  | "proposal"
  | "active"
  | "awaiting_content"
  | "on_hold"
  | "complete";

export type PricingModel = "fixed" | "hourly" | "retainer";

export type PhaseStatus = "todo" | "active" | "done" | "blocked";

export type TimeCategory = "design" | "dev" | "seo" | "admin" | "client_comms";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export interface Lead {
  id: string;
  business_unit: BusinessUnit;
  business_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  stage: LeadStage;
  source: string | null;
  estimated_value: number | null;
  notes: string | null;
  next_action: string | null;
  next_action_date: string | null;
  last_contact_date: string | null;
  lost_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  lead_id: string | null;
  business_unit: BusinessUnit;
  client_name: string;
  contact_name: string | null;
  contact_email: string | null;
  project_type: string | null;
  status: ProjectStatus;
  pricing_model: PricingModel;
  fixed_fee: number | null;
  hourly_rate: number | null;
  is_recurring: boolean;
  billing_frequency: string | null;
  next_renewal_date: string | null;
  start_date: string | null;
  target_launch_date: string | null;
  next_milestone: string | null;
  tech_stack: string | null;
  drive_folder_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectPhase {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  status: PhaseStatus;
  sort_order: number;
  completed_at: string | null;
  created_at: string;
}

export interface TimeEntry {
  id: string;
  project_id: string | null;
  entry_date: string;
  task_description: string;
  hours: number;
  billable: boolean;
  category: TimeCategory;
  created_at: string;
}

export interface Invoice {
  id: string;
  project_id: string | null;
  invoice_number: string;
  description: string | null;
  amount: number;
  status: InvoiceStatus;
  issue_date: string | null;
  due_date: string | null;
  paid_date: string | null;
  created_at: string;
}

export interface Renewal {
  id: string;
  project_id: string | null;
  renewal_type: string;
  provider: string | null;
  expiry_date: string;
  cost: number | null;
  auto_renews: boolean;
  notes: string | null;
  created_at: string;
}
