import { notFound } from "next/navigation";

import { updateLeadAction } from "@/app/actions/leads";
import { LeadForm } from "@/components/forms/lead-form";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { getLeadById } from "@/services/lead-service";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EditLeadPage({
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

  const error =
    typeof resolvedSearchParams.error === "string"
      ? resolvedSearchParams.error
      : undefined;

  return (
    <div className="space-y-6">
      <PageHeader title={`Editar ${lead.business_name}`} />

      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        <LeadForm
          action={updateLeadAction.bind(null, lead.id)}
          initialValues={lead}
          submitLabel="Guardar cambios"
        />
      </Card>
    </div>
  );
}
