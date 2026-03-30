"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { insertOptOut } from "@/repositories/opt-outs";

const optOutSchema = z.object({
  lead_id: z.string().uuid().optional().or(z.literal("")),
  email: z.string().email(),
  reason: z.string().trim().optional(),
});

function cleanOptional(value?: string) {
  return value?.trim() ? value.trim() : null;
}

export async function createOptOutAction(formData: FormData) {
  const parsed = optOutSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/opt-outs?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid opt-out data.")}`);
  }

  try {
    await insertOptOut({
      lead_id: cleanOptional(parsed.data.lead_id ?? undefined),
      email: parsed.data.email.trim().toLowerCase(),
      reason: cleanOptional(parsed.data.reason),
    });
  } catch (error) {
    redirect(`/opt-outs?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to save opt-out.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath("/opt-outs");
  redirect(`/opt-outs?success=${encodeURIComponent("Opt-out registrado correctamente.")}`);
}
