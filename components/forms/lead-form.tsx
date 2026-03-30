import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Lead } from "@/types/domain";

interface LeadFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Partial<Lead>;
  submitLabel: string;
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

export function LeadForm({
  action,
  initialValues,
  submitLabel,
}: LeadFormProps) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <Field label="Business name">
        <Input
          name="business_name"
          defaultValue={initialValues?.business_name ?? ""}
          required
        />
      </Field>

      <Field label="Category">
        <Input name="category" defaultValue={initialValues?.category ?? ""} />
      </Field>

      <Field label="City">
        <Input name="city" defaultValue={initialValues?.city ?? ""} />
      </Field>

      <Field label="Commune">
        <Input name="commune" defaultValue={initialValues?.commune ?? ""} />
      </Field>

      <Field label="Website">
        <Input
          name="website"
          defaultValue={initialValues?.website ?? ""}
          placeholder="https://"
        />
      </Field>

      <Field label="Public email">
        <Input
          name="public_email"
          type="email"
          defaultValue={initialValues?.public_email ?? ""}
        />
      </Field>

      <Field label="Phone">
        <Input name="phone" defaultValue={initialValues?.phone ?? ""} />
      </Field>

      <Field label="Source URL">
        <Input
          name="source_url"
          defaultValue={initialValues?.source_url ?? ""}
          placeholder="https://"
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Notes">
          <Textarea name="notes" defaultValue={initialValues?.notes ?? ""} />
        </Field>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
