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
  DownloadIcon,
  Eye,
  Filter,
  FilterX,
  MoreHorizontal,
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
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import Link from "next/link";
import { Parcel } from "@prisma/client";
import StatusBadge from "@/components/ui/status-badge";
import CancelButton from "@/components/ui/cancel-button";
import { MarkCompleteButton, ProgressButton } from "./action-buttons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DeliveryTracker,
  SatisfactionCard,
} from "@/components/dashboard/charts";

// TODO: Add row with customer name

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
    accessorKey: "Customer",
    header: "Customer",
    cell: ({ row }) => {
      const pickupAddress = row.getValue(
        "pickupAddress"
      ) as Parcel["pickupAddress"];
      const { fullName } = pickupAddress as {
        fullName: string;
      };

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
              <Link href={`/me/orders/${parcel.id}`}>
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </Button>
            {parcel.status === "IN_TRANSIT" && (
              <MarkCompleteButton orderId={parcel.id} />
            )}
            {parcel.status === "PENDING" && (
              <>
                <ProgressButton Parcel={parcel} />
                <CancelButton orderId={parcel.id} />
              </>
            )}
          </PopoverContent>
        </Popover>
      );
    },
  },
];

export default function ParcelDataTable({ data }: { data: Parcel[] }) {
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
  const deliveredOrders =
    data.filter((item) => item.status === "DELIVERED").length || 0;
  const pendingOrders =
    data.filter((item) => item.status === "PENDING").length || 0;
  const InProgressOrders =
    data.filter((item) => item.status === "IN_TRANSIT").length || 0;
  const totalOrders =
    data.filter((item) => item.status !== "CANCELLED").length || 0;
  const deliveryStats = [
    {
      status: "Delivered",
      count: deliveredOrders,
      percentage: ((deliveredOrders / totalOrders) * 100).toFixed(0),
      color: "bg-emerald-500",
    },
    {
      status: "In Progress",
      count: InProgressOrders,
      percentage: ((InProgressOrders / totalOrders) * 100).toFixed(0),
      color: "bg-blue-500",
    },
    {
      status: "Pending",
      count: pendingOrders,
      percentage: ((pendingOrders / totalOrders) * 100).toFixed(0),
      color: "bg-gray-200",
    },
  ];

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="grid md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2 md:justify-between gap-4 ">
        <DeliveryTracker stats={deliveryStats} totalOrders={totalOrders} />
        <SatisfactionCard percentage={95} />
      </div>
      <div className="py-4 flex items-center justify-between gap-4">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl ">
          Manage Deliveries
        </h2>
        <Button
          variant="outline"
          type="button"
          title="Export to Excel"
          className="justify-start bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900">
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
            <option value="PENDING">Pending</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
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
