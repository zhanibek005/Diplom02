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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFormDialog } from "./CarFormDialog";
import { toast } from "sonner";
import type { Car } from "@/lib/cars";

export function CarsTab() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchCars = useCallback(async () => {
    const res = await fetch("/api/cars");
    const data = await res.json();
    setCars(Array.isArray(data.data) ? data.data : []);
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  async function handleDelete(id: number) {
    if (!confirm("Удалить этот автомобиль?")) return;
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCars((prev) => prev.filter((c) => c.id !== id));
      toast.success("Автомобиль удалён");
    } else {
      toast.error("Ошибка удаления");
    }
  }

  function handleEdit(car: Car) {
    setEditCar(car);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditCar(null);
    setDialogOpen(true);
  }

  // Функция безопасного переключения состояния диалога
  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open);
    if (!open) {
      // Если диалог закрывается, гарантированно очищаем выбранную машину через небольшой таймаут,
      // чтобы анимация закрытия окна не дёргалась
      setTimeout(() => setEditCar(null), 200);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Автомобили</span>
          <Button onClick={handleAdd}>Добавить</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cars.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            Нет автомобилей
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Марка</TableHead>
                <TableHead>Модель</TableHead>
                <TableHead>Год</TableHead>
                <TableHead>Объем</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>КПП</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.id}</TableCell>
                  <TableCell>{car.title}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.displacement}</TableCell>
                  <TableCell>{car.price.toLocaleString("ru-KZ")} ₸</TableCell>
                  <TableCell>{car.transmission}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(car)}
                    >
                      Ред.
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(car.id)}
                    >
                      Уд.
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <CarFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        car={editCar}
        onSaved={() => {
          setDialogOpen(false);
          setEditCar(null);
          fetchCars();
        }}
      />
    </Card>
  );
}
