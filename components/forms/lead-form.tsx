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
      <Field label="Nombre del negocio">
        <Input
          name="business_name"
          defaultValue={initialValues?.business_name ?? ""}
          required
        />
      </Field>

      <Field label="Categoría">
        <Input name="category" defaultValue={initialValues?.category ?? ""} />
      </Field>

      <Field label="Ciudad">
        <Input name="city" defaultValue={initialValues?.city ?? ""} />
      </Field>

      <Field label="Comuna">
        <Input name="commune" defaultValue={initialValues?.commune ?? ""} />
      </Field>

      <Field label="Sitio web">
        <Input
          name="website"
          defaultValue={initialValues?.website ?? ""}
          placeholder="https://"
        />
      </Field>

      <Field label="Correo público">
        <Input
          name="public_email"
          type="email"
          defaultValue={initialValues?.public_email ?? ""}
        />
      </Field>

      <Field label="Teléfono">
        <Input name="phone" defaultValue={initialValues?.phone ?? ""} />
      </Field>

      <Field label="URL de origen">
        <Input
          name="source_url"
          defaultValue={initialValues?.source_url ?? ""}
          placeholder="https://"
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Notas">
          <Textarea name="notes" defaultValue={initialValues?.notes ?? ""} />
        </Field>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
