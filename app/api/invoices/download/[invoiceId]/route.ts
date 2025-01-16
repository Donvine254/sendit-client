import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import https from "https";

const API_KEY = process.env.INVOICE_GENERATOR_API_KEY!;

export async function GET(req: NextRequest, { params }: any) {
  const { invoiceId } = params;

  if (!invoiceId) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch invoice data from Prisma
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Prepare payload for invoice generator
    const payload = {
      from: "Sendit Kenya\n123 Kimathi St,\nNairobi, Kenya.",
      to: invoice.fullName,
      ship_to: invoice.shipping_address,
      logo: "https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png",
      number: String(invoice.invoice_number).padStart(4, "0"),
      currency: "KES",
      date: new Date(invoice.createdAt).toLocaleDateString(),
      due_date: new Date(invoice.updatedAt).toLocaleDateString(),
      items: [
        {
          name: `Delivery Service for ${invoice.item}`,
          quantity: 1,
          unit_cost: 0.84 * invoice.amount,
        },
      ],
      tax_title: "VAT",
      fields: {
        tax: "16%",
        discounts: false,
        shipping: false,
      },
      tax: 0.16 * invoice.amount,
      invoice_number_title: "INV#",
      notes:
        "Thanks for doing business with us. Please pay before the due date.",
    };

    const postData = JSON.stringify(payload);

    // Send request to Invoice Generator API
    const response: any = await new Promise((resolve, reject) => {
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

      const req = https.request(options, (res) => {
        let data: any = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => resolve(Buffer.concat(data)));
      });

      req.on("error", (err) => reject(err));
      req.write(postData);
      req.end();
    });

    // Return the PDF as a response
    return new Response(response, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice-${invoiceId}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
