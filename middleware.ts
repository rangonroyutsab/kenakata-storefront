import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/constants/api";

const PROTECTED_ROUTES = ["/account", "/checkout"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (authToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"],
};
