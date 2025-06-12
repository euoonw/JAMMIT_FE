import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('refreshToken')?.value;
  if (
    pathname === '/login' ||
    pathname === '/signup/step1' ||
    pathname === '/signup/step2'
  ) {
    if (token) return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/login', '/signup/step1', '/signup/step2'],
};
