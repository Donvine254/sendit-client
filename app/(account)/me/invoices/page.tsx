import React from "react";
import InvoiceDataTable from "./invoices-table";
import { Metadata } from "next";
import { getUserInvoices } from "@/lib/actions";
import { Invoice } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Invoices",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  let invoices;
  const user = (await getUser()) as sessionUser;
  if (user) {
    invoices = (await getUserInvoices(user.id)) as Invoice[];
  }
  return (
    <section>
      <InvoiceDataTable data={invoices as Invoice[]} />
    </section>
  );
}
