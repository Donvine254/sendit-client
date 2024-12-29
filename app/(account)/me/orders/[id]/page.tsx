import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Orderform from "./order-form";
type Props = {
  params: {
    id: string;
  };
};

export default async function OrderPage({ params }: Props) {
  const order = await prisma.parcel.findUnique({
    where: { id: params.id },
  });
  if (!order) {
    redirect("/me/orders");
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 inline-flex items-center gap-1">
        Order Information
      </h2>
      <Orderform order={order} />
    </section>
  );
}
