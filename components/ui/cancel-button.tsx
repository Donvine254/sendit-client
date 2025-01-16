"use client";
import React from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { toast } from "sonner";
import { Order } from "@/types";
import { sendCancellationEmail } from "@/emails";

export default function CancelButton({ order }: { order: Order }) {
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
      const res = await updateOrderStatus(order.id, "CANCELLED");
      toast.dismiss(toastId);
      if (res.success) {
        toast.success("Order Cancelled successfully", {
          position: "top-center",
        });
        setTimeout(async () => {
          const { address, district, region, email, fullName } =
            order.pickupAddress as {
              email: string;
              fullName: string;
              address: string;
              district: string;
              region: string;
            };
          const deliveryAddress = order.deliveryAddress as {
            email?: string;
            fullName: string;
            address: string;
            district: string;
            region: string;
          };
          await sendCancellationEmail({
            orderId: order.id,
            name: fullName,
            email: email,
            recipient: deliveryAddress.fullName,
            parcelDescription: order.description!,
            parcelWeight: order.weight,
            totalPrice: order.price!,
            pickupAddress: `${address}, ${district}, ${region}`,
            deliveryAddress: `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.region}`,
          });
        }, 0);
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      if (typeof window !== "undefined" && window) {
        window.location.reload();
      }
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
