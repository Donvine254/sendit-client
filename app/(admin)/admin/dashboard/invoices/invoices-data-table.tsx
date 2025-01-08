"use client";
import { useCallback, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CircleAlert,
  DownloadIcon,
  Filter,
  FilterX,
  HandCoins,
  MoreHorizontal,
  Search,
  ShieldAlert,
  ShieldCheck,
  SortAsc,
  SortDesc,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Invoice } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PDFIcon } from "@/assets";
import { Badge } from "@/components/ui/badge";
import { GenerateInvoicePDF } from "@/lib/actions/invoices";
import { SatisfactionCard, StatsCard } from "@/components/dashboard/charts";
import Alert from "@/components/ui/alert";

// TODO: Add row with email and phone number

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-800 hover:bg-muted hover:text-muted-foreground",
  PAID: "bg-green-500 text-white hover:bg-green-600",
  OVERDUE: "bg-destructive text-destructive-foreground",
  DISPUTED: "bg-amber-500 text-white hover:bg-amber-600",
};
//
const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        name="select"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(event) =>
          table.toggleAllPageRowsSelected(event.target.checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          INV#
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <SortAsc className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="inline-flex gap-0.5 items-center whitespace-nowrap">
        <PDFIcon />
        <p>INV{String(row.getValue("invoice_number")).padStart(4, "0")}</p>
      </div>
    ),
  },
  {
    accessorKey: "item",
    header: "Parcel",
    cell: ({ row }) => {
      const item = row.getValue("item") as string;
      return (
        <p className="truncate max-w-32" title={item}>
          {item}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Date
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <SortAsc className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <p className="whitespace-nowrap">
          {date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Status
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <SortAsc className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusStyles;
      return (
        <Badge className={statusStyles[status]} variant="default">
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },

  {
    accessorKey: "fullName",
    header: "Customer",
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return (
        <p
          className="capitalize truncate min-w-fit max-w-72 flex items-center gap-1"
          title={fullName ?? "John Doe"}>
          <Image
            src={`https://ui-avatars.com/api/?background=random&name=${
              fullName ?? "John Doe"
            }`}
            height={24}
            width={24}
            className="h-6 w-6 rounded-full"
            alt="user avatar"
          />{" "}
          {fullName ?? "John Doe"}
        </p>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => {
      const contact = row.getValue("phone") as string;
      return <p title={contact}>+254{contact}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <p title={email} className="truncate max-w-48">
          {email}
        </p>
      );
    },
  },
  {
    accessorKey: "shipping_address",
    header: "Shipping",
    cell: ({ row }) => {
      const shipping = row.getValue("shipping_address") as string;
      return (
        <p className="truncate max-w-32 capitalize" title={shipping}>
          {shipping}
        </p>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Due Date
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <SortAsc className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return (
        <p className="whitespace-nowrap">
          {date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Amount
          {column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <SortDesc className="ml-2 h-4 w-4" />
          ) : (
            <SortAsc className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("amount"));
      return `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(price)}`;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => GenerateInvoicePDF(invoice)}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
            {invoice.status === "DRAFT" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Mark as Overdue
              </Button>
            )}
            {invoice.status === "OVERDUE" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500  hover:bg-green-500 hover:text-white">
                <HandCoins className="mr-2 h-4 w-4" />
                Claim Payment
              </Button>
            )}
            {invoice.status === "PAID" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <CircleAlert className="mr-2 h-4 w-4" />
                Dispute Payment
              </Button>
            )}
            {invoice.status === "DISPUTED" && (
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500 hover:text-white hover:bg-green-500">
                <ShieldCheck className="mr-2 h-4 w-4 " />
                Resolve Dispute
              </Button>
            )}
          </PopoverContent>
        </Popover>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function InvoiceDataTable({ data }: { data: Invoice[] }) {
  const [filteredData, setFilteredData] = useState(data || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const handleDateRangeChange = useCallback(
    (range: { from: Date; to: Date } | undefined) => {
      // Filter data directly here
      const newFilteredData = (data || []).filter((parcel) => {
        if (range?.from && range?.to) {
          const parcelDate = new Date(parcel.createdAt);
          return parcelDate >= range.from && parcelDate <= range.to;
        }
        return true;
      });

      setFilteredData(newFilteredData);
    },
    [data]
  );
  const handleFilterReset = useCallback(() => {
    setFilteredData(data || []);
  }, [data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });
  // stats for the card
  const paidInvoices =
    data.filter((item) => item.status === "PAID").length || 0;
  const draftInvoices =
    data.filter((item) => item.status === "DRAFT").length || 0;
  const overdueInvoices =
    data.filter((item) => item.status === "OVERDUE").length || 0;
  const disputedInvoices =
    data.filter((item) => item.status === "DISPUTED").length || 0;
  const totalInvoices = data.length || 0;
  const invoiceStats = [
    {
      status: "Draft",
      count: draftInvoices,
      percentage: (draftInvoices / totalInvoices) * 100,
      color: "bg-gray-300",
    },
    {
      status: "Paid",
      count: paidInvoices,
      percentage: (paidInvoices / totalInvoices) * 100,
      color: "bg-emerald-500",
    },
    {
      status: "Overdue",
      count: overdueInvoices,
      percentage: (overdueInvoices / totalInvoices) * 100,
      color: "bg-amber-500",
    },
    {
      status: "Disputed",
      count: disputedInvoices,
      percentage: (disputedInvoices / totalInvoices) * 100,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="w-full p-2 sm:p-4">
      <Alert />
      <div className="grid md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2 md:justify-between gap-4 ">
        <StatsCard
          title="Invoices"
          totalOrders={data.length}
          stats={invoiceStats}
        />
        <SatisfactionCard
          percentage={Number(
            ((disputedInvoices / data.length) * 100).toFixed(0)
          )}
          title="Dispute Rate"
          text="of payments disputed by customers.
          "
          callout={"Low!"}
        />
      </div>
      <div className="py-4 flex items-center justify-between gap-4">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl ">
          Manage Invoices
        </h2>
        <Button
          variant="outline"
          type="button"
          title="Export to Excel"
          className="justify-start bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900"
          onClick={() => handleExportExcel(data)}>
          <DownloadIcon className="h-4 w-4" /> Export
        </Button>
      </div>
      <hr className="shadow dark:shadow-md dark:shadow-blue-500 " />
      <div className="flex flex-col md:flex-row items-center py-4 gap-2 sm:gap-4">
        {/* first child with two children */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 w-full md:w-1/2">
          <div className="relative flex-1 xsm:w-full sm:w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white h-4 w-4" />
            <Input
              placeholder="Search all columns..."
              type="search"
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="flex-1 w-full  xsm:text-sm pl-8 dark:text-white"
            />
          </div>
          {/* show in small and medium devices, hide in sm */}
          <div className="sm:hidden md:flex md:flex-shrink">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto justify-start text-muted-foreground dark:text-white">
                  <Filter className="h-4 w-4" />{" "}
                  <span className="md:hidden xsm:hidden lg:block">Columns</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[200px] flex flex-col gap-2">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <label
                        key={column.id}
                        className="capitalize flex items-center gap-4 justify-start text-sm xsm:text-xs">
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={(e) =>
                            column.toggleVisibility(e.target.checked)
                          }
                        />
                        {column.id === "shipping_address"
                          ? "Shipping Address"
                          : column.id === "invoice_number"
                          ? "Invoice Number"
                          : column.id === "createdAt"
                          ? "Invoice Date"
                          : column.id === "updatedAt"
                          ? "Due Date"
                          : column.id}
                      </label>
                    );
                  })}
                <label
                  className="flex items-center gap-4 justify-center text-sm xsm:text-xs py-1 rounded-md bg-gray-200 dark:bg-gray-800 shadow px-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    table
                      .getAllColumns()
                      .filter(
                        (column) =>
                          typeof column.accessorFn !== "undefined" &&
                          column.getCanHide()
                      )
                      .forEach((column) => column.toggleVisibility(true));
                  }}>
                  <FilterX className="h-4 w-4" />
                  <span>Clear All</span>
                </label>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {/* second child with two children */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 w-full md:w-1/2">
          <DateRangePicker
            onChange={handleDateRangeChange}
            placeholder="Select date range"
            clearFilter={handleFilterReset}
          />
          {/* hide in small and medium devices */}
          <div className="hidden sm:block md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto justify-start text-muted-foreground dark:text-white">
                  <Filter className="h-4 w-4" /> Columns
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[200px] flex flex-col gap-2">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <label
                        key={column.id}
                        className="capitalize flex items-center gap-4 justify-start text-sm xsm:text-xs">
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={(e) =>
                            column.toggleVisibility(e.target.checked)
                          }
                        />
                        {column.id === "pickupAddress"
                          ? "Origin"
                          : column.id === "deliveryAddress"
                          ? "Destination"
                          : column.id === "createdAt"
                          ? "Order Date"
                          : column.id}
                      </label>
                    );
                  })}
                <label
                  className="flex items-center gap-4 justify-center text-sm xsm:text-xs py-1 rounded-md bg-gray-200 dark:bg-gray-800 shadow px-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    table
                      .getAllColumns()
                      .filter(
                        (column) =>
                          typeof column.accessorFn !== "undefined" &&
                          column.getCanHide()
                      )
                      .forEach((column) => column.toggleVisibility(true));
                  }}>
                  <FilterX className="h-4 w-4" />
                  <span>Clear All</span>
                </label>
              </PopoverContent>
            </Popover>
          </div>
          <select
            onChange={(event) =>
              table
                .getColumn("status")
                ?.setFilterValue(
                  event.target.value === "ALL" ? "" : event.target.value
                )
            }
            defaultValue="ALL"
            className={cn(
              "md:w-[180px] md:hidden md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:block lg:block xsm:flex-1 h-10 truncate px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-normal text-sm  xsm:max-w-[25%] xsm:text-xs"
            )}>
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
            <option value="DISPUTED">Disputed</option>
          </select>
        </div>
      </div>
      <div className="rounded-md border shadow dark:bg-none border-input overflow-x-auto bg-white dark:bg-gray-950">
        <Table className="table-auto relative">
          <TableHeader className="bg-blue-500 hover:bg-blue-600 hover:opacity-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-white ${
                        header.column.columnDef.header === "Actions"
                          ? "sticky right-0 bg-blue-500 z-[1px]"
                          : ""
                      }`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.columnDef.header === "Actions"
                          ? "sticky right-0 z-[1px] bg-white dark:bg-background"
                          : ""
                      }`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const handleExportExcel = (invoices: Invoice[]) => {
  const headers = `ID,Invoice Number,Full Name,Shipping Address,Item,Email,Phone,Amount,User ID,Parcel ID,Status,Date,Due Date`;
  const rows = invoices.map((invoice) => {
    return `${invoice.id},${invoice.invoice_number},"${invoice.fullName.replace(
      /"/g,
      '""'
    )}","${invoice.shipping_address.replace(
      /"/g,
      '""'
    )}","${invoice.item.replace(/"/g, '""')}",${invoice.email || ""},${
      "254" + invoice.phone || ""
    },${invoice.amount},${invoice.userId},${invoice.parcelId},${
      invoice.status
    },${new Date(invoice.createdAt).toLocaleDateString()},${new Date(
      invoice.updatedAt
    ).toLocaleDateString()}`;
  });

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `invoices-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
};
