import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

const roleSchema = z.object({
	role: z.enum(["customer", "admin"]),
});

export async function PATCH(request: NextRequest, { params }: RouteParams) {
	const auth = await requireAdmin();
	if (auth instanceof NextResponse) return auth;

	const { id } = await params;
	const body = await request.json();
	const parsed = roleSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const { error } = await auth.supabase
		.from("user_roles")
		.update({ role: parsed.data.role })
		.eq("user_id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ message: "Роль обновлена" });
}
