// app/components/HobbySection.tsx
'use client';

import Image from 'next/image';

interface HobbySectionProps {
  id: string;
  title: string;
  text: string;
  background: string;
  index: number; // ← 交互用
}

export default function HobbySection({
  id,
  title,
  text,
  background,
  index,
}: HobbySectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={id}
       className="relative my-12 mx-auto h-[500px] max-w-7xl overflow-hidden rounded-2xl"
    >
      {/* 背景画像 */}
      <Image
        src={background}
        alt={title}
        fill
        className="object-cover brightness-75"
      />

      {/* テキストブロック（左右交互） */}
      <div
        className={`absolute inset-0 flex items-center justify-${
          isEven ? 'start' : 'end'
        }`}
      >
        <div className="bg-black/60 text-white p-8 m-8 max-w-xl rounded-lg">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg">{text}</p>
        </div>
      </div>
    </section>
  );
}
