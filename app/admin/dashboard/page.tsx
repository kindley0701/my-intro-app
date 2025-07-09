// app/admin/dashboard/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>ログインしていません</p>;
  }

  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <p>ログイン中のユーザー: {session.user?.username}</p>
    </div>
  );
}
