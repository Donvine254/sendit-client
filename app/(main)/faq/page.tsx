import { Metadata } from "next";
import React from "react";
import FAQS from "./faqs";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {};
export const metadata: Metadata = {
  title: "Sendit Courier- Frequently Asked Questions ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default function page({}: Props) {
  return (
    <section className="min-h-screen  bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200">
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat pt-10">
        <div className="bg-black flex flex-col items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-sm text-center">
            Can&apos;t find the answer you&apos;re looking for? We&apos;ve
            shared some of our most frequently asked questions to help you out.
          </p>
        </div>
      </div>
      <main className="max-w-5xl mx-auto p-2 md:p-6">
        <FAQS />
        <div className="md:mt-10  bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat p-3 md:p-6 rounded-md text-white">
          <h2 className="text-2xl font-semibold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mb-4 text-gray-200 xsm:text-sm ">
            If you couldn&apos;t find the answer to your question, please
            don&apos;t not hesitate to contact our customer support team.
            We&apos;re here to help!
          </p>
          <Button variant="secondary" asChild>
            <Link
              href="info@senditcourier.com"
              className="flex justify-start gap-2">
              <MailIcon /> Contact Support
            </Link>
          </Button>
        </div>
      </main>
    </section>
  );
}
