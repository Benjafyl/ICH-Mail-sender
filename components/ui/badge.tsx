import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variants = {
  neutral: "bg-surface-muted text-foreground border border-border",
  info: "bg-accent-soft text-accent border border-transparent",
  warning: "bg-warning-soft text-[#70572b] border border-transparent",
  success: "bg-success-soft text-[#2f6540] border border-transparent",
  danger: "bg-danger-soft text-[#7a3c32] border border-transparent",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
