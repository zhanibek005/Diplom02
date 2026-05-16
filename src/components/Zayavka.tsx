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

// Функции тоже можно прокидывать, как обычные переменные
interface SampleFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

// При чтении пропсов можно сразу деконструировать их в объявлении функции
export default function SampleForm({ onSubmit, onCancel }: SampleFormProps) {
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [transmission, setTransmission] = useState("");
  const [errors, setErrors] = useState<{
    mark?: string;
    model?: string;
    yearFrom?: string;
    yearTo?: string;
    transmission?: string;
    mileage?: string;
    priceFrom?: string;
    priceTo?: string;
    company?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!mark.trim()) newErrors.mark = "Напишите марку";
    if (!model.trim()) newErrors.model = "Укажите модель";
    if (!yearFrom.trim()) newErrors.yearFrom = "Укажите год от";
    if (!yearTo.trim()) newErrors.yearTo = "Укажите год до";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  }

  return (
    <form
      className="bg-primary/5 -mx-60 px-60 py-2 flex flex-col w-screen"
      onSubmit={handleSubmit}
    >
      <FieldSet>
        <FieldLegend>Данные автомобиля</FieldLegend>
        <FieldGroup className=" -ml-16 px-16 py-2 flex flex-row w-screen">
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
            {errors.model && <FieldError>{errors.model}</FieldError>}
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
        </FieldGroup>
      </FieldSet>
      <div className="flex flex-row gap-2 mt-4">
        <Button type="submit" variant="default">
          Подобрать Авто
        </Button>
      </div>
    </form>
  );
}
