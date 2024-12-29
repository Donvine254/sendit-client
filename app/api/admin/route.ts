import { NextResponse, NextRequest } from "next/server";
import { Users, init } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export async function GET() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const permission = await getPermission("admin");
  const isAdmin = permission?.isGranted;
  if (!isAuthenticated || !isAdmin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  init();
  const { users } = await Users.getUsers();
  return NextResponse.json(users, { status: 200 });
}
