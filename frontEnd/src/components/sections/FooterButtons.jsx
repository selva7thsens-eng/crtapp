import React from "react";

const FooterButtons = () => {

  return (
    <div className="flex justify-end gap-4 mt-8 mb-4">

      {/* Save Draft */}
      <button
        type="button"
        className="
          px-5 py-2 rounded-md text-lg font-bold
          bg-gray-100 text-blue-700
          border border-gray-300
          hover:bg-gray-200
          transition
        "
      >
        Save Draft
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="
          px-5 py-2 rounded-md text-lg font-medium
          bg-blue-900 text-white
          hover:bg-blue-700
          shadow-sm
          transition
        "
      >
        Submit Form
      </button>

    </div>
  );
};

export default FooterButtons;