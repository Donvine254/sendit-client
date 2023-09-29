import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
export async function GET() {
  const { getUser, isAuthenticated, getPermissions, getPermission } =
    getKindeServerSession();
  const user = await getUser();
  const authenticated = await isAuthenticated();
  const permissions = await getPermissions();
  const isAdmin = await getPermission("admin").isGranted;
  return NextResponse.json({ user, authenticated, permissions, isAdmin });
}