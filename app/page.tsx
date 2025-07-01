import Hero from './components/Hero';
import About from './components/About'; // ← 追加
import Sidebar from './components/Sidebar';
import HobbySection from './components/HobbySection';
import { hobbies } from './data/hobbies';

export default function HomePage() {
  let halfIndex = 0;
  let fullIndex = 0;

  return (
    <>
      <Hero />
      <About /> {/* ← Heroの直後に追加 */}
      <Sidebar />
      <div className="w-full lg:px-40 md:px-20 py-10">
        <div className="flex flex-wrap justify-center items-start gap-4">
          {hobbies.map((hobby) => {
            const isHalf = hobby.halfWidth;
            const isLeft = isHalf
              ? halfIndex++ % 2 === 0
              : fullIndex++ % 2 === 0;

            return (
              <HobbySection
                key={hobby.id}
                id={hobby.id}
                title={hobby.title}
                text={hobby.text}
                background={hobby.background}
                index={isLeft ? 0 : 1} // 0: 左寄せ, 1: 右寄せ
                halfWidth={hobby.halfWidth}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
