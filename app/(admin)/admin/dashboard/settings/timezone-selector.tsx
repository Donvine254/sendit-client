import { Input } from "@/components/ui/input";
import { cn, getCookie, setCookie } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TimezoneSelector = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  //on click outside events sets the show dropdown to false
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
  const handleTimezoneChange = (value: string) => {
    setSelected(value);
    setCookie("timezone", value, 365);
    toast.success("Timezone updated", {
      position: "top-right",
    });
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
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
    <div className="relative flex items-center">
      <Search className="h-4 w-4 text-gray-400 absolute left-2" />
      <Input
        type="search"
        placeholder="Select Timezone"
        value={selected}
        onClick={() => setShowDropdown(true)}
        className="placeholder:text-gray-400 pl-8 pr-8 w-full cursor-pointer"
      />
      <ChevronsUpDown className="h-4 w-4 text-gray-400 absolute right-2" />
      {showDropdown && (
        <div
          className="border border-input w-full bg-card absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto mt-2 z-50 rounded-b-md shadow shadow-blue-500 "
          id="options-container">
          <ol className="p-4 space-y-2 font-medium text-sm text-gray-600">
            {timezones.map((tmz) => (
              <li
                key={tmz}
                className="flex justify-between gap-2 cursor-pointer"
                onClick={() => handleTimezoneChange(tmz)}>
                {tmz}
                <Check
                  className={cn(
                    "ml-auto",
                    selected === tmz ? "opacity-100" : "opacity-0"
                  )}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default TimezoneSelector;
