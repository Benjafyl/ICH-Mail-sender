import Link from "next/link";
import { notFound } from "next/navigation";

import { updateDraftAction } from "@/app/actions/drafts";
import { DraftEditForm } from "@/components/forms/draft-edit-form";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { DraftStatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { fetchDraftById } from "@/repositories/drafts";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function DraftDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const draft = await fetchDraftById(id);

  if (!draft) {
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

  return (
    <div className="space-y-6">
      <PageHeader title="Editar borrador" />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {draft.leads?.business_name ?? "Sin lead"}
            </p>
            <p className="text-sm text-muted">
              Última actualización {formatDateTime(draft.updated_at)}
            </p>
          </div>
          <div className="flex gap-3">
            <DraftStatusBadge status={draft.status} />
            {draft.leads?.id ? (
              <Link
                className={buttonVariants({ variant: "secondary", size: "sm" })}
                href={`/sends?leadId=${draft.leads.id}&draftId=${draft.id}&sentTo=${encodeURIComponent(draft.leads.public_email ?? "")}`}
              >
                Registrar envío
              </Link>
            ) : null}
          </div>
        </div>

        <DraftEditForm
          action={updateDraftAction.bind(null, draft.id)}
          initialValues={draft}
        />
      </Card>
    </div>
  );
}
