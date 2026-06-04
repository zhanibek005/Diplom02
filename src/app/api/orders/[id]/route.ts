import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateOrderStatusSchema } from "@/lib/orders";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const { id } = await params;

	const { data: order, error: fetchError } = await auth.supabase
		.from("orders")
		.select("*")
		.eq("id", id)
		.single();

	if (fetchError || !order) {
		return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
	}

	const body = await request.json();
	const parsed = updateOrderStatusSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const { status: newStatus } = parsed.data;

	if (auth.role !== "admin") {
		if (order.user_id !== auth.userId) {
			return NextResponse.json({ error: "Это не ваш заказ" }, { status: 403 });
		}
		if (order.status !== "pending" || newStatus !== "cancelled") {
			return NextResponse.json(
				{ error: "Вы можете только отменить ожидающий заказ" },
				{ status: 403 },
			);
		}
	}

	const { data: updated, error: updateError } = await auth.supabase
		.from("orders")
		.update({ status: newStatus, updated_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 500 });
	}

	return NextResponse.json(updated);
}
