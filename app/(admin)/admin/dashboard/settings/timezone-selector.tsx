import { getCookie, setCookie } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const TimezoneSelector = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load timezones only on the client
    if (typeof Intl.supportedValuesOf === "function") {
      setTimezones(Intl.supportedValuesOf("timeZone"));
    }
    // get the cookie
    const storedTimezone = getCookie("timezone");
    if (storedTimezone) {
      setSelected(storedTimezone);
    } else setSelected("Africa/Nairobi");
  }, []);
  const handleTimezoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = event.target.value;
    setSelected(newTimezone);
    setCookie("timezone", newTimezone, 365);
    toast.success("Timezone updated", {
      position: "top-right",
    });
  };
  if (!mounted) {
    return (
      <select
        defaultValue="Africa/Nairobi"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        <option value="" selected>
          Select Timezone
        </option>
      </select>
    );
  }

  return (
    <select
      value={selected}
      onChange={handleTimezoneChange}
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
      <option value="">Select Timezone</option>
      {timezones.map((zone, index) => (
        <option key={index} value={zone}>
          {zone}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
