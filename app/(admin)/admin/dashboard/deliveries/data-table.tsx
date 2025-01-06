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
import {
  CircleDashed,
  Eye,
  Filter,
  MoreHorizontal,
  PackageCheck,
  Search,
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
// import { DateRangePicker } from "@/components/ui/date-range-picker";

import Link from "next/link";
import { Parcel } from "@prisma/client";
import StatusBadge from "@/components/ui/status-badge";
import CancelButton from "@/components/ui/cancel-button";

const columns: ColumnDef<Parcel>[] = [
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
    id: "index",
    header: "#",
    cell: ({ row }) => String(row.index + 1).padStart(3, "0"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <p className="truncate max-w-32" title={description}>
          {description}
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
      const status = row.getValue("status") as string;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200">
          Weight
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
      const weight = parseFloat(row.getValue("weight"));
      return `${weight.toFixed(2)} kg`;
    },
  },
  {
    accessorKey: "pickupAddress",
    header: "Origin",
    cell: ({ row }) => {
      const pickupAddress = row.getValue(
        "pickupAddress"
      ) as Parcel["pickupAddress"];

      if (pickupAddress) {
        const { address, district, region } = pickupAddress as {
          address: string;
          district: string;
          region: string;
        };

        return (
          <p
            className="truncate max-w-32 capitalize"
            title={`${address}, ${district}, ${region}`}>
            {`${address}, ${district}, ${region}`}
          </p>
        );
      }

      return <p>Address not available</p>;
    },
  },

  {
    accessorKey: "deliveryAddress",
    header: "Destination",
    cell: ({ row }) => {
      const deliveryAddress = row.getValue(
        "deliveryAddress"
      ) as Parcel["deliveryAddress"];

      if (deliveryAddress) {
        const { address, district, region } = deliveryAddress as {
          address: string;
          district: string;
          region: string;
        };

        return (
          <p
            className="truncate max-w-32 capitalize"
            title={`${address}, ${district}, ${region}`}>
            {`${address}, ${district}, ${region}`}
          </p>
        );
      }

      return <p>Address not available</p>;
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
      const parcel = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href={`/me/parcels/${parcel.id}`}>
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </Button>
            {parcel.status === "PENDING" && (
              <>
                <CancelButton orderId={parcel.id} />
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  type="button"
                  title="mark parcel out for delivery">
                  <CircleDashed className="h-4 w-4" />
                  Mark as in-transit
                </Button>
              </>
            )}
            {parcel.status === "IN_TRANSIT" && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-green-500 hover:text-white"
                  type="button"
                  title="mark parcel as delivered">
                  <PackageCheck className="h-4 w-4" />
                  Mark as delivered
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-green-500 hover:text-white"
                  type="button"
                  title="Generate an invoice for this order">
                  <PackageCheck className="h-4 w-4" />
                  Generate Invoice
                </Button>
              </>
            )}
          </PopoverContent>
        </Popover>
      );
    },
  },
];

export default function ParcelDataTable({ data }: { data: Parcel[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  //   const [dateRange, setDateRange] = useState<
  //     { from: Date; to: Date } | undefined
  //   >(undefined);

  //   const filteredData = useMemo(() => {
  //     return (data || []).filter((parcel) => {
  //       if (dateRange?.from && dateRange?.to) {
  //         const parcelDate = new Date(parcel.createdAt);
  //         if (parcelDate < dateRange.from || parcelDate > dateRange.to) {
  //           return false;
  //         }
  //       }
  //       return true;
  //     });
  //   }, [data, dateRange]);

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
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full p-4">
      {/* <Refresh tag="parcels" /> */}
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 " />
          <Input
            placeholder="Search by description..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="flex-1 w-full  xsm:text-sm pl-8"
          />
        </div>
        {/* <DateRangePicker
          onChange={(range) => setDateRange(range)}
          placeholder="Select date range"
        /> */}
        <select
          onChange={(event) =>
            table
              .getColumn("status")
              ?.setFilterValue(
                event.target.value === "ALL" ? "" : event.target.value
              )
          }
          defaultValue="ALL"
          className="w-[180px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-muted-foreground">
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_TRANSIT">In Transit</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto justify-start">
              <Filter className="sm:mr-2 h-4 w-4" /> Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px] flex flex-col gap-2">
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
                    {column.id}
                  </label>
                );
              })}
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border shadow dark:bg-none border-input overflow-x-auto bg-white dark:bg-gray-950">
        <Table className="table-auto">
          <TableHeader className="bg-blue-500 hover:bg-blue-600 hover:opacity-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
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
