import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { emailDraftStatuses, type EmailDraft } from "@/types/domain";

interface DraftEditFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initialValues: EmailDraft;
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

export function DraftEditForm({
  action,
  initialValues,
}: DraftEditFormProps) {
  return (
    <form action={action} className="space-y-4">
      <Field label="Subject">
        <Input name="subject" defaultValue={initialValues.subject} required />
      </Field>

      <Field label="Body">
        <Textarea name="body" defaultValue={initialValues.body} required />
      </Field>

      <Field label="Status">
        <Select name="status" defaultValue={initialValues.status}>
          {emailDraftStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex justify-end">
        <Button type="submit">Guardar draft</Button>
      </div>
    </form>
  );
}
