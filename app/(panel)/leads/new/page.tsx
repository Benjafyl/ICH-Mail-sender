import { createLeadAction } from "@/app/actions/leads";
import { LeadForm } from "@/components/forms/lead-form";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewLeadPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuevo lead"
        description="Ingreso manual de un negocio potencial para iniciar el flujo comercial del MVP."
      />

      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        <LeadForm action={createLeadAction} submitLabel="Crear lead" />
      </Card>
    </div>
  );
}
