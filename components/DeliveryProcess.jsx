import React from "react";
import Link from "next/link";
import {PiArrowFatRightLight} from "react-icons/pi"
export default function DeliveryProcess() {
  return (
    <div className="mx-5">
        <h1 className="font-bold text-2xl md:text-3xl text-center my-2">How Delivery Works</h1>
    <div className="home-card-container">
      <DeliveryStep
        stepNumber="1"
        title="Place your order."
        description="Make a delivery request order through our effortless web application."
      />

      <DeliveryStep
        stepNumber="2"
        title="Goods picked."
        description="Our riders will pick and deliver your goods. We use the most suitable vehicle sizes for your load."
      />

      <DeliveryStep
        stepNumber="3"
        title="Order Delivered."
        description="Our riders will timely deliver your goods to the delivery location. You will get notified when the delivery is completed."
      />

      <DeliveryStep
        stepNumber="4"
        title="Payment."
        description="We allow you the flexibility of paying only when your goods have been delivered and are in good condition."
      />
    </div>
    </div>
  );
}

const DeliveryStep = ({ stepNumber, title, description }) => (
  <div className=" card border h-fit md:h-[300px] relative m-2 delivery-card" >
    <div className="card-body">
    <h2 className="mb-2 text-6xl font-bold number font-mono">{stepNumber}</h2>
    <h4 className="mb-2 text-3xl">{title}</h4>
    <p className="font-normal text-gray-700 ">
      {description}
    </p>
    <Link href="/deliveries"><PiArrowFatRightLight className="absolute bottom-5 text-primary right-5 w-[32px] h-[32px] hover:scale-125 ease-in-out group-hover:text-inherit"/></Link>
    
    </div>
  </div>
);

