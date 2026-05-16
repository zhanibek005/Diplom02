import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Клиент для использования на сервере:
// Контроллеры эндпоинтов (api/...)
// Серверные компоненты
// Серверные действия
//
// supabase сам читает/пишет сессию в http-only куки.
// не нужно вручную передавать токены.
export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options);
					}
				},
			},
		},
	);
}
