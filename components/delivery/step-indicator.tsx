import React from "react";

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <nav aria-label="Progress">
      {/* show this in small devices */}
      <ol className="flex items-center justify-between relative w-full md:hidden">
        {/* Line behind circles */}
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
        <div
          className="absolute top-1/2 h-0.5 bg-blue-500 z-0"
          style={{
            width: `${(100 / (steps.length - 1)) * currentStep}%`,
          }}></div>
        {steps.map((step, index) => (
          <li key={step.title || `step-${index}`} className="relative z-10">
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                index <= currentStep
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-500 border-gray-300"
              } border-2`}>
              {index + 1}
            </div>
          </li>
        ))}
      </ol>
      {/* show this in  md devices */}
      <ol role="list" className="hidden md:flex space-y-0 space-x-8">
        {steps.map((step, index) => (
          <li key={step.title} className="md:flex-1">
            <div
              className={`group pl-4 py-2 flex flex-col border-l-4 ${
                index < currentStep
                  ? "border-blue-600"
                  : index === currentStep
                  ? "border-blue-600"
                  : "border-gray-200"
              } md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}>
              <span
                className={`text-sm font-medium ${
                  index < currentStep
                    ? "text-blue-600"
                    : index === currentStep
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}>
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">{step.title}</span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
