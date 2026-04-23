-- Supabase setup for the public client review form and admin moderation page.
-- Run this in the Supabase SQL editor, then create an Auth user for the admin.

create extension if not exists pgcrypto;

create table if not exists public.client_reviews (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(client_name) between 2 and 120),
  client_role text check (client_role is null or char_length(client_role) <= 140),
  service_type text not null check (
    service_type in (
      'Residential Cleaning',
      'Commercial Cleaning',
      'Deep Cleaning',
      'Post-Construction Cleanup',
      'Construction Services',
      'Property Maintenance'
    )
  ),
  rating integer not null check (rating between 1 and 5),
  review text not null check (char_length(review) between 10 and 800),
  is_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_reviews_enabled_created_idx
  on public.client_reviews (is_enabled, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_client_reviews_updated_at on public.client_reviews;

create trigger set_client_reviews_updated_at
before update on public.client_reviews
for each row
execute function public.set_updated_at();

create or replace function public.is_review_admin()
returns boolean
language sql
set search_path = public
as $$
  select auth.uid() is not null;
$$;

alter table public.client_reviews enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.client_reviews to anon, authenticated;
grant insert (
  client_name,
  client_role,
  service_type,
  rating,
  review,
  is_enabled
) on public.client_reviews to anon;
grant update (is_enabled) on public.client_reviews to authenticated;
grant execute on function public.is_review_admin() to anon, authenticated;

drop policy if exists "Anyone can submit unpublished reviews" on public.client_reviews;
drop policy if exists "Public visitors can submit unpublished reviews" on public.client_reviews;
create policy "Public visitors can submit unpublished reviews"
on public.client_reviews
for insert
to anon
with check (is_enabled = false);

drop policy if exists "Anyone can read enabled reviews" on public.client_reviews;
create policy "Anyone can read enabled reviews"
on public.client_reviews
for select
to anon, authenticated
using (is_enabled = true or public.is_review_admin());

drop policy if exists "Admins can update review visibility" on public.client_reviews;
create policy "Admins can update review visibility"
on public.client_reviews
for update
to authenticated
using (public.is_review_admin())
with check (public.is_review_admin());

-- Review moderation access is controlled by Supabase Authentication.
-- Any confirmed Auth user can sign in to approve or hide reviews.
