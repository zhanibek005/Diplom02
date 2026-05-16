import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

// POST /api/auth/login - вход
//
// Body: { "email": "email@example.tld", "password": "123456" }
//
// supabase/ssr автоматически ставит куки с сессией.
// После логина все последующие запросы будут авторизованы через куки,
// токены передавать не нужно
export async function POST(request: NextRequest) {
	const body = await request.json();
	const parsed = loginSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Invalid request", details: z.treeifyError(parsed.error) },
			{ status: 400 },
		);
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: parsed.data.email,
		password: parsed.data.password,
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 401 });
	}

	return NextResponse.json({
		user: {
			id: data.user.id,
			email: data.user.email,
		},
	});
}
