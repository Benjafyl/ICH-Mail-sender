import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";

export function SetupAlert() {
  if (isSupabaseConfigured()) {
    return null;
  }

  return (
    <Card className="border border-[rgba(112,87,43,0.18)] bg-warning-soft/70 p-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="warning">Setup required</Badge>
          <span className="text-sm font-medium text-[#70572b]">
            Supabase no está configurado todavía.
          </span>
        </div>
        <p className="text-sm text-[#70572b]">
          La UI ya está lista, pero necesitas definir
          {" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code>
          {" "}
          y
          {" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          {" "}
          para usar datos reales.
        </p>
      </div>
    </Card>
  );
}
