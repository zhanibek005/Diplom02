import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth";
import { createOrderSchema } from "@/lib/orders";

export async function GET(request: NextRequest) {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const { searchParams } = new URL(request.url);
	const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
	const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "20", 10)));
	const from = (page - 1) * per_page;
	const to = from + per_page - 1;

	let countQuery = auth.supabase
		.from("orders")
		.select("*", { count: "exact", head: true });

	let dataQuery = auth.supabase
		.from("orders")
		.select("*, order_car_map!inner(car:cars(*))")
		.order("created_at", { ascending: false })
		.range(from, to);

	if (auth.role !== "admin") {
		countQuery = countQuery.eq("user_id", auth.userId);
		dataQuery = dataQuery.eq("user_id", auth.userId);
	}

	const [{ count }, { data, error }] = await Promise.all([countQuery, dataQuery]);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const rawOrders: Array<Record<string, unknown>> = (data ?? []).map((order: Record<string, unknown>) => ({
		id: order.id,
		user_id: order.user_id,
		status: order.status,
		created_at: order.created_at,
		updated_at: order.updated_at,
		cars: (order.order_car_map as Array<Record<string, unknown>>).map(
			(m: Record<string, unknown>) => (m.car as Record<string, unknown>),
		),
	}));

	let orders = rawOrders;
	if (auth.role === "admin") {
		const userIds = [...new Set(rawOrders.map((o) => o.user_id as string))];
		if (userIds.length > 0) {
			const { data: profiles } = await auth.supabase
				.from("user_profiles")
				.select("*")
				.in("user_id", userIds);
			const profileMap = new Map(
				(profiles ?? []).map((p: Record<string, unknown>) => [p.user_id as string, p]),
			);
			orders = rawOrders.map((o) => ({
				...o,
				user: {
					full_name: (profileMap.get(o.user_id as string)?.full_name as string | null) ?? null,
					phone: (profileMap.get(o.user_id as string)?.phone as string | null) ?? null,
					email: null,
				},
			}));
		}
	}

	return NextResponse.json({
		data: orders,
		total: count ?? 0,
		page,
		per_page,
	});
}

export async function POST(request: NextRequest) {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const body = await request.json();
	const parsed = createOrderSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const { data: order, error: orderError } = await auth.supabase
		.from("orders")
		.insert({ user_id: auth.userId })
		.select()
		.single();

	if (orderError) {
		return NextResponse.json({ error: orderError.message }, { status: 500 });
	}

	const mapRows = parsed.data.car_ids.map((car_id) => ({
		order_id: order.id,
		car_id,
	}));

	const { error: mapError } = await auth.supabase
		.from("order_car_map")
		.insert(mapRows);

	if (mapError) {
		await auth.supabase.from("orders").delete().eq("id", order.id);
		return NextResponse.json({ error: mapError.message }, { status: 500 });
	}

	if (parsed.data.phone) {
		await auth.supabase
			.from("user_profiles")
			.upsert({ user_id: auth.userId, phone: parsed.data.phone }, { onConflict: "user_id" });
	}

	return NextResponse.json(order, { status: 201 });
}
