import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}
