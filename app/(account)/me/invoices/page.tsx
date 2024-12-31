import React from "react";
import InvoiceDataTable from "./invoices-table";
import { sampleInvoices } from "@/constants";

export default function Page() {
  return (
    <section>
      <InvoiceDataTable data={sampleInvoices} />
    </section>
  );
}
