import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { Users, init } from "@kinde/management-api-js";
const KINDE_ISSUER_URL = process.env.KINDE_ISSUER_URL!;
const KINDE_CLIENT_ID = process.env.KINDE_CLIENT_ID!;
const KINDE_CLIENT_SECRET = process.env.KINDE_CLIENT_SECRET!;

async function getToken(): Promise<string> {
  const tokenResponse = await fetch(`${KINDE_ISSUER_URL}/oauth2/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      audience: `${KINDE_ISSUER_URL}/api`,
      grant_type: "client_credentials",
      client_id: KINDE_CLIENT_ID,
      client_secret: KINDE_CLIENT_SECRET,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to fetch access token");
  }

  const { access_token } = await tokenResponse.json();
  return access_token;
}

async function updateUserDetails(
  userId: string,
  accessToken: string,
  given_name: string,
  family_name: string
) {
  const userResponse = await fetch(
    `${KINDE_ISSUER_URL}/api/v1/user?id=${userId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ given_name, family_name }),
    }
  );

  if (!userResponse.ok) {
    throw new Error(`Failed to fetch user details: ${userResponse.statusText}`);
  }

  const userDetails = await userResponse.json();
  return userDetails;
}
//function to update user details
export async function POST(req: NextRequest) {
  const { user_id, given_name, family_name } = await req.json();
  try {
    const accessToken = await getToken();
    const userDetails = await updateUserDetails(
      user_id,
      accessToken,
      given_name,
      family_name
    );
    return NextResponse.json(userDetails);
  } catch (error: any) {
    console.error("Error fetching user details:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");
  try {
    const accessToken = await getToken();
    const userResponse = await fetch(
      `${KINDE_ISSUER_URL}/api/v1/user?id=${user_id}&is_delete_profile:${true}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to delete user: ${userResponse.statusText}`);
    }
    // TODO: Delete associated user data from the database
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { getPermission } = getKindeServerSession();
  const permission = await getPermission("admin");
  const isAdmin = permission?.isGranted;
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized Request", code: 401 });
  }
  try {
    init();
    const { users } = await Users.getUsers({
      pageSize: 500,
    });
    return NextResponse.json(users);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
