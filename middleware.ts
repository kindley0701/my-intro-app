import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // ログインページ自体は認証なしで通過させる
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // admin配下にアクセスしようとしていて、未ログインならリダイレクト
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
