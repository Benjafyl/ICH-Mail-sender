import { Badge } from "@/components/ui/badge";
import type {
  EmailDraftStatus,
  LeadWorkflowStatus,
  RecommendedService,
} from "@/types/domain";

const workflowMap: Record<
  LeadWorkflowStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  pending_analysis: { label: "Pendiente de análisis", variant: "warning" },
  draft_pending: { label: "Draft pendiente", variant: "info" },
  approved: { label: "Aprobado", variant: "success" },
  sent: { label: "Enviado", variant: "neutral" },
  opted_out: { label: "Opt-out", variant: "danger" },
};

const draftMap: Record<
  EmailDraftStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  draft: { label: "Draft", variant: "info" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "danger" },
  sent: { label: "Sent", variant: "neutral" },
};

const serviceMap: Record<RecommendedService, string> = {
  maintenance: "Maintenance",
  installation: "Installation",
  replacement: "Replacement",
  evaluation: "Evaluation",
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
  return <Badge variant="neutral">{serviceMap[service]}</Badge>;
}
