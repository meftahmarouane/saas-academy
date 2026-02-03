create table public.experiments (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null default auth.uid (),
  hypothesis text not null,
  method text not null,
  status text not null,
  result text null,
  created_at timestamp with time zone not null default now(),
  constraint experiments_pkey primary key (id),
  constraint experiments_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
);

alter table public.experiments enable row level security;

create policy "Users can view their own experiments" on public.experiments
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own experiments" on public.experiments
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own experiments" on public.experiments
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own experiments" on public.experiments
  for delete
  using (auth.uid() = user_id);
