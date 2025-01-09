import { Metadata } from "next";
import React from "react";
import InvoiceDataTable from "./invoices-data-table";
import { getInvoices } from "../../actions";
export const revalidate = 600;
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default async function Page() {
  const invoices = await getInvoices();
  return (
    <div>
      <InvoiceDataTable data={invoices} />
    </div>
  );
}
