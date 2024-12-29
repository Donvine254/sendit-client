"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/constants";


export default function FAQS() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:bg-gray-100 p-6 sm:rounded-lg sm:shadow-md">
      {Object.entries(faqData).map(([category, questions]) => (
        <div key={category} className="">
          <h2 className="text-2xl font-semibold mb-2">{category} FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {questions.map((faq, index) => (
              <AccordionItem key={index} value={`${category}-item-${index}`}>
                <AccordionTrigger className="text-start">
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent>{faq.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
