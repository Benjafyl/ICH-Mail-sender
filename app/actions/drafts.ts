"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { buildGeneratedDraft, ensureLeadCanReceiveContact } from "@/services/draft-service";
import { insertDraft, updateDraft, updateDraftStatus } from "@/repositories/drafts";

const draftSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  body: z.string().trim().min(1, "Body is required."),
  status: z.enum(["draft", "approved", "rejected", "sent"]),
});

export async function generateDraftAction(leadId: string) {
  try {
    const payload = await buildGeneratedDraft(leadId);
    await insertDraft(payload);
  } catch (error) {
    redirect(`/leads/${leadId}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to generate draft.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/drafts");
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
  redirect(`/leads/${leadId}?success=${encodeURIComponent("Borrador generado correctamente.")}`);
}

export async function updateDraftAction(draftId: string, formData: FormData) {
  const parsed = draftSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/drafts/${draftId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid draft data.")}`);
  }

  try {
    await updateDraft(draftId, parsed.data);
  } catch (error) {
    redirect(`/drafts/${draftId}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to update draft.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/drafts");
  revalidatePath(`/drafts/${draftId}`);
  redirect(`/drafts/${draftId}?success=${encodeURIComponent("Draft actualizado.")}`);
}

export async function updateDraftStatusAction(
  draftId: string,
  status: "approved" | "rejected" | "draft" | "sent",
  returnPath = "/drafts",
) {
  try {
    await updateDraftStatus(draftId, status);
  } catch (error) {
    redirect(`${returnPath}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to update draft status.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/drafts");
  redirect(`${returnPath}?success=${encodeURIComponent("Estado del draft actualizado.")}`);
}

export async function createManualDraftAction(leadId: string, formData: FormData) {
  const parsed = draftSchema.safeParse({
    ...Object.fromEntries(formData),
    status: "draft",
  });

  if (!parsed.success) {
    redirect(`/leads/${leadId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid draft data.")}`);
  }

  try {
    await ensureLeadCanReceiveContact(leadId);
    await insertDraft({
      lead_id: leadId,
      subject: parsed.data.subject,
      body: parsed.data.body,
      status: "draft",
    });
  } catch (error) {
    redirect(`/leads/${leadId}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to create draft.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/drafts");
  revalidatePath(`/leads/${leadId}`);
  redirect(`/leads/${leadId}?success=${encodeURIComponent("Draft manual creado.")}`);
}
