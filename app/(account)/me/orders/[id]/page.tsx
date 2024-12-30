import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Orderform from "./order-form";
import StatusBadge from "@/components/ui/status-badge";
import Progress from "./order-progress";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export const dynamic = "force-dynamic";
export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  if (!id) {
    redirect("/me/orders");
  }
  const order = await prisma.parcel.findUnique({
    where: { id: id },
  });
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
