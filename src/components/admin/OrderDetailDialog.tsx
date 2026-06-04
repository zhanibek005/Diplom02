"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Phone } from "lucide-react";
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

interface OrderDetailDialogProps {
	order: Order | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function OrderDetailDialog({
	order,
	open,
	onOpenChange,
}: OrderDetailDialogProps) {
	if (!order) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Заказ №{order.id.slice(0, 8)}</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">
							{new Date(order.created_at).toLocaleDateString("ru-RU")}
						</span>
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
					</div>

					{order.user && (
						<>
							<Separator />
							<div>
								<h4 className="text-sm font-medium text-muted-foreground mb-2">Клиент</h4>
								<div className="space-y-1.5">
									<div className="flex items-center gap-2">
										<User className="size-4 text-muted-foreground" />
										<span>{order.user.full_name ?? "—"}</span>
									</div>
									<div className="flex items-center gap-2">
										<Phone className="size-4 text-muted-foreground" />
										<span>{order.user.phone ?? "—"}</span>
									</div>
								</div>
							</div>
						</>
					)}

					<Separator />
					<div className="space-y-3">
						<h4 className="text-sm font-medium text-muted-foreground">Автомобили</h4>
						{order.cars.map((car) => (
							<div
								key={car.id}
								className="flex gap-4 rounded-lg border p-3"
							>
								{car.image_url && (
									<img
										src={car.image_url}
										alt={car.title}
										className="w-24 h-20 object-cover rounded"
									/>
								)}
								<div className="flex-1 min-w-0">
									<p className="font-medium truncate">{car.title}</p>
									<p className="text-sm text-muted-foreground">
										{car.brand} {car.model}
									</p>
									<p className="text-sm font-semibold mt-1">
										{car.price.toLocaleString("ru-KZ")} ₸
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
