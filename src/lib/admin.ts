export interface AdminStats {
	total_orders: number;
	total_cars: number;
	total_users: number;
	orders_by_status: Record<string, number>;
}

export interface UserWithRole {
	user_id: string;
	email: string | null;
	role: "customer" | "admin";
	full_name: string | null;
	phone: string | null;
	avatar_url: string | null;
	created_at: string;
}
