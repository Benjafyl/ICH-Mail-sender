import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border border-[#1b5b93] bg-[linear-gradient(180deg,#2b7bc1_0%,#1d6db4_100%)] !text-white shadow-[0_10px_24px_rgba(29,109,180,0.22)] hover:border-[#164d7c] hover:bg-[linear-gradient(180deg,#256da9_0%,#16598f_100%)]",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-muted",
  ghost:
    "border border-transparent bg-transparent text-accent-strong hover:bg-accent-soft",
  danger:
    "border border-transparent bg-danger text-white hover:bg-[var(--danger-strong)]",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-sm",
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
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 disabled:pointer-events-none disabled:opacity-60",
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
