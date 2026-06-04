"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

interface AuthUser {
	userId: string;
	email?: string;
	role: string;
	full_name?: string | null;
	phone?: string | null;
	avatar_url?: string | null;
}

interface AuthContextValue {
	user: AuthUser | null;
	loading: boolean;
	refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	loading: true,
	refresh: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = createClient();

	const refresh = useCallback(async () => {
		const { data: { user: authUser } } = await supabase.auth.getUser();
		if (authUser) {
			const [{ data: roleRow }, { data: profileRow }] = await Promise.all([
				supabase.from("user_roles").select("role").eq("user_id", authUser.id).single(),
				supabase.from("user_profiles").select("full_name, phone, avatar_url").eq("user_id", authUser.id).single(),
			]);
			setUser({
				userId: authUser.id,
				email: authUser.email ?? undefined,
				role: roleRow?.role ?? "customer",
				full_name: profileRow?.full_name ?? null,
				phone: profileRow?.phone ?? null,
				avatar_url: profileRow?.avatar_url ?? null,
			});
		} else {
			setUser(null);
		}
		setLoading(false);
	}, [supabase]);

	useEffect(() => {
		refresh();

		const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
			refresh();
		});

		return () => subscription.unsubscribe();
	}, [supabase, refresh]);

	return (
		<AuthContext.Provider value={{ user, loading, refresh }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
