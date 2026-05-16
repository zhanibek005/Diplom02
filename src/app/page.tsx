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
	return (
		<div className="bg-background w-screen flex flex-col gap-8 my-8 min-h-screen items-center font-sans px-60">
			<ul className="flex flex-col gap-4 justify-center">
				<li className="bg-accent align-middle before:align-middle before:content-['•'] before:mr-4 before:text-xl rounded-md p-2">
					item smthmth
				</li>
			</ul>
			<div className="w-full">
				<div className="flex flex-col gap-2 ">
					<h2 className="pb-4 text-text text-3xl font-bold">
						Подберем Автомобиль под ваши требования
					</h2>
					<p className="text-gray-500 text-xl pb-4">
						уточните фильтры и отсортирйуте результаты
					</p>
					<div className="flex items-center mt-auto gap-2">
						<Button
							className="w-44 h-12 p-2"
							variant="default"
						>
							<span className="text-primary-foreground text-lg/5">Подобрать автo</span>
						</Button>
						<Button className="w-44 h-12 p-2" variant="outline">
							<span className="text-wrap text-text text-lg/5">Как это работает?</span>
						</Button>
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
					<div className=" shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
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
					<div className="shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
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
					<div className="shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
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
			<div className="bg-primary/5 -mx-60 px-60 py-2 flex flex-col w-screen">
				<h1 className="text-black text-2xl pb-4 font-bold mt-8">
					Как мы работаем
				</h1>
				<div className="rounded-md gap-8 w-full flex flex-row">
					<div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
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
					<div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
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
					<div className="bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
						<div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
							<Handshake className="text-blue-600" />
						</div>
						<div className="flex flex-col gap-2 text-sm font-semibold p-2">
							Под ключ
						</div>
						<p className=" text-xl p-2">От заявки до постановки на учет</p>
					</div>
					<div className=" bg-background shadow-md w-110 h-56 border border-2-indigo-400 rounded-xl  ">
						<div className="bg-primary/20 rounded-md size-10 flex align-middle justify-center p-2 m-3">
							<TicketCheck className="text-blue-600" />
						</div>
						<div className="flex flex-col gap-2 text-sm font-semibold p-2">
							Под ключ
						</div>
						<p className=" text-xl p-2">От заявки до постановки на учет</p>
					</div>
				</div>
				<Button className=" w-40 self-center mt-6 h-14">
					<span className="text-lg p-1 pl-2">Оставьте заявку</span>
				</Button>
			</div>
			<div className="rounded-md p-2 flex flex-col gap-2 justify-between w-full">
				<h1 className="text-black text-2xl pb-4 font-bold mt-8">
					Как мы работаем
				</h1>
				<div className="flex flex-row w-full justify-between p-2 gap-2">
					<CarCard
						className=" max-w-96"
						title="title"
						labels={["label1", "label2", "label3"]}
						price={3.5}
						imageUrl="https://i.pinimg.com/originals/d9/25/2d/d9252d7f73fd1ec4cefc02bc4820633d.jpg"
					/>
					<CarCard
						className=" max-w-96"
						title="title"
						labels={["label1", "label2", "label3"]}
						price={3.5}
						imageUrl="https://i.pinimg.com/originals/d9/25/2d/d9252d7f73fd1ec4cefc02bc4820633d.jpg"
					/>
					<CarCard
						className=" max-w-96"
						title="title"
						labels={["label1", "label2", "label3"]}
						price={3.5}
						imageUrl="https://i.pinimg.com/originals/d9/25/2d/d9252d7f73fd1ec4cefc02bc4820633d.jpg"
					/>
				</div>
			</div>
			<Zayavka onSubmit={console.log} onCancel={console.log} />
			<div className=" flex flex-row gap-16 w-full">
				<div className=" flex flex-col gap-2">
					<p className="text-2xl">О компании</p>
					<h1 className="max-w-96">
						Команда автоэкспертов: диагности, оценщики и переговорщики. Работаем
						по Казахстану, помогаем с проверкой авто из РФ/ОАЭ.
					</h1>
					<ul className="list-disc ml-4">
						<li>Coffee</li>
						<li>Tea</li>
						<li>Milk</li>
					</ul>
					<Button variant="outline" className=" w-36">
						Подробнее о нас
					</Button>
				</div>
				<div className=" flex flex-col">
					<p className="text-2xl">Контакты</p>
					<div className="flex flex-row ">
						<Phone className="text-blue-600" />
						<h1> + 7 777 777 77 77 </h1>
					</div>
					<div className="flex flex-row">
						<MessageCircle className="text-blue-600" />
						<h1> MAX </h1>
					</div>
					<div className="flex flex-row">
						<Building className="text-blue-600" />
						<h1> Зольная улица, 15 </h1>
					</div>
				</div>
			</div>
		</div>
	);
}
