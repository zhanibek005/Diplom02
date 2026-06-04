import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { carSchema } from "@/lib/cars";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const supabase = await createClient();

	const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
	const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "50", 10)));

	let countQuery = supabase.from("cars").select("*", { count: "exact", head: true });
	let dataQuery = supabase.from("cars").select("*");

	const brand = searchParams.get("brand");
	if (brand) {
		countQuery = countQuery.ilike("brand", `%${brand}%`);
		dataQuery = dataQuery.ilike("brand", `%${brand}%`);
	}

	const model = searchParams.get("model");
	if (model) {
		countQuery = countQuery.ilike("model", `%${model}%`);
		dataQuery = dataQuery.ilike("model", `%${model}%`);
	}

	const yearFrom = searchParams.get("yearFrom");
	if (yearFrom) {
		countQuery = countQuery.gte("year", Number(yearFrom));
		dataQuery = dataQuery.gte("year", Number(yearFrom));
	}

	const yearTo = searchParams.get("yearTo");
	if (yearTo) {
		countQuery = countQuery.lte("year", Number(yearTo));
		dataQuery = dataQuery.lte("year", Number(yearTo));
	}

	const priceFrom = searchParams.get("priceFrom");
	if (priceFrom) {
		countQuery = countQuery.gte("price", Number(priceFrom));
		dataQuery = dataQuery.gte("price", Number(priceFrom));
	}

	const priceTo = searchParams.get("priceTo");
	if (priceTo) {
		countQuery = countQuery.lte("price", Number(priceTo));
		dataQuery = dataQuery.lte("price", Number(priceTo));
	}

	const transmission = searchParams.get("transmission");
	if (transmission) {
		countQuery = countQuery.eq("transmission", transmission);
		dataQuery = dataQuery.eq("transmission", transmission);
	}

	const from = (page - 1) * per_page;
	dataQuery = dataQuery.order("created_at", { ascending: false }).range(from, from + per_page - 1);

	const [{ count }, { data, error }] = await Promise.all([countQuery, dataQuery]);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({
		data: data ?? [],
		total: count ?? 0,
		page,
		per_page,
	});
}

// POST /api/cars - создать новую машину
// работает только для админов
//
// Пример тела запроса:
// {
//   "title": "Toyota Camry 70",
//   "brand": "Toyota",
//   "model": "Camry",
//   "year": 2021,
//   "price": 15500000,
//   "transmission": "АКПП",
//   "mileage": 45000,
//   "labels": ["седан", "бензин"],
//   "image_url": "https://example.com/photo.jpg"
// }
export async function POST(request: NextRequest) {
	// requireAdmin() внутри создаёт серверный клиент и проверяет роль
	const auth = await requireAdmin();
	if (auth instanceof NextResponse) return auth;

	const body = await request.json();

	const parsed = carSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	// auth.supabase - такой же клиент, как и supabase.createClient(); но хранит в
	// себе сессию текущешл пользователя
	// RLS на таблице cars разрешает insert только для админов
	// Без авторизации или нужной роли на пользователе кинет ошибку
	const { data, error } = await auth.supabase
		.from("cars")
		.insert(parsed.data)
		.select()
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data, { status: 201 });
}
