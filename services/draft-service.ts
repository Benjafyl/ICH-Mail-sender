import { isEmailOptedOut } from "@/repositories/opt-outs";
import { getLeadById } from "@/services/lead-service";
import type { EmailDraftInsert } from "@/types/domain";

const serviceCopy = {
  maintenance: "mantención preventiva y continuidad operativa",
  installation:
    "instalación de climatización para una operación nueva o expansión",
  replacement: "recambio de equipos con foco en eficiencia y continuidad",
  evaluation: "evaluación técnica inicial del sistema de climatización",
} as const;

export async function ensureLeadCanReceiveContact(leadId: string) {
  const lead = await getLeadById(leadId);

  if (!lead) {
    throw new Error("Lead not found.");
  }

  if (await isEmailOptedOut(lead.public_email)) {
    throw new Error("This lead has an opt-out and cannot be contacted.");
  }

  return lead;
}

export async function buildGeneratedDraft(
  leadId: string,
): Promise<EmailDraftInsert> {
  const lead = await ensureLeadCanReceiveContact(leadId);
  const recommendedService = lead.analysis?.recommended_service ?? "evaluation";
  const subject = `Interchile Clima | ${lead.business_name} y ${serviceCopy[recommendedService]}`;
  const body = [
    `Hola equipo de ${lead.business_name},`,
    "",
    `Soy Benjamín de Interchile Clima. Revisamos públicamente la operación de su negocio en ${lead.city ?? "la zona"} y detectamos una oportunidad para apoyarlos con ${serviceCopy[recommendedService]}.`,
    "",
    lead.analysis?.reasoning
      ? `Observación inicial: ${lead.analysis.reasoning}`
      : "Nuestra propuesta inicial es realizar una evaluación breve del sistema actual para detectar mejoras, riesgos operativos y posibles eficiencias.",
    "",
    "Si les hace sentido, podemos coordinar una conversación corta y luego compartir una propuesta técnica preliminar.",
    "",
    "Saludos,",
    "Benjamín",
    "Interchile Clima",
  ].join("\n");

  return {
    lead_id: lead.id,
    subject,
    body,
    status: "draft",
  };
}
