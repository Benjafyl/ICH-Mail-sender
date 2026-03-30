import Link from "next/link";

import { updateDraftStatusAction } from "@/app/actions/drafts";
import { EmptyState } from "@/components/shared/empty-state";
import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { PageHeader } from "@/components/shared/page-header";
import { DraftStatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { fetchDrafts } from "@/repositories/drafts";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function DraftsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const drafts = await fetchDrafts();
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
      <PageHeader title="Drafts" />

      <FeedbackBanner tone="success" message={success} />
      <FeedbackBanner tone="error" message={error} />

      <Card className="p-5">
        {drafts.length === 0 ? (
          <EmptyState title="Sin drafts" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="pb-3 font-medium">Subject</th>
                  <th className="pb-3 font-medium">Lead</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Updated</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-border/60">
                    <td className="py-3">
                      <Link
                        className="font-medium text-foreground hover:text-accent"
                        href={`/drafts/${draft.id}`}
                      >
                        {draft.subject}
                      </Link>
                    </td>
                    <td className="py-3 text-muted">
                      {draft.leads?.business_name ?? "Sin lead"}
                    </td>
                    <td className="py-3">
                      <DraftStatusBadge status={draft.status} />
                    </td>
                    <td className="py-3 text-muted">
                      {formatDateTime(draft.updated_at)}
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                          })}
                          href={`/drafts/${draft.id}`}
                        >
                          Editar
                        </Link>
                        {draft.status !== "approved" ? (
                          <form
                            action={updateDraftStatusAction.bind(
                              null,
                              draft.id,
                              "approved",
                              "/drafts",
                            )}
                          >
                            <button
                              className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                              })}
                              type="submit"
                            >
                              Aprobar
                            </button>
                          </form>
                        ) : null}
                      </div>
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
