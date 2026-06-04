"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

interface OrderDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	preselectedCarIds?: number[];
}

export default function OrderDialog({
	open,
	onOpenChange,
	preselectedCarIds,
}: OrderDialogProps) {
	const { user, refresh } = useAuth();
	const [phone, setPhone] = useState("");
	const [comment, setComment] = useState("");
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (open) {
			setPhone(user?.phone ?? "");
			setComment("");
			setError("");
		}
	}, [open, user]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!user) {
			toast.error("Необходимо войти в систему");
			return;
		}
		if (!phone.trim()) {
			setError("Укажите номер телефона");
			return;
		}
		setError("");
		setSaving(true);
		const res = await fetch("/api/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				car_ids: preselectedCarIds ?? [],
				phone: phone.trim(),
				comment: comment.trim() || undefined,
			}),
		});
		if (res.ok) {
			toast.success("Заявка отправлена");
			refresh();
			onOpenChange(false);
		} else {
			const data = await res.json();
			toast.error(data.error || "Ошибка при отправке");
		}
		setSaving(false);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Оставить заявку</DialogTitle>
					<DialogDescription>
						Мы свяжемся с вами для уточнения деталей
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="phone">
							Телефон <span className="text-destructive">*</span>
						</Label>
						<Input
							id="phone"
							value={phone}
							onChange={(e) => { setPhone(e.target.value); setError(""); }}
							placeholder="+7 777 777 77 77"
							aria-invalid={!!error}
						/>
						{error && <p className="text-xs text-destructive">{error}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="comment">Комментарий</Label>
						<Textarea
							id="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Пожелания по автомобилю..."
						/>
					</div>
					<Button type="submit" disabled={saving} className="w-full">
						{saving ? "Отправка..." : "Отправить"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
