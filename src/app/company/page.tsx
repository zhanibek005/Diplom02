"use client";
import CarCard from "@/components/CarCard";
import PerCard from "@/components/PerCard";
import SampleModal from "@/components/SampleDialog";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Zayavka from "@/components/Zayavka";
import CompanyForum from "@/components/CompanyForum";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  Building,
  Check,
  CircleDollarSign,
  FileCheckCorner,
  FileSpreadsheet,
  Globe,
  Handshake,
  Hourglass,
  KeySquare,
  MessageCircle,
  Phone,
  ScanSearch,
  Shield,
  TicketCheck,
} from "lucide-react";

export default function Home() {
  const funcName = () => console.log();
  return (
    <div className="bg-background w-screen flex flex-col gap-8 my-8 min-h-screen items-center font-sans px-60">
      <div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-row w-screen">
        <div className="flex flex-col gap-2 ">
          <h2 className="pb-4 text-text text-3xl font-bold">О компаний</h2>
          <p className="text-gray-500 text-xl pb-4">
            Мы - команда автоэкспертов. Честный автоподбор «под ключ»: аналитика
            рынка, выездные осмотры, торг и полное сопровождение сделки
          </p>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <FileCheckCorner className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">Работаем по договору</h1>
            </div>

            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <Check className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">отчет 120+ пунктов</h1>
            </div>

            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <Globe className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">по всему Казахстану</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-black text-2xl pb-4 font-bold">
          Наш опыт в цифрах
        </h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className=" shadow-md w-110 h-24 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-1.5">
            <p className="font-bold text-2xl m-1">5+ лет</p>
            <p className="text-gray-500 ml-1 text-lg">на рынке Автоподбора</p>
          </div>
          <div className=" shadow-md w-110 h-24 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-1.5">
            <p className="font-bold text-2xl m-1">800+ лет</p>
            <p className="text-gray-500 ml-1 text-lg">осмотров и диагностик</p>
          </div>
          <div className=" shadow-md w-110 h-24 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-1.5">
            <p className="font-bold text-2xl m-1">95%</p>
            <p className="text-gray-500 ml-1 text-lg">
              клиентов нас рекомендуют
            </p>
          </div>
        </div>
      </div>
      <div className="-mx-60 px-60 py-2 flex flex-col w-screen">
        <h1 className="text-black text-2xl pb-4 font-bold mt-8">Команда</h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className=" bg-background w-full h-full rounded-xl p-4 py-10 flex flex-col gap-6">
            <div className="rounded-md p-2 flex flex-col gap-2 justify-between w-full">
              <div className="flex flex-row w-full justify-between p-2 gap-4">
                <PerCard
                  name="Иван З."
                  position={["Ведущий Автоэксперт", "Диагностика авто"]}
                  skills={["Toyota", "Mazda", "Hyundai"]}
                  imageUrl="https://content.kaspersky-labs.com/fm/site-editor/dc/dc17dbf731bc7c7018d13ffe643e480d/processed/case-study-neo-q93-r1920.jpg"
                />
                <PerCard
                  name="Арут Н."
                  position={["Аналитик рынка", "Юр проверка"]}
                  skills={["VIN-базы", "История", "Ликвидность"]}
                  imageUrl="https://content.kaspersky-labs.com/fm/site-editor/dc/dc17dbf731bc7c7018d13ffe643e480d/processed/case-study-neo-q93-r1920.jpg"
                />
                <PerCard
                  name="Чак Н."
                  position={["Переговорщик", "Торг и сделка"]}
                  skills={["Торг", "СТО", "Страхование"]}
                  imageUrl="https://content.kaspersky-labs.com/fm/site-editor/dc/dc17dbf731bc7c7018d13ffe643e480d/processed/case-study-neo-q93-r1920.jpg"
                />
                <PerCard
                  name="Данияр Д."
                  position={["Дизайн и сервис клиента"]}
                  skills={["UX", "коммуникация", "Отчеты"]}
                  imageUrl="https://content.kaspersky-labs.com/fm/site-editor/dc/dc17dbf731bc7c7018d13ffe643e480d/processed/case-study-neo-q93-r1920.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-row w-screen">
        <div className="-mx-60 px-60 py-2 flex flex-col w-screen">
          <h1 className="text-black text-2xl pb-4 font-bold mt-8">
            Наши ценности
          </h1>
          <div className="rounded-md gap-8 w-full flex flex-row">
            <div className="bg-background shadow-md w-110 h-40 border border-2-indigo-400 rounded-xl flex flex-col gap-0 p-4 ">
              <p className="flex flex-col text-sm font-semibold">Честность</p>
              <p className=" text-xl pt-4">
                Никаких скрытых договореностей с продавцами. Только интересы
                клиента
              </p>
            </div>
            <div className="bg-background shadow-md w-110 h-40 border border-2-indigo-400 rounded-xl flex flex-col gap-0 p-4   ">
              <div className="flex flex-col text-sm font-semibold">
                Прозрачность
              </div>
              <p className=" text-xl pt-4">
                Пошаговые отчеты, все выводы с подвержденны фактами
              </p>
            </div>
            <div className="bg-background shadow-md w-110 h-40 border border-2-indigo-400 rounded-xl flex flex-col gap-0 p-4   ">
              <div className="flex flex-col text-sm font-semibold">Забота</div>
              <p className=" text-xl pt-4">
                Делаем рекомандаций под бюджет и требования клиента
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8 align-middle w-screen justify-center ">
        <CompanyForum onSubmit={funcName} onCancel={funcName} />
        <div className=" shadow-md rounded-xl border flex flex-col align-middle p-6 w-xl pt-8 h-58 gap-2">
          <p className="text-2xl font-semibold">Контакты</p>
          <div className="flex flex-row gap-2">
            <div className="bg-primary/20 rounded-md size-6 flex align-middle justify-center p-0.5">
              <Phone className="text-blue-600" />
            </div>
            <h1> + 7 777 777 77 77 </h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-primary/20 rounded-md size-6 flex align-middle justify-center p-0.5">
              <MessageCircle className="text-blue-600" />
            </div>
            <h1> WhatsApp </h1>
          </div>
          <div className="flex flex-row gap-2">
            <div className="bg-primary/20 rounded-md size-6 flex align-middle justify-center p-0.5">
              <Building className="text-blue-600" />
            </div>
            <h1> Зольная улица, 15 </h1>
          </div>
          <Separator />
          <p className="text-gray-500 pt-2">График: Пн-Сб 10:00-19:00</p>
        </div>
      </div>
    </div>
  );
}
