import { z } from "zod";

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface OrderCar {
	id: number;
	title: string;
	brand: string;
	model: string;
	price: number;
	image_url?: string;
}

export interface Order {
	id: string;
	user_id: string;
	status: OrderStatus;
	created_at: string;
	updated_at: string;
	cars: OrderCar[];
	user?: {
		full_name: string | null;
		phone: string | null;
		email: string | null;
	} | null;
}

export const createOrderSchema = z.object({
	car_ids: z.array(z.number()).min(1, "Выберите хотя бы один автомобиль"),
	phone: z.string().min(1, "Укажите телефон"),
	comment: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
	status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
