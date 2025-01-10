"use client";
import { SyncDatabase } from "@/app/(admin)/admin/actions";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SyncButton() {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  function handleClick() {
    setIsSyncing(true);
    setTimeout(async () => {
      await SyncDatabase();
      setIsSyncing(false);
      router.refresh();
      // hard refresh to sync client components
      if (typeof window !== "undefined" && window) {
        window.location.reload();
      }
    }, 100);
    toast.success("Synced successfully", {
      position: "top-center",
    });
  }
  return (
    <button
      title="Sync"
      type="button"
      className="p-1 rounded-md bg-gray-200 text-blue-500 dark:bg-gray-600 dark:text-gray-100 group disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleClick}
      disabled={isSyncing}>
      <RefreshCcw
        className={`h-4 w-4 text-blue-500 dark:text-white cursor-pointer transition-all delay-150 ${
          isSyncing ? "animate-spin" : "hover:animate-spin "
        } `}
      />
    </button>
  );
}
