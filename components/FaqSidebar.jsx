'use client'
import { useState } from "react";
import FaqQuestion  from "./FaqQuestion"
import { faqData } from "@/constants";
export default function FaqSideBar() {
    const [activeTab, setActiveTab] = useState("All");
  
    const openTopic = (TopicName) => {
      setActiveTab(TopicName);
    };
  
    return (
      <section className="md:flex md:gap-2 lg:gap-5">
        {/* Parent div for tab*/}
        <div id="tab" className="p-2">
          <ul className="md:float-left w-full md:w-fit  md:h-full flex justify-between items-start md:block  md:min-w-[150px] lg:min-w-[250px] md:mr-2 pb-2 text-xl md:bg-base-200 md:mt-2">
            <li className="border-b-2 border-dotted md:py-2 md:hover:btn-primary ">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "All" ? "text-primary font-bold md:hover:text-white " : ""
                }`}
                onClick={() => openTopic("All")}>
                All
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2 md:hover:btn-primary">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Order" ? "text-primary font-bold md:hover:text-white" : ""
                }`}
                onClick={() => openTopic("Order")}>
                Order
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2 md:hover:btn-primary">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Delivery" ? "text-primary font-bold md:hover:text-white" : ""
                }`}
                onClick={() => openTopic("Delivery")}>
                Delivery
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2 md:hover:btn-primary">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Payments" ? "text-primary font-bold md:hover:text-white" : ""
                }`}
                onClick={() => openTopic("Payments")}>
                Payments
              </p>
            </li>
          </ul>
        </div>
        {/* Parent div for faq questions */}
        <div id="FAQ" className="flex-1 md:w[70%]">
        {Object.keys(faqData).map((category) => (
          <div
            key={category}
            id={category}
            className={`md:float-left py-2 bg-base-100 w-full h-fit ${
              activeTab === category || activeTab === "All" ? "block active w-full" : "hidden"
            }`}
          >
            {faqData[category].map((faq, index) => (
              <div key={index}>
                <FaqQuestion title={faq.title} content={faq.content} />
                {index < faqData[category].length && <hr />}
              </div>
            ))}
          </div>
        ))}
      </div>
      </section>
    );
  }

