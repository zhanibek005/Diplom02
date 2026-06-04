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

export async function getSession() {
	const supabase = await createClient()
	try {
		const {
			data: { session }
		} = await supabase.auth.getSession()
		return session
	} catch (error) {
		console.error('Error:', error)
		return null
	}
}

export async function getUserDetails() {
	const supabase = await createClient()
	try {
		const session = await getSession()
		const { data, error } = await supabase.auth.getUser()
		// TODO: user meta table for pfp n shit
		//
		// const response = await supabase
		// 	.from('auth.users')
		// 	.select('*')
		// 	.eq('id', session?.user?.id)
		// 	.single()
		// if (!response.data && response.data?.length === 0) {
		// 	return null
		// }
		if (error) {
			return null
		}
		return data.user
	} catch (error) {
		console.error('Error:', error)
		return null
	}
}

export async function getUsersList() {
	const supabase = await createClient()
	try {
		const response = await supabase
			.from('auth.users')
			.select('*')
		return response.data
	} catch (error) {
		console.error('Error:', error)
		return null
	}
}
