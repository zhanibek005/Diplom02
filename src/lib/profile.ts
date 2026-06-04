import { z } from "zod";

export interface UserProfile {
	id: number;
	user_id: string;
	full_name: string | null;
	phone: string | null;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
}

export const updateProfileSchema = z.object({
	full_name: z.string().optional(),
	phone: z.string().optional(),
	avatar_url: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
