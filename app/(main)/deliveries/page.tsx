import { Metadata } from "next";
import DeliveryForm from "./delivery-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sessionUser } from "@/types";
import Script from "next/script";
import { getShippingAddress } from "@/lib/actions";
import { shippingAddress } from "@prisma/client";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sendit Courier- Welcome ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export const dynamic = "force-dynamic";
export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as sessionUser;
  const address = (await getShippingAddress(user.id)) as shippingAddress;
  return (
    <section className="min-h-screen bg-[#F8F9FA]">
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat pt-10">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2   text-white md:py-4 ">
            Schedule a Delivery
          </h1>
        </div>
      </div>
      <main>
        {!address && (
          <div
            role="alert"
            className="relative w-full border p-4  bg-blue-50 border-blue-400 text-blue-700">
            <h5 className="font-medium leading-none tracking-tight xsm:text-xs text-center ">
              ✨ We recommend updating your{" "}
              <Link href="/me/settings" className="underline" title="settings">
                primary shipping address
              </Link>{" "}
              to make future orders faster and easier!{" "}
            </h5>
          </div>
        )}
        <DeliveryForm user={user} address={address} />
      </main>
    </section>
  );
}
