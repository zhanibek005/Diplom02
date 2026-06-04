"use client";

import { useEffect, useState, useCallback } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import OrderDetailDialog from "./OrderDetailDialog";
import type { Order, OrderStatus } from "@/lib/orders";

const statusLabels: Record<OrderStatus, string> = {
	pending: "Ожидает",
	confirmed: "Подтверждён",
	completed: "Завершён",
	cancelled: "Отменён",
};

const statusColors: Record<OrderStatus, string> = {
	pending: "secondary",
	confirmed: "default",
	completed: "outline",
	cancelled: "destructive",
};

export function OrdersTab() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [filter, setFilter] = useState<string>("all");
	const [detailOrder, setDetailOrder] = useState<Order | null>(null);
	const perPage = 20;

	const fetchOrders = useCallback(async () => {
		const res = await fetch(`/api/orders?page=${page}&per_page=${perPage}`);
		const json = await res.json();
		setOrders(Array.isArray(json.data) ? json.data : []);
		setTotal(json.total ?? 0);
	}, [page]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	const totalPages = Math.ceil(total / perPage);

	async function handleStatusChange(orderId: string, status: OrderStatus) {
		const res = await fetch(`/api/orders/${orderId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status }),
		});
		if (res.ok) {
			setOrders((prev) =>
				prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
			);
			if (detailOrder?.id === orderId) {
				setDetailOrder((prev) => prev ? { ...prev, status } : null);
			}
			toast.success("Статус обновлён");
		} else {
			const data = await res.json();
			toast.error(data.error || "Ошибка");
		}
	}

	const filtered =
		filter === "all"
			? orders
			: orders.filter((o) => o.status === filter);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Все заказы</span>
						<Select value={filter} onValueChange={setFilter}>
							<SelectTrigger className="w-40">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Все статусы</SelectItem>
								{Object.entries(statusLabels).map(([key, label]) => (
									<SelectItem key={key} value={key}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardTitle>
				</CardHeader>
				<CardContent>
					{filtered.length === 0 ? (
						<p className="text-muted-foreground py-8 text-center">Нет заказов</p>
					) : (
						<>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>№</TableHead>
										<TableHead>Дата</TableHead>
										<TableHead>Автомобили</TableHead>
										<TableHead>Статус</TableHead>
										<TableHead>Действие</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filtered.map((order) => (
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
												<Select
													value={order.status}
													onValueChange={(v) =>
														handleStatusChange(order.id, v as OrderStatus)
													}
												>
													<SelectTrigger className="w-36">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{Object.entries(statusLabels).map(([key, label]) => (
															<SelectItem key={key} value={key}>
																{label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setDetailOrder(order)}
												>
													<Eye className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							{totalPages > 1 && (
								<div className="flex items-center justify-between mt-4">
									<p className="text-sm text-muted-foreground">
										Страница {page} из {totalPages} (всего {total})
									</p>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											disabled={page <= 1}
											onClick={() => setPage((p) => p - 1)}
										>
											<ChevronLeft className="size-4" />
										</Button>
										<Button
											variant="outline"
											size="sm"
											disabled={page >= totalPages}
											onClick={() => setPage((p) => p + 1)}
										>
											<ChevronRight className="size-4" />
										</Button>
									</div>
								</div>
							)}
						</>
					)}
				</CardContent>
			</Card>

			<OrderDetailDialog
				order={detailOrder}
				open={!!detailOrder}
				onOpenChange={(open) => { if (!open) setDetailOrder(null); }}
			/>
		</>
	);
}
