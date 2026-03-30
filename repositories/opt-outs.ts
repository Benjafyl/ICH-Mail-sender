import {
  createSupabaseServerClientOrNull,
  requireSupabaseServerClient,
} from "@/lib/supabase/server";
import { normalizeEmail } from "@/lib/utils";
import type { Lead, OptOut, OptOutInsert } from "@/types/domain";

type OptOutQueryRow = OptOut & {
  leads?: Pick<Lead, "id" | "business_name" | "public_email"> | null;
};

export async function fetchOptOuts() {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return [] as OptOutQueryRow[];
  }

  const { data, error } = await supabase
    .from("opt_outs")
    .select("*, leads(id, business_name, public_email)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load opt-outs: ${error.message}`);
  }

  return (data as OptOutQueryRow[] | null) ?? [];
}

export async function insertOptOut(payload: OptOutInsert) {
  const supabase = await requireSupabaseServerClient();

  const { error } = await supabase.from("opt_outs").upsert(payload, {
    onConflict: "email",
  });

  if (error) {
    throw new Error(`Unable to save opt-out: ${error.message}`);
  }
}

export async function isEmailOptedOut(email?: string | null) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("opt_outs")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to validate opt-out: ${error.message}`);
  }

  return Boolean(data);
}
