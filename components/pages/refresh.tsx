import { revalidateCache } from "@/lib/actions";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

let intervalRef: NodeJS.Timeout;
export default function Refresh({ tag }: { tag: string }) {
  // functions to allow users to sync data and invalidate cache
  const [timeSinceLoad, setTimeSinceLoad] = useState("less than a minute ago");
  const router = useRouter();
  async function syncData() {
    await revalidateCache(tag);
    clearInterval(intervalRef);
    setTimeSinceLoad("less than a minute ago");
    router.refresh();
  }
  //keep track of the time since the last update
  useEffect(() => {
    const pageLoadTime = Date.now();
    const updateTimeSinceLoad = () => {
      const elapsedMs = Date.now() - pageLoadTime;
      const elapsedMinutes = Math.floor(elapsedMs / 60000);
      if (elapsedMinutes === 0) {
        setTimeSinceLoad("less than a minute ago");
      } else if (elapsedMinutes === 1) {
        setTimeSinceLoad("a minute ago");
      } else {
        setTimeSinceLoad(`${elapsedMinutes} minutes ago`);
      }
    };
    intervalRef = setInterval(updateTimeSinceLoad, 60000);
    updateTimeSinceLoad();
    return () => clearInterval(intervalRef);
  }, []);

  return (
    <div className="flex items-center justify-start pt-2 gap-2 text-muted-foreground">
      <p className="text-sm xsm:text-xs">Last updated {timeSinceLoad}</p>
      <button title="sync now" onClick={syncData}>
        <RefreshCcw className="h-4 w-4 text-blue-500 cursor-pointer hover:animate-spin transition-all delay-150" />
      </button>
    </div>
  );
}
