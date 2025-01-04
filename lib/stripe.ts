"use server";
import Stripe from "stripe";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/admin"
    : "https://senditkenya.vercel.app/api/admin";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Use the latest API version
});

type Invoice = {
  customerName: string;
  email: string;
  amount: number;
  userId: string;
};

export async function createCheckoutSession(invoice: Invoice): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price_data: {
          currency: "KES",
          product_data: {
            name: "Delivery Service Charge",
            images: [
              "https://res.cloudinary.com/dipkbpinx/image/upload/v1735945010/illustrations/undraw_delivery-truck_mjui_lxt1vo.svg",
            ],
          },
          unit_amount: invoice.amount,
        },
        quantity: 1,
      },
    ],
    client_reference_id: invoice.userId,
    mode: "payment",
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}/cancel`,
    // customer_email: invoice.email,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}
