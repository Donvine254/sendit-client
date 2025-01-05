import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentTransactions } from "@/constants";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecentDeliveries() {
  // table is causing the page to overflow
  return (
    <section className="w-full p-2 sm:p-4 md:p-6">
      <h3 className="font-semibold mb-2">Recent Orders</h3>
      <div className="overflow-x-auto bg-white rounded-lg border shadow ">
        <Table className="table-auto">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Customer</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  #{String(transaction.id).padStart(3, "0")}
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>
                  <p className="whitespace-nowrap">
                    {new Date(transaction.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                  }).format(transaction.amount)}
                </TableCell>
                <TableCell>
                  {" "}
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap text-white
                    ${
                      transaction.status === "Delivered"
                        ? "bg-green-500 "
                        : transaction.status === "In Transit"
                        ? "bg-blue-500 "
                        : "bg-amber-500 "
                    }`}>
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild>
                          <Link href="#">
                            {" "}
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </Link>
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
