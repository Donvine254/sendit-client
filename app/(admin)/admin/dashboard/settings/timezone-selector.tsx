import { Input } from "@/components/ui/input";
import { cn, getCookie, setCookie } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const TimezoneSelector = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  // use effect to close the dropdown if we click outside
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
  // handle time zone change function.
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <Input
        type="search"
        placeholder="Select Timezone"
        value={selected}
        onInput={(e) => {
          const inputValue = (e.target as HTMLInputElement).value;
          setSelected(inputValue);
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
        onChange={(e) => {
          setSelected((e.target as HTMLInputElement).value);
        }}
        onClick={() => setShowDropdown(true)}
        className="placeholder:text-gray-400  pr-8 w-full cursor-pointer"
      />
      <ChevronsUpDown className="h-4 w-4 text-gray-400 absolute right-2" />
      {showDropdown && (
        <div
          className="border border-input w-full bg-card absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto mt-2 z-50 rounded-b-md shadow shadow-blue-500 "
          id="options-container">
          <ol className="p-4 space-y-2 font-medium text-sm text-gray-600">
            {timezones && timezones.length > 0 ? (
              <>
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
