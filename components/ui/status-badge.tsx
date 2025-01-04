import { CheckCircle, Truck, AlarmClockPlus, XCircle } from "lucide-react";
import { Badge } from "./badge";

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
      icon = <AlarmClockPlus className="mr-2 h-3 w-3" />;
      variant = "default";
      text = "Pending";
      break;
    case "IN_TRANSIT":
      icon = <Truck className="mr-2 h-3 w-3" />;
      variant = "secondary";
      text = "In Transit";
      break;
    case "DELIVERED":
      icon = <CheckCircle className="mr-2 h-3 w-3" />;
      variant = "success";
      text = "Delivered";
      break;
    case "CANCELLED":
      icon = <XCircle className="mr-2 h-3 w-3" />;
      variant = "destructive";
      text = "Cancelled";
      break;
  }

  return (
    <Badge
      variant={variant as Variants}
      className="justify-start font-normal whitespace-nowrap">
      {icon}
      {text}
    </Badge>
  );
};

export default StatusBadge;
