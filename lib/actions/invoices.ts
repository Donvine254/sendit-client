import { Invoice } from "@prisma/client";
import { toast } from "sonner";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/invoice-generator"
    : "https://senditkenya.vercel.app/api/invoice-generator";
export async function GenerateInvoice(data: Invoice) {
  const toastId = toast.loading("Processing Request...", {
    position: "top-center",
  });
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    toast.dismiss(toastId);
    if (!response.ok) {
      throw new Error(`Failed to fetch invoice: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    // Trigger file download
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${data.invoice_number}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    toast.error("Something went wrong", {
      position: "top-center",
    });
  }
}
