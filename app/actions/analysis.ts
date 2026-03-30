"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { upsertLeadAnalysis } from "@/repositories/analysis";

const analysisSchema = z.object({
  recommended_service: z.enum([
    "maintenance",
    "installation",
    "replacement",
    "evaluation",
  ]),
  confidence_score: z.coerce.number().min(0).max(1),
  reasoning: z.string().trim().min(1, "Reasoning is required."),
  detected_signals: z.string().optional(),
});

function parseSignals(input?: string) {
  return (
    input
      ?.split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  );
}

export async function upsertLeadAnalysisAction(
  leadId: string,
  formData: FormData,
) {
  const parsed = analysisSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    redirect(`/leads/${leadId}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Invalid analysis data.")}`);
  }

  try {
    await upsertLeadAnalysis({
      lead_id: leadId,
      recommended_service: parsed.data.recommended_service ?? "evaluation",
      confidence_score: parsed.data.confidence_score,
      reasoning: parsed.data.reasoning,
      detected_signals: parseSignals(parsed.data.detected_signals),
    });
  } catch (error) {
    redirect(`/leads/${leadId}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to save analysis.")}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);
  redirect(`/leads/${leadId}?success=${encodeURIComponent("Análisis guardado.")}`);
}
