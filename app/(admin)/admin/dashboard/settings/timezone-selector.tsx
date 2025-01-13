import { cn, getCookie, setCookie } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useEffect, useState, useRef, FormEvent } from "react";
import { toast } from "sonner";

const TimezoneSelector = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  // use-effect to close the dropdown if we click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // handle timezone change function.
  const handleTimezoneChange = (value: string) => {
    setSelected(value);
    setCookie("timezone", value, 365);
    toast.success("Timezone updated", {
      position: "top-right",
    });
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
    setTimezones(Intl.supportedValuesOf("timeZone"));
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className="w-full flex items-center justify-between bg-white dark:bg-input px-3 py-2 border dark:border-input rounded-md text-sm"
        onClick={() => setShowDropdown(!showDropdown)}
        type="button"
        title="Select timezone">
        {selected || "Select Timezone"}
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      </button>

      {showDropdown && (
        <div
          className="border border-input w-full bg-card absolute top-full left-0 right-0 mt-2 z-50 rounded-md shadow"
          id="options-container">
          <div className="sticky flex items-center top-0 z-20 bg-input group">
            <Search className="h-4 w-4 text-gray-400 absolute left-2 group-hover:text-primary" />
            <input
              type="search"
              placeholder="Search a timezone..."
              onInput={(e: FormEvent<HTMLInputElement>) => {
                const inputValue = (e.target as HTMLInputElement).value;
                if (inputValue === "") {
                  setTimezones(Intl.supportedValuesOf("timeZone"));
                } else {
                  setTimezones((currentTimezones) =>
                    currentTimezones.filter((tmz) =>
                      tmz.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  );
                }
              }}
              className="placeholder:text-gray-400 text-sm pl-8 w-full border-b border-b-input focus:bg-input focus:outline-none focus:ring-none px-3 py-2 rounded-t-md group-hover:text-primary "
            />
          </div>

          <ol className="p-4 space-y-1 font-medium text-sm text-gray-600 dark:text-muted-foreground max-h-[200px] overflow-y-auto">
            {timezones && timezones.length > 0 ? (
              <>
                {timezones.map((tmz) => (
                  <li
                    key={tmz}
                    className={cn(
                      "flex justify-between gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-input",
                      selected === tmz &&
                        "bg-blue-500 text-white hover:bg-blue-500 hover:text-white"
                    )}
                    onClick={() => handleTimezoneChange(tmz)}>
                    {tmz}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selected === tmz ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </li>
                ))}
              </>
            ) : (
              <li className="text-muted-foreground">No timezones found</li>
            )}
          </ol>
        </div>
      )}
    </div>
  );
};

export default TimezoneSelector;
