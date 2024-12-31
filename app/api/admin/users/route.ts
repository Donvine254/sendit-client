import { NextResponse, NextRequest } from "next/server";

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
