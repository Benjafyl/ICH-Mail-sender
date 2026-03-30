import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "panel-surface rounded-2xl border border-border bg-surface/95 shadow-[0_16px_40px_rgba(16,40,63,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
