"use client";

import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { CarFilters } from "@/lib/cars";

// Функции тоже можно прокидывать, как обычные переменные
interface SampleFormProps {
  onSubmit: (filters: CarFilters) => void;
  onCancel: () => void;
}

// При чтении пропсов можно сразу деконструировать их в объявлении функции
export default function SampleForm({ onSubmit, onCancel }: SampleFormProps) {
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");
  const [displacement, setDisplacement] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{
    mark?: string;
    model?: string;
    yearFrom?: string;
    yearTo?: string;
    transmission?: string;
    mileage?: string;
    displacement?: string;
    priceFrom?: string;
    priceTo?: string;
    company?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Собираем фильтры — все опциональные, отправляем только заполненные
    const filters: CarFilters = {};
    if (mark.trim()) filters.brand = mark.trim();
    if (model.trim()) filters.model = model.trim();
    if (yearFrom.trim()) filters.yearFrom = yearFrom.trim();
    if (yearTo.trim()) filters.yearTo = yearTo.trim();
    if (transmission.trim()) filters.transmission = transmission.trim();
    if (mileage.trim()) filters.mileage = mileage.trim();
    if (displacement.trim()) filters.displacement = displacement.trim();
    if (priceFrom.trim()) filters.priceFrom = priceFrom.trim();
    if (priceTo.trim()) filters.priceTo = priceTo.trim();

    onSubmit(filters);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Данные автомобиля</FieldLegend>
        <FieldDescription>Заполните поля для создания заявки</FieldDescription>
        <FieldGroup className=" bg-primary/5 -ml-16 px-16 py-2 flex flex-row w-screen">
          <Field className="max-w-32">
            <FieldLabel htmlFor="mark">Марка</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="mark"
              autoComplete="off"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              aria-invalid={!!errors.mark}
            />
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="model">Модель</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="model"
              autoComplete="off"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              aria-invalid={!!errors.model}
            />
            {errors.model && <FieldError>{errors.model}</FieldError>}
          </Field>

          <Field className="max-w-16">
            <FieldLabel htmlFor="yearFrom">Год от</FieldLabel>
            <Input
              className="bg-background max-w-16"
              id="yearFrom"
              autoComplete="off"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              aria-invalid={!!errors.yearFrom}
            />
            {errors.yearFrom && <FieldError>{errors.yearFrom}</FieldError>}
          </Field>

          <Field className="max-w-16">
            <FieldLabel htmlFor="yearTo">Год до</FieldLabel>
            <Input
              className=" bg-background max-w-16"
              id="yearTo"
              autoComplete="off"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              aria-invalid={!!errors.yearTo}
            />
            {errors.yearTo && <FieldError>{errors.yearTo}</FieldError>}
          </Field>

          <Field className="max-w-24">
            <FieldLabel htmlFor="transmission">КПП</FieldLabel>
            <Input
              className="bg-background max-w-24"
              id="transmission"
              autoComplete="off"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              aria-invalid={!!errors.transmission}
            />
            {errors.transmission && (
              <FieldError>{errors.transmission}</FieldError>
            )}
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="mileage">Пробег</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="mileage"
              autoComplete="off"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              aria-invalid={!!errors.mileage}
            />
            {errors.mileage && <FieldError>{errors.mileage}</FieldError>}
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="displacement">Объем</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="displacement"
              autoComplete="off"
              value={displacement}
              onChange={(e) => setDisplacement(e.target.value)}
              aria-invalid={!!errors.displacement}
            />
            {errors.displacement && (
              <FieldError>{errors.displacement}</FieldError>
            )}
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="priceFrom">Цена от</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="priceFrom"
              autoComplete="off"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              aria-invalid={!!errors.priceFrom}
            />
            {errors.priceFrom && <FieldError>{errors.priceFrom}</FieldError>}
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="priceTo">Цена до</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="priceTo"
              autoComplete="off"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              aria-invalid={!!errors.priceTo}
            />
            {errors.priceTo && <FieldError>{errors.priceTo}</FieldError>}
          </Field>
        </FieldGroup>

        <FieldSeparator />

        <div className="flex flex-row gap-2 mt-4">
          <Button type="submit" variant="outline">
            Отправить
          </Button>
          <Button type="button" variant="default" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
