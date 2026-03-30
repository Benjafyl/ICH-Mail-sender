import { isSupabaseConfigured } from "@/lib/env";

export function Topbar() {
  return (
    <div className="flex flex-col gap-3 border-b border-white/60 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">
          Sistema interno de prospección
        </p>
        <p className="text-sm text-muted">
          MVP centrado en leads, análisis comercial, drafts, envíos y opt-outs.
        </p>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>
          {new Intl.DateTimeFormat("es-CL", { dateStyle: "full" }).format(
            new Date(),
          )}
        </span>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
          {isSupabaseConfigured()
            ? "Supabase conectado"
            : "Falta configurar Supabase"}
        </span>
      </div>
    </div>
  );
}
