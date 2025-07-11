import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function HobbyListPage() {
  const hobbies = await prisma.hobby.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">趣味一覧</h1>
      <ul className="space-y-2">
        {hobbies.map((hobby) => (
          <li key={hobby.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <span>{hobby.title}</span>
              <Link
                href={`/admin/hobbies/${hobby.id}`}
                className="text-blue-600 underline"
              >
                編集
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
