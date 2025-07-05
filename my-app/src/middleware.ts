import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = await getToken({ req: request });

  const isLoginPage = pathname === "/auth/login";

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/", "/((?!auth/login|auth/register|api|_next|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp).*)"],
};
