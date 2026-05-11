import React, { useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

import {
  FiUpload,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";

const SignatureSection = ({ register, control, setValue }) => {

  const signatureRefs = useRef([]);

  const [signatureMode, setSignatureMode] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});

  const inputStyle =
    "w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nurses",
  });

  // CLEAR DRAW SIGNATURE
  const clearSignature = (index) => {
    signatureRefs.current[index]?.clear();
    setValue(`nurses.${index}.signature`, "");
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUploadedImages((prev) => ({
        ...prev,
        [index]: imageUrl,
      }));

      // ✅ SAVE TO FORM
      setValue(`nurses.${index}.signature`, imageUrl);
    }
  };

  // DELETE IMAGE
  const deleteUploadedImage = (index) => {
    setUploadedImages((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });

    // ✅ CLEAR FORM VALUE
    setValue(`nurses.${index}.signature`, "");
  };

  // SAVE DRAW SIGNATURE
  const saveDrawSignature = (index) => {
    const canvas = signatureRefs.current[index];

    if (canvas && !canvas.isEmpty()) {
      const dataUrl = canvas.toDataURL("image/png");

      setValue(`nurses.${index}.signature`, dataUrl);
    }
  };

  return (
    <div
      id="signature-submit"
      className="bg-white border border-gray-300 rounded-lg shadow-sm mt-4 overflow-hidden"
    >

      {/* HEADER */}
      <div className="bg-blue-50 border-b border-gray-300 px-4 py-3">
        <h2 className="font-bold text-blue-800">
          SIGNATURE
        </h2>
      </div>

      {/* SIGNATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        {fields.map((item, index) => (

          <div
            key={item.id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >

            {/* NURSE NAME */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nurse Name
            </label>

            <input
              {...register(`nurses.${index}.name`)}
              placeholder="Enter nurse name"
              className={inputStyle}
            />

            {/* ✅ HIDDEN SIGNATURE FIELD */}
            <input
              type="hidden"
              {...register(`nurses.${index}.signature`)}
            />

            {/* SIGNATURE HEADER */}
            <div className="flex items-center justify-between mt-4 mb-2">

              <label className="text-sm font-semibold text-gray-700">
                Signature
              </label>

              <div className="flex items-center gap-2">

                {/* UPLOAD */}
                <button
                  type="button"
                  onClick={() =>
                    setSignatureMode((prev) => ({
                      ...prev,
                      [index]: "upload",
                    }))
                  }
                  className={`p-2 rounded-md border transition-all
                    ${signatureMode[index] === "upload"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <FiUpload size={16} />
                </button>

                {/* DRAW */}
                <button
                  type="button"
                  onClick={() =>
                    setSignatureMode((prev) => ({
                      ...prev,
                      [index]: "draw",
                    }))
                  }
                  className={`p-2 rounded-md border transition-all
                    ${signatureMode[index] === "draw"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <FiEdit3 size={16} />
                </button>

              </div>
            </div>

            {/* UPLOAD SIGNATURE */}
            {signatureMode[index] === "upload" && (
              <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="w-full text-sm"
                />

                {uploadedImages[index] && (
                  <div className="relative mt-4">

                    <img
                      src={uploadedImages[index]}
                      alt="Signature"
                      className="h-28 w-full object-contain border border-gray-300 rounded-md bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => deleteUploadedImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"
                    >
                      <FiTrash2 size={14} />
                    </button>

                  </div>
                )}

              </div>
            )}

            {/* DRAW SIGNATURE */}
            {signatureMode[index] === "draw" && (

              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

                <SignatureCanvas
                  ref={(ref) => (signatureRefs.current[index] = ref)}
                  penColor="black"
                  canvasProps={{
                    width: 400,
                    height: 140,
                    className: "w-full h-[140px]",
                  }}
                />

                <div className="border-t border-gray-300 flex">

                  <button
                    type="button"
                    onClick={() => clearSignature(index)}
                    className="w-1/2 py-2 text-sm hover:bg-gray-100"
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={() => saveDrawSignature(index)}
                    className="w-1/2 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </button>

                </div>

              </div>
            )}

            {/* DELETE NURSE */}
            {fields.length > 3 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full mt-4 bg-red-100 text-red-700 py-2 rounded-md text-sm"
              >
                Delete Nurse
              </button>
            )}

          </div>
        ))}

      </div>

      {/* ADD BUTTON */}
      <div className="border-t border-gray-300 bg-gray-50 px-4 py-3">

        <button
          type="button"
          onClick={() => append({ name: "", signature: "" })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          + Add Nurse
        </button>

      </div>

    </div>
  );
};

export default SignatureSection;