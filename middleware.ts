import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from the request
  const token = request.cookies.get('token')?.value;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/privacy-policy', '/terms', '/disclaimer'];
  
  // Check if we're on the home page
  const isHomePage = path === '/';

  // If there's a token and we're on the home page, redirect to chat
  if (token && isHomePage) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  // If there's no token and we're not on a public path, redirect to home
  if (!token && !publicPaths.includes(path) && !isHomePage) {
    return NextResponse.redirect(new URL('/', request.url));
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