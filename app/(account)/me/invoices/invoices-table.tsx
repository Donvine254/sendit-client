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
import { Download, Printer, AlertTriangle, Search } from "lucide-react";
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
import {GenerateInvoicePDF } from "@/lib/actions/invoices";
import PaymentButton from "@/components/ui/payment-button";
import Refresh from "@/components/pages/refresh";
import { PDFIcon, SortAll } from "@/assets";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-800 hover:bg-muted hover:text-muted-foreground",
  PAID: "bg-green-500 text-white hover:bg-green-600",
  OVERDUE: "bg-destructive text-destructive-foreground",
  DISPUTED: "bg-amber-500 text-white hover:bg-amber-600",
};

function InvoiceActions({ invoice }: { invoice: Invoice }) {
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
            <PaymentButton invoice={invoice} />
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() =>GenerateInvoicePDF(invoice)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() =>GenerateInvoicePDF(invoice)}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {invoice.status === "PAID" && (
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
              disabled>
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
          className="p-0 hover:bg-transparent hover:text-gray-200">
          INV#
          <SortAll className="ml-2 h-4 w-4" />
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Date
          <SortAll className="ml-2 h-4 w-4" />
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
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Due Date
          <SortAll className="ml-2 h-4 w-4" />
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
          <SortAll className="ml-2 h-4 w-4" />
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
      <Refresh tag="invoices" />
      <div className="relative w-full py-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search invoices..."
          value={(table.getColumn("item")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("item")?.setFilterValue(event.target.value)
          }
          className="w-full pl-8 xsm:text-sm"
        />
      </div>

      <div className=" border  bg-white rounded-lg">
        <Table className="table-auto overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-blue-500 text-white">
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
                <TableRow
                  key={row.id}
                  className={`${
                    row.getValue("status") === "DISPUTED"
                      ? "bg-red-100 bg-opacity-50"
                      : ""
                  } `}>
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
