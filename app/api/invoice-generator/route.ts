import { Invoice } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.INVOICE_GENERATOR_API_KEY!;
export async function POST(req: NextRequest) {
  const data = (await req.json()) as Invoice;
  if (!data) {
    throw new Error("Invalid Invoice Data Provided");
  }
  try {
    const payload = {
      from: "Sendit Kenya\n123 Kimathi St,\nNairobi, Kenya.",
      to: data.fullName,
      ship_to: data.shipping_address,
      logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png",
      number: String(data.invoice_number).padStart(4, "0"),
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
      invoice_number_title: "INV#",
      notes:
        "Thanks for doing business with us. Please pay before the due date.",
    };
    const postData = JSON.stringify(payload);
    const options = {
      hostname: "invoice-generator.com",
      port: 443,
      path: "/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const response: any = await new Promise((resolve, reject) => {
      const https = require("https");
      const req = https.request(options, (res: any) => {
        resolve(res);
      });

      req.on("error", (err: any) => reject(err));
      req.write(postData);
      req.end();
    });
    return new Response(response, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice-${data.id}.pdf`,
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
