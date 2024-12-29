"use client";
import {
  MoreHorizontal,
  Eye,
  CalendarClock,
  CalendarX,
  CalendarCheck,
  CheckCircle,
  Truck,
  AlarmClockPlus,
  XCircle,
  Package,
  X,
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
                  0{stat.value}
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
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders && recentOrders.length > 0
                  ? recentOrders.map((order: any, index: number) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Badge variant="outline">{index + 1}</Badge>
                        </TableCell>
                        <TableCell className="capitalize">
                          {order.description}
                        </TableCell>
                        <TableCell>
                          {order.createdAt.toLocaleDateString()}
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
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                  <X className="h-4 w-4" />
                                  Cancel order
                                </Button>
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
                src="https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1735480973/illustrations/kcptm5kpjghhthitqemj.avif"
                alt="illustration"
                width={400}
                height={500}
                className=""
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type Variants =
  | "secondary"
  | "default"
  | "outline"
  | "success"
  | "destructive"
  | null
  | undefined;
const StatusBadge = ({ status }: { status: string }) => {
  let icon;
  let variant;
  let text;

  switch (status) {
    case "PENDING":
      icon = <AlarmClockPlus className="mr-2 h-4 w-4" />;
      variant = "default";
      text = "Pending";
      break;
    case "IN_TRANSIT":
      icon = <Truck className="mr-2 h-4 w-4" />;
      variant = "secondary";
      text = "In Transit";
      break;
    case "DELIVERED":
      icon = <CheckCircle className="mr-2 h-4 w-4" />;
      variant = "success";
      text = "Delivered";
      break;
    case "CANCELLED":
      icon = <XCircle className="mr-2 h-4 w-4" />;
      variant = "destructive";
      text = "Cancelled";
      break;
  }

  return (
    <Badge variant={variant as Variants} className="justify-start font-normal">
      {icon}
      {text}
    </Badge>
  );
};
