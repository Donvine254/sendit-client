"use client";
import { Button } from "@/components/ui/button";
import { CircleDashed, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { MarkInProgress } from "../../actions";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/lib/actions/orders";

export function ProgressButton({ Parcel }: { Parcel: any }) {
  const router = useRouter();
  async function handleClick() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await MarkInProgress(Parcel);
      toast.dismiss(toastId);
      if (res.message) {
        toast.success(res.message);
        router.refresh();
        if (typeof window !== "undefined" && window) {
          window.location.reload();
        }
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      toast.dismiss(toastId);
    }
  }
  return (
    <Button
      variant="ghost"
      className="w-full justify-start hover:bg-blue-100 dark:hover:bg-blue-500"
      type="button"
      title="mark parcel out for delivery"
      onClick={handleClick}>
      <CircleDashed className="h-4 w-4" />
      Mark as in-transit
    </Button>
  );
}

export function MarkCompleteButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  async function handleClick() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await updateOrderStatus(orderId, "DELIVERED");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("Order delivered successfully", {
          position: "top-center",
        });
        router.refresh();
        if (typeof window !== "undefined" && window) {
          window.location.reload();
        }
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <Button
      variant="ghost"
      className="w-full justify-start hover:bg-green-500 hover:text-white"
      type="button"
      title="mark parcel as delivered"
      onClick={handleClick}>
      <PackageCheck className="h-4 w-4" />
      Mark as delivered
    </Button>
  );
}
