"use client";

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";

export function DateRangePicker({
  className,
  onChange,
  placeholder,
  clearFilter,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      onChange({ from: selectedDate.from, to: selectedDate.to });
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2 xsm:gap-0.5 w-full md:w-full md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-fit lg:md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-full",
        className
      )}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start xsm:text-xs text-left font-normal truncate",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon className="mr-2 xsm:mr-0.5 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
            {date && (
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  setDate(undefined);
                  clearFilter();
                }}
                className="cursor-pointer hover:text-red-500 z-10"
                title="clear filters">
                <X className="h-4 w-4 " />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DateRangePickerProps {
  className?: string;
  // eslint-disable-next-line
  onChange: (range: { from: Date; to: Date }) => void;
  placeholder: string;
  clearFilter: () => void;
}
