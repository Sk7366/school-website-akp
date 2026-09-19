import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { src: '/Slide show /yoga 3.jpeg', alt: 'Yoga Day Celebration' },
  { src: '/Slide show /Rainy day activity 3.jpeg', alt: 'Rainy Day Activity' },
  { src: '/Slide show /First day at school.jpeg', alt: 'First Day at School' },
  { src: "/Slide show /Colour's day activity 2.jpeg", alt: "Colour's Day Activity" },
  { src: '/Slide show /WhatsApp Image 2026-08-15 at 21.14.32.jpeg', alt: 'School Activity' },
  { src: '/Slide show /Yoga Day celebration.jpeg', alt: 'Yoga Day Celebration' },
  { src: '/Slide show /Independance .jpeg', alt: 'Independence Day Celebration' },
  { src: '/Slide show /Blue colour day .jpeg', alt: 'Blue Colour Day' },
];

const INTERVAL_MS = 4500;

export const Slideshow: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(idx);
        setFade(true);
      }, 200);
    },
    [],
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide image */}
      <img
        src={SLIDES[current].src}
        alt={SLIDES[current].alt}
        loading={current === 0 ? 'eager' : 'lazy'}
        fetchPriority={current === 0 ? 'high' : 'auto'}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Hidden prefetch for next slide */}
      <link rel="prefetch" href={SLIDES[(current + 1) % SLIDES.length].src} as="image" />

      {/* Left arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/35 flex items-center justify-center transition-all hover:scale-110 border border-white/25"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/35 flex items-center justify-center transition-all hover:scale-110 border border-white/25"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2.5 bg-[#FFD21F] shadow-lg shadow-yellow-400/40'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
