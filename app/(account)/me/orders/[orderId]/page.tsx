import { redirect } from "next/navigation";
import Orderform from "./order-form";
import StatusBadge from "@/components/ui/status-badge";
import Progress from "./order-progress";
import { getOrderData } from "@/lib/actions";

export const dynamic = "force-dynamic";
export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrderData(orderId);

  if (!order) {
    redirect("/me/orders");
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 my-2 inline-flex items-center gap-1">
        Order Information <StatusBadge status={order.status as string} />
      </h2>
      {order.status !== "CANCELLED" && (
        <Progress
          status={order.status}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt || order.createdAt}
        />
      )}
      <Orderform order={order} />
    </section>
  );
}
