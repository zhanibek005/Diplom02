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

-- таблица ролей: связывает пользователя с ролью
-- user_id ссылается на встроенную таблицу auth.users в Supabase
create table if not exists user_roles (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  unique (user_id)
);

-- функция для проверки роли в RLS политиках
-- вызывается прямо из SQL, возвращает роль текущего залогиненного юзера
create or replace function get_user_role()
returns text as $$
  select coalesce(
    (select role from user_roles where user_id = auth.uid()),
    'anon'
  );
$$ language sql security definer;

-- автоматически даём роль 'customer' при регистрации
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into user_roles (user_id, role) values (new.id, 'customer');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- RLS для cars
alter table cars enable row level security;

-- читать могут все (даже не залогиненные)
create policy "Cars: чтение для всех" on cars
  for select using (true);

-- создавать, обновлять, удалять могут только админы
create policy "Cars: создание только для админов" on cars
  for insert with check (get_user_role() = 'admin');

create policy "Cars: обновление только для админов" on cars
  for update using (get_user_role() = 'admin');

create policy "Cars: удаление только для админов" on cars
  for delete using (get_user_role() = 'admin');

-- RLS для user_roles
alter table user_roles enable row level security;

-- юзер может читать только свою роль
create policy "Roles: чтение своей роли" on user_roles
  for select using (auth.uid() = user_id);

-- только админы могут менять роли
create policy "Roles: изменение только для админов" on user_roles
  for update using (get_user_role() = 'admin');
