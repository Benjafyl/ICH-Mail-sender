import {
  createSupabaseServerClientOrNull,
  requireSupabaseServerClient,
} from "@/lib/supabase/server";
import type {
  LeadAnalysis,
  LeadInsert,
  LeadRecordBase,
  LeadUpdate,
} from "@/types/domain";

type LeadQueryRow = {
  id: string;
  business_name: string;
  category: string | null;
  city: string | null;
  commune: string | null;
  website: string | null;
  public_email: string | null;
  phone: string | null;
  source_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  lead_analysis?: LeadAnalysis | LeadAnalysis[] | null;
  email_drafts?: LeadRecordBase["drafts"] | null;
  email_sends?: LeadRecordBase["sends"] | null;
};

function normalizeAnalysis(
  value?: LeadAnalysis | LeadAnalysis[] | null,
): LeadAnalysis | null {
  if (!value) {
    return null;
  }

  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function mapLeadRow(row: LeadQueryRow): LeadRecordBase {
  return {
    id: row.id,
    business_name: row.business_name,
    category: row.category,
    city: row.city,
    commune: row.commune,
    website: row.website,
    public_email: row.public_email,
    phone: row.phone,
    source_url: row.source_url,
    notes: row.notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
    analysis: normalizeAnalysis(row.lead_analysis),
    drafts: row.email_drafts ?? [],
    sends: row.email_sends ?? [],
  };
}

export async function fetchLeadRecords() {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return [] as LeadRecordBase[];
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      `
        *,
        lead_analysis (*),
        email_drafts (*),
        email_sends (*)
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load leads: ${error.message}`);
  }

  return ((data as LeadQueryRow[] | null) ?? []).map(mapLeadRow);
}

export async function fetchLeadRecordById(id: string) {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      `
        *,
        lead_analysis (*),
        email_drafts (*),
        email_sends (*)
      `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load lead: ${error.message}`);
  }

  return data ? mapLeadRow(data as LeadQueryRow) : null;
}

export async function insertLead(payload: LeadInsert) {
  const supabase = await requireSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Unable to create lead: ${error.message}`);
  }

  return data.id;
}

export async function updateLead(id: string, payload: LeadUpdate) {
  const supabase = await requireSupabaseServerClient();
  const { error } = await supabase.from("leads").update(payload).eq("id", id);

  if (error) {
    throw new Error(`Unable to update lead: ${error.message}`);
  }
}

export async function fetchLeadReferenceOptions() {
  const supabase = await createSupabaseServerClientOrNull();

  if (!supabase) {
    return [] as Array<{
      id: string;
      business_name: string;
      public_email: string | null;
    }>;
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id, business_name, public_email")
    .order("business_name");

  if (error) {
    throw new Error(`Unable to load lead options: ${error.message}`);
  }

  return data ?? [];
}
