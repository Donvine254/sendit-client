"use client";

import { useState } from "react";
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
import { Eye, Filter, MoreHorizontal, RefreshCcw, Search } from "lucide-react";
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
import Link from "next/link";
import { Order } from "@/types";
import StatusBadge from "@/components/ui/status-badge";
import CancelButton from "@/components/ui/cancel-button";
import Refresh from "@/components/pages/refresh";
import { SortAll } from "@/assets";

const columns: ColumnDef<Order>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => String(row.index + 1).padStart(3, "0"),
  },
  {
    accessorKey: "description",
    header: "Description",
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
      const status = row.getValue("status");
      return <StatusBadge status={status as string} />;
    },
  },
  {
    accessorKey: "pickupAddress",
    header: "Origin",
    cell: ({ row }) => {
      const pickupAddress = row.getValue(
        "pickupAddress"
      ) as Order["pickupAddress"];
      return `${pickupAddress.region}, ${pickupAddress.district}`;
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Destination",
    cell: ({ row }) => {
      const deliveryAddress = row.getValue(
        "deliveryAddress"
      ) as Order["deliveryAddress"];
      return `${deliveryAddress.region}, ${deliveryAddress.district}`;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Price
          <SortAll className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(price)}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href={`/me/orders/${order.id}`}>
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </Button>
            {order.status === "PENDING" && <CancelButton orderId={order.id} />}
          </PopoverContent>
        </Popover>
      );
    },
  },
];

interface DataTableProps {
  data: any | [];
}

export default function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Refresh tag="orders" />
      <div className="flex items-center py-2 gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 " />
          <Input
            placeholder="Search by description..."
            value={
              (table.getColumn("description")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            className="flex-1 max-w-3xl xsm:text-sm pl-8"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto justify-start">
              <Filter className="h-4 w-4 sm:mr-2" />{" "}
              <span className="xsm:hidden">Columns</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="flex flex-col gap-2">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <label
                    key={column.id}
                    className="capitalize flex items-center gap-4 justify-start">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={(e) =>
                        column.toggleVisibility(e.target.checked)
                      }
                    />
                    {column.id}
                  </label>
                );
              })}
          </PopoverContent>
        </Popover>
      </div>
      <div className="border bg-white rounded-lg">
        <Table className="table-auto overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-blue-500 text-white">
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
                  className={`${
                    row.getValue("status") === "CANCELLED"
                      ? "bg-red-100 bg-opacity-50"
                      : ""
                  } `}
                  data-state={row.getIsSelected() && "selected"}>
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
