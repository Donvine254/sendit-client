import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const { getPermission } = getKindeServerSession();
    const permission = await getPermission("admin");
    const isAdmin = permission?.isGranted;
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return withAuth(req);
}
export const config = {
  matcher: ["/admin", "/admin/:path*", "/deliveries", "/me", "/me/:path*"],
};
