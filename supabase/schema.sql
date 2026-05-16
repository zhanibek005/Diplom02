-- схема для сущности в базе, запустишь в супабейзе

create table if not exists cars (
  id bigint generated always as identity primary key,
  title text not null,
  brand text not null,
  model text not null,
  year integer not null,
  price numeric not null,
  transmission text not null,
  mileage integer not null default 0,
  labels text[] not null default '{}',
  image_url text,
  created_at timestamptz not null default now()
);

-- правила безопасности для транзакций на таблице
alter table cars enable row level security;

create policy "Allow anonymous read" on cars
  for select using (true);

create policy "Allow anonymous insert" on cars
  for insert with check (true);

create policy "Allow anonymous update" on cars
  for update using (true);

create policy "Allow anonymous delete" on cars
  for delete using (true);
