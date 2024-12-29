import React from "react";
import NotFound from "./notfound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sendit Courier- Page Not Found",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
function page() {
  return (
    <section>
      <NotFound />
    </section>
  );
}

export default page;
