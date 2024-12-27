import { Metadata } from "next";
import DeliveryForm from "./delivery-form";

export const metadata: Metadata = {
  title: "Sendit Courier- Welcome ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default async function Page() {
  return (
    <section className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-[url('/delivery.webp')] bg-cover bg-center bg-no-repeat pt-10">
        <div className="bg-black flex items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Schedule a Delivery
          </h1>
        </div>
      </div>
      <main>
        <DeliveryForm />
      </main>
    </section>
  );
}
