"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    title: "How do I place an order?",
    content:
      "To place an order, simply visit our deliveries page and complete all the required steps. Follow the prompts to provide your pickup and delivery information, and confirm your order.",
  },
  {
    title: "What can I send?",
    content:
      "You can send any item that is not on our prohibited list. Prohibited items include aerosols and gas, flammable items, cash notes and coins, counterfeit products, illegal products such as drugs, fragile items such as glass and expensive items such as jewelry, pure gold and diamond.",
  },
  {
    title: "What time does pickup take place?",
    content:
      "Our riders collect parcels from pickup locations between 7AM and 6PM. Orders collected past 12PM will be delivered the next day.",
  },
  {
    title: "How do I weight my parcel?",
    content:
      "While placing an order, you will be prompted to provide the weight of your parcel. Weigh your parcel once it is packaged and sealed. If possible, use digital scales for accuracy. Our riders will also weight your parcel on pickup to confirm the accuracy of the weight provided during the order.",
  },
  {
    title: "What is Sendit's delivery coverage area?",
    content:
      "We offer a nationwide delivery coverage within Kenya. We're continuously expanding our reach to serve you better.",
  },
  {
    title: "What are Sendit's delivery time frames?",
    content:
      "Our delivery times may vary depending on your location. Orders within Nairobi are eligible for same day delivery as long as the order is placed before 12PM. All orders made past 12PM will be delivered the next day.",
  },
  {
    title: "How do I Pay for my Order?",
    content:
      "Sendit allows you to pay once your parcel has been delivered. You can pay through cash, our Lipa na Mpesa Till Number or through a Bank Transfer.",
  },
  {
    title: "Does Sendit Offer Shipment Insurance?",
    content:
      "We handle every shipment with great care but accidents outside of our control can happen. During the order process, you will be prompted to provide an estimated value of your parcel for insurance purposes. Kindly provide the most accurate information. Note that damages resulting from poor packaging, sending prohibited goods, and natural disasters such as storms, flooding, lightning strike, and earthquakes are not reimbursed.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-gradient-to-tr from-blue-100 via-gray-100 to-blue-100 p-2 md:p-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center my-2">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 text-start">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-start">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent>{faq.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
