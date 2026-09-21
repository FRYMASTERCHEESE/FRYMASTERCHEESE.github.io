-- Run this in a NEW Supabase project's SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 email text,
 referral_code text unique not null,
 points bigint not null default 0 check(points>=0),
 xp bigint not null default 0 check(xp>=0),
 best integer not null default 0 check(best>=0),
 last_daily date,
 pending_usd numeric(12,2) not null default 0 check(pending_usd>=0),
 verified_usd numeric(12,2) not null default 0 check(verified_usd>=0),
 paid_usd numeric(12,2) not null default 0 check(paid_usd>=0),
 created_at timestamptz not null default now()
);
create table if not exists public.referrals(
 id bigint generated always as identity primary key,
 referrer_id uuid not null references public.profiles(id) on delete cascade,
 referred_id uuid not null unique references public.profiles(id) on delete cascade,
 status text not null default 'pending' check(status in('pending','verified','rejected')),
 created_at timestamptz not null default now(),
 check(referrer_id<>referred_id)
);
create table if not exists public.withdrawals(
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 method text not null check(method in('paypal','sol','eth','doge','btc')),
 destination text not null,
 amount_usd numeric(12,2) not null check(amount_usd>=1),
 status text not null default 'pending' check(status in('pending','approved','paid','rejected')),
 created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.referrals enable row level security;
alter table public.withdrawals enable row level security;
create policy "read own profile" on public.profiles for select using(auth.uid()=id);
create policy "read own referrals" on public.referrals for select using(auth.uid()=referrer_id);
create policy "read own withdrawals" on public.withdrawals for select using(auth.uid()=user_id);

create or replace function public.new_user() returns trigger language plpgsql security definer set search_path=public as $$
declare code text; rid uuid; rcode text;
begin
 code:=upper(substr(replace(new.id::text,'-',''),1,10));
 insert into profiles(id,email,referral_code) values(new.id,new.email,code);
 rcode:=upper(coalesce(new.raw_user_meta_data->>'referred_by_code',''));
 if rcode<>'' then
   select id into rid from profiles where referral_code=rcode;
   if rid is not null and rid<>new.id then insert into referrals(referrer_id,referred_id) values(rid,new.id) on conflict do nothing; end if;
 end if;
 return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.new_user();

-- Prototype cloud-save RPC. Before converting gameplay into money, replace client-submitted
-- scores with server-authoritative game sessions/verification.
create or replace function public.save_game_progress(p_points bigint,p_xp bigint,p_best integer,p_last_daily date)
returns void language plpgsql security definer set search_path=public as $$
begin
 if auth.uid() is null then raise exception 'Login required'; end if;
 if p_points<0 or p_xp<0 or p_best<0 then raise exception 'Invalid progress'; end if;
 update profiles set points=p_points,xp=p_xp,best=p_best,last_daily=p_last_daily where id=auth.uid();
end $$;

create or replace function public.request_withdrawal(p_method text,p_destination text,p_amount_usd numeric)
returns void language plpgsql security definer set search_path=public as $$
declare available numeric;
begin
 if auth.uid() is null then raise exception 'Login required'; end if;
 if lower(p_method) not in('paypal','sol','eth','doge','btc') then raise exception 'Unsupported method'; end if;
 if length(trim(p_destination))<4 then raise exception 'Invalid destination'; end if;
 select verified_usd into available from profiles where id=auth.uid() for update;
 if p_amount_usd<1 or p_amount_usd>available then raise exception 'Insufficient verified balance'; end if;
 update profiles set verified_usd=verified_usd-p_amount_usd,pending_usd=pending_usd+p_amount_usd where id=auth.uid();
 insert into withdrawals(user_id,method,destination,amount_usd) values(auth.uid(),lower(p_method),trim(p_destination),p_amount_usd);
end $$;
