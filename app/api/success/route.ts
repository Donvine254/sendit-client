import { updateInvoiceStatus } from "@/lib/actions/orders";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const invoiceId = req.nextUrl.searchParams.get("invoice_id") as string;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
  });
  const session = await stripe.checkout.sessions.retrieve(sessionId as string);
  if (session.payment_status === "paid") {
    try {
      await updateInvoiceStatus(invoiceId, "PAID");
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  }
  return NextResponse.redirect(new URL("/me/invoices", req.url));
}
