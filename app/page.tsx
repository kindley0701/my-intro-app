import Hero from './components/Hero';
import About from './components/About'; // ← 追加
import Sidebar from './components/Sidebar';
import HobbySection from './components/HobbySection';
import { hobbies } from './data/hobbies';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About /> {/* ← Heroの直後に追加 */}
      <Sidebar />
      {hobbies.map((hobby, index) => (
      <HobbySection
        key={hobby.id}
        id={hobby.id}
        title={hobby.title}
        text={hobby.text}
        background={hobby.background}
        index={index} // ← これを追加！
      />
    ))}
    </>
  );
}