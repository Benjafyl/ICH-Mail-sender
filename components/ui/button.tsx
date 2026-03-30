import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-[#284f47] border border-transparent",
  secondary:
    "bg-surface text-foreground border border-border hover:border-border-strong hover:bg-surface-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-accent-soft/70 border border-transparent",
  danger:
    "bg-[#8b4031] text-white border border-transparent hover:bg-[#763629]",
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
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-60",
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
