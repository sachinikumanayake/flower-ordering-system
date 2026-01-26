import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const images = [
  assets.shop,
  assets.front,
  assets.backg,
  assets.flowers,
  assets.tiulip,
];

const Header = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden">
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/75"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXT */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-800 leading-tight">
            Fresh Flowers,
            <br className="hidden sm:block" />
            Thoughtful Moments
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-md mx-auto lg:mx-0">
            Handcrafted floral arrangements for every celebration, delivered
            with care and elegance.
          </p>

          <button className="mt-8 sm:mt-10 bg-rose-600 text-white px-8 py-3 rounded-full text-base sm:text-lg hover:bg-rose-700 transition shadow-md">
            Shop Collection
          </button>
        </div>

        {/* RIGHT IMAGE – DESKTOP ONLY */}
        <div className="hidden lg:flex justify-center">
          <img
            src={images[current]}
            alt="Flowers"
            className="w-[400px] h-[480px] object-cover rounded-full shadow-2xl transition-opacity duration-1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;