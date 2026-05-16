import { z } from "zod";

// Схема для создания машины (POST /api/cars)
// Все поля обязательные, кроме image_url
export const carSchema = z.object({
	title: z.string().min(1, "Название обязательно"),
	brand: z.string().min(1, "Марка обязательна"),
	model: z.string().min(1, "Модель обязательна"),
	year: z.number().int().min(1900).max(2030),
	price: z.number().positive("Цена должна быть положительной"),
	transmission: z.string().min(1, "Укажите КПП"),
	mileage: z.number().int().min(0),
	labels: z.array(z.string()),
	image_url: z.string().url().optional(),
});

// Схема для обновления (PUT /api/cars/[id])
// Все поля опциональные
export const carUpdateSchema = carSchema.partial();

// Тип для создания машины (то, что приходит в POST body)
export type CarInsert = z.infer<typeof carSchema>;

// Тип для обновления (то, что приходит в PUT body)
export type CarUpdate = z.infer<typeof carUpdateSchema>;

// Полная строка из БД (с автоматически генерируемыми полями)
export interface Car extends CarInsert {
	id: number;
	created_at: string;
}

// Тип фильтров для поиска (все опционально)
export interface CarFilters {
	brand?: string;
	model?: string;
	yearFrom?: string;
	yearTo?: string;
	transmission?: string;
	mileage?: string;
	priceFrom?: string;
	priceTo?: string;
}
