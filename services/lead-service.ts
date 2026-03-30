import { normalizeEmail } from "@/lib/utils";
import { fetchLeadRecordById, fetchLeadRecords } from "@/repositories/leads";
import { fetchOptOuts } from "@/repositories/opt-outs";
import type {
  LeadFilters,
  LeadRecord,
  LeadRecordBase,
  LeadWorkflowStatus,
} from "@/types/domain";

function isPresent(value: string | null): value is string {
  return Boolean(value);
}

function getLatestDraft(record: LeadRecordBase) {
  return [...record.drafts].sort((left, right) => {
    return (
      new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime()
    );
  })[0];
}

export function deriveLeadWorkflowStatus(
  record: LeadRecordBase,
  isOptedOut: boolean,
): LeadWorkflowStatus {
  if (isOptedOut) {
    return "opted_out";
  }

  if (record.sends.length > 0) {
    return "sent";
  }

  if (record.drafts.some((draft) => draft.status === "approved")) {
    return "approved";
  }

  if (getLatestDraft(record)) {
    return "draft_pending";
  }

  return record.analysis ? "draft_pending" : "pending_analysis";
}

function enrichLead(
  record: LeadRecordBase,
  optedOutEmails: Set<string>,
): LeadRecord {
  const isOptedOut = optedOutEmails.has(normalizeEmail(record.public_email));

  return {
    ...record,
    isOptedOut,
    workflowStatus: deriveLeadWorkflowStatus(record, isOptedOut),
  };
}

function matchesFilters(record: LeadRecord, filters: LeadFilters) {
  const query = filters.query?.trim().toLowerCase();

  if (query) {
    const haystack = [record.business_name, record.public_email ?? ""]
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(query)) {
      return false;
    }
  }

  if (filters.city && record.city !== filters.city) {
    return false;
  }

  if (filters.category && record.category !== filters.category) {
    return false;
  }

  if (
    filters.status &&
    filters.status !== "all" &&
    record.workflowStatus !== filters.status
  ) {
    return false;
  }

  return true;
}

async function loadOptOutEmailSet() {
  const optOuts = await fetchOptOuts();

  return new Set(optOuts.map((entry) => normalizeEmail(entry.email)));
}

export async function listLeads(filters: LeadFilters = {}) {
  const [records, optedOutEmails] = await Promise.all([
    fetchLeadRecords(),
    loadOptOutEmailSet(),
  ]);

  return records
    .map((record) => enrichLead(record, optedOutEmails))
    .filter((record) => matchesFilters(record, filters));
}

export async function getLeadById(id: string) {
  const [record, optedOutEmails] = await Promise.all([
    fetchLeadRecordById(id),
    loadOptOutEmailSet(),
  ]);

  return record ? enrichLead(record, optedOutEmails) : null;
}

export async function getLeadFilterOptions() {
  const leads = await fetchLeadRecords();

  const cities = [...new Set(leads.map((lead) => lead.city).filter(isPresent))].sort();
  const categories = [
    ...new Set(leads.map((lead) => lead.category).filter(isPresent)),
  ].sort();

  return {
    cities,
    categories,
  };
}
