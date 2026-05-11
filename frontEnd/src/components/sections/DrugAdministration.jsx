import React, { useState } from "react";

const inputStyle =
  "w-full border border-gray-300 bg-white rounded-md px-2 py-2 text-sm outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-100";

const DrugAdministration = ({ register }) => {
  const [rows, setRows] = useState([0, 1, 2]); // initially 3 rows

  const addRow = () => {
    setRows((prev) => [...prev, prev.length]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">

      {/* Header */}
      <div className="w-full text-blue-900 py-4 flex px-4">
        <h1 className="text-lg font-bold text-center">
          Drug Administration Record
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border border-gray-200 p-2">Time</th>
              <th className="border border-gray-200 p-2">ECG Rhythm</th>
              <th className="border border-gray-200 p-2">AED Defibrillation</th>
              <th className="border border-gray-200 p-2">Adrenaline</th>
              <th className="border border-gray-200 p-2">Atropine</th>
              <th className="border border-gray-200 p-2">Ca Gluconate</th>
              <th className="border border-gray-200 p-2">NaHCO3</th>
              <th className="border border-gray-200 p-2">Other Drugs</th>
              <th className="border border-gray-200 p-2">Route (IV/ETT)</th>
              <th className="border border-gray-200 p-2">Administered By</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row} className="hover:bg-blue-50 transition">

                <td className="border border-gray-200 p-2">
                  <input
                    type="time"
                    {...register(`drugRecords.${index}.time`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.ecgRhythm`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.aedDefibrillation`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.adrenaline`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.atropine`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.caGluconate`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.naHCO3`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <input
                    {...register(`drugRecords.${index}.otherDrugs`)}
                    className={inputStyle}
                  />
                </td>

                <td className="border border-gray-200 p-2">
                  <select
                    {...register(`drugRecords.${index}.route`)}
                    className={inputStyle}
                  >
                    <option value="">Select</option>
                    <option>IV</option>
                    <option>ETT</option>
                  </select>
                </td>

                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`drugRecords.${index}.administeredBy`)}
                    className={inputStyle}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ADD ROW BUTTON */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          onClick={addRow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          + Add Row
        </button>
      </div>

    </div>
  );
};

export default DrugAdministration;