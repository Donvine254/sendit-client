import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { getUserOrders } from "@/lib/actions";
import DataTable from "./orders-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Orders",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  let orders;
  const user = (await getUser()) as sessionUser;
  if (user) {
    orders = await getUserOrders(user?.id);
  }

  return (
    <section className="dark:bg-gray-100 transition-colors duration-300">
      <DataTable data={orders} />
    </section>
  );
}
