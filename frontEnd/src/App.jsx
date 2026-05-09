import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";



import "react-toastify/dist/ReactToastify.css";

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
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: initialValues,
  });

 
  const onSubmit = async (data) => {
    // try {
    //   const response =
    //     await submitCardioForm(data);

    //   if (response.success) {
    //     toast.success(
    //       "Form submitted successfully"
    //     );

    //     reset();
    //   }
    // } catch (error) {
    //   toast.error("Submission failed");
    // }
  };

  const [page, setPage] = useState('form')

    const sendDataToAPI = async (data) => {
      debugger
    try {
      const response = await fetch("https://crtapp-backend-q4xk.onrender.com/arrest-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success:", result);
      
      if (result.data.clinic_name) {
        setPage('reportShow')
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };
 


  return (
    <div className="max-w-[1800px] mx-auto p-4">

    
      {page === 'reportShow' && (
  <ReportFormPreview setPage={setPage} />
)}
      {page == 'form' && <>
      <ToastContainer />
      <form >
        <Header
          register={register}
          errors={errors}
          onSubmit={sendDataToAPI}
        />

        <StepperHeader />

        <BasicInformation
          register={register}
          errors={errors}
        />

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
      

  <VascularAccess register={register} />

  <ObservationTable
    register={register}
    observationFields={[{}]}
    appendObservation={[{}]}
    removeObservation={[{}]}
  /> 

        <OutcomeResuscitation
          register={register}
        />

        <DrugAdministration
          register={register}
          control={control}
        />

        <SignatureSection
          register={register}
          control={control}
          errors={errors}
        />

        <FooterButtons />
      </form>
      </>
}
    </div>
  );
}

export default App;