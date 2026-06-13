import { z } from "zod";

// Создание машины
export const carSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  brand: z.string().min(1, "Марка обязательна"),
  model: z.string().min(1, "Модель обязательна"),

  year: z.number().int().min(1900).max(2030),

  price: z.number().positive(
    "Цена должна быть положительной",
  ),

  transmission: z.string().min(
    1,
    "Укажите КПП",
  ),

  mileage: z.number().int().min(0),

  displacement: z
    .number()
    .min(
      0,
      "Объем двигателя не может быть отрицательным",
    ),

  labels: z.array(z.string()),

  image_url: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .nullable()
    .optional(),
});

// Обновление
export const carUpdateSchema =
  carSchema.partial();

export type CarInsert =
  z.infer<typeof carSchema>;

export type CarUpdate =
  z.infer<typeof carUpdateSchema>;

// Полная запись из БД
export interface Car
  extends CarInsert {
  id: number;
  created_at: string;
}

// Фильтры каталога
export interface CarFilters {
  brand?: string;
  model?: string;

  yearFrom?: string;
  yearTo?: string;

  transmission?: string;

  mileage?: string;

  displacement?: string;

  priceFrom?: string;
  priceTo?: string;
}