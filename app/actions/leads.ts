"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { insertLead, updateLead } from "@/repositories/leads";

const leadSchema = z.object({
  business_name: z.string().trim().min(1, "Business name is required."),
  category: z.string().trim().optional(),
  city: z.string().trim().optional(),
  commune: z.string().trim().optional(),
  website: z.union([z.literal(""), z.string().url()]).optional(),
  public_email: z.union([z.literal(""), z.string().email()]).optional(),
  phone: z.string().trim().optional(),
  source_url: z.union([z.literal(""), z.string().url()]).optional(),
  notes: z.string().trim().optional(),
});

function cleanOptional(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export async function createLeadAction(formData: FormData) {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/leads/new?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid lead data.")}`);
  }

  let leadId = "";

  try {
    leadId = await insertLead({
      business_name: parsed.data.business_name,
      category: cleanOptional(parsed.data.category),
      city: cleanOptional(parsed.data.city),
      commune: cleanOptional(parsed.data.commune),
      website: cleanOptional(parsed.data.website),
      public_email: cleanOptional(parsed.data.public_email),
      phone: cleanOptional(parsed.data.phone),
      source_url: cleanOptional(parsed.data.source_url),
      notes: cleanOptional(parsed.data.notes),
    });
  } catch (error) {
    redirect(`/leads/new?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to create lead.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  redirect(`/leads/${leadId}?success=${encodeURIComponent("Lead creado correctamente.")}`);
}

export async function updateLeadAction(leadId: string, formData: FormData) {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/leads/${leadId}/edit?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid lead data.")}`);
  }

  try {
    await updateLead(leadId, {
      business_name: parsed.data.business_name,
      category: cleanOptional(parsed.data.category),
      city: cleanOptional(parsed.data.city),
      commune: cleanOptional(parsed.data.commune),
      website: cleanOptional(parsed.data.website),
      public_email: cleanOptional(parsed.data.public_email),
      phone: cleanOptional(parsed.data.phone),
      source_url: cleanOptional(parsed.data.source_url),
      notes: cleanOptional(parsed.data.notes),
    });
  } catch (error) {
    redirect(`/leads/${leadId}/edit?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to update lead.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
  redirect(`/leads/${leadId}?success=${encodeURIComponent("Lead actualizado correctamente.")}`);
}
