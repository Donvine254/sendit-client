import Features from "@/components/pages/features";
import Heropage from "@/components/pages/hero";
import FAQ from "@/components/pages/hero-faqs";
import Testimonials from "@/components/pages/testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sendit Courier- Welcome ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default function Home() {
  return (
    <section>
      <main>
        <Heropage />
        <Features />
        <FAQ />
        <Testimonials />
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
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
