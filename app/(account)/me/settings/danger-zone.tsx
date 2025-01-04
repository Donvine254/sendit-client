"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function DangerZone({ userId }: { userId: string }) {
  async function handleDeleteAccount() {
    toast.message("Are you sure you?", {
      position: "top-center",
      duration: Infinity,
      description: "This action is irreversible and destructive.",
      action: {
        label: "Delete",

        onClick: () => console.log(userId),
      },
      actionButtonStyle: { backgroundColor: "red", color: "white" },
    });
  }
  return (
    <div>
      <h2 className="text-lg font-semibold my-2">Danger Zone</h2>
      <p className="text-gray-600 mb-6">Irreversible and Destructive Actions</p>
      <div className="border border-red-500 rounded-md px-2 py-4 md:p-6 space-y-4 ">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <h2 className="text-base md:text-xl font-bold xsm:text-center">
            Delete Account
          </h2>
        </div>
        <hr className="border border-red-500" />
        <p>
          Once you delete your user account, there is no going back. Please be
          certain.
        </p>
        <Button
          title="delete user account"
          variant="destructive"
          className="xsm:w-full"
          onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}
