import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/lib/actions";
import DataTable from "./orders";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Orders",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  if (!user) {
    return redirect(`/api/auth/login`);
  }
  const orders = await getUserOrders(user.id);

  return (
    <section>
      <DataTable data={orders} />
    </section>
  );
}
