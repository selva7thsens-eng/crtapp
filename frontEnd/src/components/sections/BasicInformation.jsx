import { useState, useEffect, useRef } from "react";

const BasicInformation = ({
  control,
  register,
  errors,
  setValue,
  watch,
}) => {

  const inputStyle =
    "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  const locations = [
    "Chennai",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Coimbatore",
    "Madurai",
    "Singapore",
    "Kuala Lumpur",
    "Johor Bahru",
    "Penang",
    "Ipoh",
  ];

  const [open, setOpen] = useState(false);

  const selected = watch("basicInformation.location");

  const [is24Hour, setIs24Hour] = useState(true);

  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setValue("basicInformation.location", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTimeProps = () => ({
    type: "time",
    step: "60",
  });

  return (
    <div className="p-4 bg-white shadow-sm rounded-lg border mb-4 border-blue-200">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-blue-800">
          BASIC INFORMATION
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">12H</span>

          <button
            type="button"
            onClick={() => setIs24Hour(!is24Hour)}
            className={`w-14 h-7 rounded-full relative transition-all duration-300 ${
              is24Hour ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                is24Hour ? "left-8" : "left-1"
              }`}
            />
          </button>

          <span className="text-xs font-medium text-gray-700">24H</span>
        </div>
      </div>

      {/* DATE + LOCATION */}
      <div className="grid grid-cols-2 gap-4 mb-3">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Date and Time of Arrest *
          </label>

          <input
            type="datetime-local"
            {...register("basicInformation.arrestDateTime")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Location *
          </label>

          <div className="relative" ref={dropdownRef}>
            <input
              readOnly
              value={selected || ""}
              placeholder="Select Location"
              className={inputStyle}
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {locations.map((loc, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(loc)}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DOCTOR */}
      <div className="grid grid-cols-4 gap-4 mb-4">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Doctor informed by
          </label>
          <input
            {...register("basicInformation.doctorInformedBy")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">At *</label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.doctorAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Arrived at
          </label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.doctorArrivedAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Name of Doctor *
          </label>
          <input
            {...register("basicInformation.doctorName")}
            className={inputStyle}
          />
        </div>
      </div>

      {/* RELATIVE */}
      <div className="grid grid-cols-4 gap-4 mb-4">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Relatives informed by
          </label>
          <input
            {...register("basicInformation.relativeInformedBy")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">At *</label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.relativeAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Arrived at
          </label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.relativeArrivedAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Name of Relative *
          </label>
          <input
            {...register("basicInformation.relativeName")}
            className={inputStyle}
          />
        </div>
      </div>

      {/* AMBULANCE */}
      <div className="grid grid-cols-3 gap-4 mb-4">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Ambulance Called by
          </label>
          <input
            {...register("basicInformation.ambulanceCalledBy")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">At *</label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.ambulanceAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Arrived at
          </label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.ambulanceArrivedAt")}
            className={inputStyle}
          />
        </div>
      </div>

      {/* HD */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold mb-1">
            Immediate Activities: HD Concluded at
          </label>
          <input
            {...getTimeProps()}
            {...register("basicInformation.hdConcludedAt")}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">By</label>
          <input
            {...register("basicInformation.hdBy")}
            className={inputStyle}
          />
        </div>
      </div>

    </div>
  );
};

export default BasicInformation;