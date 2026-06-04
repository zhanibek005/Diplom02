"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import ProfileSettingsTab from "@/components/ProfileSettingsTab";
import ProfileOrdersTab from "@/components/ProfileOrdersTab";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
	const router = useRouter();
	const { user, loading: authLoading } = useAuth();

	useEffect(() => {
		if (authLoading) return;
		if (!user) router.push("/");
	}, [authLoading, user, router]);

	if (authLoading || !user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">Загрузка...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen max-w-4xl mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-8">Профиль</h1>

			<Tabs defaultValue="settings">
				<TabsList>
					<TabsTrigger value="settings">Настройки</TabsTrigger>
					<TabsTrigger value="orders">История заказов</TabsTrigger>
				</TabsList>

				<TabsContent value="settings" className="mt-6">
					<ProfileSettingsTab />
				</TabsContent>

				<TabsContent value="orders" className="mt-6">
					<ProfileOrdersTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
