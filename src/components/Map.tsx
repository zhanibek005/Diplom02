"use client";

export default function Map() {
  return (
    <div className="w-[520px] h-[310px] rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa8d3880563af2f34046776766bb5555cb3c5d3f0b2fa87f74187cddc841d378f&source=constructor"
        width="520"
        height="310"
        frameBorder="0"
      />
    </div>
  );
}
