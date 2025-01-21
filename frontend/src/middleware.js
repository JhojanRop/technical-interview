import { NextResponse } from 'next/server'

const publicRoutes = ['/login', '/register']

export function middleware (request) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  if (isPublicRoute) return NextResponse.next()

  const token = request.cookies.get('token')
  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ]
}