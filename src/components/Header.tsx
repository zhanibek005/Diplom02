"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { User, LogOut, Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import OrderDialog from "./OrderDialog";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { user, loading, refresh } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Вы вышли");
  }

  const initial = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <div className="border border-b-accent/40 h-20 w-screen bg-background flex justify-between px-10 items-center gap-2">
        <Link href="/">
          <h2 className="text-text text-2xl font-bold">Автоподбор</h2>
        </Link>

        <div className="flex gap-2 items-center ">
          <Link href="/">
            <Button variant="ghost" className="text-accent ">
              Главная
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="ghost" className="text-accent">
              Подбор Авто
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="ghost" className="text-accent">
              Услуги
            </Button>
          </Link>
          <Link href="/company">
            <Button variant="ghost" className="text-accent">
              О компании
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-accent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          {loading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 size-9">
                  <Avatar>
                    <AvatarImage src={user.avatar_url || ""} alt={user.email} />
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.email ?? "Пользователь"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="size-4" />
                    Профиль
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="size-4" />
                      Админ панель
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="size-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-accent"
                onClick={() => setOpenLogin(true)}
              >
                Войти
              </Button>
              <Button
                variant="outline"
                className="text-accent"
                onClick={() => setOpenAuth(true)}
              >
                Регистрация
              </Button>
            </>
          )}
        </div>
      </div>

      <OrderDialog open={openForm} onOpenChange={setOpenForm} />

      {openLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-[400px]">
            <LoginForm
              onSubmit={() => {
                toast.success("Вход выполнен");
                setOpenLogin(false);
                refresh();
              }}
              onCancel={() => setOpenLogin(false)}
            />
          </div>
        </div>
      )}

      {openAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-[400px]">
            <RegisterForm
              onSubmit={() => {
                toast.success("Регистрация успешна!");
                setOpenAuth(false);
              }}
              onCancel={() => setOpenAuth(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
