import { Metadata } from "next";
import React from "react";
import Settings from "./settings";
export const revalidate = 600;
export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};

export default function page() {
  // settings page
  // TODO: ADD cards with integrations
  // https://dribbble.com/shots/24701945-Integration-settings-Untitled-UI
  // Prisma, Vercel, Stripe, Supabase
  // Appearance customization: Theme
  //https://cdn.dribbble.com/userupload/13745153/file/original-8b258e428a1e395a795770add0c11614.jpg?resize=1504x1128&vertical=center
  //update pricing
  // Language and Region - https://dribbble.com/shots/25074842-TikTik-Settings-Page-Dashboard
  return (
    <section>
      <Settings />
    </section>
  );
}