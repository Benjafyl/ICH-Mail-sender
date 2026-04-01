import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface OptOutFormProps {
  action: (formData: FormData) => void | Promise<void>;
  leadOptions: Array<{ id: string; business_name: string; public_email: string | null }>;
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

export function OptOutForm({ action, leadOptions }: OptOutFormProps) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Lead (opcional)">
        <Select name="lead_id" defaultValue="">
          <option value="">Sin lead asociado</option>
          {leadOptions.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.business_name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Email">
        <Input name="email" type="email" required />
      </Field>

      <div className="md:col-span-2">
      <Field label="Motivo">
        <Textarea
          name="reason"
          defaultValue="Solicitó no recibir más contacto comercial."
        />
      </Field>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" variant="danger">
          Registrar opt-out
        </Button>
      </div>
    </form>
  );
}
