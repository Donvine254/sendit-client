import nodemailer, { Transporter } from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

interface EmailOptions {
  subject: string;
  from: string;
  to: string;
  html: string; // Typically HTML content for email body
}

const sender = "Sendit Kenya <senditcourrier@gmail.com>";

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
      user: process.env.NEXT_PUBLIC_EMAIL!,
      accessToken: accessToken.token,
      clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET!,
      refreshToken: process.env.NEXT_PUBLIC_OAUTH_REFRESH_TOKEN!,
    },
  });
};

export const sendEmail = async (emailOptions: EmailOptions) => {
  const transporter = await createTransporter();
  await transporter.sendMail(emailOptions);
};

export async function POST(req: NextRequest) {
  const { subject, receiver, message } = await req.json();
  try {
    await sendEmail({
      subject,
      to: receiver,
      from: sender,
      html: message,
    });
    return NextResponse.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error occured when sending the email",
        error,
      },
      { status: 401 }
    );
  }
}
