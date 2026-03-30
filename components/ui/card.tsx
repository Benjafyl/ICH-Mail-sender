import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "panel-surface rounded-2xl border border-white/70 bg-surface/90 shadow-[0_10px_40px_rgba(32,52,46,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
