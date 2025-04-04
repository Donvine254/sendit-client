import nodemailer, { Transporter } from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

const email = process.env.NEXT_PUBLIC_EMAIL!;
const sender = `Sendit Kenya <${email}>`;

const createTransporter = async (): Promise<Transporter> => {
  const oauth2Client = new OAuth2Client(
    process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
    process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET!,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.NEXT_PUBLIC_OAUTH_REFRESH_TOKEN!,
  });
  const accessToken = await oauth2Client.getAccessToken();
  if (!accessToken.token) {
    throw new Error("Failed to retrieve access token");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: email,
      accessToken: accessToken.token,
      clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET!,
      refreshToken: process.env.NEXT_PUBLIC_OAUTH_REFRESH_TOKEN!,
    },
  });
};

export async function POST(req: NextRequest) {
  const { subject, receiver, message } = await req.json();
  try {
    const transporter = await createTransporter();
    await transporter.sendMail({
      subject,
      to: receiver,
      from: sender,
      html: message,
    });
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred when sending the email",
        error,
      },
      { status: 401 }
    );
  }
}