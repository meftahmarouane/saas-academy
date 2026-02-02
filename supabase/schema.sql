-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  level int default 1,
  current_xp int default 0,
  current_streak int default 0,
  longest_streak int default 0,
  target_mrr numeric default 1000,
  start_date timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- MRR LOGS table
create table public.mrr_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null,
  date timestamp with time zone default timezone('utc'::text, now()),
  category text check (category in ('new', 'expansion', 'churn', 'initial')),
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- USER PROGRESS table
create table public.user_progress (
  user_id uuid references public.profiles(id) not null,
  module_id text not null,
  lesson_id text not null,
  completed boolean default false,
  input_data jsonb default '{}'::jsonb,
  completed_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, module_id, lesson_id)
);

-- ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.mrr_logs enable row level security;
alter table public.user_progress enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can view own mrr logs" on public.mrr_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own mrr logs" on public.mrr_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can view own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert/update own progress" on public.user_progress
  for all using (auth.uid() = user_id);

-- TRIGGER for new user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
