import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/privacy-policy', '/terms', '/disclaimer'];
  
  // If the path is public, allow access
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // For all other paths, let the client-side handle the routing
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