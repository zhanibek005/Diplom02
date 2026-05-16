import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { carUpdateSchema } from "@/lib/cars";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/cars/[id] - получить одну машину по id
export async function GET(_request: NextRequest, { params }: RouteParams) {
	const { id } = await params;

	const { data, error } = await supabase
		.from("cars")
		.select("*")
		.eq("id", Number(id))
		.single();

	if (error) {
		return NextResponse.json(
			{ error: "Машина не найдена" },
			{ status: 404 },
		);
	}

	return NextResponse.json(data);
}

// PUT /api/cars/[id] - обновить машину (можно передать только те поля, которые меняются)
//
// Пример: PUT /api/cars/3
// Body: { "price": 14000000, "mileage": 50000 }
export async function PUT(request: NextRequest, { params }: RouteParams) {
	const { id } = await params;
	const body = await request.json();

	// carUpdateSchema - все поля опциональные (.partial())
	const parsed = carUpdateSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Ошибка валидации", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const { data, error } = await supabase
		.from("cars")
		.update(parsed.data)
		.eq("id", Number(id))
		.select()
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}

// DELETE /api/cars/[id] - удалить машину
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	const { id } = await params;

	const { error } = await supabase
		.from("cars")
		.delete()
		.eq("id", Number(id));

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ message: "Удалено" });
}
