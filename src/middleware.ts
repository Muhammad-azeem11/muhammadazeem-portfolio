import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!session || (session.user as any)?.role !== "admin") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginRoute && session && (session.user as any)?.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
