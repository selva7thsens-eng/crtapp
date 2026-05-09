
const inputStyle =
  "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

const AirwayVentilation = ({
  register
}) => {

  return (
    <div className="bg-white border border-blue-200 rounded-lg overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <h2 className="font-bold text-blue-800">
          AIRWAY / VENTILATION
        </h2>
      </div>

      <div className="p-4 space-y-4">

        {/* Respiration + Oxygen */}
        <div className="grid grid-cols-2 gap-4">

          {/* Respiration */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Respiration (Present/Absent) *
            </label>

            <div className="flex items-center gap-6 border border-blue-100 bg-gray-50 rounded-md px-4 py-2 h-[42px]">

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="Present"
                  {...register("respiration")}
                  className="accent-blue-600"
                />
                Present
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="Absent"
                  {...register("respiration")}
                  className="accent-blue-600"
                />
                Absent
              </label>

            </div>
          </div>

          {/* Oxygen */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Oxygen Administered
            </label>

            <div className="flex items-center gap-2">

              <input
                type="number"
                {...register("oxygenAdministered")}
                className={inputStyle}
                placeholder="Enter oxygen"
              />

              <span className="text-sm text-gray-500 whitespace-nowrap">
                L/min
              </span>

            </div>
          </div>

        </div>

        {/* Assist Ventilation */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Assist Ventilation Commenced at
            </label>

            <input
              type="time"
              {...register("assistVentilationTime")}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              By
            </label>

            <input
              {...register("assistVentilationBy")}
              className={inputStyle}
              placeholder="Enter name"
            />
          </div>

        </div>

        {/* Intubation */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Patient Intubated By
            </label>

            <input
              {...register("patientIntubatedBy")}
              className={inputStyle}
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Time
            </label>

            <input
              type="time"
              {...register("intubationTime")}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Size
            </label>

            <input
              {...register("intubationSize")}
              className={inputStyle}
              placeholder="Enter size"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default AirwayVentilation;
 