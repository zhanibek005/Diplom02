"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
	onSubmit: () => void;
	onCancel: () => void;
}

export default function LoginForm({ onSubmit, onCancel }: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const newErrors: typeof errors = {};
		if (!email.includes("@")) newErrors.email = "Email введи нормально";
		if (!password) newErrors.password = "Введи пароль";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (res.ok) {
				onSubmit();
				router.refresh();
			} else {
				const data = await res.json();
				alert(data.error || "Ошибка входа");
			}
		} catch {
			alert("Ошибка соединения");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<FieldSet>
				<FieldLegend>Вход</FieldLegend>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="login-email">Email</FieldLabel>
						<Input
							id="login-email"
							type="email"
							autoComplete="email"
							placeholder="mail@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
						{errors.email && <FieldError>{errors.email}</FieldError>}
					</Field>
					<Field>
						<FieldLabel htmlFor="login-password">Пароль</FieldLabel>
						<Input
							id="login-password"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
						/>
						{errors.password && <FieldError>{errors.password}</FieldError>}
					</Field>
				</FieldGroup>
				<FieldSeparator />
				<div className="flex gap-2 mt-4">
					<Button type="submit" disabled={loading}>
						{loading ? "Вход..." : "Войти"}
					</Button>
					<Button type="button" variant="destructive" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</FieldSet>
		</form>
	);
}
