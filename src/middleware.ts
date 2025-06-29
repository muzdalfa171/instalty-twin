import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/user'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const emailVerified = request.cookies.get('email_verified')?.value === 'true'
  const path = request.nextUrl.pathname

  // Auth routes (login, register, forgot-password, reset-password)
  if (path.startsWith('/app/(auth)') || path.startsWith('/app/login') || path.startsWith('/app/register')) {
    if (session && emailVerified) {
      return NextResponse.redirect(new URL('/app/dashboardAnalytics', request.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!session) {
    return NextResponse.redirect(new URL('/app/login', request.url))
  }

  // Email verification check for protected routes
  if (!emailVerified && !path.startsWith('/app/verify-email')) {
    return NextResponse.redirect(new URL('/app/login?verify=true', request.url))
  }

  // Role-based route protection
  if (path.startsWith('/app/admin')) {
    const userRole = request.cookies.get('user_role')?.value
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
      return NextResponse.redirect(new URL('/app/dashboardAnalytics', request.url))
    }
  }

  if (path.startsWith('/app/super-admin')) {
    const userRole = request.cookies.get('user_role')?.value
    if (userRole !== UserRole.SUPER_ADMIN) {
      return NextResponse.redirect(new URL('/app/dashboardAnalytics', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/app/(auth)/:path*',
    '/app/login',
    '/app/register',
    '/app/dashboardAnalytics/:path*',
    '/app/admin/:path*',
    '/app/super-admin/:path*',
  ],
} 