import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  });

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const hasAdminSession = request.cookies.get(ADMIN_SESSION_COOKIE)?.value === "1";

  if (isAdminRoute && !isAdminLogin && !hasAdminSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminLogin && hasAdminSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}