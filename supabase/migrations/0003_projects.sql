create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  tech_stack text[] default '{}',
  project_url text,
  image_url text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Public can view projects"
  on public.projects for select to anon using (true);

create policy "Admins can manage projects"
  on public.projects for all to authenticated
  using (true) with check (true);
