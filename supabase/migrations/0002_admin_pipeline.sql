-- widen the status lifecycle
alter table public.submissions drop constraint if exists submissions_status_check;
alter table public.submissions
  add constraint submissions_status_check
  check (status in ('new','contacted','proposal_sent','won','lost'));

-- migrate any existing 'closed' rows to 'won' as a safe default
update public.submissions set status = 'won' where status = 'closed';

alter table public.submissions add column if not exists last_contacted_at timestamptz;
alter table public.submissions add column if not exists estimated_value numeric;

create table public.submission_notes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

alter table public.submission_notes enable row level security;

create policy "Admins can read notes"
  on public.submission_notes for select to authenticated using (true);

create policy "Admins can add notes"
  on public.submission_notes for insert to authenticated
  with check (true);
