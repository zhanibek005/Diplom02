"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";
import SampleForm from "./FormExample";
import RegisterForm from "./RegisterForm"; // Импортируем созданную форму

export default function Header() {
  const [openForm, setOpenForm] = useState(false);
  const [openAuth, setOpenAuth] = useState(false); // Стейт для регистрации

  return (
    <>
      <div className="border border-b-accent/40 h-20 w-screen bg-background flex justify-between px-10 items-center gap-2">
        <h2 className="text-text text-2xl font-bold">Автоподбор</h2>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="ghost" className="text-accent">
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
          <Link href="/contacts">
            <Button variant="ghost" className="text-accent">
              Контакты
            </Button>
          </Link>

          {/* КНОПКА ОТКРЫТИЯ ФОРМЫ ЗАЯВКИ */}
          <Button
            variant="outline"
            className="text-accent"
            onClick={() => setOpenForm(true)}
          >
            Оставить заявку
          </Button>

          {/* КНОПКА ОТКРЫТИЯ РЕГИСТРАЦИИ */}
          <Button
            variant="outline"
            className="text-accent"
            onClick={() => setOpenAuth(true)}
          >
            Регистрация
          </Button>
        </div>
      </div>

      {/* ФОРМА ЗАЯВКИ */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg w-[400px]">
            <SampleForm
              onSubmit={() => {
                toast.success("Заявка отправлена");
                setOpenForm(false);
              }}
              onCancel={() => setOpenForm(false)}
            />
          </div>
        </div>
      )}

      {/* ФОРМА РЕГИСТРАЦИИ (ВСПЛЫВАЕТ ТОЧНО ТАК ЖЕ) */}
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
