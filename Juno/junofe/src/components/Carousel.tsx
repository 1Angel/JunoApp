"use client"

import { useState } from "react";

const images = [
    "https://tse2.mm.bing.net/th/id/OIP.RpTC3DLyO3T1SehYUjkleQHaF_?w=1300&h=1053&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.explicit.bing.net/th/id/OIP.dXlAF8AlsisNUGWuiD0pWgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  var total = images.length;

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-lg group">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
      >
        &#10095;
      </button>

      <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded-md font-medium">
        {index + 1}/{total}
      </div>
    </div>
  );
}
