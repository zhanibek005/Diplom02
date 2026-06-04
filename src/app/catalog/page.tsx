"use client";

import { useEffect, useState, useCallback } from "react";
import CarCard from "@/components/CarCard";
import SampleModal from "@/components/SampleDialog";
import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import Forum from "@/components/Forum";
import type { Car, CarFilters } from "@/lib/cars";

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Функция загрузки машин из API с опциональными фильтрами
  const fetchCars = useCallback(async (filters?: CarFilters) => {
    setLoading(true);

    // Собираем query string из фильтров
    const params = new URLSearchParams();
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value) params.set(key, value);
      }
    }

    const url = `/api/cars${params.size > 0 ? `?${params.toString()}` : ""}`;
    const response = await fetch(url);
    const data = await response.json();

    setCars(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  // Загружаем все машины при первой отрисовке страницы
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="bg-background w-screen flex min-h-screen items-center justify-center font-sans">
      <main className=" flex min-h-screen w-full  flex-col items-center justify-between py-15 px-16 sm:items-start">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col gap-2 ">
            <h2 className="pb-4 text-text text-3xl font-bold">
              Подбор Автомобиля
            </h2>
            <p className="text-gray-500 text-xl pb-4">
              уточните фильтры и отсортирйуте результаты
            </p>
          </div>
          <Button
            onMouseDown={() => {
              console.log("");
            }}
            variant="ghost"
            className="p-4 pl-10 border border-indigo-10 text-accent hover:text-accent-foreground"
          >
            <span className="text-xl p-4 pl-10">Оставьте заявку</span>
          </Button>
        </div>

        {/* Форма передаёт заполненные фильтры в fetchCars */}
        <Forum onSubmit={fetchCars} onCancel={() => fetchCars()} />

        <ThemeButton />

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
            />
          ))}
        </div>

        <SampleModal />
      </main>
    </div>
  );
}
