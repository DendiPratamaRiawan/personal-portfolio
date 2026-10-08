-- =====================================================================
--  Portfolio Dendi — Supabase schema
--  Nama project Supabase yang disarankan : portfolio-dendi
--  Jalankan seluruh file ini di: Supabase Dashboard > SQL Editor > New query
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
--  Admin whitelist: hanya email di tabel ini yang boleh mengubah data
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- GANTI dengan email akun admin yang kamu buat di Authentication > Users
insert into public.admin_users (email) values ('dendipratamar@gmail.com')
on conflict do nothing;

-- ---------------------------------------------------------------------
--  Helper: updated_at otomatis
-- ---------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
--  Profile (1 baris saja)
-- ---------------------------------------------------------------------
create table if not exists public.profile (
  id          int primary key default 1 check (id = 1),
  name        text not null default '',
  tagline     text,
  roles       text[] not null default '{}',
  highlights  text[] not null default '{}',
  about       text not null default '',
  photo_url   text,
  cv_url      text,
  location    text,
  email       text,
  phone       text,
  github      text,
  linkedin    text,
  instagram   text,
  open_to_work boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- aman dijalankan ulang di database lama
alter table public.profile add column if not exists tagline text;

-- ---------------------------------------------------------------------
--  Skills
-- ---------------------------------------------------------------------
create table if not exists public.skills (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null default 'General',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Experiences: work / education / organization / volunteer
-- ---------------------------------------------------------------------
create table if not exists public.experiences (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('work','education','organization','volunteer')),
  title       text not null,          -- jabatan / jurusan
  subtitle    text,                   -- perusahaan / institusi
  date_label  text,                   -- contoh: "2023 - Present"
  description text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Certificates & Awards
-- ---------------------------------------------------------------------
create table if not exists public.certificates (
  id          uuid primary key default gen_random_uuid(),
  type        text not null default 'certificate' check (type in ('certificate','award')),
  title       text not null,
  issuer      text,
  date_label  text,
  image_url   text,
  link        text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Projects
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  tech        text[] not null default '{}',
  date_label  text,
  image_url   text,
  github_url  text,
  demo_url    text,
  featured    boolean not null default false,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Services
-- ---------------------------------------------------------------------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  level       text,
  description text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Activities (foto galeri di hero)
-- ---------------------------------------------------------------------
create table if not exists public.activities (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  caption     text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  News & kegiatan (dari URL berita luar ATAU tulisan manual)
-- ---------------------------------------------------------------------
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  summary      text,
  content      text,                  -- isi lengkap (tampil di popup "Kegiatan")
  image_url    text,
  source_url   text,                  -- kosongkan jika kegiatan manual
  source_name  text,                  -- contoh: "detik.com"
  category     text not null default 'kegiatan' check (category in ('berita','kegiatan')),
  published_at date not null default current_date,
  is_published boolean not null default true,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Publications (jurnal / artikel ilmiah)
-- ---------------------------------------------------------------------
create table if not exists public.publications (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  authors     text,
  venue       text,                   -- nama jurnal, volume, halaman
  date_label  text,
  link        text,                   -- DOI / URL artikel
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Messages dari form kontak
-- ---------------------------------------------------------------------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) <= 120),
  email       text not null check (char_length(email) <= 200),
  message     text not null check (char_length(message) <= 5000),
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
--  Terjemahan: konten utama berbahasa Indonesia, versi Inggris disimpan di
--  kolom translations, contoh: {"en": {"title": "...", "description": "..."}}
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['profile','skills','experiences','certificates','projects','services','activities','news','publications']
  loop
    execute format('alter table public.%I add column if not exists translations jsonb not null default ''{}''::jsonb', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
--  Triggers updated_at
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['profile','skills','experiences','certificates','projects','services','activities','news','publications']
  loop
    execute format('drop trigger if exists trg_touch_%1$s on public.%1$s', t);
    execute format('create trigger trg_touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
--  Row Level Security
--  - Publik (anon) hanya boleh membaca
--  - Admin (email ada di admin_users) boleh semua
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['profile','skills','experiences','certificates','projects','services','activities','publications']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- news: publik hanya melihat yang dipublish
alter table public.news enable row level security;
drop policy if exists "public read" on public.news;
drop policy if exists "admin write" on public.news;
create policy "public read" on public.news for select using (is_published or public.is_admin());
create policy "admin write" on public.news for all using (public.is_admin()) with check (public.is_admin());

-- messages: siapa saja boleh kirim, hanya admin yang boleh baca/hapus
alter table public.messages enable row level security;
drop policy if exists "anyone insert" on public.messages;
drop policy if exists "admin manage" on public.messages;
create policy "anyone insert" on public.messages for insert with check (true);
create policy "admin manage" on public.messages for all using (public.is_admin()) with check (public.is_admin());

-- admin_users: hanya admin yang boleh melihat
alter table public.admin_users enable row level security;
drop policy if exists "admin read" on public.admin_users;
create policy "admin read" on public.admin_users for select using (public.is_admin());

-- ---------------------------------------------------------------------
--  Storage bucket untuk gambar & file (CV, foto, sertifikat, dll)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio public read" on storage.objects;
drop policy if exists "portfolio admin insert" on storage.objects;
drop policy if exists "portfolio admin update" on storage.objects;
drop policy if exists "portfolio admin delete" on storage.objects;

create policy "portfolio public read" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "portfolio admin insert" on storage.objects
  for insert with check (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin update" on storage.objects
  for update using (bucket_id = 'portfolio' and public.is_admin());
create policy "portfolio admin delete" on storage.objects
  for delete using (bucket_id = 'portfolio' and public.is_admin());
