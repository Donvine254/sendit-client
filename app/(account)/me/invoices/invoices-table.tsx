"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Download,
  Printer,
  CreditCard,
  AlertTriangle,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Invoice } from "@prisma/client";
import { GenerateInvoice } from "@/lib/actions/invoices";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-800 hover:bg-muted hover:text-muted-foreground",
  PAID: "bg-green-100 text-green-800 hover:bg-green-500 hover:text-white",
  OVERDUE:
    "bg-red-100 text-red-800 hover:bg-destructive hover:text-destructive-foreground",
  DISPUTED:
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-500 hover:text-white",
};

function InvoiceActions({ invoice }: { invoice: Invoice }) {
  const handlePay = () => console.log("Pay invoice:", invoice.id);
  // TODO: Implement Insta-send API for payment gateway
  // TODO: Implement invoice-generator API to create invoice PDFs
  const handlePrint = () => console.log("Print invoice:", invoice.id);
  const handleDispute = () => console.log("Dispute invoice:", invoice.id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[200px]">
        <div className="grid gap-1">
          {(invoice.status === "DRAFT" || invoice.status === "OVERDUE") && (
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-green-500 hover:text-white"
              onClick={handlePay}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Invoice
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => GenerateInvoice(invoice)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {invoice.status === "PAID" && (
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleDispute}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Dispute
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: () => {
      return <input type="checkbox" name="select" />;
    },
    cell: () => {
      return <input type="checkbox" name="select" />;
    },
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent">
          INV#
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>INV{String(row.getValue("invoice_number")).padStart(4, "0")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent">
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{new Date(row.getValue("createdAt")).toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => {
      return <p className="capitalize">{row.getValue("item")}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent">
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{new Date(row.getValue("createdAt")).toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent">
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "amount",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);
      return <p>{formatted}</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <InvoiceActions invoice={row.original} />,
  },
];

interface DataTableProps {
  data: Invoice[];
}

export default function InvoiceDataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full ">
      <div className="relative w-full py-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search invoices..."
          value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("item")?.setFilterValue(event.target.value)
          }
          className="w-full pl-8"
        />
      </div>

      <div className=" border  bg-white rounded-lg">
        <Table className="table-auto overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
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
