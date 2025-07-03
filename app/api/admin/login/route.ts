import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return NextResponse.json({ success: false, message: 'ユーザーが存在しません' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return NextResponse.json({ success: false, message: 'パスワードが違います' }, { status: 401 });
  }

  // 認証成功 → セッション管理 (今は簡易対応: Cookieに記録)
  const response = NextResponse.json({ success: true, message: 'ログイン成功' });
  response.cookies.set('admin_auth', 'authenticated', { httpOnly: true, path: '/' });

  return response;
}
