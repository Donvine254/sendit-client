import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Parcel } from "@prisma/client";
import StatusBadge from "../ui/status-badge";

export default function RecentDeliveries({ data }: { data: Parcel[] }) {
  // table is causing the page to overflow
  return (
    <section className="w-full p-2 sm:p-4 md:p-6">
      <h3 className="font-semibold mb-2">Recent Orders</h3>
      <div className="overflow-x-auto bg-white rounded-lg border shadow ">
        <Table className="table-auto">
          <TableHeader className="bg-blue-500 text-white">
            <TableRow>
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Customer</TableHead>
              <TableHead className="text-white">Date</TableHead>
              {/* <TableHead className="text-white">Origin</TableHead>
              <TableHead className="text-white">Destination</TableHead> */}
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>#{String(index).padStart(3, "0")}</TableCell>
                <TableCell
                  className="truncate max-w-32"
                  title={order.description}>
                  {order.description}
                </TableCell>
                <TableCell>
                  {(order.pickupAddress as { fullName: string } | undefined)
                    ?.fullName ?? "John Doe"}
                </TableCell>
                <TableCell>
                  <p className="whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </TableCell>
                {/* 
                <TableCell>
                  {order.pickupAddress
                    ? `${
                        (
                          order.pickupAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).address
                      }, ${
                        (
                          order.pickupAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).district
                      }, ${
                        (
                          order.pickupAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).region
                      }`
                    : "Address not available"}
                </TableCell> */}
                {/* <TableCell>
                  {order.deliveryAddress
                    ? `${
                        (
                          order.deliveryAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).address
                      }, ${
                        (
                          order.deliveryAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).district
                      }, ${
                        (
                          order.deliveryAddress as {
                            address: string;
                            district: string;
                            region: string;
                          }
                        ).region
                      }`
                    : "Address not available"}
                </TableCell> */}
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                  }).format(order.price)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
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
                          <Link href={`/orders/${order.id}`}>
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
