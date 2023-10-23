'use client'
import FaqQuestion  from "./FaqQuestion"
import { faqData } from "@/constants";
export default function FaqSideBar() {
    const [activeTab, setActiveTab] = useState("All");
  
    const openTopic = (TopicName) => {
      setActiveTab(TopicName);
    };
  
    return (
      <section className="md:flex gap-10">
        {/* Parent div for tab*/}
        <div id="tab">
          <ul className="md:float-left w-full md-min-w[30%] md:w-fit  md:h-full flex justify-between items-start md:block  md:min-w-[150px] md:mr-2 py-2 text-xl md:bg-base-200">
            <li className="border-b-2 border-dotted md:py-2">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "All" ? "font-bold" : ""
                }`}
                onClick={() => openTopic("All")}>
                All
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Order" ? "font-bold" : ""
                }`}
                onClick={() => openTopic("Order")}>
                Order
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Delivery" ? "font-bold" : ""
                }`}
                onClick={() => openTopic("Delivery")}>
                Delivery
              </p>
            </li>
            <li className="border-b-2 border-dotted md:py-2">
              <p
                className={`md:w-32 text-start pl-3 ${
                  activeTab === "Payments" ? "font-bold" : ""
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
                {index < faqData[category].length - 1 && <hr />}
              </div>
            ))}
          </div>
        ))}
      </div>
      </section>
    );
  }
