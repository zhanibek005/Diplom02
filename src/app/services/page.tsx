"use client";
import CarCard from "@/components/CarCard";
import PerCard from "@/components/PerCard";
import SampleModal from "@/components/SampleDialog";
import ThemeButton from "@/components/ThemeButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Zayavka from "@/components/Zayavka";
import {
  BadgeCheck,
  Building,
  Check,
  CircleDollarSign,
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
  const funcName = () => console.log();
  return (
    <div className="bg-background w-screen flex flex-col gap-8 my-8 min-h-screen items-center font-sans px-60">
      <div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-row w-screen">
        <div className="flex flex-col gap-2 ">
          <h2 className="pb-4 text-text text-3xl font-bold">
            Услуги- подбор под ключ
          </h2>
          <p className="text-gray-500 text-xl pb-4">
            Предоставляем хорошие услуги по подбору авто
          </p>
          <div className="flex items-center mt-auto gap-2">
            <Button className="w-44 h-12 p-2" variant="default">
              <span className="text-primary-foreground text-lg/5">
                Подобрать автo
              </span>
            </Button>
            <Button className="w-44 h-12 p-2" variant="outline">
              <span className="text-wrap text-text text-lg/5">
                Как это работает?
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-black text-2xl pb-4 font-bold">
          Что входит в «Подбор под ключ»
        </h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className=" shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-4">
            <div className="h-14 flex align-middle p-2 pl-0 w-full">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-1 m-1 ml-0">
                <Check className="text-blue-600 " />
              </div>
              <p className="font-bold text-sm m-0.5 my-2 ">
                Поиск и предварительный срез рынка
              </p>
            </div>
            <div className=" ">
              <p>Подбереме 5-10 релевантных вариантов под ваш бюджет</p>
            </div>
            <div>
              <ul className="list-disc ml-4 text-gray-500">
                <li>Проверка по базам</li>
                <li>Аналитика цен</li>
              </ul>
            </div>
          </div>
          <div className=" shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-4">
            <div className="h-14 flex align-middle p-2 pl-0 w-full">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-1 m-1 ml-0">
                <Check className="text-blue-600 " />
              </div>
              <p className="font-bold text-sm m-0.5 my-2 ">
                Выездная диагностика
              </p>
            </div>
            <div className=" ">
              <p>Полная проверка 120+ пунктов компьютерная диагностика</p>
            </div>
            <div>
              <ul className="list-disc ml-4 text-gray-500">
                <li>Тест драйв</li>
                <li>Оценка скрытых расходов</li>
              </ul>
            </div>
          </div>
          <div className=" shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl p-2 flex flex-col gap-4">
            <div className="h-14 flex align-middle p-2 pl-0 w-full">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-1 m-1 ml-0">
                <Check className="text-blue-600 " />
              </div>
              <p className="font-bold text-sm m-0.5 my-2 ">
                сделка и оформление
              </p>
            </div>
            <div className=" ">
              <p>
                Торг с продавцом , Проверка документов, Сопровождение в ЦОН ,
                Передача авто
              </p>
            </div>
            <div>
              <ul className="list-disc ml-4 text-gray-500">
                <li>Договор и акт приема передачи</li>
                <li>Постпродажные рекомендаций</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-col w-screen">
        <h1 className="text-black text-2xl pb-4 font-bold mt-8">Тарифы</h1>
        <div className="rounded-md gap-8 w-full flex flex-row">
          <div className=" bg-background shadow-md w-full h-full border border-2-indigo-400 rounded-xl p-4 py-10 flex flex-col gap-6">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold">
              Обычный
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Быстрый отбор и базовые проверки
            </p>
            <div className="font-bold text-2xl p-1">
              <p>от 149 000 ₸</p>
            </div>
            <ul className="text-gray-500 text-lg  font-semibold list-disc ml-4">
              <li>Срез рынка до 5 вариантов</li>
              <li>Проверка по базам</li>
              <li>Онлайн консультация</li>
            </ul>
            <Button className="w-full h-10 mb-4" variant="outline">
              выбрать
            </Button>
          </div>
          <div className=" bg-background shadow-md w-full h-full border border-2-indigo-400 rounded-xl p-4 py-10 flex flex-col gap-6">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold">
              Про
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Оптимально для большинства
            </p>
            <div className="font-bold text-2xl  p-1">
              <p>от 249 000 ₸</p>
            </div>
            <ul className="text-gray-500  font-semibold list-disc ml-4">
              <li>срез рынка до 10 вариантов</li>
              <li>выездная диагностика</li>
              <li>Торг и сопровождение сделки</li>
              <li>Поддержка 30+ дней</li>
            </ul>
            <Button className="w-full" variant="outline">
              выбрать
            </Button>
          </div>
          <div className=" bg-background shadow-md w-full h-full border border-2-indigo-400 rounded-xl p-4 py-10 flex flex-col gap-6">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold">
              Премиум
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Максимальрная забота и сервис
            </p>
            <div className="font-bold text-2xl p-1">
              <p>от 349 000 ₸</p>
            </div>
            <ul className="text-gray-500  font-semibold list-disc ml-4">
              <li>Персональный эексперт</li>
              <li>2+ выезда в день</li>
              <li>Организация СТО</li>
              <li>Сопровождение до постановки на учет</li>
            </ul>
            <Button className="w-full" variant="outline">
              выбрать
            </Button>
          </div>
        </div>
        <p>*итоговая стоимость зависит от города. Точные условия в заявки</p>
      </div>
      <div className="rounded-md p-2 flex flex-col gap-2 justify-between w-full">
        <div className="-mx-60 px-60 py-2 flex flex-col w-screen">
          <h1 className="text-black text-2xl pb-4 font-bold mt-8">
            Как мы работаем
          </h1>
          <div className="rounded-md gap-8 w-full flex flex-row">
            <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-0.5 m-2">
                <p className="text-blue-600 text-xl font-semibold">1</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-semibold p-2">
                Бриф
              </div>
              <p className=" text-xl p-2">
                Заполняет заявку, согласуем критерии
              </p>
            </div>
            <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-0.5 m-2">
                <p className="text-blue-600 text-xl font-semibold">2</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-semibold p-2">
                Поиск
              </div>
              <p className=" text-xl p-2">Ежедневно присылаем варианты</p>
            </div>
            <div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-0.5 m-2">
                <p className="text-blue-600 text-xl font-semibold">3</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-semibold p-2">
                Осмотры
              </div>
              <p className=" text-xl p-2">Выезды, диагностика, отчеты</p>
            </div>
            <div className=" bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
              <div className="bg-primary/20 rounded-md size-8 flex align-middle justify-center p-0.5 m-2">
                <p className="text-blue-600 text-xl font-semibold">4</p>
              </div>
              <div className="flex flex-col gap-2 text-sm font-semibold p-2">
                Сделка
              </div>
              <p className=" text-xl p-2">Торг, документы, передача авто</p>
            </div>
          </div>
          <Button className=" w-40 self-center mt-6 h-14">
            <span className="text-lg p-1 pl-2">Оставьте заявку</span>
          </Button>
        </div>
      </div>
      <div className="bg-primary/5 -mx-60 px-60 py-12 flex flex-col gap-4 w-screen">
        <p className="font-bold text-2xl">Частые вопросы </p>
        <ul className="font-semibold ml-4 flex flex-col gap-4 justify-center">
          <li className="bg-background rounded-md p-2 shadow-md align-middle before:align-middle before:content-['•'] before:mr-4 before:text-xl">
            Сколько длится подбор?
          </li>
          <li className="bg-background rounded-md p-2 shadow-md align-middle before:align-middle before:content-['•'] before:mr-4 before:text-xl">
            Процент от сделки?
          </li>
          <li className="bg-background rounded-md p-2 shadow-md align-middle before:align-middle before:content-['•'] before:mr-4 before:text-xl">
            Время оформления?
          </li>
          <li className="bg-background rounded-md p-2 shadow-md align-middle before:align-middle before:content-['•'] before:mr-4 before:text-xl">
            Онлайн консультация
          </li>
        </ul>
      </div>
    </div>
  );
}
