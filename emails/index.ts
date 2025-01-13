// file for emails
"use server";
import nodemailer, { Transporter } from "nodemailer";
import { OAuth2Client } from "google-auth-library";

interface EmailOptions {
  subject: string;
  from: string;
  to: string;
  html: string; // Typically HTML content for email body
}

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

export async function SendWelcomeEmail(
  subject: string,
  to: string,
  html: string
) {
  try {
    await sendEmail({
      subject,
      to,
      from: process.env.NEXT_PUBLIC_EMAIL!,
      html,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error: any) {
    console.error("Email delivery failed:", error);
    return {
      success: false,
      message: error.message || "Email delivery failed",
    };
  }
}
