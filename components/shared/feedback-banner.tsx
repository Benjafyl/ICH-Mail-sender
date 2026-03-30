import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FeedbackBannerProps {
  tone: "success" | "error";
  message?: string;
}

export function FeedbackBanner({ tone, message }: FeedbackBannerProps) {
  if (!message) {
    return null;
  }

  const isSuccess = tone === "success";

  return (
    <Card
      className={
        isSuccess
          ? "border border-[rgba(45,95,145,0.16)] bg-success-soft p-4"
          : "border border-[rgba(140,49,67,0.16)] bg-danger-soft p-4"
      }
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant={isSuccess ? "success" : "danger"}>
            {isSuccess ? "Actualizado" : "Error"}
          </Badge>
        </div>
        <p
          className={
            isSuccess
              ? "text-sm text-[var(--success-text)]"
              : "text-sm text-[var(--danger-text)]"
          }
        >
          {message}
        </p>
      </div>
    </Card>
  );
}
