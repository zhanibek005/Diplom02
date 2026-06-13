"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ClipboardList, Search, ShieldCheck, Key } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderDialog from "@/components/OrderDialog";

export default function Home() {
  const [openForm, setOpenForm] = useState(false);
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

        <div className="rounded-md gap-8 w-full flex flex-row items-stretch">
          {/* Тариф: Обычный */}
          <div className="bg-background shadow-md w-full border-2 border-indigo-200 rounded-xl p-4 py-10 flex flex-col gap-6 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold text-black">
              Обычный
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Быстрый отбор и базовые проверки
            </p>
            <div className="font-bold text-2xl p-1 text-black">
              <p>от 149 000 ₸</p>
            </div>
            <ul className="text-gray-500 text-lg font-semibold list-disc ml-4">
              <li>Срез рынка до 5 вариантов</li>
              <li>Проверка по базам</li>
              <li>Онлайн консультация</li>
            </ul>
          </div>

          {/* Тариф: Про */}
          <div className="bg-background shadow-md w-full border-2 border-indigo-200 rounded-xl p-4 py-10 flex flex-col gap-6 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold text-black">
              Про
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Оптимально для большинства
            </p>
            <div className="font-bold text-2xl p-1 text-black">
              <p>от 249 000 ₸</p>
            </div>
            <ul className="text-gray-500 text-lg font-semibold list-disc ml-4">
              <li>Срез рынка до 10 вариантов</li>
              <li>Выездная диагностика</li>
              <li>Торг и сопровождение сделки</li>
              <li>Поддержка 30+ дней</li>
            </ul>
          </div>

          {/* Тариф: Премиум */}
          <div className="bg-background shadow-md w-full border-2 border-indigo-200 rounded-xl p-4 py-10 flex flex-col gap-6 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500">
            <div className="flex flex-col mb-4 gap-2 text-lg font-semibold text-black">
              Премиум
            </div>
            <p className="text-gray-500 font-bold text-base p-1">
              Максимальная забота и сервис
            </p>
            <div className="font-bold text-2xl p-1 text-black">
              <p>от 349 000 ₸</p>
            </div>
            <ul className="text-gray-500 text-lg font-semibold list-disc ml-4">
              <li>Персональный эксперт</li>
              <li>2+ выезда в день</li>
              <li>Организация СТО</li>
              <li>Сопровождение до постановки на учет</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          *итоговая стоимость зависит от города. Точные условия в заявке
        </p>
      </div>
      <div
        id="how-we-work"
        className="-mx-60 px-60 py-12 flex flex-col w-screen bg-background"
      >
        <h1 className="text-black text-2xl pb-6 font-bold">Как мы работаем</h1>

        {/* Адаптивная сетка вместо flex-row с фиксированной шириной карточек */}
        <div className="grid grid-cols-4 gap-6 w-full">
          <div className="group bg-background shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-500 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start w-full">
              <div className="bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-lg p-2.5">
                <ClipboardList className="text-blue-600 size-6" />
              </div>
              <span className="text-4xl font-black text-gray-300 group-hover:text-blue-500 select-none transition-colors">
                01
              </span>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <h3 className="font-bold text-lg text-gray-900">Бриф и анализ</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Заполняете заявку, детально разбираем ваши пожелания и согласуем
                точные критерии поиска.
              </p>
            </div>
          </div>
          <div className="group bg-background shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-500 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start w-full">
              <div className="bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-lg p-2.5">
                <Search className="text-blue-600 size-6" />
              </div>
              <span className="text-4xl font-black text-gray-300 group-hover:text-blue-500 select-none transition-colors">
                02
              </span>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <h3 className="font-bold text-lg text-gray-900">
                Активный поиск
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Мониторим закрытые чаты, автосалоны и доски объявлений.
                Ежедневно присылаем лучшие варианты.
              </p>
            </div>
          </div>
          <div className="group bg-background shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-500 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start w-full">
              <div className="bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-lg p-2.5">
                <ShieldCheck className="text-blue-600 size-6" />
              </div>
              <span className="text-4xl font-black text-gray-300 group-hover:text-blue-500 select-none transition-colors">
                03
              </span>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <h3 className="font-bold text-lg text-gray-900">Диагностика</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Организуем выезды эксперта, проверяем кузов и электронику,
                отправляем вам подробные отчеты.
              </p>
            </div>
          </div>
          <div className="group bg-background shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-500 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start w-full">
              <div className="bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-lg p-2.5">
                <Key className="text-blue-600 size-6" />
              </div>
              <span className="text-4xl font-black text-gray-300 group-hover:text-blue-500 select-none transition-colors">
                04
              </span>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <h3 className="font-bold text-lg text-gray-900">Торг и сделка</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Аргументированно сбиваем цену, готовим документы и передаем вам
                проверенный автомобиль.
              </p>
            </div>
          </div>
        </div>
        <Button
          className="w-52 self-center mt-10 h-14 text-lg font-medium transition-transform active:scale-95"
          onClick={() => setOpenForm(true)}
        >
          Оставить заявку
        </Button>
      </div>
      <div className="bg-primary/5 -mx-60 px-60 py-12 flex flex-col gap-4 w-screen">
        <p className="font-bold text-2xl">Частые вопросы</p>

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 font-semibold"
        >
          <AccordionItem
            value="item-1"
            className="bg-background rounded-md px-4 shadow-md border-b-0"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              Сколько длится подбор?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 font-normal border-t pt-2 pb-4">
              В среднем подбор автомобиля занимает от 3 до 14 дней в зависимости
              от редкости критериев и состояния рынка.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-background rounded-md px-4 shadow-md border-b-0"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              Процент от сделки?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 font-normal border-t pt-2 pb-4">
              Мы не берем скрытых процентов. Стоимость наших услуг фиксированная
              и утверждается до начала поиска автомобиля.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-background rounded-md px-4 shadow-md border-b-0"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              Время оформления?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 font-normal border-t pt-2 pb-4">
              Оформление договора купли-продажи и проверка документов занимает
              не более 1-2 часов прямо на месте сделки.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-background rounded-md px-4 shadow-md border-b-0"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              Онлайн консультация
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 font-normal border-t pt-2 pb-4">
              Да, мы проводим подробные онлайн-консультации по видеосвязи, где
              разбираем ваши потребности и анализируем текущий рынок.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <OrderDialog open={openForm} onOpenChange={setOpenForm} />
    </div>
  );
}
