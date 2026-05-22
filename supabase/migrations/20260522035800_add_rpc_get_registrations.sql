-- Create a secure RPC function to fetch registrations with a password gate.
-- This function runs with SECURITY DEFINER privileges (as database owner),
-- which bypasses Row Level Security (RLS) entirely, avoiding the need for Vercel env vars.

create or replace function public.get_registrations(pass text)
returns table (
  id uuid,
  full_name text,
  phone text,
  email text,
  ward text,
  address text,
  gender text,
  age_range text,
  message text,
  created_at timestamptz
)
language plpgsql
security definer
as $$
begin
  if pass = 'sterces' then
    return query
    select
      r.id,
      r.full_name,
      r.phone,
      r.email,
      r.ward,
      r.address,
      r.gender,
      r.age_range,
      r.message,
      r.created_at
    from public.registrations r
    order by r.created_at desc;
  else
    raise exception 'Invalid password';
  end if;
end;
$$;
