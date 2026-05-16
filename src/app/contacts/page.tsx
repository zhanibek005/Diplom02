"use client";

import CompanyForum from "@/components/CompanyForum";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageCircle, Building, Clock } from "lucide-react";

export default function Contacts() {
  const funcName = () => console.log();

  return (
    <div className="bg-background w-screen flex flex-col gap-12 my-8 min-h-screen items-center font-sans px-60">
      <div className="bg-primary/5 -mx-60 px-60 py-8 flex flex-col w-screen gap-2">
        <h1 className="text-3xl font-bold">Контакты</h1>
        <p className="text-gray-500 text-xl">
          Свяжитесь с нами любым удобным способом
        </p>
      </div>

      <div className="flex flex-row gap-12 w-full justify-center">
        <CompanyForum onSubmit={funcName} onCancel={funcName} />
        <div className="shadow-md rounded-xl border flex flex-col p-6 w-xl gap-4">
          <h2 className="text-2xl font-semibold">Наши контакты</h2>

          <Separator />

          <div className="flex flex-row gap-2 items-center">
            <Phone className="text-blue-600" />
            <span>+7 777 777 77 77</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <MessageCircle className="text-blue-600" />
            <span>WhatsApp / Telegram</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Building className="text-blue-600" />
            <span>г. Алматы, ул. Зольная, 15</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Clock className="text-blue-600" />
            <span>Пн–Сб: 10:00 – 19:00</span>
          </div>

          <Separator />

          <p className="text-gray-500 text-sm">
            Мы всегда на связи и готовы проконсультировать вас по подбору
            автомобиля
          </p>
        </div>
      </div>
    </div>
  );
}
