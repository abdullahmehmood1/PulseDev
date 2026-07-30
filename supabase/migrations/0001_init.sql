create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('contact','booking')),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  budget text,
  preferred_date text,
  message text not null,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

drop policy if exists "Public can submit" on public.submissions;
create policy "Public can submit"
  on public.submissions for insert to anon with check (true);

drop policy if exists "Admins can read submissions" on public.submissions;
create policy "Admins can read submissions"
  on public.submissions for select to authenticated using (true);

drop policy if exists "Admins can update submission status" on public.submissions;
create policy "Admins can update submission status"
  on public.submissions for update to authenticated
  using (true) with check (true);
