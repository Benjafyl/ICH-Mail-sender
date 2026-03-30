import { createOptOutAction } from "@/app/actions/opt-outs";
import { OptOutForm } from "@/components/forms/opt-out-form";
import { EmptyState } from "@/components/shared/empty-state";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { fetchLeadReferenceOptions } from "@/repositories/leads";
import { fetchOptOuts } from "@/repositories/opt-outs";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function OptOutsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const success =
    typeof resolvedSearchParams.success === "string"
      ? resolvedSearchParams.success
      : undefined;
  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  const [optOuts, leadOptions] = await Promise.all([
    fetchOptOuts(),
    fetchLeadReferenceOptions(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opt-outs"
        description="Lista de contactos que no deben volver a ser abordados por el sistema."
      />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Registrar opt-out
            </h2>
            <p className="text-sm text-muted">
              Un email con opt-out queda bloqueado para nuevos contactos.
            </p>
          </div>
          <OptOutForm action={createOptOutAction} leadOptions={leadOptions} />
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Lista actual
            </h2>
            <p className="text-sm text-muted">
              Estado consolidado de exclusión comercial.
            </p>
          </div>

          {optOuts.length === 0 ? (
            <EmptyState
              title="No hay opt-outs registrados"
              description="Cuando un contacto solicite no ser abordado nuevamente, regístralo aquí."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Lead</th>
                    <th className="pb-3 font-medium">Reason</th>
                    <th className="pb-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {optOuts.map((entry) => (
                    <tr key={entry.id} className="border-b border-border/60">
                      <td className="py-3 text-foreground">{entry.email}</td>
                      <td className="py-3 text-muted">
                        {entry.leads?.business_name ?? "Sin lead"}
                      </td>
                      <td className="py-3 text-muted">
                        {entry.reason ?? "Sin motivo"}
                      </td>
                      <td className="py-3 text-muted">
                        {formatDateTime(entry.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
