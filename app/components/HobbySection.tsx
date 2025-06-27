'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HobbySectionProps {
  id: string;
  title: string;
  text: string;
  background: string;
  index: number;
}

export default function HobbySection({
  id,
  title,
  text,
  background,
  index,
}: HobbySectionProps) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: 0,
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative my-16 mx-auto h-[500px] max-w-7xl overflow-hidden rounded-2xl transition-opacity duration-700 ease-out ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
    >
      <Image
        src={background}
        alt={title}
        fill
        className="object-cover brightness-75"
        priority
      />
      <div
        className={`absolute inset-0 flex items-center px-10 ${
          isEven ? 'justify-start' : 'justify-end'
        }`}
      >
        <div
          className={`bg-black/70 text-white p-8 max-w-md rounded-lg ${
            isEven ? 'text-left' : 'text-right'
          }`}
        >
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg">{text}</p>
        </div>
      </div>
    </section>
  );
}