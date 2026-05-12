import { useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";



import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";

import Header from "./components/sections/Header";
import StepperHeader from "./components/sections/StepperHeader";
import BasicInformation from "./components/sections/BasicInformation";
import AirwayVentilation from "./components/sections/AirwayVentilation";
import CirculationSection from "./components/sections/CirculationSection";
import ObservationTable from "./components/sections/ObservationTable";
import VascularAccess from "./components/sections/VascularAccess";
import DrugAdministration from "./components/sections/DrugAdministration";
import OutcomeResuscitation from "./components/sections/OutcomeResuscitation";
import SignatureSection from "./components/sections/SignatureSection";
import FooterButtons from "./components/sections/FooterButtons";
import ReportFormPreview from "./components/sections/ReportFormPreview";

import initialValues from "./data/initialValues";

import { formSchema } from "./validation/formSchema";
import { submitCardioForm } from "./api/formApi";

function App() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: initialValues,
  });

 const [currentStep, setCurrentStep] = useState(1);

 

  const [page, setPage] = useState('form')

    const sendDataToAPI = async (data) => {
      debugger
    try {
      const response = await fetch("https://crtapp-backend-q4xk.onrender.com/arrest-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      
      if (result.id) {
        setPage('reportShow')
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  //Initially scroll show and each time show scroll container
 const scrollRef = useRef(null);
useEffect(() => {
  const container = scrollRef.current;

  const handleScroll = () => {
    const sections = [
      "basic-info",
      "airway-circulation",
      "vascular-observation",
      "outcome-drug",
      "signature-submit",
    ];

    const scrollTop = container.scrollTop;

    sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);

      if (section) {
        const offsetTop = section.offsetTop;

        // + stepper height offset
        const adjustedTop = offsetTop - 100;

        if (scrollTop >= adjustedTop) {
          setCurrentStep(index + 1);
        }
      }
    });
  };

  container?.addEventListener("scroll", handleScroll);

  return () => {
    container?.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="max-w-[1800px] mx-auto">

   
      {page === 'reportShow' && (
  <ReportFormPreview setPage={setPage} />
)}
      {page == 'form' && (
        <>
      <ToastContainer />
       <div
    ref={scrollRef}
    className="flex-1 overflow-y-auto"
  >

  
   <form
  onSubmit={handleSubmit(
    (data) => {
      console.log("FORM DATA =>", data);

      sendDataToAPI(data);
    },

    (errors) => {
      console.log("VALIDATION ERRORS =>", errors);
    }
  )}
>

        <Header
          register={register}
          errors={errors}
          
        />

      <StepperHeader
  currentStep={currentStep}
  setCurrentStep={setCurrentStep}
  scrollRef={scrollRef}
/>

 <div id="basic-info">
  <BasicInformation
    register={register}
    setValue={setValue}
    watch={watch}
    errors={errors}
  />
</div>      
<div id="airway-circulation">
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
    <AirwayVentilation
      register={register}
      errors={errors}
      watch={watch}
    />

    <CirculationSection
      register={register}
      errors={errors}
      watch={watch}
    />
  </div>
</div>

<div id="vascular-observation">
  <VascularAccess register={register} />

 <ObservationTable
  control={control}
  register={register}
/>
</div>
  
<div id="outcome-drug">
  <OutcomeResuscitation register={register} />

  <DrugAdministration
    register={register}
    control={control}
  />
</div>
<div id="signature-submit">
  <SignatureSection
    register={register}
    control={control}
    setValue={setValue}
    errors={errors}
  />
</div>
  <FooterButtons />
 
      </form>
      </div>
      </>
)}
    </div>
  );
}

export default App;