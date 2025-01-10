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
  DownloadIcon,
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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { KindeUser } from "@/types";

const columns: ColumnDef<KindeUser>[] = [
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
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200 whitespace-nowrap">
          Full Name
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
      const fullName = row.getValue("full_name") as string;
      const picture = row.original.picture;
      return (
        <p
          className="capitalize whitespace-nowrap w-fit flex items-center gap-1"
          title={fullName ?? "John Doe"}>
          {picture ? (
            <Image
              src={picture}
              height={24}
              width={24}
              className="h-6 w-6 rounded-full"
              alt="user avatar"
            />
          ) : (
            <Image
              src={`https://ui-avatars.com/api/?background=random&name=${
                fullName ?? "John Doe"
              }`}
              height={24}
              width={24}
              className="h-6 w-6 rounded-full"
              alt="user avatar"
            />
          )}
          {fullName ?? "John Doe"}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200 whitespace-nowrap">
          Email
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
      const email = row.getValue("email") as string;
      return (
        <p title={email} className="truncate max-w-48">
          {email}
        </p>
      );
    },
  },
  {
    accessorKey: "created_on",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200 whitespace-nowrap">
          Date Joined
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
      const date = new Date(row.getValue("created_on"));
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
    accessorKey: "is_suspended",
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
      const suspended = row.getValue("is_suspended") as boolean;
      return (
        <Badge
          className={
            suspended
              ? "bg-destructive text-destructive-foreground"
              : "bg-green-500 text-white hover:bg-green-600"
          }
          variant="default">
          {suspended ? "Suspended" : "Active"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "last_signed_in",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200 whitespace-nowrap">
          Last Login
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
      const date = new Date(row.getValue("last_signed_in"));
      return <p className="whitespace-nowrap">{date.toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "total_sign_ins",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-gray-200 whitespace-nowrap">
          Total Logins
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
      const logins = row.getValue("total_sign_ins") as string | number;
      return <p className="text-center">{logins}</p>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 space-y-2">
            <Button>Suspend User</Button>
            <Button>Delete User</Button>
            <Button>Make Admin</Button>
          </PopoverContent>
        </Popover>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function CustomersDataTable({ data }: { data: KindeUser[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

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
    <div className="w-full p-2 sm:p-4">
      <div className="py-2 flex items-center justify-between gap-4">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl ">
          Manage Users
        </h2>
        {/* change this to a popover */}
        <Button
          variant="outline"
          type="button"
          title="Export to Excel"
          className="justify-start bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900">
          <DownloadIcon className="h-4 w-4" /> Export
        </Button>
      </div>
      <p className="text-sm xsm:text-xs text-muted-foreground mb-2">
        Powered by{" "}
        <a
          href="https://sendit.kinde.com/admin"
          target="_blank"
          referrerPolicy="no-referrer"
          rel="help"
          className="text-blue-500 underline">
          Kinde Auth
        </a>
      </p>
      <hr className="shadow dark:shadow-md dark:shadow-blue-500 " />
      <div className="flex flex-col md:flex-row items-center py-4 gap-2 sm:gap-4">
        {/* first child with two children */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 w-full ">
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
          {/* second child */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto justify-start text-muted-foreground dark:text-white">
                <Filter className="h-4 w-4" />{" "}
                <span className="xsm:hidden sm:block">Columns</span>
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
                      {column.id === "full_name"
                        ? "Full Name"
                        : column.id == "created_on"
                        ? "Date Joined"
                        : column.id === "is_suspended"
                        ? "Status"
                        : column.id === "last_signed_in"
                        ? "Last Login"
                        : column.id == "total_sign_ins"
                        ? "Total Logins"
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
