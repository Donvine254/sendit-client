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
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
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
