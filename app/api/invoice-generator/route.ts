import { Invoice } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.INVOICE_GENERATOR_API_KEY!;
export async function POST(req: NextRequest) {
  const data = (await req.json()) as Invoice;
  if (!data) {
    throw new Error("Invalid Invoice Data Provided");
  }
  try {
    const response = await fetch("https://invoice-generator.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sendit Kenya",
        to: data.fullName,
        ship_to: data.shipping_address,
        logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png",
        number: data.invoice_number,
        currency: "KES",
        date: new Date(data.createdAt).toLocaleDateString(),
        due_date: new Date(data.updatedAt).toLocaleDateString(),
        items: [
          {
            name: `Delivery Service for ${data.item}`,
            quantity: 1,
            unit_cost: 0.84 * data.amount,
          },
        ],
        tax_title: "VAT",
        fields: {
          tax: "16%",
          discounts: false,
          shipping: false,
        },
        tax: 0.16 * data.amount,
        notes:
          "Thanks for doing business with us. Please pay before the due date.",
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to generate invoice: ${response.statusText}`);
    }
    const contentDisposition = `attachment; filename=Invoice-${data.id}.pdf`;

    return new Response(response.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
