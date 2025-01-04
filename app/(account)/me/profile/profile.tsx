import {
  MoreHorizontal,
  Eye,
  CalendarClock,
  CalendarX,
  CalendarCheck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { sessionUser } from "@/types";
import Link from "next/link";
import Image from "next/image";
import StatusBadge from "@/components/ui/status-badge";
import CancelButton from "@/components/ui/cancel-button";

type Props = {
  user: sessionUser;
  recentOrders: any | [];
  orderStats: {
    total_orders: number;
    cancelled_orders: number;
    pending_orders: number;
  } | null;
};

export default function ProfilePage({ recentOrders, orderStats }: Props) {
  const stats = [
    {
      title: "Upcoming Orders",
      value: orderStats?.pending_orders,
      icon: CalendarClock,
    },
    {
      title: "Cancelled Orders",
      value: orderStats?.cancelled_orders,
      icon: CalendarX,
    },
    {
      title: "Total Orders",
      value: orderStats?.total_orders,
      icon: CalendarCheck,
    },
  ];
  return (
    <section className="">
      <div className="container mx-auto flex-grow">
        <div className="w-full grid xsm:grid-cols-1 grid-cols-3 py-4 gap-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start flex-col space-y-3  mb-2 p-4">
                <stat.icon className="h-12 w-12 text-blue-500" />
                <h3 className="text-3xl lg:text-5xl font-bold ">
                  {String(stat.value).padStart(2, "0")}
                </h3>
                <span className="text-base text-gray-500">{stat.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 inline-flex items-center gap-1">
            {" "}
            <Package />
            Recent Orders
          </h2>
          {recentOrders && recentOrders.length > 0 ? (
            <Table className="table-auto overflow-x-auto">
              <TableHeader className="bg-blue-500 text-white">
                <TableRow>
                  <TableHead className="text-white">#</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Origin</TableHead>
                  <TableHead className="text-white">Destination</TableHead>
                  <TableHead className="text-white">Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders && recentOrders.length > 0
                  ? recentOrders.map((order: any, index: number) => (
                      <TableRow
                        key={order.id}
                        className={`${
                          order.status === "CANCELLED"
                            ? "bg-red-100 bg-opacity-50"
                            : ""
                        } `}>
                        <TableCell>
                          <Badge variant="outline">
                            {String(index + 1).padStart(3, "0")}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">
                          {order.description}
                        </TableCell>
                        <TableCell>
                          <p className="whitespace-nowrap">
                            {" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          {order?.pickupAddress?.region},{" "}
                          {order?.pickupAddress?.district}{" "}
                        </TableCell>
                        <TableCell>
                          {order?.deliveryAddress?.region},{" "}
                          {order?.deliveryAddress?.district}{" "}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KSH",
                          }).format(order.price)}
                        </TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40 space-y-2">
                              <Button
                                variant="ghost"
                                asChild
                                className="w-full justify-start">
                                <Link href={`/me/orders/${order.id}`}>
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </Link>
                              </Button>
                              {order.status === "PENDING" && (
                                <CancelButton orderId={order.id} />
                              )}
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center flex-col justify-center">
              <h2 className="text-muted-foreground my-2 font-semibold">
                You have no recent orders
              </h2>
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1736014893/illustrations/lo295srnzibudj3pyzj8.png"
                alt="illustration"
                width={250}
                height={250}
                className=""
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
