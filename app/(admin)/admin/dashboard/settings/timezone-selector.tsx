import { useEffect, useState } from "react";

const TimezoneSelector = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load timezones only on the client
    if (typeof Intl.supportedValuesOf === "function") {
      setTimezones(Intl.supportedValuesOf("timeZone"));
    }
  }, []);

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
      defaultValue="Africa/Nairobi"
      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
      <option value="" selected>
        Select Timezone
      </option>
      {timezones.map((zone, index) => (
        <option key={index} value={zone}>
          {zone}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;