"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge, DollarSign, Cog } from "lucide-react";
import type { Car } from "@/lib/cars";

interface CarDetailDialogProps {
	car: Car | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onOrder: () => void;
}

export default function CarDetailDialog({
	car,
	open,
	onOpenChange,
	onOrder,
}: CarDetailDialogProps) {
	if (!car) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{car.title}</DialogTitle>
				</DialogHeader>
				<div className="grid md:grid-cols-2 gap-6">
					{car.image_url && (
						<div className="rounded-lg overflow-hidden">
							<img
								src={car.image_url}
								alt={car.title}
								className="w-full h-64 object-cover"
							/>
						</div>
					)}
					<div className="space-y-4">
						<div className="flex flex-wrap gap-2">
							{car.labels.map((label, i) => (
								<Badge key={i} variant="outline">
									{label.toUpperCase()}
								</Badge>
							))}
						</div>
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-muted-foreground">
								<DollarSign className="size-4" />
								<span className="text-2xl font-bold text-foreground">
									{car.price.toLocaleString("ru-KZ")} ₸
								</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Calendar className="size-4" />
								<span>{car.brand} {car.model}, {car.year} г.</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Cog className="size-4" />
								<span>{car.transmission}</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Gauge className="size-4" />
								<span>{car.mileage.toLocaleString("ru-KZ")} км</span>
							</div>
						</div>
						<Button className="w-full mt-4" onClick={onOrder}>
							Оставить заявку
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
