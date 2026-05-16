import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface AuthResult {
	userId: string;
	role: string;
	supabase: Awaited<ReturnType<typeof createClient>>;
}

// Проверяет авторизацию через куки (supabase/ssr читает сессию автоматически)
export async function requireAuth(): Promise<AuthResult | NextResponse> {
	const supabase = await createClient();

	// getUser() проверяет токен на супабейзовских серверах
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return NextResponse.json(
			{ error: "Нужна авторизация" },
			{ status: 401 },
		);
	}

	// Достаём роль из таблицы user_roles
	const { data: roleRow } = await supabase
		.from("user_roles")
		.select("role")
		.eq("user_id", user.id)
		.single();

	const role = roleRow?.role ?? "customer";

	return { userId: user.id, role, supabase };
}

// Возвращает 403, если не админ
export async function requireAdmin(): Promise<AuthResult | NextResponse> {
	const result = await requireAuth();

	if (result instanceof NextResponse) return result;

	if (result.role !== "admin") {
		return NextResponse.json(
			{ error: "Только для админов" },
			{ status: 403 },
		);
	}

	return result;
}
