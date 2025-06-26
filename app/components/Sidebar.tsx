'use client';

import { useEffect, useState } from 'react';
import { hobbies } from '../data/hobbies';

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.5);

      const offsets = hobbies.map((hobby) => {
        const el = document.getElementById(hobby.id);
        if (!el) return { id: hobby.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: hobby.id, top: Math.abs(rect.top) };
      });

      const closest = offsets.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev
      );

      setActiveId(closest.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初回呼び出し

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-1/4 left-4 bg-white/80 shadow-md p-4 rounded-md z-50">
      <ul className="space-y-2 text-sm">
        {hobbies.map((hobby) => (
          <li key={hobby.id}>
            <a
              href={`#${hobby.id}`}
              className={`hover:underline transition-all ${
                activeId === hobby.id ? 'font-bold text-blue-600' : ''
              }`}
            >
              {hobby.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
