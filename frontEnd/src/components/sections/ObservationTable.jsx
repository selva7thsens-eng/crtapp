const tableInputStyle =
  "w-full border border-gray-300 bg-white rounded-md px-2 py-1 outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-100 text-sm";

const ObservationTable = ({
  register,
  observationFields,
  appendObservation,
  removeObservation,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-4 mb-4">
       <div className="bg-cyan-50 border-b border-cyan-200 px-4 py-3">
        <h2 className="font-bold text-cyan-800">
          OBSERVATION
        </h2>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-sm">

          <thead className="bg-gray-50 text-gray-700">

            <tr>

              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">By</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">HR</th>
              <th className="border border-gray-300 p-2">BP</th>
              <th className="border border-gray-300 p-2">RR</th>
              <th className="border border-gray-300 p-2">Pupils</th>
              <th className="border border-gray-300 p-2">ECG</th>
              <th className="border border-gray-300 p-2">Tracing</th>
              <th className="border border-gray-300 p-2">Notes</th>
              <th className="border border-gray-300 p-2">Action</th>

            </tr>

          </thead>

          <tbody>

            {observationFields.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50">

                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>

                {/* BY SINGLE INPUT */}
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`observations.${index}.by`)}
                    className={tableInputStyle}
                    placeholder="Name"
                  />
                </td>

                <td className="border border-gray-300 p-2">
                  <input type="time" {...register(`observations.${index}.time`)} className={tableInputStyle} />
                </td>

                <td className="border border-gray-300 p-2">
                  <input {...register(`observations.${index}.hr`)} className={tableInputStyle} />
                </td>

                <td className="border border-gray-300 p-2">
                  <input {...register(`observations.${index}.bp`)} className={tableInputStyle} />
                </td>

                <td className="border border-gray-300 p-2">
                  <input {...register(`observations.${index}.rr`)} className={tableInputStyle} />
                </td>

                <td className="border border-gray-300 p-2">
                  <select {...register(`observations.${index}.pupils`)} className={tableInputStyle}>
                    <option>Normal</option>
                    <option>Fixed</option>
                    <option>Dilated</option>
                  </select>
                </td>

                <td className="border border-gray-300 p-2">
                  <select {...register(`observations.${index}.ecg`)} className={tableInputStyle}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>

                <td className="border border-gray-300 p-2">
                  <select {...register(`observations.${index}.tracing`)} className={tableInputStyle}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>

                {/* NOTES LAST COLUMN */}
                <td className="border border-gray-300 p-2">
                  <textarea
                    {...register(`observations.${index}.notes`)}
                    className={tableInputStyle}
                    placeholder="Enter notes"
                    rows={2}
                  />
                </td>

                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeObservation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ADD BUTTON */}
      <div className="p-3 bg-gray-50 border-t border-gray-300">

        <button
          type="button"
          onClick={() =>
            appendObservation({
              by: "",
              time: "",
              hr: "",
              bp: "",
              rr: "",
              pupils: "",
              ecg: "Yes",
              tracing: "Yes",
              notes: "",
            })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Row
        </button>

      </div>

    </div>
  );
};

export default ObservationTable;
