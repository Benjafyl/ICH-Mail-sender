import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border border-transparent bg-accent text-white shadow-sm hover:bg-accent-strong",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-muted",
  ghost:
    "border border-transparent bg-transparent text-accent-strong hover:bg-accent-soft",
  danger:
    "border border-transparent bg-danger text-white hover:bg-[var(--danger-strong)]",
};

const sizes = {
  md: "h-10 px-4 text-sm",
  sm: "h-9 px-3 text-sm",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function buttonVariants({
  className,
  variant = "primary",
  size = "md",
}: Pick<ButtonProps, "className" | "variant" | "size">) {
  return cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, variant, size })}
      {...props}
    />
  );
}
