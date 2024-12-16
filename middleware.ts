import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next();

  // Get the pathname
  const path = request.nextUrl.pathname;

  // Add CORS headers for API routes
  if (path.startsWith('/api/')) {
    // Get origin from request headers or use '*' as fallback
    const origin = request.headers.get('origin') || '*';

    // Add the CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match API routes
    '/api/:path*',
    // Match all other routes except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}