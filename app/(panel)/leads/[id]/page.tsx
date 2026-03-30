import Link from "next/link";
import { notFound } from "next/navigation";

import { upsertLeadAnalysisAction } from "@/app/actions/analysis";
import {
  createManualDraftAction,
  generateDraftAction,
  updateDraftStatusAction,
} from "@/app/actions/drafts";
import { AnalysisForm } from "@/components/forms/analysis-form";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import {
  DraftStatusBadge,
  ServiceBadge,
  WorkflowBadge,
} from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatConfidence, formatDateTime } from "@/lib/utils";
import { getLeadById } from "@/services/lead-service";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  const success =
    typeof resolvedSearchParams.success === "string"
      ? resolvedSearchParams.success
      : undefined;
  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  const saveAnalysis = upsertLeadAnalysisAction.bind(null, lead.id);
  const generateDraft = generateDraftAction.bind(null, lead.id);
  const createManualDraft = createManualDraftAction.bind(null, lead.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={lead.business_name}
        description="Detalle operacional del lead: contexto, análisis, drafts y trazabilidad del flujo."
        actionHref={`/leads/${lead.id}/edit`}
        actionLabel="Editar lead"
      />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoRow label="Categoría" value={lead.category ?? "Sin categoría"} />
            <InfoRow label="Ciudad" value={lead.city ?? "Sin ciudad"} />
            <InfoRow label="Comuna" value={lead.commune ?? "Sin comuna"} />
            <InfoRow label="Email" value={lead.public_email ?? "Sin email"} />
            <InfoRow label="Teléfono" value={lead.phone ?? "Sin teléfono"} />
            <InfoRow label="Website" value={lead.website ?? "Sin website"} />
            <InfoRow label="Source" value={lead.source_url ?? "Sin source URL"} />
            <InfoRow label="Estado" value={lead.workflowStatus} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <WorkflowBadge status={lead.workflowStatus} />
            {lead.analysis ? (
              <ServiceBadge service={lead.analysis.recommended_service} />
            ) : null}
            {lead.isOptedOut ? (
              <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-medium text-[#7a3c32]">
                Contacto bloqueado por opt-out
              </span>
            ) : null}
          </div>
        </div>

        {lead.notes ? (
          <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 text-sm text-muted">
            {lead.notes}
          </div>
        ) : null}
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Análisis comercial
            </h2>
            <p className="text-sm text-muted">
              Si no hay certeza suficiente, el valor por defecto del servicio es
              {" "}
              <code>evaluation</code>.
            </p>
          </div>

          {lead.analysis ? (
            <div className="mb-5 grid gap-4 rounded-xl border border-border bg-surface-muted p-4 md:grid-cols-3">
              <InfoRow
                label="Recommended service"
                value={lead.analysis.recommended_service}
              />
              <InfoRow
                label="Confidence"
                value={formatConfidence(lead.analysis.confidence_score)}
              />
              <InfoRow
                label="Signals"
                value={String(lead.analysis.detected_signals.length)}
              />
            </div>
          ) : null}

          <AnalysisForm action={saveAnalysis} initialValues={lead.analysis} />
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Drafts</h2>
              <p className="text-sm text-muted">
                Puedes generar un borrador sugerido o cargar uno manual.
              </p>
            </div>
            <form action={generateDraft}>
              <button
                className={buttonVariants({ variant: "primary", size: "sm" })}
                disabled={lead.isOptedOut}
                type="submit"
              >
                Generar sugerido
              </button>
            </form>
          </div>

          <div className="mb-5 space-y-3">
            {lead.drafts.length === 0 ? (
              <p className="text-sm text-muted">
                Este lead todavía no tiene borradores asociados.
              </p>
            ) : (
              lead.drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="rounded-xl border border-border bg-surface-muted p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <Link
                        className="font-medium text-foreground hover:text-accent"
                        href={`/drafts/${draft.id}`}
                      >
                        {draft.subject}
                      </Link>
                      <p className="text-sm text-muted">
                        Actualizado {formatDateTime(draft.updated_at)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <DraftStatusBadge status={draft.status} />
                      {draft.status !== "approved" ? (
                        <form
                          action={updateDraftStatusAction.bind(
                            null,
                            draft.id,
                            "approved",
                            `/leads/${lead.id}`,
                          )}
                        >
                          <button
                            className={buttonVariants({
                              variant: "secondary",
                              size: "sm",
                            })}
                            type="submit"
                          >
                            Aprobar
                          </button>
                        </form>
                      ) : null}
                      {draft.status !== "rejected" ? (
                        <form
                          action={updateDraftStatusAction.bind(
                            null,
                            draft.id,
                            "rejected",
                            `/leads/${lead.id}`,
                          )}
                        >
                          <button
                            className={buttonVariants({
                              variant: "ghost",
                              size: "sm",
                            })}
                            type="submit"
                          >
                            Rechazar
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form action={createManualDraft} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Subject
              </label>
              <Input name="subject" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Body</label>
              <Textarea name="body" required />
            </div>
            <div className="flex justify-end">
              <button
                className={buttonVariants({ variant: "secondary" })}
                disabled={lead.isOptedOut}
                type="submit"
              >
                Crear draft manual
              </button>
            </div>
          </form>
        </Card>
      </section>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Historial de envíos
            </h2>
            <p className="text-sm text-muted">
              Registro operativo de contactos ya enviados.
            </p>
          </div>
          <Link
            className={buttonVariants({ variant: "secondary", size: "sm" })}
            href={`/sends?leadId=${lead.id}&sentTo=${encodeURIComponent(lead.public_email ?? "")}`}
          >
            Registrar envío
          </Link>
        </div>

        {lead.sends.length === 0 ? (
          <p className="text-sm text-muted">
            Este lead aún no tiene envíos registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="pb-3 font-medium">Sent to</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Response</th>
                  <th className="pb-3 font-medium">Sent at</th>
                </tr>
              </thead>
              <tbody>
                {lead.sends.map((send) => (
                  <tr key={send.id} className="border-b border-border/60">
                    <td className="py-3 text-foreground">{send.sent_to}</td>
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
    </div>
  );
}
