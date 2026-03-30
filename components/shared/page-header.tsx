import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          Interchile Clima
        </p>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="max-w-3xl text-sm text-muted">{description}</p>
        </div>
      </div>
      {actionHref && actionLabel ? (
        <Link className={buttonVariants({ variant: "primary" })} href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
