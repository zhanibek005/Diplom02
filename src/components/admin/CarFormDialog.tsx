"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Car } from "@/lib/cars";

interface CarFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	car: Car | null;
	onSaved: () => void;
}

export function CarFormDialog({
	open,
	onOpenChange,
	car,
	onSaved,
}: CarFormDialogProps) {
	const isEdit = !!car;
	const [title, setTitle] = useState("");
	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [price, setPrice] = useState("");
	const [transmission, setTransmission] = useState("");
	const [mileage, setMileage] = useState("");
	const [labels, setLabels] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [saving, setSaving] = useState(false);
	const [uploadingImage, setUploadingImage] = useState(false);

	useEffect(() => {
		if (car) {
			setTitle(car.title);
			setBrand(car.brand);
			setModel(car.model);
			setYear(String(car.year));
			setPrice(String(car.price));
			setTransmission(car.transmission);
			setMileage(String(car.mileage));
			setLabels(car.labels.join(", "));
			setImageUrl(car.image_url ?? "");
		} else {
			setTitle("");
			setBrand("");
			setModel("");
			setYear("");
			setPrice("");
			setTransmission("");
			setMileage("0");
			setLabels("");
			setImageUrl("");
		}
	}, [car, open]);

	async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) {
			console.log("upload: no file selected");
			return;
		}
		console.log("upload: file", file.name, file.size, file.type);
		setUploadingImage(true);
		const supabase = createClient();
		const ext = file.name.split(".").pop() ?? "jpg";
		const path = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
		console.log("upload: uploading to", path);
		const { data: uploadRes, error } = await supabase.storage.from("cars").upload(path, file, {
			cacheControl: "3600",
			upsert: true,
		});
		console.log("upload: response", { uploadRes, error });
		if (error) {
			console.error("upload: error", error.message);
			toast.error("Ошибка загрузки: " + error.message);
			setUploadingImage(false);
			return;
		}
		const { data: { publicUrl } } = supabase.storage.from("cars").getPublicUrl(path);
		console.log("upload: public url", publicUrl);
		setImageUrl(publicUrl);
		setUploadingImage(false);
		toast.success("Изображение загружено");
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);

		const body = {
			title,
			brand,
			model,
			year: Number(year),
			price: Number(price),
			transmission,
			mileage: Number(mileage),
			labels: labels
				.split(",")
				.map((l) => l.trim())
				.filter(Boolean),
			image_url: imageUrl || undefined,
		};

		const url = isEdit ? `/api/cars/${car.id}` : "/api/cars";
		const method = isEdit ? "PUT" : "POST";

		const res = await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		setSaving(false);

		if (res.ok) {
			toast.success(isEdit ? "Автомобиль обновлён" : "Автомобиль добавлен");
			onSaved();
		} else {
			const data = await res.json();
			toast.error(data.error || "Ошибка сохранения");
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Редактировать автомобиль" : "Добавить автомобиль"}
					</DialogTitle>
					<DialogDescription>Заполните все поля</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Название</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="brand">Марка</Label>
							<Input
								id="brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="model">Модель</Label>
							<Input
								id="model"
								value={model}
								onChange={(e) => setModel(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="year">Год</Label>
							<Input
								id="year"
								type="number"
								value={year}
								onChange={(e) => setYear(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="price">Цена (₸)</Label>
							<Input
								id="price"
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="transmission">КПП</Label>
							<Input
								id="transmission"
								value={transmission}
								onChange={(e) => setTransmission(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="mileage">Пробег (км)</Label>
							<Input
								id="mileage"
								type="number"
								value={mileage}
								onChange={(e) => setMileage(e.target.value)}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="labels">Метки (через запятую)</Label>
						<Input
							id="labels"
							value={labels}
							onChange={(e) => setLabels(e.target.value)}
							placeholder="седан, бензин, 2021"
						/>
					</div>

					<div className="space-y-2">
						<Label>Изображение</Label>
						<div className="flex items-center gap-4">
							<Button variant="outline" type="button" disabled={uploadingImage} asChild>
								<label htmlFor="car-image" className="cursor-pointer">
									{uploadingImage ? "Загрузка..." : "Выбрать файл"}
								</label>
							</Button>
							<input
								id="car-image"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleImageUpload}
							/>
							{imageUrl && (
								<div className="relative size-16 rounded overflow-hidden border">
									<img
										src={imageUrl}
										alt="preview"
										className="size-full object-cover"
									/>
								</div>
							)}
						</div>
						<Input
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							placeholder="Или вставьте URL вручную"
							className="mt-2"
						/>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Отмена
						</Button>
						<Button type="submit" disabled={saving}>
							{saving ? "Сохранение..." : isEdit ? "Сохранить" : "Добавить"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
