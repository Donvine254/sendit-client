"use client";
import React from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { toast } from "sonner";

export default function CancelButton({ orderId }: { orderId: string }) {
  function handleClick() {
    toast.message("Are you sure you?", {
      position: "top-center",
      duration: Infinity,
      description: "Cancelling too many orders might affect your account.",
      action: {
        label: "Confirm",
        onClick: () => cancelOrder(),
      },
      actionButtonStyle: { backgroundColor: "red", color: "white" },
    });
  }

  async function cancelOrder() {
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    try {
      const res = await updateOrderStatus(orderId, "CANCELLED");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("Order Cancelled successfully", {
          position: "top-center",
        });
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
      className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
      onClick={handleClick}>
      <X className="h-4 w-4" />
      Cancel order
    </Button>
  );
}
