"use client";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import { toast } from "sonner";
import { MarkInProgress } from "../../actions";
import { useRouter } from "next/router";

export function ProgressButton(Parcel: any) {
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
        router.reload();
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
