"use client";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import Zayavka from "@/components/Zayavka";
import Link from "next/link";
import Map from "@/components/Map";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  Building,
  Check,
  CircleDollarSign,
  Clock,
  FileSpreadsheet,
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
  // Функция для плавного скролла
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background w-screen flex flex-col gap-8 my-8 min-h-screen items-center font-sans px-60">
      <div className="w-full">
        <div className="flex flex-col gap-2 ">
          <h2 className="pb-4 text-text text-3xl font-bold">
            Подберем Автомобиль под ваши требования
          </h2>
          <p className="text-gray-500 text-xl pb-4">
            уточните фильтры и отсортирйуте результаты
          </p>
          <div className="flex items-center mt-auto gap-2">
            <Link href="/catalog">
              <Button
                className="w-44 h-12 p-2 transition-transform active:scale-95"
                variant="default"
              >
                <span className="text-primary-foreground text-lg/5">
                  Подобрать автo
                </span>
              </Button>
            </Link>
            <Link href="/services#how-we-work">
              <Button
                className="w-44 h-12 p-2 transition-transform active:scale-95"
                variant="outline"
              >
                <span className="text-wrap text-text text-lg/5">
                  Как Работаем
                </span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <Shield className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">гарантия до 30 дней</h1>
            </div>

            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <Check className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">честный отчет</h1>
            </div>

            <div className="flex flex-row gap-1 align-middle p-1">
              <div className="bg-primary/20 rounded-full size-8 flex align-middle justify-center p-1">
                <Hourglass className="text-blue-600" />
              </div>
              <h1 className="text-gray-500 text-xl/8">большой опыт работы</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-black text-2xl pb-4 font-bold">Преимущества</h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className=" shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <BadgeCheck className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Прозрачность
            </div>
            <p className=" text-xl p-2">
              Фото и видео отчет, проверки по базам, Диагностика СТО
            </p>
          </div>
          <div className="shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <CircleDollarSign className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Без переплат
            </div>
            <p className=" text-xl p-2">
              Торг с продавцом , оценка ликвидности
            </p>
          </div>
          <div className="shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <KeySquare className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Под ключ
            </div>
            <p className=" text-xl p-2">От заявки до постановки на учет</p>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-col w-screen scroll-mt-6">
        <h1 className="text-black text-2xl pb-4 font-bold mt-8">
          Принципы Работы
        </h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <FileSpreadsheet className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Прозрачность
            </div>
            <p className=" text-xl p-2">
              Фото и видео отчет, проверки по базам, Диагностика СТО
            </p>
          </div>
          <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <ScanSearch className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Без переплат
            </div>
            <p className=" text-xl p-2">
              Торг с продавцом , оценка ликвидности
            </p>
          </div>
          <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <Handshake className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Под ключ
            </div>
            <p className=" text-xl p-2">От заявки до постановки на учет</p>
          </div>
          <div className=" bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl   ">
            <div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
              <TicketCheck className="text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold p-2">
              Безопасность
            </div>
            <p className=" text-xl p-2">оформление всех нужных</p>
          </div>
        </div>
      </div>

      <div className="rounded-md p-2 flex flex-col gap-6 w-full">
        <h1 className="text-black text-2xl font-bold mt-8 border-b pb-4">
          Почему выбирают именно нас?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 pt-2">
          {/* Причина 1 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-lg size-12 flex items-center justify-center border border-primary/20">
              <Shield className="text-primary size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Юридическая чистота
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Каждый автомобиль проходит тотальную проверку по всем базам
              залогов, арестов и угонов. Вы получаете абсолютно «чистую» машину
              без скрытых сюрпризов.
            </p>
          </div>

          {/* Причина 2 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-lg size-12 flex items-center justify-center border border-primary/20">
              <ScanSearch className="text-primary size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Экспертная диагностика
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Мы не верим продавцам на слово. Проверяем кузов толщиномером,
              проводим компьютерную диагностику всех блоков и оцениваем реальное
              состояние ходовой на СТО.
            </p>
          </div>

          {/* Причина 3 */}
          <div className="flex flex-col gap-3 p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 rounded-lg size-12 flex items-center justify-center border border-primary/20">
              <CircleDollarSign className="text-primary size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Окупаемость и жесткий торг
            </h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Умеем аргументированно торговаться с продавцами. В 90% случаев
              сумма сэкономленных нами денег полностью окупает стоимость наших
              услуг для вас.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-start w-full gap-8 mt-8">
        <div className="flex flex-row gap-16">
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
              <span>г. Караганды, Муканова, 15</span>
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
        <div className="flex-shrink-0 ">
          <Map />
        </div>
      </div>
    </div>
  );
}
