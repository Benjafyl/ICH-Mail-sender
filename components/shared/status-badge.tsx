import { Badge } from "@/components/ui/badge";
import type {
  EmailDraftStatus,
  LeadWorkflowStatus,
  RecommendedService,
} from "@/types/domain";
import {
  getEmailDraftStatusLabel,
  getLeadWorkflowStatusLabel,
  getRecommendedServiceLabel,
} from "@/types/domain";

const workflowMap: Record<
  LeadWorkflowStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  pending_analysis: { label: getLeadWorkflowStatusLabel("pending_analysis"), variant: "warning" },
  draft_pending: { label: getLeadWorkflowStatusLabel("draft_pending"), variant: "info" },
  approved: { label: getLeadWorkflowStatusLabel("approved"), variant: "success" },
  sent: { label: getLeadWorkflowStatusLabel("sent"), variant: "neutral" },
  opted_out: { label: "Opt-out", variant: "danger" },
};

const draftMap: Record<
  EmailDraftStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  draft: { label: getEmailDraftStatusLabel("draft"), variant: "info" },
  approved: { label: getEmailDraftStatusLabel("approved"), variant: "success" },
  rejected: { label: getEmailDraftStatusLabel("rejected"), variant: "danger" },
  sent: { label: getEmailDraftStatusLabel("sent"), variant: "neutral" },
};

export function WorkflowBadge({ status }: { status: LeadWorkflowStatus }) {
  const item = workflowMap[status];
  return <Badge variant={item.variant}>{item.label}</Badge>;
}

export function DraftStatusBadge({ status }: { status: EmailDraftStatus }) {
  const item = draftMap[status];
  return <Badge variant={item.variant}>{item.label}</Badge>;
}

export function ServiceBadge({ service }: { service: RecommendedService }) {
  return <Badge variant="neutral">{getRecommendedServiceLabel(service)}</Badge>;
}
