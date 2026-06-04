import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
	const auth = await requireAdmin();
	if (auth instanceof NextResponse) return auth;

	const { searchParams } = new URL(request.url);
	const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
	const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "20", 10)));

	const [rolesRes, profilesRes] = await Promise.all([
		auth.supabase
			.from("user_roles")
			.select("*", { count: "exact" })
			.neq("user_id", auth.userId)
			.order("created_at", { ascending: false })
			.range((page - 1) * per_page, page * per_page - 1),
		auth.supabase
			.from("user_profiles")
			.select("*"),
	]);

	if (rolesRes.error) {
		return NextResponse.json({ error: rolesRes.error.message }, { status: 500 });
	}

	console.log("roles:", rolesRes.data)
	console.log("profiles:", profilesRes.data)

	const profileMap = new Map(
		(profilesRes.data ?? []).map((p: Record<string, unknown>) => [
			p.user_id as string,
			p,
		]),
	);

	const users = (rolesRes.data ?? []).map((row: Record<string, unknown>) => {
		const profile = profileMap.get(row.user_id as string);
		return {
			user_id: row.user_id,
			role: row.role,
			full_name: (profile?.full_name as string | null) ?? null,
			phone: (profile?.phone as string | null) ?? null,
			avatar_url: (profile?.avatar_url as string | null) ?? null,
			created_at: row.created_at,
		};
	});

	console.log("merged users:", users)

	return NextResponse.json({
		data: users,
		total: rolesRes.count ?? 0,
		page,
		per_page,
	});
}
