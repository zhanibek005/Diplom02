"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { CarsTab } from "@/components/admin/CarsTab";
import { UsersTab } from "@/components/admin/UsersTab";

export default function AdminPage() {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		fetch("/api/auth/me").then(async (res) => {
			if (res.status === 401) return router.push("/");
			const data = await res.json();
			if (data.role !== "admin") return router.push("/");
			setAuthorized(true);
		});
	}, [router]);

	if (!authorized) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">Проверка доступа...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen max-w-6xl mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-8">Админ панель</h1>

			<Tabs defaultValue="dashboard">
				<TabsList>
					<TabsTrigger value="dashboard">Дашборд</TabsTrigger>
					<TabsTrigger value="orders">Заказы</TabsTrigger>
					<TabsTrigger value="cars">Автомобили</TabsTrigger>
					<TabsTrigger value="users">Пользователи</TabsTrigger>
				</TabsList>

				<TabsContent value="dashboard" className="mt-6">
					<DashboardTab />
				</TabsContent>

				<TabsContent value="orders" className="mt-6">
					<OrdersTab />
				</TabsContent>

				<TabsContent value="cars" className="mt-6">
					<CarsTab />
				</TabsContent>

				<TabsContent value="users" className="mt-6">
					<UsersTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
