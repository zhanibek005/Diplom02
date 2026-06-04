"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function RegisterForm({
  onSubmit,
  onCancel,
}: RegisterFormProps) {
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
    if (password.length < 6)
      newErrors.password = "Пароль должен быть от 6 символов";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          onSubmit(); // Успешно: вызываем закрытие и уведомление
          router.push("/profile");
        } else {
          alert(data.error || "Ошибка регистрации");
        }
      } catch (err) {
        alert("Ошибка соединения с сервером");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLegend>Регистрация</FieldLegend>
        <FieldDescription>Создайте аккаунт в системе</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="reg-email">Email</FieldLabel>
            <Input
              id="reg-email"
              type="email"
              autoComplete="off"
              placeholder="mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              disabled={loading}
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-password">Пароль</FieldLabel>
            <Input
              id="reg-password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              disabled={loading}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>
        </FieldGroup>

        <FieldSeparator />

        <div className="flex gap-2 mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Создание..." : "Зарегистрироваться"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onCancel}
            disabled={loading}
          >
            Отмена
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
