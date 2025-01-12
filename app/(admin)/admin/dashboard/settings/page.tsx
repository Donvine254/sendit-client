import { Metadata } from "next";
import React from "react";
import Settings from "./settings";
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default async function SettingsPage() {
  return (
    <section>
      <main>
        <Settings />
      </main>
    </section>
  );
}
