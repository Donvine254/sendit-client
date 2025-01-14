"use server";
// file for functions to send emails
import { orderConfirmationEmail } from "./templates";
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
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(emailBody),
  });
  return response;
}

sendOrderConfirmationEmail({
  email: "donvinemugendi@gmail.com",
  name: "Donvine mugendi",
  orderId: "cr23123",
  deliveryAddress: "Kahawa West, Roysambu, Nairobi",
  pickupAddress: "Bima Road, Kahawa West, Nairobi",
  parcelDescription: "Techno Pova Neo 6 Starry Black",
  parcelWeight: 2,
  totalPrice: 780,
}).then((res) => console.log(res));

// add email for order cancellation and payment request
