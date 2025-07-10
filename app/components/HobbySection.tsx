'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HobbySectionProps {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  index: number;
  halfWidth?: boolean;
  cropCenterX: number;
  cropCenterY: number;
  cropWidth: number;
  cropHeight: number;
}

export default function HobbySection({
  id,
  title,
  text,
  imageUrl,
  index,
  halfWidth = false,
  cropCenterX,
  cropCenterY,
  cropWidth,
  cropHeight,
}: HobbySectionProps) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isVideo = imageUrl.endsWith('.mp4') || imageUrl.endsWith('.webm') || imageUrl.endsWith('.ogg');

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

  // トリミング情報を元にオブジェクトポジションを計算
  const objectPosition = `${cropCenterX}% ${cropCenterY}%`;

  return (
    <div className={`${halfWidth ? 'w-full lg:w-48/100' : 'w-full lg:w-97/100'}`}>
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
            style={{ objectPosition }}
          >
            <source src={imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover brightness-75"
            priority
            style={{ objectPosition }}
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
          </div>
        </div>
      </section>
    </div>
  );
}
