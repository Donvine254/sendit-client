"use server";
import Stripe from "stripe";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://senditkenya.vercel.app";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Use the latest API version
});

type Invoice = {
  customerName: string;
  email: string;
  item: string;
  amount: number;
  userId: string;
  shipping_address: string;
  invoiceId: string;
};

export async function createCheckoutSession(invoice: Invoice): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price_data: {
          currency: "kes",
          product_data: {
            name: `Delivery Service Charge for ${invoice.item} to ${invoice.shipping_address}`,
            images: [
              "https://res.cloudinary.com/dipkbpinx/image/upload/v1735945010/illustrations/undraw_delivery-truck_mjui_lxt1vo.svg",
            ],
          },
          unit_amount: invoice.amount,
        },
        quantity: 1,
      },
    ],
    phone_number_collection: { enabled: true },
    client_reference_id: invoice.userId,
    mode: "payment",
    success_url: `${baseUrl}/me/invoices`,
    cancel_url: `${baseUrl}/me/invoices`,
    customer_email: invoice.email,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }
  console.log(session);
  return session.url;
}
