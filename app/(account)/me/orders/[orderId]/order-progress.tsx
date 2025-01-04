import { PackageCheck, Check, MapPinCheckInside } from "lucide-react";
import React from "react";

export default function Progress({
  status,
  createdAt,
  updatedAt,
}: {
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  const steps = [
    {
      title: `Placed ${new Date(createdAt).toLocaleDateString()}`,
      status: "PENDING",
      icon: PackageCheck,
    },
    { title: "Shipped", status: "IN_TRANSIT", icon: MapPinCheckInside },
    {
      title: `Delivered ${new Date(updatedAt).toLocaleDateString()}`,
      status: "DELIVERED",
      icon: Check,
    },
  ];

  const currentStep = steps.findIndex((step) => step.status === status);
  return (
    <nav
      aria-label="Progress "
      className="bg-white rounded-md border shadow p-8 mb-4 border-l-4 border-l-blue-500">
      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
        Order Progress
      </h3>
      <ol className="flex items-center justify-between relative w-full mb-4 ">
        {/* Line behind circles */}
        <div className="absolute top-1/2 w-full h-1 bg-gray-400 z-0"></div>
        <div
          className="absolute top-1/2 h-1 bg-green-600 z-0"
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
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-400 border-gray-400"
              } border-2`}>
              <step.icon className="h-6 w-6" />
            </div>
            <small className="absolute font-medium xsm:text-xs">
              {step.title}
            </small>
          </li>
        ))}
      </ol>
    </nav>
  );
}
