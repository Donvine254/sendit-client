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

const orderStats = [
  { title: "Upcoming Orders", value: 3, icon: CalendarClock },
  { title: "Cancelled Orders", value: 1, icon: CalendarX },
  { title: "Total Orders", value: 25, icon: CalendarCheck },
];
type Props = {
  user: sessionUser;
  recentOrders: any | [];
};

export default function ProfilePage({ user, recentOrders }: Props) {
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
              {recentOrders && recentOrders.length > 0
                ? recentOrders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Badge variant="outline">#{order.id}</Badge>
                      </TableCell>
                      <TableCell>
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>{order?.pickupAddress?.region}</TableCell>
                      <TableCell>{order?.deliveryAddress?.region}</TableCell>
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
                  ))
                : null}
            </TableBody>
          </Table>
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
      variant = "secondary";
      text = "Pending";
      break;
    case "IN_TRANSIT":
      icon = <Truck className="mr-2 h-4 w-4" />;
      variant = "default";
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
    <Badge variant={variant as Variants} className="justify-start">
      {icon}
      {text}
    </Badge>
  );
};
