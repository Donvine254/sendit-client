"use client";
import Image from "next/image";
import {
  MoreHorizontal,
  Eye,
  CalendarClock,
  CalendarX,
  CalendarCheck,
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

const userDetails = {
  name: "John Doe",
  email: "john.doe@example.com",
  dateJoined: new Date("2023-01-01"),
  lastSignIn: new Date("2023-06-15"),
};

const orderStats = [
  { title: "Upcoming Orders", value: 3, icon: CalendarClock },
  { title: "Cancelled Orders", value: 1, icon: CalendarX },
  { title: "Total Orders", value: 25, icon: CalendarCheck },
];

const recentOrders = [
  {
    id: "001",
    date: new Date("2023-06-10"),
    status: "Delivered",
    origin: "Nairobi",
    destination: "Mombasa",
  },
  {
    id: "002",
    date: new Date("2023-06-12"),
    status: "In Transit",
    origin: "Kisumu",
    destination: "Eldoret",
  },
  {
    id: "003",
    date: new Date("2023-06-14"),
    status: "Pending",
    origin: "Nakuru",
    destination: "Nairobi",
  },
  {
    id: "004",
    date: new Date("2023-06-16"),
    status: "Delivered",
    origin: "Mombasa",
    destination: "Malindi",
  },
  {
    id: "005",
    date: new Date("2023-06-18"),
    status: "Cancelled",
    origin: "Nairobi",
    destination: "Thika",
  },
];

export default function ProfilePage() {
  return (
    <section className="bg-stone-100">
      <div className="container mx-auto flex-grow">
        <div className="w-full grid xsm:grid-cols-1 grid-cols-3 py-4 gap-5">
          {orderStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start flex-col space-y-3  mb-2 p-4">
                <stat.icon className="h-12 w-12 text-green-500" />
                <h3 className="text-3xl lg:text-5xl font-bold ">
                  {stat.value}
                </h3>
                <span className="text-base text-gray-500">{stat.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date.toLocaleDateString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.origin}</TableCell>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
