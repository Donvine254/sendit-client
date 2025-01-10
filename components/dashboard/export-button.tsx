import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import {
  ChevronDown,
  DownloadIcon,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { PopoverContent } from "../ui/popover";
import { exportData } from "@/lib/utils";

export default function ExportButton({
  data,
  type,
}: {
  data: any[];
  type: "orders" | "invoices" | "customers";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          title="Export to Excel"
          className="flex items-center bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900 p-0 group gap-0">
          <div className="flex items-center px-4 py-2 h-full group-hover:bg-gray-700 group-hover:text-white dark:group-hover:bg-gray-300 dark:group-hover:text-gray-900 rounded-l-md  ">
            <DownloadIcon className="h-4 w-4 mr-2" />
            <span>Export</span>
          </div>
          <div className="flex items-center h-full px-4 py-2 border-l border-gray-700 dark:border-gray-400 group-hover:bg-gray-800 dark:hover:bg-gray-300 rounded-r-md group-hover:text-white dark:group-hover:bg-gray-400 dark:group-hover:text-gray-900 ">
            <ChevronDown className="h-4 w-4 group-hover:animate-bounce duration-150 ease-in-out" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 space-y-2  bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900">
        <Button
          variant="ghost"
          type="button"
          title="Export to Excel"
          className="justify-start gap-1 w-full"
          onClick={() => exportData(data, "csv", type)}>
          <FileSpreadsheet className="h-4 w-4" /> Export CSV
        </Button>
        <Button
          variant="ghost"
          type="button"
          title="Export to Excel"
          className="justify-start gap-1 w-full"
          onClick={() => exportData(data, "json", type)}>
          <FileJson className="h-4 w-4" /> Export JSON
        </Button>
      </PopoverContent>
    </Popover>
  );
}
