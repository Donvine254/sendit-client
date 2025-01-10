"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleAlert, ShieldAlert } from "lucide-react";
import { UpdateInvoiceStatus } from "../../actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function MarkOverdueButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  async function handleMarkOverdue() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await UpdateInvoiceStatus(invoiceId, "OVERDUE");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else toast.error(res.error);
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  }
  return (
    <Button
      variant="ghost"
      onClick={handleMarkOverdue}
      className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
      title="Mark invoice as overdue if the due date has passed with no payment">
      <ShieldAlert className="mr-2 h-4 w-4" />
      Mark as Overdue
    </Button>
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
        <TooltipContent className="max-w-52">
          <p>
            Dispute a payment if a customer cancelled the payment or payment was
            not received
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
