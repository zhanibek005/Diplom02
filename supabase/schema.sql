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

create or replace function handle_new_user()
returns trigger as $$
begin
	insert into public.user_roles (user_id, role) values (new.id, 'customer');
	insert into public.user_profiles (user_id) values (new.id);
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


create table if not exists orders (
	id uuid not null primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists order_car_map (
	order_id uuid not null references orders(id) on update cascade on delete cascade,
	car_id bigint not null references cars(id) on update cascade on delete cascade,
	primary key (order_id, car_id)
);

alter table orders enable row level security;

create policy "Orders: select own or admin" on orders
	for select using (get_user_role() = 'admin' or auth.uid() = user_id);

create policy "Orders: insert own or admin" on orders
	for insert with check (get_user_role() = 'admin' or auth.uid() = user_id);

create policy "Orders: update own or admin" on orders
	for update using (get_user_role() = 'admin' or auth.uid() = user_id);

create policy "Orders: delete own or admin" on orders
	for delete using (get_user_role() = 'admin' or auth.uid() = user_id);

alter table order_car_map enable row level security;

create policy "Order_car_map: select own or admin" on order_car_map
	for select using (
		get_user_role() = 'admin'
		or exists (
			select 1 from orders
			where orders.id = order_car_map.order_id
				and orders.user_id = auth.uid()
		)
	);

create policy "Order_car_map: insert own or admin" on order_car_map
	for insert with check (
		get_user_role() = 'admin'
		or exists (
			select 1 from orders
			where orders.id = order_car_map.order_id
				and orders.user_id = auth.uid()
		)
	);

create policy "Order_car_map: update own or admin" on order_car_map
	for update using (
		get_user_role() = 'admin'
		or exists (
			select 1 from orders
			where orders.id = order_car_map.order_id
				and orders.user_id = auth.uid()
		)
	);

create policy "Order_car_map: delete own or admin" on order_car_map
	for delete using (
		get_user_role() = 'admin'
		or exists (
			select 1 from orders
			where orders.id = order_car_map.order_id
				and orders.user_id = auth.uid()
		)
	);

create table if not exists user_profiles (
	id bigint generated always as identity primary key,
	user_id uuid not null references auth.users(id) on delete cascade unique,
	full_name text,
	phone text,
	avatar_url text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table user_profiles enable row level security;

create policy "Profiles: чтение своей или админ" on user_profiles
	for select using (auth.uid() = user_id or get_user_role() = 'admin');

create policy "Profiles: создание своей" on user_profiles
	for insert with check (auth.uid() = user_id);

create policy "Profiles: обновление своей или админ" on user_profiles
	for update using (auth.uid() = user_id or get_user_role() = 'admin')
	with check (auth.uid() = user_id or get_user_role() = 'admin');

create policy "Public read avatars" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "Public read cars" on storage.objects
  for select using (bucket_id = 'cars');

create policy "Avatars upload own" on storage.objects
	for insert with check (
		bucket_id = 'avatars'
		and auth.role() = 'authenticated'
		and (storage.foldername(name))[1] = auth.uid()::text
	);
create policy "Avatars update own" on storage.objects
	for update using (
		bucket_id = 'avatars'
		and auth.role() = 'authenticated'
		and (storage.foldername(name))[1] = auth.uid()::text
	);
create policy "Avatars delete own" on storage.objects
	for delete using (
		bucket_id = 'avatars'
		and auth.role() = 'authenticated'
		and (storage.foldername(name))[1] = auth.uid()::text
	);

create policy "Cars upload admin" on storage.objects
	for insert with check (
		bucket_id = 'cars'
		and get_user_role() = 'admin'
	);
create policy "Cars update admin" on storage.objects
	for update using (
		bucket_id = 'cars'
		and get_user_role() = 'admin'
	);
create policy "Cars delete admin" on storage.objects
	for delete using (
		bucket_id = 'cars'
		and get_user_role() = 'admin'
	);
