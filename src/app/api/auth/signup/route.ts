import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const signupSchema = z.object({
	email: z.string().email("Невалидный email"),
	password: z.string().min(6, "Пароль минимум 6 символов"),
});

// POST /api/auth/signup - рега
//
// Body: { "email": "zhanik@example.com", "password": "123456" }
//
// При регистрации триггер в БД автоматически создаёт запись в user_roles
// с ролью 'customer'
// Админы назначаются вручную через дашборду
export async function POST(request: NextRequest) {
	const body = await request.json();
	const parsed = signupSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signUp({
		email: parsed.data.email,
		password: parsed.data.password,
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	return NextResponse.json(
		{
			user: {
				id: data.user?.id,
				email: data.user?.email,
			},
		},
		{ status: 201 },
	);
}
