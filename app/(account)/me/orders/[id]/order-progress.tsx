import { CircleCheck, Clock, Truck } from "lucide-react";
import React from "react";

const steps = [
  { title: "Placed", status: "PENDING", icon: Clock },
  { title: "Shipped", status: "IN_TRANSIT", icon: Truck },
  { title: "Delivered", status: "DELIVERED", icon: CircleCheck },
];

export default function Progress({ status }: { status: string }) {
  const currentStep = steps.findIndex((step) => step.status === status);
  return (
    <nav
      aria-label="Progress "
      className="bg-white rounded-md p-8 mb-4 border-l-4 border-l-blue-500">
      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
        Order Progress
      </h3>
      <ol className="flex items-center justify-between relative w-full mb-4 ">
        {/* Line behind circles */}
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
        <div
          className="absolute top-1/2 h-0.5 bg-blue-500 z-0"
          style={{
            width: `${(100 / (steps.length - 1)) * currentStep}%`,
          }}></div>
        {steps.map((step, index) => (
          <li
            key={step.title || `step-${index}`}
            className="relative z-10"
            title={step.title}>
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                index <= currentStep
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-500 border-gray-300"
              } border-2`}>
              <step.icon className="h-6 w-6" />
            </div>
            <small className="absolute font-medium">{step.title}</small>
          </li>
        ))}
      </ol>
    </nav>
  );
}
