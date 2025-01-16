"use server";
import { Invoice } from "@prisma/client";
// file for functions to send emails
import { orderConfirmationEmail, invoiceReminderEmailTemplate } from "./templates";
import { OrderDetails } from "@/types";
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/mailer"
    : "https://senditkenya.vercel.app/api/mailer";

export async function sendOrderConfirmationEmail({ ...props }: OrderDetails) {
  const emailBody = {
    subject: "Your parcel delivery order has been confirmed",
    receiver: props.email,
    message: orderConfirmationEmail(props),
  };
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(emailBody),
    });
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
export async function sendInvoicePaymentReminder({ ...props }: Invoice) {
  const emailBody = {
    subject: "Invoice payment reminder notification",
    receiver: props.email,
    message: invoiceReminderEmailTemplate(props),
  };
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(emailBody),
    });
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
