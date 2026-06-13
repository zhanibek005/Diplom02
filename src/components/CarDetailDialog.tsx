"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Gauge,
  DollarSign,
  Cog,
  Milestone,
  FileText,
} from "lucide-react";
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
      <DialogContent className="w-[95vw] !max-w-4xl md:max-w-[896px] max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{car.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Левая колонка: Обертка идеально сжимается вокруг фото за счет h-fit */}
          {car.image_url && (
            <div className="rounded-xl overflow-hidden border bg-muted/40 shadow-sm h-fit w-full">
              <img
                src={car.image_url}
                alt={car.title}
                className="w-full h-auto block"
              />
            </div>
          )}

          {/* Правая колонка: Характеристики автомобиля */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {car.labels.map((label, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {label.toUpperCase()}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3.5 rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b pb-2.5">
                  <DollarSign className="size-5 text-primary" />
                  <span className="text-3xl font-extrabold text-foreground tracking-tight">
                    {car.price.toLocaleString("ru-KZ")} ₸
                  </span>
                </div>

                <div className="grid gap-3 text-sm sm:text-base">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="size-5 text-muted-foreground/70" />
                    <span className="text-foreground font-medium">
                      {car.brand} {car.model}, {car.year} г.
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Cog className="size-5 text-muted-foreground/70" />
                    <span className="text-foreground font-medium">
                      {car.transmission}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Gauge className="size-5 text-muted-foreground/70" />
                    <span className="text-foreground font-medium">
                      {car.mileage.toLocaleString("ru-KZ")} км
                    </span>
                  </div>

                  {car.displacement && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Milestone className="size-5 text-muted-foreground/70" />
                      <span className="text-foreground font-medium">
                        Объем: {Number(car.displacement).toFixed(1)} л
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="w-full py-6 text-base font-semibold shadow-sm"
              onClick={onOrder}
            >
              Оставить заявку
            </Button>
          </div>
        </div>

        {/* Блок описания снизу на полную ширину */}
        {car.description && (
          <div className="mt-6 pt-6 border-t space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground tracking-wide">
              <FileText className="size-4 text-primary" />
              <span>ОПИСАНИЕ</span>
            </div>
            <p className="text-sm sm:text-base text-foreground whitespace-pre-line leading-relaxed bg-muted/20 p-4 rounded-xl border">
              {car.description}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
