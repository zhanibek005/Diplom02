import { createClient } from "@/lib/supabase/client";

export async function uploadFile(
	bucket: "avatars" | "cars",
	file: File,
	userId: string,
): Promise<string> {
	const supabase = createClient();

	const ext = file.name.split(".").pop() ?? "jpg";
	const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		cacheControl: "3600",
		upsert: true,
	});

	if (error) throw new Error(error.message);

	const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);

	return publicUrl.publicUrl;
}
