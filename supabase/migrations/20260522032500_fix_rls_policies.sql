-- Re-create RLS policies for the registrations table.
-- This fixes two issues:
--   1. INSERT was failing (anon key was blocked by RLS)
--   2. SELECT was not returning rows on the members page

-- Drop any existing policies to avoid conflicts
drop policy if exists "Anyone can submit a registration" on public.registrations;
drop policy if exists "Anon can read registrations" on public.registrations;
drop policy if exists "Password-gated API can read registrations" on public.registrations;

-- Allow anyone (including the anon key from the browser) to insert registrations
create policy "Anyone can submit a registration"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

-- Allow anyone to read registrations (the password gate is in the app code)
create policy "Anon can read registrations"
  on public.registrations
  for select
  to anon, authenticated
  using (true);
