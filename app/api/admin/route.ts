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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { isAuthenticated } = getKindeServerSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    init();
    const userData = await Users.getUserData({ id });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
