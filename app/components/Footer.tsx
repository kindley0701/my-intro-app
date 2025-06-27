export default function Footer() {
  return (
    <footer className="w-full bg-black text-white text-center py-6 mt-20">
      <p className="text-sm">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
  );
}