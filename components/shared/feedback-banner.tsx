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
          ? "border border-[rgba(47,101,64,0.18)] bg-success-soft/70 p-4"
          : "border border-[rgba(122,60,50,0.18)] bg-danger-soft/70 p-4"
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
            isSuccess ? "text-sm text-[#2f6540]" : "text-sm text-[#7a3c32]"
          }
        >
          {message}
        </p>
      </div>
    </Card>
  );
}
