import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SendFormProps {
  action: (formData: FormData) => void | Promise<void>;
  leadOptions: Array<{ id: string; business_name: string; public_email: string | null }>;
  draftOptions: Array<{ id: string; label: string }>;
  defaults?: {
    leadId?: string;
    draftId?: string;
    sentTo?: string;
  };
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

export function SendForm({
  action,
  leadOptions,
  draftOptions,
  defaults,
}: SendFormProps) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Lead">
        <Select name="lead_id" defaultValue={defaults?.leadId ?? ""} required>
          <option value="">Selecciona un lead</option>
          {leadOptions.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.business_name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Draft">
        <Select
          name="email_draft_id"
          defaultValue={defaults?.draftId ?? ""}
          required
        >
          <option value="">Selecciona un draft</option>
          {draftOptions.map((draft) => (
            <option key={draft.id} value={draft.id}>
              {draft.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Sent to">
        <Input
          name="sent_to"
          type="email"
          defaultValue={defaults?.sentTo ?? ""}
          required
        />
      </Field>

      <Field label="Provider">
        <Input name="provider" defaultValue="manual" required />
      </Field>

      <Field label="Sent at">
        <Input
          name="sent_at"
          type="datetime-local"
          defaultValue={new Date().toISOString().slice(0, 16)}
          required
        />
      </Field>

      <Field label="Response status">
        <Input
          name="response_status"
          defaultValue="delivered"
          placeholder="delivered, pending, bounced..."
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Notes">
          <Textarea name="notes" />
        </Field>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit">Registrar envío</Button>
      </div>
    </form>
  );
}
