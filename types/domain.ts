import type { Database } from "@/types/database";

export const recommendedServices = [
  "maintenance",
  "installation",
  "replacement",
  "evaluation",
] as const;

export const emailDraftStatuses = [
  "draft",
  "approved",
  "rejected",
  "sent",
] as const;

export const leadWorkflowStatuses = [
  "pending_analysis",
  "draft_pending",
  "approved",
  "sent",
  "opted_out",
] as const;

export type RecommendedService =
  Database["public"]["Enums"]["recommended_service"];
export type EmailDraftStatus = Database["public"]["Enums"]["email_draft_status"];
export type LeadWorkflowStatus = (typeof leadWorkflowStatuses)[number];

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

export type LeadAnalysis = Database["public"]["Tables"]["lead_analysis"]["Row"];
export type LeadAnalysisInsert =
  Database["public"]["Tables"]["lead_analysis"]["Insert"];

export type EmailDraft = Database["public"]["Tables"]["email_drafts"]["Row"];
export type EmailDraftInsert =
  Database["public"]["Tables"]["email_drafts"]["Insert"];
export type EmailDraftUpdate =
  Database["public"]["Tables"]["email_drafts"]["Update"];

export type EmailSend = Database["public"]["Tables"]["email_sends"]["Row"];
export type EmailSendInsert =
  Database["public"]["Tables"]["email_sends"]["Insert"];

export type OptOut = Database["public"]["Tables"]["opt_outs"]["Row"];
export type OptOutInsert = Database["public"]["Tables"]["opt_outs"]["Insert"];

export interface LeadRecordBase extends Lead {
  analysis: LeadAnalysis | null;
  drafts: EmailDraft[];
  sends: EmailSend[];
}

export interface LeadRecord extends LeadRecordBase {
  isOptedOut: boolean;
  workflowStatus: LeadWorkflowStatus;
}

export interface LeadFilters {
  query?: string;
  city?: string;
  category?: string;
  status?: LeadWorkflowStatus | "all";
}

export interface DashboardMetrics {
  totalLeads: number;
  pendingAnalysis: number;
  draftsPending: number;
  approved: number;
  sent: number;
  optOuts: number;
}
