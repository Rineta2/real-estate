import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is related to dashboard
  if (pathname.startsWith("/dashboard")) {
    // Check for Firebase auth session cookie
    const hasSessionCookie = request.cookies.has("session");

    // If not authenticated, redirect to login
    if (!hasSessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Session validation happens in the session API endpoint
    // Additional role verification can be done in the layout component
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
