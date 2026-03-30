insert into leads (
  business_name,
  category,
  city,
  commune,
  website,
  public_email,
  phone,
  source_url,
  notes
)
values
  (
    'Hotel Santa Lucía Centro',
    'Hotelería',
    'Santiago',
    'Santiago Centro',
    'https://hotelsantalucia.example.com',
    'contacto@hotelsantalucia.cl',
    '+56 2 2555 1100',
    'https://maps.google.com/?q=Hotel+Santa+Lucia+Centro',
    'Hotel mediano con operación continua y alto uso de climatización.'
  ),
  (
    'Clínica Bosque Norte',
    'Salud',
    'Santiago',
    'Las Condes',
    'https://clinicabosquenorte.example.com',
    'mantencion@clinicabosquenorte.cl',
    '+56 2 2440 8820',
    'https://maps.google.com/?q=Clinica+Bosque+Norte',
    'Necesidad probable de mantención preventiva y continuidad operacional.'
  ),
  (
    'Café Mar de Viña',
    'Gastronomía',
    'Viña del Mar',
    'Reñaca',
    'https://cafemardevina.example.com',
    'gerencia@cafemardevina.cl',
    '+56 32 288 9012',
    'https://maps.google.com/?q=Cafe+Mar+de+Vina',
    'Expansión reciente, posible instalación o evaluación inicial.'
  ),
  (
    'Retail Costanera Equipamiento',
    'Retail',
    'Santiago',
    'Providencia',
    'https://retailcostanera.example.com',
    'operaciones@retailcostanera.cl',
    '+56 2 2988 4421',
    'https://maps.google.com/?q=Retail+Costanera+Equipamiento',
    'Cadena con equipos visibles de distintas generaciones.'
  );

insert into lead_analysis (
  lead_id,
  recommended_service,
  confidence_score,
  reasoning,
  detected_signals
)
select
  id,
  'maintenance'::recommended_service,
  0.82,
  'Operación establecida con continuidad operacional crítica y necesidad probable de mantención periódica.',
  array['operación continua', 'alto flujo de clientes', 'equipos HVAC críticos']
from leads
where business_name = 'Clínica Bosque Norte'
union all
select
  id,
  'installation'::recommended_service,
  0.71,
  'Negocio en expansión en Reñaca, con señales de apertura y necesidad de habilitar climatización comercial.',
  array['expansión reciente', 'local gastronómico', 'probable nueva habilitación']
from leads
where business_name = 'Café Mar de Viña'
union all
select
  id,
  'replacement'::recommended_service,
  0.76,
  'Se observan señales de renovación pendiente y foco en eficiencia energética para espacios de atención.',
  array['equipos antiguos', 'operación retail', 'optimización de costos']
from leads
where business_name = 'Retail Costanera Equipamiento';

insert into email_drafts (
  lead_id,
  subject,
  body,
  status,
  reviewed_at
)
select
  id,
  'Interchile Clima | Continuidad operativa para Clínica Bosque Norte',
  'Hola equipo de Clínica Bosque Norte,\n\nVemos una oportunidad para apoyar su operación con un plan de mantención HVAC preventivo y una revisión técnica focalizada.\n\nSi les parece, coordinamos una breve conversación para levantar el contexto actual y proponer una mejora concreta.\n\nSaludos,\nBenjamín\nInterchile Clima',
  'approved'::email_draft_status,
  timezone('utc', now()) - interval '1 day'
from leads
where business_name = 'Clínica Bosque Norte'
union all
select
  id,
  'Interchile Clima | Evaluación inicial para Hotel Santa Lucía Centro',
  'Hola equipo de Hotel Santa Lucía Centro,\n\nNos gustaría proponer una evaluación técnica breve de su sistema de climatización para detectar oportunidades de mejora y continuidad operacional.\n\nQuedo atento si les hace sentido revisar esto.\n\nSaludos,\nBenjamín\nInterchile Clima',
  'draft'::email_draft_status,
  null
from leads
where business_name = 'Hotel Santa Lucía Centro'
union all
select
  id,
  'Interchile Clima | Instalación para Café Mar de Viña',
  'Hola equipo de Café Mar de Viña,\n\nVemos una oportunidad para apoyar su nueva operación con una propuesta de instalación de climatización comercial y una evaluación técnica inicial.\n\nSi quieren, coordinamos una llamada breve esta semana.\n\nSaludos,\nBenjamín\nInterchile Clima',
  'sent'::email_draft_status,
  timezone('utc', now()) - interval '2 day'
from leads
where business_name = 'Café Mar de Viña';

insert into email_sends (
  lead_id,
  email_draft_id,
  sent_to,
  provider,
  sent_at,
  response_status,
  notes
)
select
  leads.id,
  email_drafts.id,
  leads.public_email,
  'manual',
  timezone('utc', now()) - interval '1 day',
  'delivered',
  'Envío registrado manualmente para validar el flujo del MVP.'
from leads
join email_drafts on email_drafts.lead_id = leads.id
where leads.business_name = 'Café Mar de Viña';

insert into opt_outs (
  lead_id,
  email,
  reason
)
select
  id,
  public_email,
  'Solicitó no recibir nuevos contactos comerciales.'
from leads
where business_name = 'Retail Costanera Equipamiento';
