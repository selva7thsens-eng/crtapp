const steps = [
  "Basic Information",
  "Airway & Circulation",
  "Vascular Access & Observation",
  "Outcome & Drug Record",
  "Signatures & Submit"
];

const StepperHeader = ({ currentStep = 1 }) => {
  return (
    <div className="rounded-b-lg shadow px-2 py-2">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 flex items-center justify-center py-2 mx-1 rounded-md text-sm font-medium
              ${
                currentStep === index + 1
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 font-bold
                ${
                  currentStep === index + 1
                    ? "bg-white text-blue-900"
                    : "bg-gray-400 text-white"
                }`}
            >
              {index + 1}
            </span>

            {step}
          </div>
        ))}

      </div>

    </div>
  );
};

export default StepperHeader; 