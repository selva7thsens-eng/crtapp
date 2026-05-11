import React from "react";

const Header = ({ register }) => {

  const inputStyle =
    "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">

      {/* Header */}
      <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl">❤</span>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              CARDIOPULMONARY ARREST FORM
            </h1>

            <p className="text-sm opacity-90">
              Cardiac Emergency Response Documentation
            </p>
          </div>
        </div>

        <div className="bg-blue-800 px-5 py-2 rounded-md font-semibold shadow-sm">
          F-SDC-008
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-5 px-4 py-4 bg-gray-50">

        {/* Patient Name */}
        <div className="flex items-center gap-4">
          <label className="whitespace-nowrap text-sm font-semibold text-gray-700">
            Patient Name *
          </label>

          <input
            {...register("headerInformation.patientName")}
            className={`${inputStyle} flex-1`}
            placeholder="Enter patient name"
          />
        </div>

        {/* NRIC */}
        <div className="flex items-center gap-4">
          <label className="whitespace-nowrap text-sm font-semibold text-gray-700">
            NRIC
          </label>

          <input
            {...register("headerInformation.nric")}
            className={`${inputStyle} flex-1`}
            placeholder="Enter NRIC"
          />
        </div>

        {/* Clinic Name */}
        <div className="flex items-center gap-4">
          <label className="whitespace-nowrap text-sm font-semibold text-gray-700">
            Clinic Name
          </label>

          <input
            {...register("headerInformation.clinicName")}
            className={`${inputStyle} flex-1`}
            placeholder="Enter clinic name"
          />
        </div>

      </div>
    </div>
  );
};

export default Header;