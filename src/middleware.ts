import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const redirectUrl = new URL('/login', req.url)

  if (!token) {
    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
