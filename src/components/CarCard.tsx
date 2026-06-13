"use client";
// строка выше нужна, чтоб реакт не выёбывался и
// не кидал ошибки, связанные с использованием useState

// useState - чисто клиентская залупа, позволяет тебе хранить данные в
// области видимости компонента и отслеживать их изменения
import { useEffect, useRef, useState } from "react";
// Здесь импортируется именно иконка сердца из библиотеки иконок
// Если бы не было фигурных скобок - пришлось бы писать Heart.Heart,
// чтоб её достать
import { Heart } from "lucide-react";
// Здесь импортируются базовые компоненты, которые ты будешь использовать везде
// Как правило, для их импорта будет удобнее писать @/compontents/ui/.....
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
// Эта утилита позволяет тебе безопасно соединять несколько строк классов в одну
// Без неё есть риск конфликтов стилей, мозги себе потом заебёшь пока поправишь
import { cn } from "@/lib/utils";

interface CarCardProps {
  className?: string;
  title: string;
  price: number;
  labels: string[];
  imageUrl?: string;
  onDetail?: () => void;
}

// Твоя задача здесь - найти обрыгански отрисованное изображение, и найти
// как их отрисовывать по-нормальному
export default function CarCard(props: CarCardProps) {
  // [переменная, функция для изменения значения] = useState<Тип переменной>(значения по умолчанию)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, [props.imageUrl]);

  const handleImgLoad = () => {
    setImageLoaded(true);
  };

  // классы пишем в className, потому что class - зарезервированное слово
  return (
    <div
      className={cn([
        "flex flex-col gap-2 w-full max-w-80 rounded bg-card border border-border shadow-sm p-4",
        props.className,
      ])}
    >
      <div className="relative w-full h-52 rounded overflow-visible">
        <div
          className={cn([
            "absolute rounded inset-0 transition-color animate-radial-pulse",
            imageLoaded ? "opacity-0" : "opacity-100",
          ])}
        />
        {/* Если нужно вставить блок джаваскрипта посреди разметки - 
				нужно делать это внутри фигурных скбок */}
        {props.imageUrl && (
          <img
            ref={imgRef}
            src={props.imageUrl}
            alt={props.title}
            className={cn([
              "w-full h-full object-cover transition-all duration-300 rounded",
              imageLoaded ? "opacity-100" : "opacity-0",
            ])}
            onLoad={handleImgLoad}
          />
        )}
      </div>

      <h3 className="text-2xl font-semibold">{props.title}</h3>

      <div className="flex gap-2 flex-wrap">
        {props.labels.map((label, i) => (
          <Badge
            key={i}
            variant="outline"
            className="text-xs p-0 text-foreground/70 bg-transparent border-0"
          >
            {label.toUpperCase()}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-xl font-bold">
          {props.price.toLocaleString("ru-KZ")} ₸
        </p>
        <Button variant="outline" onClick={props.onDetail}>
          Подробнее
        </Button>
      </div>
    </div>
  );
}
