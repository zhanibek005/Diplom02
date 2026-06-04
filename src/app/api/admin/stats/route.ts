import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
	const auth = await requireAdmin();
	if (auth instanceof NextResponse) return auth;

	const { count: totalOrders, error: ordersErr } = await auth.supabase
		.from("orders")
		.select("*", { count: "exact", head: true });

	const { count: totalCars, error: carsErr } = await auth.supabase
		.from("cars")
		.select("*", { count: "exact", head: true });

	const { count: totalUsers, error: usersErr } = await auth.supabase
		.from("user_roles")
		.select("*", { count: "exact", head: true });

	const { data: statusBreakdown, error: statusErr } = await auth.supabase
		.from("orders")
		.select("status");

	if (ordersErr || carsErr || usersErr || statusErr) {
		return NextResponse.json(
			{ error: "Ошибка получения статистики" },
			{ status: 500 },
		);
	}

	const orders_by_status: Record<string, number> = {};
	for (const row of statusBreakdown ?? []) {
		const s = row.status as string;
		orders_by_status[s] = (orders_by_status[s] ?? 0) + 1;
	}

	return NextResponse.json({
		total_orders: totalOrders ?? 0,
		total_cars: totalCars ?? 0,
		total_users: totalUsers ?? 0,
		orders_by_status,
	});
}
