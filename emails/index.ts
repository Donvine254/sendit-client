"use server";
// file for functions to send emails
// make post request to /api/mailer with parameters subject, receiver and message. Message should be styled html templates
import { orderConfirmationEmail } from "./templates";
import { OrderDetails } from "@/types";

export async function sendOrderConfirmationEmail({ ...props }: OrderDetails) {
  const emailBody = {
    subject: "Your parcel delivery order has been confirmed",
    receiver: props.email,
    message: orderConfirmationEmail(props),
  };
  const response = await fetch("/api/mailer", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(emailBody),
  });
  return response;
}

// add email for order cancellation and payment request
