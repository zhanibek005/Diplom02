"use client";
import PerCard from "@/components/PerCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Check,
  FileCheckCorner,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background w-screen flex flex-col gap-12 my-8 min-h-screen items-center font-sans px-60">
      {/* СЕКЦИЯ: Шапка (О компании) */}
      <div className="bg-primary/5 -mx-60 px-60 py-12 flex flex-row w-screen">
        <div className="flex flex-col gap-2">
          <h2 className="pb-4 text-text text-3xl font-bold">О компании</h2>
          <p className="text-gray-500 text-xl pb-4 max-w-4xl">
            Мы — команда автоэкспертов. Честный автоподбор «под ключ»: аналитика
            рынка, выездные осмотры, торг и полное сопровождение сделки.
          </p>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-2 items-center p-1">
              <div className="bg-primary/20 rounded-full size-8 flex items-center justify-center p-1">
                <FileCheckCorner className="text-blue-600 size-5" />
              </div>
              <h1 className="text-gray-500 text-lg font-medium">
                Работаем по договору
              </h1>
            </div>

            <div className="flex flex-row gap-2 items-center p-1">
              <div className="bg-primary/20 rounded-full size-8 flex items-center justify-center p-1">
                <Check className="text-blue-600 size-5" />
              </div>
              <h1 className="text-gray-500 text-lg font-medium">
                Отчет по 120+ пунктам
              </h1>
            </div>

            <div className="flex flex-row gap-2 items-center p-1">
              <div className="bg-primary/20 rounded-full size-8 flex items-center justify-center p-1">
                <Globe className="text-blue-600 size-5" />
              </div>
              <h1 className="text-gray-500 text-lg font-medium">
                По всему Казахстану
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ: Наш опыт в цифрах */}
      <div className="w-full">
        <h1 className="text-black text-2xl pb-6 font-bold">
          Наш опыт в цифрах
        </h1>
        <div className="grid grid-cols-3 gap-8 w-full">
          <div className="shadow-md h-28 border border-indigo-100 rounded-xl p-4 flex flex-col justify-center gap-1 bg-background">
            <p className="font-bold text-2xl text-blue-600">5+ лет</p>
            <p className="text-gray-500 text-base">на рынке автоподбора</p>
          </div>
          <div className="shadow-md h-28 border border-indigo-100 rounded-xl p-4 flex flex-col justify-center gap-1 bg-background">
            <p className="font-bold text-2xl text-blue-600">3 000+</p>
            <p className="text-gray-500 text-base">осмотров и диагностик</p>
          </div>
          <div className="shadow-md h-28 border border-indigo-100 rounded-xl p-4 flex flex-col justify-center gap-1 bg-background">
            <p className="font-bold text-2xl text-blue-600">95%</p>
            <p className="text-gray-500 text-base">клиентов нас рекомендуют</p>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ: Команда */}
      <div className="-mx-60 px-60 py-2 flex flex-col w-screen">
        <h1 className="text-black text-2xl pb-4 font-bold mt-4">Команда</h1>
        <div className="w-full flex flex-row justify-between gap-4">
          <PerCard
            name="Иван Р."
            position={["Ведущий Автоэксперт", "Диагностика авто"]}
            skills={["Toyota", "Mazda", "Hyundai"]}
            imageUrl="https://avatars.mds.yandex.net/i?id=786725f90f1cc27d068dc79cd7a1ec43_l-5646157-images-thumbs&n=13"
          />
          <PerCard
            name="Артур Н."
            position={["Аналитик рынка", "Юр проверка"]}
            skills={["VIN-базы", "История", "Ликвидность"]}
            imageUrl="https://content.kaspersky-labs.com/fm/site-editor/dc/dc17dbf731bc7c7018d13ffe643e480d/processed/case-study-neo-q93-r1920.jpg"
          />
          <PerCard
            name="Чак Н."
            position={["Переговорщик", "Торг и сделка"]}
            skills={["Торг", "СТО", "Страхование"]}
            imageUrl="https://thumbs.dreamstime.com/b/young-successful-businessman-smiling-posing-crossed-arms-over-office-background-handsome-77074254.jpg"
          />
          <PerCard
            name="Данил Д."
            position={["Дизайн и сервис клиента"]}
            skills={["UX", "коммуникация", "Отчеты"]}
            imageUrl="https://i.pinimg.com/originals/c8/18/dd/c818dd52d19e6b377902536e26f15293.jpg"
          />
        </div>
      </div>

      {/* СЕКЦИЯ: Наши ценности */}
      <div className="bg-primary/5 -mx-60 px-60 py-12 flex flex-col w-screen">
        <h1 className="text-black text-2xl pb-6 font-bold">Наши ценности</h1>
        <div className="grid grid-cols-3 gap-8 w-full">
          <div className="bg-background shadow-md border border-indigo-100 rounded-xl p-5 flex flex-col gap-2">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Честность
            </p>
            <p className="text-gray-700 text-lg leading-relaxed pt-2">
              Никаких скрытых договоренностей с продавцами. Защищаем только
              интересы нашего клиента.
            </p>
          </div>
          <div className="bg-background shadow-md border border-indigo-100 rounded-xl p-5 flex flex-col gap-2">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Прозрачность
            </p>
            <p className="text-gray-700 text-lg leading-relaxed pt-2">
              Пошаговые подробные фото/видео отчеты, все выводы подтверждаем
              реальными фактами и цифрами.
            </p>
          </div>
          <div className="bg-background shadow-md border border-indigo-100 rounded-xl p-5 flex flex-col gap-2">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Забота
            </p>
            <p className="text-gray-700 text-lg leading-relaxed pt-2">
              Подбираем индивидуальные рекомендации строго под бюджет, задачи и
              личные требования клиента.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-50/60 border border-blue-100 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-blue-900">
            Какую ответственность мы несем?
          </h2>
          <p className="text-gray-600 text-base">
            Все наши обязательства официально фиксируются в юридическом
            договоре:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-gray-700">
          <div className="flex gap-4 items-start bg-background p-4 rounded-xl shadow-sm border border-blue-50">
            <span className="text-green-500 font-bold text-xl">✓</span>
            <div>
              <p className="font-bold text-black text-base">
                Проверенные Автомобили
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Гарантируем, что автомобиль не угнан, не заложен в банк или
                ломбард, и на него не наложены аресты/обременения.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-background p-4 rounded-xl shadow-sm border border-blue-50">
            <span className="text-green-500 font-bold text-xl">✓</span>
            <div>
              <p className="font-bold text-black text-base">
                Техническое состояние
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Тщательно проверяем геометрию кузова, безопасность (Airbag),
                двигатель и коробку передач. Никаких «сюрпризов».
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-background p-4 rounded-xl shadow-sm border border-blue-50">
            <span className="text-green-500 font-bold text-xl">✓</span>
            <div>
              <p className="font-bold text-black text-base">
                Оригинальность пробега
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Выявляем факты корректировки одометра по компьютерным блокам
                управления и косвенным признакам износа салона.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-background p-4 rounded-xl shadow-sm border border-blue-50">
            <span className="text-green-500 font-bold text-xl">✓</span>
            <div>
              <p className="font-bold text-black text-base">
                Сопровождение до финала
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Эксперт находится вместе с вами в СпецЦОНе вплоть до момента
                получения новых номеров и техпаспорта на ваше имя.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
