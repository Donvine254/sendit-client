import { Metadata } from "next";
import React from "react";
import Settings from "./settings";
export const revalidate = 600;
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
// TODO: Debug why refreshing or navigating to /admin/dashboard logs out the user and returns a 500 status from /api/auth/setup in production
export default async function SettingsPage() {
  return (
    <section>
      <main>
        <Settings />
      </main>
    </section>
  );
}
