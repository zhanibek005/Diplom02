"use client";
import { Button } from "./ui/button";

export default function Footer() {
	return (
		<div className="border border-t-accent/40 h-20 w-screen bg-background flex align-middle justify-between px-10 items-center ">
			<h2 className="text-text text-2xl font-bold"> © 2025 «Автоподбор» </h2>
			<Button
				onMouseDown={() => { }}
				variant="outline"
				className=" text-accent hover:text-accent-foreground"
			>
				<span>Оставить заявку</span>
			</Button>
		</div>
	);
}
