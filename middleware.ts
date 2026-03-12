import { getSessionCookie } from "better-auth/cookies"
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = getSessionCookie(request)

  // Authenticated user on sign-in → send to app
  if (pathname === "/sign-in" && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Unauthenticated user on protected route → send to sign-in
  if (!sessionCookie && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
