create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'recommended_service') then
    create type recommended_service as enum ('maintenance', 'installation', 'replacement', 'evaluation');
  end if;

  if not exists (select 1 from pg_type where typname = 'email_draft_status') then
    create type email_draft_status as enum ('draft', 'approved', 'rejected', 'sent');
  end if;
end $$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  category text,
  city text,
  commune text,
  website text,
  public_email text,
  phone text,
  source_url text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists lead_analysis (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references leads(id) on delete cascade,
  recommended_service recommended_service not null default 'evaluation',
  confidence_score numeric(4, 2) not null default 0.50 check (confidence_score >= 0 and confidence_score <= 1),
  reasoning text not null,
  detected_signals text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists email_drafts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  subject text not null,
  body text not null,
  status email_draft_status not null default 'draft',
  reviewed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists email_sends (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  email_draft_id uuid not null references email_drafts(id) on delete restrict,
  sent_to text not null,
  provider text not null,
  sent_at timestamptz not null default timezone('utc', now()),
  response_status text,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists opt_outs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  email text not null unique,
  reason text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists leads_city_idx on leads(city);
create index if not exists leads_category_idx on leads(category);
create index if not exists leads_public_email_idx on leads(public_email);
create index if not exists lead_analysis_lead_id_idx on lead_analysis(lead_id);
create index if not exists email_drafts_lead_id_idx on email_drafts(lead_id);
create index if not exists email_drafts_status_idx on email_drafts(status);
create index if not exists email_sends_lead_id_idx on email_sends(lead_id);
create index if not exists email_sends_draft_id_idx on email_sends(email_draft_id);
create index if not exists opt_outs_email_idx on opt_outs(email);

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
before update on leads
for each row
execute function set_updated_at();

drop trigger if exists lead_analysis_set_updated_at on lead_analysis;
create trigger lead_analysis_set_updated_at
before update on lead_analysis
for each row
execute function set_updated_at();

drop trigger if exists email_drafts_set_updated_at on email_drafts;
create trigger email_drafts_set_updated_at
before update on email_drafts
for each row
execute function set_updated_at();
