import { fetchDrafts } from "@/repositories/drafts";
import { fetchOptOuts } from "@/repositories/opt-outs";
import { listLeads } from "@/services/lead-service";
import type { DashboardMetrics } from "@/types/domain";

export async function getDashboardData() {
  const [leads, drafts, optOuts] = await Promise.all([
    listLeads(),
    fetchDrafts(),
    fetchOptOuts(),
  ]);

  const metrics: DashboardMetrics = {
    totalLeads: leads.length,
    pendingAnalysis: leads.filter((lead) => lead.workflowStatus === "pending_analysis").length,
    draftsPending: leads.filter((lead) => lead.workflowStatus === "draft_pending").length,
    approved: leads.filter((lead) => lead.workflowStatus === "approved").length,
    sent: leads.filter((lead) => lead.workflowStatus === "sent").length,
    optOuts: optOuts.length,
  };

  return {
    metrics,
    recentLeads: leads.slice(0, 5),
    recentDrafts: drafts.slice(0, 5),
  };
}
