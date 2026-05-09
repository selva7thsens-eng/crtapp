import { useState } from "react";

const Header = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    nric: "",
    clinic_name: "",
  });

  const inputStyle =
    "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Send data to App.jsx
  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden mb-4">

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

      {/* Form */}
      <div className="grid grid-cols-3 gap-5 px-4 py-4 bg-gray-50">

        {/* Patient Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Patient Name *
          </label>

          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Enter patient name"
          />
        </div>

        {/* NRIC */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            NRIC
          </label>

          <input
            type="text"
            name="nric"
            value={formData.nric}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Enter NRIC"
          />
        </div>

        {/* Clinic Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Clinic Name
          </label>

          <input
            type="text"
            name="clinic_name"
            value={formData.clinic_name}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Enter clinic name"
          />
        </div>
      </div>

      {/* Button */}
      <div className="p-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-5 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Header;