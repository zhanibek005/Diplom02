"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/lib/orders";

const statusColors: Record<OrderStatus, string> = {
	pending: "secondary",
	confirmed: "default",
	completed: "outline",
	cancelled: "destructive",
};

const statusLabels: Record<OrderStatus, string> = {
	pending: "Ожидает",
	confirmed: "Подтверждён",
	completed: "Завершён",
	cancelled: "Отменён",
};

export default function ProfileOrdersTab() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/orders?per_page=50")
			.then((r) => r.json())
			.then((data) => {
				setOrders(Array.isArray(data.data) ? data.data : []);
				setLoading(false);
			});
	}, []);

	async function handleCancelOrder(orderId: string) {
		const res = await fetch(`/api/orders/${orderId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status: "cancelled" }),
		});
		if (res.ok) {
			setOrders((prev) =>
				prev.map((o) =>
					o.id === orderId ? { ...o, status: "cancelled" as OrderStatus } : o,
				),
			);
			toast.success("Заказ отменён");
		} else {
			const data = await res.json();
			toast.error(data.error || "Ошибка отмены");
		}
	}

	if (loading) {
		return (
			<Card>
				<CardContent className="py-8 text-center text-muted-foreground">
					Загрузка...
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>История заказов</CardTitle>
				<CardDescription>
					Все ваши заказы на подбор автомобиля
				</CardDescription>
			</CardHeader>
			<CardContent>
				{orders.length === 0 ? (
					<p className="text-muted-foreground py-8 text-center">
						У вас пока нет заказов
					</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>№</TableHead>
								<TableHead>Дата</TableHead>
								<TableHead>Автомобили</TableHead>
								<TableHead>Статус</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-mono text-xs">
										{order.id.slice(0, 8)}
									</TableCell>
									<TableCell>
										{new Date(order.created_at).toLocaleDateString("ru-RU")}
									</TableCell>
									<TableCell>
										{order.cars.map((c) => c.title).join(", ")}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												statusColors[order.status] as
												| "default"
												| "secondary"
												| "destructive"
												| "outline"
											}
										>
											{statusLabels[order.status]}
										</Badge>
									</TableCell>
									<TableCell>
										{order.status === "pending" && (
											<Button
												variant="destructive"
												size="sm"
												onClick={() => handleCancelOrder(order.id)}
											>
												Отменить
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
}
