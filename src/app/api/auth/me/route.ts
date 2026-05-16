import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// GET /api/auth/me - данные текущего пользователя
export async function GET() {
	const result = await requireAuth();

	if (result instanceof NextResponse) return result;

	return NextResponse.json({
		userId: result.userId,
		role: result.role,
	});
}
