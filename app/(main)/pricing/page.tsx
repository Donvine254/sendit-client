import { pricingPlans } from "@/constants";
import React from "react";
import { CircleCheck } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Sendit Courier- Pricing Information",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default function Pricing() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]">
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat pt-10">
        <div className="bg-black flex flex-col items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Pricing Information
          </h1>
          <p className="text-muted-foreground max-w-sm text-center">
            Our rates vary based on weight, value of goods, perishability, and
            delivery location. Choose the plan that best fits your delivery
            needs.
          </p>
        </div>
      </div>
      <div className="mt-2 grid gap-8 lg:grid-cols-3 lg:gap-6 p-4 md:p-6 lg:py-12">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg border text-gray-900 p-6 relative ${
              plan.isPopular
                ? "ring-2 ring-[#D4AF37] bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat text-white scale-105"
                : "bg-white"
            }`}>
            {plan.isPopular && (
              <span className="absolute top-0 -translate-y-1/2 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold ">{plan.title}</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold ">
                  KSH {plan.price}
                </span>
                <span
                  className={`${
                    plan.isPopular ? "text-gray-200" : "text-muted-foreground"
                  }"ml-1"`}>
                  / delivery
                </span>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CircleCheck
                    className={`${
                      plan.isPopular ? "" : " text-blue-600 "
                    }h-5 w-5 shrink-0 mt-0.5`}
                  />
                  <span
                    className={`${
                      plan.isPopular ? "text-gray-200" : "text-muted-foreground"
                    } ml-3`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="secondary"
              className={`mt-8 w-full  text-sm font-semibold ${
                plan.isPopular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              } transition-colors duration-200`}>
              <Link href="/deliveries">Send Parcel</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
