export function Topbar() {
  return (
    <div className="flex flex-col gap-3 border-b border-white/60 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">Interchile Clima</p>
        <p className="text-sm text-muted">Panel comercial interno</p>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>
          {new Intl.DateTimeFormat("es-CL", { dateStyle: "full" }).format(
            new Date(),
          )}
        </span>
      </div>
    </div>
  );
}
