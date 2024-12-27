import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sendit Courier- Welcome ",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
export default async function Page() {
  return (
    <section className="min-h-screen bg-[#F8F9FA]">
      <p>Make your deliveries today!</p>
    </section>
  );
}
