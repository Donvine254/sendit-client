import React from "react";
import ContactCards from "./contact-card";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        <div className="container max-w-5xl mx-auto pb-2 ">
          <ContactCards />
        </div>
      </main>
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to ship?</span>
            <span className="block text-blue-200 tracking-tight">
              Send your parcels today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/deliveries" passHref>
                <Button
                  variant="default"
                  className="justify-between gap-2 bg-blue-400 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 animate-move-arrow" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
