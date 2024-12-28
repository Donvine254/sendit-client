import { ArrowRight, Star } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Heropage() {
  return (
    <section className="bg-green-500">
      <div className="bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff] relative min-h-screen  overflow-hidden ">
        <div
          className="absolute inset-0 bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1735326614/illustrations/cstnqioumwvu8iinrq0r.webp')] bg-no-repeat bg-right bg-contain md:block hidden w-full"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            <h1 className="text-6xl font-extrabold md:font-bold tracking-tight md:text-gray-900  md:text-7xl lg:mt-4 text-center sm:text-start xsm:my-8 xsm:tracking-normal">
              Fast & Reliable{" "}
              <span className="text-blue-400 block leading-tight">
                Courier Services
              </span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl md:max-w-sm lg:max-w-max">
              Send your parcels with confidence. We pick up from your location
              and deliver to any destination. Quick, secure, and hassle-free
              shipping solutions for all your needs.
            </p>
            <div className="mt-8 flex gap-4 items-center xsm:justify-between  ">
              <Link href="/deliveries" passHref>
                <Button
                  variant="default"
                  className="justify-between gap-2 bg-blue-500 text-white">
                  Send Parcel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button className="bg-transparent border-2 text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <div className="flex mt-4 ">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-3xl font-bold">
                2k+ <span className="text-muted-foreground">Good Reviews</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
