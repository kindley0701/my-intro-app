export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src="/bg.mp4"
      />
      <div className="flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">小栁 和輝</h1>
        <p className="text-xl md:text-2xl">Engineer × Hobbyist × Creator</p>
      </div>
    </div>
  );
}