"use client";

import { useRef, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export default function ProfileSettingsTab() {
	const { user, refresh } = useAuth();
	const [fullName, setFullName] = useState(user?.full_name ?? "");
	const [phone, setPhone] = useState(user?.phone ?? "");
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const avatarUploadRef = useRef<HTMLInputElement>(null);

	async function handleSave() {
		setSaving(true);
		const res = await fetch("/api/profile", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ full_name: fullName, phone }),
		});
		if (res.ok) {
			toast.success("Профиль обновлён");
			refresh();
		} else {
			toast.error("Ошибка при сохранении");
		}
		setSaving(false);
	}

	async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);
		const res = await fetch("/api/profile/avatar", {
			method: "POST",
			body: formData,
		});
		if (res.ok) {
			toast.success("Аватар обновлён");
			refresh();
		} else {
			toast.error("Ошибка загрузки");
		}
		setUploading(false);
	}

	const displayName = user?.full_name ?? user?.email ?? "U";
	const avatarInitial = displayName.charAt(0).toUpperCase();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Личные данные</CardTitle>
				<CardDescription>
					Ваш email, имя и контактный телефон
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex items-center gap-4">
					<Avatar size="lg">
						<AvatarImage src={user?.avatar_url ?? undefined} />
						<AvatarFallback>{avatarInitial}</AvatarFallback>
					</Avatar>
					<div>
						<Label htmlFor="avatar" className="cursor-pointer">
							<Button
								variant="outline"
								type="button"
								disabled={uploading}
								onClick={() => avatarUploadRef.current?.click()}
							>
								{uploading ? "Загрузка..." : "Загрузить аватар"}
							</Button>
						</Label>
						<input
							id="avatar"
							ref={avatarUploadRef}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleAvatarUpload}
						/>
						<p className="text-xs text-muted-foreground mt-1">
							PNG, JPG. До 5MB.
						</p>
					</div>
				</div>

				<div className="space-y-2">
					<Label>Email</Label>
					<Input value={user?.email ?? ""} disabled />
				</div>

				<div className="space-y-2">
					<Label htmlFor="fullName">Имя</Label>
					<Input
						id="fullName"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="Ваше имя"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">Телефон</Label>
					<Input
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="+7 777 777 77 77"
					/>
				</div>

				<Button onClick={handleSave} disabled={saving}>
					{saving ? "Сохранение..." : "Сохранить"}
				</Button>
			</CardContent>
		</Card>
	);
}
