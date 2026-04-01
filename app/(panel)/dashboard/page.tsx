import Link from "next/link";

import { MetricCard } from "@/components/dashboard/metric-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import {
  DraftStatusBadge,
  WorkflowBadge,
} from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { getDashboardData } from "@/services/dashboard-service";

export default async function DashboardPage() {
  const { metrics, recentLeads, recentDrafts } = await getDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        actionHref="/leads/new"
        actionLabel="Nuevo lead"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Total leads" value={metrics.totalLeads} />
        <MetricCard label="Pendientes de análisis" value={metrics.pendingAnalysis} />
        <MetricCard label="Borradores pendientes" value={metrics.draftsPending} />
        <MetricCard label="Aprobados" value={metrics.approved} />
        <MetricCard label="Enviados" value={metrics.sent} />
        <MetricCard label="Opt-outs" value={metrics.optOuts} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Leads recientes
              </h2>
            </div>
            <Link
              className={buttonVariants({ variant: "secondary", size: "sm" })}
              href="/leads"
            >
              Ver todos
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <EmptyState title="Sin leads" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="pb-3 font-medium">Negocio</th>
                    <th className="pb-3 font-medium">Ciudad</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Actualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/60">
                      <td className="py-3">
                        <Link
                          className="font-medium text-foreground hover:text-accent"
                          href={`/leads/${lead.id}`}
                        >
                          {lead.business_name}
                        </Link>
                      </td>
                      <td className="py-3 text-muted">{lead.city ?? "Sin ciudad"}</td>
                      <td className="py-3">
                        <WorkflowBadge status={lead.workflowStatus} />
                      </td>
                      <td className="py-3 text-muted">
                        {formatDateTime(lead.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Borradores recientes
              </h2>
            </div>
            <Link
              className={buttonVariants({ variant: "secondary", size: "sm" })}
              href="/drafts"
            >
              Ver borradores
            </Link>
          </div>

          {recentDrafts.length === 0 ? (
            <EmptyState title="Sin borradores" />
          ) : (
            <div className="space-y-3">
              {recentDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="rounded-xl border border-border bg-surface-muted p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Link
                        className="font-medium text-foreground hover:text-accent"
                        href={`/drafts/${draft.id}`}
                      >
                        {draft.subject}
                      </Link>
                      <p className="text-sm text-muted">
                        {draft.leads?.business_name ?? "Lead eliminado"}
                      </p>
                    </div>
                    <DraftStatusBadge status={draft.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
