import React from "react";
import { useFieldArray } from "react-hook-form";

const SignatureSection = ({ register, control }) => {
  const inputStyle =
    "w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nurses",
  });

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm mt-4 overflow-hidden">

      {/* HEADER */}
      <div className="bg-blue-50 border-b border-gray-300 px-4 py-3">
        <h2 className="font-bold text-blue-800">
          SIGNATURE
        </h2>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-md p-3 bg-white"
          >

            {/* NAME */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nurse Name
            </label>

            <input
              {...register(`nurses.${index}.name`)}
              placeholder="Enter name"
              className={inputStyle}
            />

            {/* SIGNATURE TEXTAREA */}
            <label className="block text-sm font-semibold text-gray-700 mt-3 mb-2">
              Signature
            </label>

            <textarea
              {...register(`nurses.${index}.signature`)}
              
              rows={2}
              className={inputStyle}
            />

            {/* DELETE */}
            {fields.length > 3 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full mt-3 bg-red-100 text-red-700 py-2 rounded-md text-sm hover:bg-red-200 transition"
              >
                Delete
              </button>
            )}

          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center border-t border-gray-300 px-4 py-3 bg-gray-50">

        <button
          type="button"
          onClick={() => append({ name: "", signature: "" })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          + Add Nurse
        </button>

      </div>
    </div>
  );
};

export default SignatureSection;