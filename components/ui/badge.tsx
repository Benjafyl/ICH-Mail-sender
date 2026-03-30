import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variants = {
  neutral: "bg-surface-muted text-foreground border border-border",
  info: "bg-accent-soft text-accent-strong border border-transparent",
  warning: "bg-warning-soft text-[var(--warning-text)] border border-transparent",
  success: "bg-success-soft text-[var(--success-text)] border border-transparent",
  danger: "bg-danger-soft text-[var(--danger-text)] border border-transparent",
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
