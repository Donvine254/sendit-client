import { Metadata } from "next";
import React from "react";
import { getOrders } from "../../actions";
import ParcelDataTable from "./data-table";
export const revalidate = 600;
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default async function Page() {
  const orders = await getOrders();
  return (
    <div>
      <ParcelDataTable data={orders} />
    </div>
  );
}
