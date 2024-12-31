import React from "react";
import InvoiceDataTable from "./invoices-table";
import { sampleInvoices } from "@/constants";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sendit Courier- My Account | Invoices",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default function Page() {
  return (
    <section>
      <InvoiceDataTable data={sampleInvoices} />
    </section>
  );
}
