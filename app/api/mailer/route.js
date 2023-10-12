import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
import {google } from "googleapis"
const OAuth2 = google.auth.OAuth2;
import Email from '@/emails/Email'
import { render } from '@react-email/render';

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.NEXT_PUBLIC_OAUTH_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NEXT_PUBLIC_EMAIL,
      accessToken,
      clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.NEXT_PUBLIC_OAUTH_REFRESH_TOKEN,
      
    }
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};


export async function POST(req) {
    const data = await req.json();
    
   if(!data || !data.subject ||!data.message || !data.email){
    return NextResponse.json({message: "Missing email body and recipient information"})
   }
    try {
      const emailHtml = render(<Email subject={data.subject} body={data.message}/>);
      await sendEmail({
            subject: data.subject,
            to: data.email,
            from: process.env.NEXT_PUBLIC_EMAIL,
            html: emailHtml
          });
      return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
      return new Response("email delivery failed", { status: 400 });
    }
  }


  export async function GET(){
    const data={message: "did you know that next js can create api's too?"}
    return NextResponse.json(data);
  }