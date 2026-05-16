import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { carSchema } from "@/lib/cars";

// GET /api/cars - получить список машин (с опциональной фильтрацией)
//
// Пример: GET /api/cars?brand=Toyota&yearFrom=2020&priceTo=20000000
//
// Все query-параметры опциональные. Если не передать ничего - вернутся все машины.
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;

	// Строим запрос к Supabase
	// select("*") - выбрать все колонки
	let query = supabase.from("cars").select("*");

	// Каждый переданный фильтр добавляется к запросу
	const brand = searchParams.get("brand");
	if (brand) query = query.ilike("brand", `%${brand}%`);

	const model = searchParams.get("model");
	if (model) query = query.ilike("model", `%${model}%`);

	const yearFrom = searchParams.get("yearFrom");
	if (yearFrom) query = query.gte("year", Number(yearFrom));

	const yearTo = searchParams.get("yearTo");
	if (yearTo) query = query.lte("year", Number(yearTo));

	const priceFrom = searchParams.get("priceFrom");
	if (priceFrom) query = query.gte("price", Number(priceFrom));

	const priceTo = searchParams.get("priceTo");
	if (priceTo) query = query.lte("price", Number(priceTo));

	const transmission = searchParams.get("transmission");
	if (transmission) query = query.eq("transmission", transmission);

	// Сортируем по дате создания, новые вперёд
	query = query.order("created_at", { ascending: false });

	const { data, error } = await query;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}

// POST /api/cars - создать новую машину
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
	const body = await request.json();

	// Валидация; если прислали хуйню - кидай 400
	const parsed = carSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	// insert не возвращает созданные значения, нужно чейнить с селектом, single
	// ограничивает селект до одного ряда
	const { data, error } = await supabase
		.from("cars")
		.insert(parsed.data)
		.select()
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	// 201 - статус обозначающий создание ресурса
	return NextResponse.json(data, { status: 201 });
}
