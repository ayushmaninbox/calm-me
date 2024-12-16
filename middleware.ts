import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Only run middleware on API routes
export function middleware(request: NextRequest) {
  // Skip middleware for static exports
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  
  // Add CORS headers only for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return response;
}

export const config = {
  matcher: '/api/:path*'
};