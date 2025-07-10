import { PrismaClient } from '@prisma/client';
import HobbySection from './components/HobbySection';
import Hero from './components/Hero';
import About from './components/About';
import Sidebar from './components/Sidebar';

const prisma = new PrismaClient();

export default async function HomePage() {
  const hobbies = await prisma.hobby.findMany({
    orderBy: { order: 'asc' }, // 表示順に並べる
  });

  let halfIndex = 0;
  let fullIndex = 0;

  return (
    <>
      <Hero />
      <About />
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
                id={String(hobby.id)}
                title={hobby.title}
                text={hobby.text}
                imageUrl={hobby.imageUrl}
                index={isLeft ? 0 : 1}
                halfWidth={hobby.halfWidth}
                cropCenterX={hobby.cropCenterX}
                cropCenterY={hobby.cropCenterY}
                cropWidth={hobby.cropWidth}
                cropHeight={hobby.cropHeight}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
