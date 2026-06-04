"use client";

import { useEffect, useState, useCallback } from "react";
import CarCard from "@/components/CarCard";
import CarDetailDialog from "@/components/CarDetailDialog";
import { Button } from "@/components/ui/button";
import Forum from "@/components/Forum";
import OrderDialog from "@/components/OrderDialog";
import type { Car, CarFilters } from "@/lib/cars";

export default function CatalogPage() {
	const [cars, setCars] = useState<Car[]>([]);
	const [loading, setLoading] = useState(true);
	const [orderOpen, setOrderOpen] = useState(false);
	const [detailCar, setDetailCar] = useState<Car | null>(null);
	const [orderCarIds, setOrderCarIds] = useState<number[]>([]);

	const fetchCars = useCallback(async (filters?: CarFilters) => {
		setLoading(true);

		const params = new URLSearchParams();
		if (filters) {
			for (const [key, value] of Object.entries(filters)) {
				if (value) params.set(key, value);
			}
		}

		params.set("per_page", "50");
		const url = `/api/cars?${params.toString()}`;
		const response = await fetch(url);
		const json = await response.json();

		setCars(Array.isArray(json.data) ? json.data : []);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchCars();
	}, [fetchCars]);

	function handleDetail(car: Car) {
		setDetailCar(car);
	}

	function handleOrderFromDetail() {
		if (!detailCar) return;
		setOrderCarIds([detailCar.id]);
		setDetailCar(null);
		setOrderOpen(true);
	}

	return (
		<div className="bg-background w-screen flex min-h-screen items-center justify-center font-sans">
			<main className="flex min-h-screen w-full flex-col items-center justify-between py-15 px-16 sm:items-start">
				<div className="flex flex-col gap-2">
					<h2 className="pb-4 text-text text-3xl font-bold">
						Подбор Автомобиля
					</h2>
					<p className="text-gray-500 text-xl pb-4">
						уточните фильтры и отсортирйуте результаты
					</p>
				</div>

				<Forum onSubmit={fetchCars} onCancel={() => fetchCars()} />

				<div className="rounded-md grid p-2 grid-cols-4 gap-2 justify-between w-full">
					{loading && (
						<p className="col-span-4 text-center text-gray-500 py-8">
							Загрузка...
						</p>
					)}

					{!loading && cars.length === 0 && (
						<p className="col-span-4 text-center text-gray-500 py-8">
							Ничего не найдено
						</p>
					)}

					{cars.map((car) => (
						<CarCard
							key={car.id}
							title={car.title}
							labels={car.labels}
							price={car.price}
							imageUrl={car.image_url}
							onDetail={() => handleDetail(car)}
						/>
					))}
				</div>

				<CarDetailDialog
					car={detailCar}
					open={!!detailCar}
					onOpenChange={(open) => { if (!open) setDetailCar(null); }}
					onOrder={handleOrderFromDetail}
				/>

				<OrderDialog
					open={orderOpen}
					onOpenChange={setOrderOpen}
					preselectedCarIds={orderCarIds.length > 0 ? orderCarIds : undefined}
				/>
			</main>
		</div>
	);
}
