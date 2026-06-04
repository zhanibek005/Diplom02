import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/profile";

export async function GET() {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const { data: profile, error } = await auth.supabase
		.from("user_profiles")
		.select("*")
		.eq("user_id", auth.userId)
		.single();

	if (error && error.code !== "PGRST116") {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const {
		data: { user },
	} = await auth.supabase.auth.getUser();

	return NextResponse.json({
		email: user?.email ?? null,
		...profile,
	});
}

export async function PUT(request: NextRequest) {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const body = await request.json();
	const parsed = updateProfileSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const { data, error } = await auth.supabase
		.from("user_profiles")
		.upsert(
			{ user_id: auth.userId, ...parsed.data, updated_at: new Date().toISOString() },
			{ onConflict: "user_id" },
		)
		.select()
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
