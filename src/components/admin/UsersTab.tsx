"use client";

import { useEffect, useState, useCallback } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { UserWithRole } from "@/lib/admin";

export function UsersTab() {
	const [users, setUsers] = useState<UserWithRole[]>([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const perPage = 20;

	const fetchUsers = useCallback(async () => {
		const res = await fetch(`/api/admin/users?page=${page}&per_page=${perPage}`);
		const json = await res.json();
		setUsers(Array.isArray(json.data) ? json.data : []);
		setTotal(json.total ?? 0);
	}, [page]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const totalPages = Math.ceil(total / perPage);

	async function handleToggleRole(userId: string, currentRole: string) {
		const newRole = currentRole === "admin" ? "customer" : "admin";
		const res = await fetch(`/api/admin/users/${userId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ role: newRole }),
		});
		if (res.ok) {
			setUsers((prev) =>
				prev.map((u) =>
					u.user_id === userId ? { ...u, role: newRole as "customer" | "admin" } : u,
				),
			);
			toast.success("Роль обновлена");
		} else {
			toast.error("Ошибка обновления роли");
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Пользователи</CardTitle>
			</CardHeader>
			<CardContent>
				{users.length === 0 ? (
					<p className="text-muted-foreground py-8 text-center">
						Нет пользователей
					</p>
				) : (
					<>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Имя</TableHead>
									<TableHead>Телефон</TableHead>
									<TableHead>Роль</TableHead>
									<TableHead>Зарегистрирован</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => (
									<TableRow key={user.user_id}>
										<TableCell>{user.full_name ?? "—"}</TableCell>
										<TableCell>{user.phone ?? "—"}</TableCell>
										<TableCell>
											<Badge
												variant={user.role === "admin" ? "default" : "secondary"}
											>
												{user.role === "admin" ? "Админ" : "Клиент"}
											</Badge>
										</TableCell>
										<TableCell>
											{new Date(user.created_at).toLocaleDateString("ru-RU")}
										</TableCell>
										<TableCell>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleToggleRole(user.user_id, user.role)}
											>
												{user.role === "admin"
													? "Сделать клиентом"
													: "Сделать админом"}
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{totalPages > 1 && (
							<div className="flex items-center justify-between mt-4">
								<p className="text-sm text-muted-foreground">
									Страница {page} из {totalPages} (всего {total})
								</p>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										disabled={page <= 1}
										onClick={() => setPage((p) => p - 1)}
									>
										<ChevronLeft className="size-4" />
									</Button>
									<Button
										variant="outline"
										size="sm"
										disabled={page >= totalPages}
										onClick={() => setPage((p) => p + 1)}
									>
										<ChevronRight className="size-4" />
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}
