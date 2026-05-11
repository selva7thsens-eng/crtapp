
import { useEffect } from "react";

const StepperHeader = ({ currentStep, setCurrentStep , scrollRef }) => {

const steps = [
  {
    id: "basic-info",
    label: "Basic Information",
  },
  {
    id: "airway-circulation",
    label: "Airway & Circulation",
  },
  {
    id: "vascular-observation",
    label: "Vascular Access & Observation",
  },
  {
    id: "outcome-drug",
    label: "Outcome & Drug Record",
  },
  {
    id: "signature-submit",
    label: "Signatures & Submit",
  },
];

 // 🔥 PUT HERE (INSIDE COMPONENT)
  useEffect(() => {
  const handleScroll = () => {
    let activeStep = 1;

    steps.forEach((step, index) => {
      const section = document.getElementById(step.id);

      if (section) {
        const rect = section.getBoundingClientRect();

        const windowHeight = window.innerHeight;

        // 🔥 50% visibility rule
        const visibleTop = rect.top;
        const visibleBottom = rect.bottom;

        if (
          visibleTop <= windowHeight * 0.25 &&
          visibleBottom >= windowHeight * 0.25
        ) {
          activeStep = index + 1;
        }
      }
    });

    // 🔥 FORCE LAST STEP when reached bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      activeStep = steps.length;
    }

    setCurrentStep(activeStep);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  const scrollToSection = (id, index) => {
  const section = document.getElementById(id);

  if (section) {
    const offset = 80; // stepper height

    const top =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
    setCurrentStep(index + 1);
  }
};


  return (
    <div className="bg-[#e9e9eb] sticky top-0 z-50  rounded-2xl grid grid-col-5 p-2">
      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <button
            type="button"
            key={step.id}
            onClick={() => scrollToSection(step.id, index)}
            className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 border text-sm font-semibold
              
              ${
                currentStep === index + 1
                  ? "bg-blue-900 text-white border-blue-900 shadow-lg"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                ${
                  currentStep === index + 1
                    ? "bg-white text-blue-900"
                    : "bg-gray-300 text-gray-700"
                }
              `}
            >
              {index + 1}
            </span>

            {step.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepperHeader;