import { requireSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadAnalysisInsert } from "@/types/domain";

export async function upsertLeadAnalysis(payload: LeadAnalysisInsert) {
  const supabase = await requireSupabaseServerClient();

  const { error } = await supabase.from("lead_analysis").upsert(payload, {
    onConflict: "lead_id",
  });

  if (error) {
    throw new Error(`Unable to save analysis: ${error.message}`);
  }
}
