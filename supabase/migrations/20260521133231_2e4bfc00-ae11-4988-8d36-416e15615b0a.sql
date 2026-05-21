
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  ward text,
  address text,
  gender text,
  age_range text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

create policy "Anyone can submit a registration"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);
