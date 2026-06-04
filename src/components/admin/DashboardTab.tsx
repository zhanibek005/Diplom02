"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminStats } from "@/lib/admin";

const statusLabels: Record<string, string> = {
	pending: "Ожидают",
	confirmed: "Подтверждены",
	completed: "Завершены",
	cancelled: "Отменены",
};

export function DashboardTab() {
	const [stats, setStats] = useState<AdminStats | null>(null);

	useEffect(() => {
		fetch("/api/admin/stats")
			.then((r) => r.json())
			.then(setStats);
	}, []);

	if (!stats) {
		return <p className="text-muted-foreground">Загрузка...</p>;
	}

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Всего заказов
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{stats.total_orders}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Всего автомобилей
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{stats.total_cars}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Всего пользователей
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{stats.total_users}</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Заказы по статусам</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{Object.entries(statusLabels).map(([status, label]) => (
							<div key={status} className="flex items-center justify-between">
								<span className="text-sm">{label}</span>
								<span className="font-semibold">
									{stats.orders_by_status[status] ?? 0}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
