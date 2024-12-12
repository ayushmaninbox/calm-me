import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from the request
  const token = request.cookies.get('token')?.value;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup'];
  
  // Protected paths that require authentication
  const protectedPaths = ['/chat', '/account'];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  
  // If there's no token and we're on a protected path, redirect to home
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If there's a token and we're on a public path (except /), redirect to chat
  if (token && publicPaths.includes(path) && path !== '/') {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}