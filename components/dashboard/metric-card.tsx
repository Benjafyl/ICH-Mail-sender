import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: number;
  hint?: string;
}

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="space-y-1">
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {hint ? <p className="text-sm text-muted">{hint}</p> : null}
        </div>
      </div>
    </Card>
  );
}
