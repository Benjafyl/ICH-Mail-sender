import { createSendAction } from "@/app/actions/sends";
import { SendForm } from "@/components/forms/send-form";
import { EmptyState } from "@/components/shared/empty-state";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { fetchDrafts } from "@/repositories/drafts";
import { fetchLeadReferenceOptions } from "@/repositories/leads";
import { fetchSends } from "@/repositories/sends";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SendsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const leadId =
    typeof resolvedSearchParams.leadId === "string"
      ? resolvedSearchParams.leadId
      : undefined;
  const draftId =
    typeof resolvedSearchParams.draftId === "string"
      ? resolvedSearchParams.draftId
      : undefined;
  const sentTo =
    typeof resolvedSearchParams.sentTo === "string"
      ? resolvedSearchParams.sentTo
      : undefined;
  const success =
    typeof resolvedSearchParams.success === "string"
      ? resolvedSearchParams.success
      : undefined;
  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  const [sendRecords, leadOptions, draftOptionsRaw] = await Promise.all([
    fetchSends(),
    fetchLeadReferenceOptions(),
    fetchDrafts(),
  ]);

  const draftOptions = draftOptionsRaw.map((draft) => ({
    id: draft.id,
    label: `${draft.leads?.business_name ?? "Sin lead"} · ${draft.subject}`,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Envíos"
        description="Registro interno de envíos ya realizados. El MVP no envía correos en vivo todavía; solo deja trazabilidad operativa."
      />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Registrar envío
            </h2>
            <p className="text-sm text-muted">
              Usa este módulo para dejar trazado el envío y el estado de
              respuesta.
            </p>
          </div>
          <SendForm
            action={createSendAction}
            draftOptions={draftOptions}
            leadOptions={leadOptions}
            defaults={{ leadId, draftId, sentTo }}
          />
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Historial
            </h2>
            <p className="text-sm text-muted">
              Registros previos de envíos hechos por el equipo.
            </p>
          </div>

          {sendRecords.length === 0 ? (
            <EmptyState
              title="Todavía no hay envíos"
              description="Registra aquí los primeros envíos asociados a drafts aprobados."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="pb-3 font-medium">Lead</th>
                    <th className="pb-3 font-medium">Sent to</th>
                    <th className="pb-3 font-medium">Provider</th>
                    <th className="pb-3 font-medium">Response</th>
                    <th className="pb-3 font-medium">Sent at</th>
                  </tr>
                </thead>
                <tbody>
                  {sendRecords.map((send) => (
                    <tr key={send.id} className="border-b border-border/60">
                      <td className="py-3 text-foreground">
                        {send.leads?.business_name ?? "Sin lead"}
                      </td>
                      <td className="py-3 text-muted">{send.sent_to}</td>
                      <td className="py-3 text-muted">{send.provider}</td>
                      <td className="py-3 text-muted">
                        {send.response_status ?? "Sin respuesta"}
                      </td>
                      <td className="py-3 text-muted">
                        {formatDateTime(send.sent_at)}
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
