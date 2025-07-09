// app/components/Header.tsx（抜粋）

'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur p-4 shadow">
      <h1 className="text-white text-xl font-bold">My Portfolio</h1>
      {session?.user && (
        <button onClick={() => signOut()} className="ml-4 text-white underline">
          ログアウト
        </button>
      )}
    </header>
  );
}
