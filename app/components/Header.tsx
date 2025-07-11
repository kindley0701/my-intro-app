'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur p-4 shadow flex items-center justify-between">
      <h1 className="text-white text-xl font-bold">My Portfolio</h1>
      <Link href="/" className="text-white underline">
        Top
      </Link>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="text-white">ログイン中: {session.user.name}</span>
          <Link href="/admin/hobbies" className="text-white underline">
            Hobbies
          </Link>
          <button onClick={() => signOut()} className="text-white underline">
            SignOut
          </button>
        </div>
      ) : (
        <Link href="/admin/login" className="text-white underline">
          AdminLogin
        </Link>
      )}
    </header>
  );
}
