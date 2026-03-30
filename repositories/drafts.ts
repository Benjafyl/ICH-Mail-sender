import {
  createSupabaseServerClientOrNull,
  requireSupabaseServerClient,
} from "@/lib/supabase/server";
import type {
  EmailDraft,
  EmailDraftInsert,
  EmailDraftStatus,
  EmailDraftUpdate,
  Lead,
} from "@/types/domain";

type DraftQueryRow = EmailDraft & {
  leads?: Pick<Lead, "id" | "business_name" | "public_email" | "city"> | null;
};

export async function fetchDrafts() {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return [] as DraftQueryRow[];
  }

  const { data, error } = await supabase
    .from("email_drafts")
    .select("*, leads(id, business_name, public_email, city)")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load drafts: ${error.message}`);
  }

  return (data as DraftQueryRow[] | null) ?? [];
}

export async function fetchDraftById(id: string) {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("email_drafts")
    .select("*, leads(id, business_name, public_email, city)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load draft: ${error.message}`);
  }

  return (data as DraftQueryRow | null) ?? null;
}

export async function insertDraft(payload: EmailDraftInsert) {
  const supabase = await requireSupabaseServerClient();

  const { data, error } = await supabase
    .from("email_drafts")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Unable to create draft: ${error.message}`);
  }

  return data.id;
}

export async function updateDraft(id: string, payload: EmailDraftUpdate) {
  const supabase = await requireSupabaseServerClient();

  const { error } = await supabase
    .from("email_drafts")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update draft: ${error.message}`);
  }
}

export async function updateDraftStatus(id: string, status: EmailDraftStatus) {
  const supabase = await requireSupabaseServerClient();
  const reviewedAt =
    status === "approved" || status === "rejected"
      ? new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("email_drafts")
    .update({
      status,
      reviewed_at: reviewedAt,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update draft status: ${error.message}`);
  }
}
