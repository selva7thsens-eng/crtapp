import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportFormPreview({ setPage }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/arrest-forms")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log("API Error:", err));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      
      {/* POPUP CARD */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

        {/* CLOSE BUTTON */}
        <button
         onClick={() => setPage("form")}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Saved Forms (Latest First)
        </h2>

        {/* CONTENT */}
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {item.patient_name}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">NRIC:</span>{" "}
                  {item.nric}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Clinic:</span>{" "}
                  {item.clinic_name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No data found</p>
        )}
      </div>
    </div>
  );
}

export default ReportFormPreview;