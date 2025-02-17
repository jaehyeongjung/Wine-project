import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//로그인된 상태에서 signup 페이지로 갈시

export function middleware(request: NextRequest) {
  // 쿠키에서 토큰 확인
  const token = request.cookies.get('accessToken');

  if (request.nextUrl.pathname === '/signup') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/signup',
};
