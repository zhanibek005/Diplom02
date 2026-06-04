import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
	const auth = await requireAuth();
	if (auth instanceof NextResponse) return auth;

	const formData = await request.formData();
	const file = formData.get("file") as File | null;

	if (!file) {
		return NextResponse.json({ error: "Файл не загружен" }, { status: 400 });
	}

	const ext = file.name.split(".").pop() ?? "jpg";
	const path = `${auth.userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const { data: uploadData, error: uploadError } = await auth.supabase.storage
		.from("avatars")
		.upload(path, file, { cacheControl: "3600", upsert: true });

	if (uploadError) {
		return NextResponse.json({ error: uploadError.message }, { status: 500 });
	}

	const {
		data: { publicUrl },
	} = auth.supabase.storage.from("avatars").getPublicUrl(uploadData.path);

	const { error: updateError } = await auth.supabase
		.from("user_profiles")
		.update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
		.eq("user_id", auth.userId);

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 500 });
	}

	return NextResponse.json({ avatar_url: publicUrl });
}
