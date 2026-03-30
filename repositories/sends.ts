import {
  createSupabaseServerClientOrNull,
  requireSupabaseServerClient,
} from "@/lib/supabase/server";
import type { EmailDraft, EmailSend, EmailSendInsert, Lead } from "@/types/domain";

type SendQueryRow = EmailSend & {
  leads?: Pick<Lead, "id" | "business_name" | "public_email"> | null;
  email_drafts?: Pick<EmailDraft, "id" | "subject" | "status"> | null;
};

export async function fetchSends() {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return [] as SendQueryRow[];
  }

  const { data, error } = await supabase
    .from("email_sends")
    .select(
      "*, leads(id, business_name, public_email), email_drafts(id, subject, status)",
    )
    .order("sent_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load send records: ${error.message}`);
  }

  return (data as SendQueryRow[] | null) ?? [];
}

export async function insertSend(payload: EmailSendInsert) {
  const supabase = await requireSupabaseServerClient();

  const { data, error } = await supabase
    .from("email_sends")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Unable to register send: ${error.message}`);
  }

  return data.id;
}
