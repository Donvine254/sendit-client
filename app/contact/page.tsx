import React from "react";
import ContactCards from "./contact-card";
import { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
  title: "Sendit Courier- Contact Us",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default function Contact({}: Props) {
  return (
    <section className="min-h-screen bg-grid-gray-100">
      <main className="bg-[#f2f2f2] bg-opacity-70">
        <div className="mt-20 py-8 ">
          <div className="flex items-center flex-col justify-center  ">
            <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-blue-600 md:py-4">
              Contact Our Friendly Team
            </h1>
            <p className="text-lg font-extralight  mb-2">
              Let us know how we can help.
            </p>
          </div>
        </div>
        <div className="container max-w-5xl mx-auto pb-8 ">
          <ContactCards />
        </div>
      </main>
    </section>
  );
}
