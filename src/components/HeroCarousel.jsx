// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  { category: 'rackets', imageUrl: '/images/hero-rackets.jpeg', slogan: 'Find Your Perfect Swing', link: '/catalog/rackets' },
  { category: 'grips',   imageUrl: '/images/hero-grips.webp',   slogan: 'Get a Grip on Your Game',  link: '/catalog/grips'   },
  { category: 'apparel', imageUrl: '/images/hero-apparel.webp',  slogan: 'Play in Style',            link: '/catalog/apparel' },
  { category: 'bags',    imageUrl: '/images/hero-bags.jpg',     slogan: 'Carry Your Gear with Ease', link: '/catalog/bags'    },
  { category: 'balls',   imageUrl: '/images/hero-balls.jpg',    slogan: 'Hit Every Shot',           link: '/catalog/balls'   }
];

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  // auto-advance every 5s
  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % slides.length), 5000);
    return () => clearTimeout(t);
  }, [idx]);

  const prev = () => setIdx(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx(i => (i + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden">
      {/* slide track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}vw)` }}
      >
        {slides.map(slide => (
          <div
            key={slide.category}
            className="flex-none w-screen h-screen md:h-screen bg-center [background-size:100%_100%] relative"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
                {slide.slogan}
              </h2>
              <Link
                to={slide.link}
                className="mt-4 px-4 py-2 text-lime-300 bg-green-600 hover:bg-green-700 rounded"
              >
                Shop {slide.category.charAt(0).toUpperCase() + slide.category.slice(1)}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 z-10 cursor-pointer"
      >◀</button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 z-10 cursor-pointer"
      >▶</button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              i === idx ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
