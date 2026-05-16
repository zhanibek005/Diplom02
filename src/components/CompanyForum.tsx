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
  const [errors, setErrors] = useState<{
    mark?: string;
    model?: string;
    yearFrom?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!mark.trim()) newErrors.mark = "Напишите марку";
    if (!model.trim()) newErrors.model = "Укажите модель";
    if (!yearFrom.trim()) newErrors.yearFrom = "Укажите год от";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Данные автомобиля</FieldLegend>
        <FieldGroup className="-ml-16 px-16 py-2 flex flex-row w-xl">
          <Field className="max-w-32">
            <FieldLabel htmlFor="mark">Имя</FieldLabel>
            <Input
              className="bg-background max-w-32"
              id="mark"
              autoComplete="off"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              aria-invalid={!!errors.mark}
            />
            {errors.mark ? <FieldError>{errors.mark}</FieldError> : null}
          </Field>

          <Field className="max-w-32">
            <FieldLabel htmlFor="model">Телефон</FieldLabel>
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
        </FieldGroup>

        <FieldGroup className="-ml-16 px-16 py-2 flex flex-row w-full">
          <Field className="max-w-40">
            <FieldLabel htmlFor="yearFrom">Сообщение</FieldLabel>
            <Input
              className="bg-background max-w-40"
              id="yearFrom"
              autoComplete="off"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              aria-invalid={!!errors.yearFrom}
            />
            {errors.yearFrom && <FieldError>{errors.yearFrom}</FieldError>}
          </Field>
        </FieldGroup>

        <div className="flex flex-row gap-2 mt-4">
          <Button type="submit" variant="default">
            Отправить
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
