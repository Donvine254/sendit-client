"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleAlert, CircleCheck, HandCoins, ShieldAlert } from "lucide-react";
import { UpdateInvoiceStatus } from "../../actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Invoice } from "@prisma/client";
import { sendInvoicePaymentReminder } from "@/emails";
export function MarkOverdueButton({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  async function handleMarkOverdue() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await UpdateInvoiceStatus(invoice.id, "OVERDUE");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        if (typeof window !== "undefined" && window) {
          window.location.reload();
        }
      } else toast.error(res.error);
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    } finally {
      sendInvoicePaymentReminder(invoice);
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={handleMarkOverdue}
            className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Mark as Overdue
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52 bg-gray-950 dark:bg-gray-300 text-white dark:text-gray-950 "
          side="left"
          data-state="delayed-open">
          <p>
            Mark invoice as overdue if the due date has passed with no payment.
            You can send them a reminder email by clicking the claim payment
            button.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DisputeButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  async function DisputeInvoice() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await UpdateInvoiceStatus(invoiceId, "DISPUTED");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        if (typeof window !== "undefined" && window) {
          window.location.reload();
        }
      } else toast.error(res.error);
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={DisputeInvoice}>
            <CircleAlert
              className="mr-2 h-4 w-4"
              onClick={() =>
                toast.info("Upcoming Feature", {
                  position: "top-center",
                })
              }
            />
            Dispute Payment
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52 bg-gray-950 dark:bg-gray-300 text-white dark:text-gray-950 "
          side="left"
          data-state="delayed-open">
          <p>
            Dispute a payment if a customer cancelled the payment or payment was
            not received
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ClaimPaymentButton({ invoice }: { invoice: Invoice }) {
  async function handleClaim() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await sendInvoicePaymentReminder(invoice);
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("Payment claim email sent successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-500  hover:bg-green-500 hover:text-white"
            onClick={handleClaim}>
            <HandCoins className="mr-2 h-4 w-4" />
            Claim Payment
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52 bg-gray-950 dark:bg-gray-300 text-white dark:text-gray-950 "
          side="left"
          data-state="delayed-open">
          <p>
            Claim payment if the due date has passed. This will send an
            automatic reminder email to the customer to remind them to pay.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function MarkResolved({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  async function ResolveDispute() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await UpdateInvoiceStatus(invoiceId, "PAID");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        if (typeof window !== "undefined" && window) {
          window.location.reload();
        }
      } else toast.error(res.error);
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-500  hover:bg-green-500 hover:text-white"
            onClick={ResolveDispute}>
            <CircleCheck className="mr-2 h-4 w-4" />
            Mark as Resolved
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52 bg-gray-950 dark:bg-gray-300 text-white dark:text-gray-950 "
          side="left"
          data-state="delayed-open">
          <p>
            Mark payment as resolved if the disputed has been resolved with
            Stripe.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
