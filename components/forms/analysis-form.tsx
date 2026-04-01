import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getRecommendedServiceLabel,
  recommendedServices,
  type LeadAnalysis,
} from "@/types/domain";

interface AnalysisFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: LeadAnalysis | null;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export function AnalysisForm({ action, initialValues }: AnalysisFormProps) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Servicio recomendado">
        <Select
          name="recommended_service"
          defaultValue={initialValues?.recommended_service ?? "evaluation"}
        >
          {recommendedServices.map((service) => (
            <option key={service} value={service}>
              {getRecommendedServiceLabel(service)}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Nivel de confianza">
        <Input
          name="confidence_score"
          type="number"
          min="0"
          max="1"
          step="0.01"
          defaultValue={initialValues?.confidence_score ?? 0.5}
          required
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Fundamento">
          <Textarea
            name="reasoning"
            defaultValue={initialValues?.reasoning ?? ""}
            required
          />
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field label="Señales detectadas">
          <Textarea
            name="detected_signals"
            defaultValue={initialValues?.detected_signals?.join("\n") ?? ""}
            placeholder="Una señal por línea"
          />
        </Field>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" variant="secondary">
          Guardar análisis
        </Button>
      </div>
    </form>
  );
}
