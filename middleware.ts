import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/firebase-admin'
 
export async function middleware(request: NextRequest) {
  try {
    // Get the token from the request
    const token = request.cookies.get('token')?.value

    // If there's no token and we're on the chat page, redirect to home
    if (!token && request.nextUrl.pathname === '/chat') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // If there's a token and we're on the home page, verify it and redirect to chat if valid
    if (token && request.nextUrl.pathname === '/') {
      try {
        await auth.verifyIdToken(token)
        return NextResponse.redirect(new URL('/chat', request.url))
      } catch {
        // If token verification fails, clear the cookie
        const response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete('token')
        return response
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}
 
export const config = {
  matcher: ['/', '/chat'],
}