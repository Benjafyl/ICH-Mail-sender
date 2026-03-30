import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="max-w-xl text-sm text-muted">{description}</p>
        ) : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </Card>
  );
}
