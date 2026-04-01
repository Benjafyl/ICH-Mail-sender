import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { WorkflowBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatDateTime } from "@/lib/utils";
import { getLeadFilterOptions, listLeads } from "@/services/lead-service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === "string" ? resolvedSearchParams.query : "";
  const city = typeof resolvedSearchParams.city === "string" ? resolvedSearchParams.city : "";
  const category =
    typeof resolvedSearchParams.category === "string"
      ? resolvedSearchParams.category
      : "";
  const status =
    typeof resolvedSearchParams.status === "string"
      ? resolvedSearchParams.status
      : "all";
  const success =
    typeof resolvedSearchParams.success === "string"
      ? resolvedSearchParams.success
      : undefined;
  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  const [leads, options] = await Promise.all([
    listLeads({ query, city, category, status: status as never }),
    getLeadFilterOptions(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        actionHref="/leads/new"
        actionLabel="Crear lead"
      />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        <form className="grid gap-4 md:grid-cols-4">
          <Input
            name="query"
            defaultValue={query}
            placeholder="Buscar por nombre o email"
          />

          <Select name="city" defaultValue={city}>
            <option value="">Todas las ciudades</option>
            {options.cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>

          <Select name="category" defaultValue={category}>
            <option value="">Todas las categorías</option>
            {options.categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>

          <div className="flex gap-3">
            <Select name="status" defaultValue={status}>
              <option value="all">Todos los estados</option>
              <option value="pending_analysis">Pendiente de análisis</option>
              <option value="draft_pending">Borrador pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="sent">Enviado</option>
              <option value="opted_out">Opt-out</option>
            </Select>
            <button className={buttonVariants({ variant: "secondary" })} type="submit">
              Filtrar
            </button>
          </div>
        </form>
      </Card>

      <Card className="p-5">
        {leads.length === 0 ? (
          <EmptyState
            title="Sin resultados"
            action={
              <Link
                className={buttonVariants({ variant: "primary" })}
                href="/leads/new"
              >
                Crear lead
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="pb-3 font-medium">Negocio</th>
                  <th className="pb-3 font-medium">Categoría</th>
                  <th className="pb-3 font-medium">Ciudad</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/60">
                    <td className="py-3">
                      <Link
                        className="font-medium text-foreground hover:text-accent"
                        href={`/leads/${lead.id}`}
                      >
                        {lead.business_name}
                      </Link>
                    </td>
                    <td className="py-3 text-muted">{lead.category ?? "Sin categoría"}</td>
                    <td className="py-3 text-muted">{lead.city ?? "Sin ciudad"}</td>
                    <td className="py-3 text-muted">
                      {lead.public_email ?? "Sin email"}
                    </td>
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
    </div>
  );
}
