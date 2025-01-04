"use client";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../../lib/stripe";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Invoice } from "@prisma/client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function PaymentButton({ invoice }: { invoice: Invoice }) {
  const { getUser } = useKindeAuth();
  const user = getUser();
  const invoiceData = {
    customerName: invoice.fullName,
    amount: invoice.amount * 100,
    shipping_address: invoice.shipping_address,
    item: invoice.item,
    invoiceId: invoice.id,
    email: user?.email || "",
    userId: invoice.userId,
  };
  const handlePayment = async () => {
    const toastId = toast.loading("Processing payment...", {
      position: "top-center",
    });
    try {
      const sessionUrl = await createCheckoutSession(invoiceData);
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        "There was an error processing your payment. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start hover:bg-green-500 hover:text-white"
      onClick={handlePayment}>
      <CreditCard className="mr-2 h-4 w-4" />
      Pay Invoice
    </Button>
  );
}
