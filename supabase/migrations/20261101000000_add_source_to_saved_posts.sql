-- Saved posts can now come from more than one integration.
-- Existing rows were all saved from dev.to, so they get 'devto' as default.
alter table public.blog2buzz
  add column if not exists source text not null default 'devto';
