'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HobbySectionProps {
  id: string;
  title: string;
  text: string;
  background: string;
  index: number;
  halfWidth?: boolean;
}

export default function HobbySection({
  id,
  title,
  text,
  background,
  index,
  halfWidth = false,
}: HobbySectionProps) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isVideo = background.endsWith('.mp4') || background.endsWith('.webm') || background.endsWith('.ogg');

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

  const longestLineLength = Math.max(...text.split('\n').map(line => line.length));
  const contentWidth = `w-[${longestLineLength * 20}px]`;

  return (
    <div className={`${halfWidth ? 'w-full lg:w-48/100' : 'w-full lg:w-97/100'}`}> {/* 強制ブロック化で整列制御 */}
      <section
        id={id}
        ref={ref}
        className={`relative my-1 mx-auto h-[500px] px-4 overflow-hidden rounded-2xl transition-opacity duration-700 ease-out ${
          isVisible ? 'animate-fade-up' : 'opacity-0'
        }`}
      >
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          >
            <source src={background} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={background}
            alt={title}
            fill
            className="object-cover brightness-75"
            priority
          />
        )}
        <div
          className={`absolute inset-0 flex items-center px-10 ${
            isEven ? 'justify-start' : 'justify-end'
          }`}
        >
          <div
            className={`bg-black/70 text-white p-8 rounded-lg ${contentWidth} ${
              isEven ? 'text-left' : 'text-right'
            }`}
          >
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-lg whitespace-pre-line">
              {text.replace(/\\n/g, '\n')}
            </p>
            {/* <p className="text-sm mt-2 text-gray-400">Debug: halfWidth = {String(halfWidth)}</p> */}
          </div>
        </div>
      </section>
    </div>
  );
}
