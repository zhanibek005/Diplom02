import { createBrowserClient } from "@supabase/ssr";

// Клиент для использования в клиентских компонентах ("use client")
// Хранит сессию в куках через браузер
export function createClient() {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}
