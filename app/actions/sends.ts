"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { insertSend } from "@/repositories/sends";
import { ensureLeadCanReceiveContact } from "@/services/draft-service";
import { updateDraftStatus } from "@/repositories/drafts";

const sendSchema = z.object({
  lead_id: z.string().uuid(),
  email_draft_id: z.string().uuid(),
  sent_to: z.string().email(),
  provider: z.string().trim().min(1),
  sent_at: z.string().trim().min(1),
  response_status: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

function cleanOptional(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export async function createSendAction(formData: FormData) {
  const parsed = sendSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/sends?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid send data.")}`);
  }

  try {
    await ensureLeadCanReceiveContact(parsed.data.lead_id);

    await insertSend({
      lead_id: parsed.data.lead_id,
      email_draft_id: parsed.data.email_draft_id,
      sent_to: parsed.data.sent_to,
      provider: parsed.data.provider,
      sent_at: new Date(parsed.data.sent_at).toISOString(),
      response_status: cleanOptional(parsed.data.response_status),
      notes: cleanOptional(parsed.data.notes),
    });

    await updateDraftStatus(parsed.data.email_draft_id, "sent");
  } catch (error) {
    redirect(`/sends?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to register send.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/drafts");
  revalidatePath("/sends");
  revalidatePath(`/leads/${parsed.data.lead_id}`);
  redirect(`/sends?success=${encodeURIComponent("Envío registrado correctamente.")}`);
}
