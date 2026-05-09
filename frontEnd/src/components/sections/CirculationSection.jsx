const inputStyle =
  "w-full border border-cyan-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all";

const CirculationSection = ({
  register,
  watch
}) => {

  const aedApplied = watch ? watch("aedApplied") : "";

  return (
    <div className="bg-white border border-cyan-200 rounded-lg overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-cyan-50 border-b border-cyan-200 px-4 py-3">
        <h2 className="font-bold text-cyan-800">
          CIRCULATION
        </h2>
      </div>

      <div className="p-4 space-y-4">

        {/* Pulse Row */}
       <div className="grid grid-cols-12 gap-4">

  {/* Carotid Pulse */}
  <div className="col-span-6">
    <label className="block text-sm font-semibold mb-2">
      Carotid Pulse (Present/Absent) *
    </label>

    <div className="w-full flex items-center gap-6 border border-cyan-100 bg-gray-50 rounded-md px-4 py-2 h-[42px]">

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          className="accent-cyan-600"
          type="radio"
          value="Present"
          {...register("carotidPulse")}
        />
        Present
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          className="accent-cyan-600"
          type="radio"
          value="Absent"
          {...register("carotidPulse")}
        />
        Absent
      </label>

    </div>
  </div>

  {/* Blood Pressure */}
  <div className="col-span-4">
    <label className="block text-sm font-semibold mb-2">
      Blood Pressure
    </label>

    <input
      className="w-full border border-cyan-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
      placeholder="e.g. 120/80"
      {...register("bloodPressure")}
    />
  </div>

  {/* At */}
  <div className="col-span-2">
    <label className="block text-sm font-semibold mb-2">
      At
    </label>

    <input
      className="w-full border border-cyan-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
      type="time"
      {...register("bloodPressureAt")}
    />
  </div>

</div>

        {/* ECG */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Presenting ECG Rhythm (Rate)
            </label>

            <input
              {...register("ecgRhythm")}
              className={inputStyle}
              placeholder="Enter rhythm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              At
            </label>

            <input
              type="time"
              {...register("ecgAt")}
              className={inputStyle}
            />
          </div>

        </div>

        {/* Compression */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chest Compression Commenced At
            </label>

            <input
              type="time"
              {...register("compressionAt")}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              By
            </label>

            <input
              {...register("compressionBy")}
              className={inputStyle}
              placeholder="Enter name"
            />
          </div>

        </div>

        {/* AED */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              AED Applied (Yes/No) *
            </label>

            <div className="flex items-center gap-6 border border-cyan-100 bg-gray-50 rounded-md px-4 py-2 h-[42px]">

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="Yes"
                  {...register("aedApplied")}
                  className="accent-cyan-600"
                />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="No"
                  {...register("aedApplied")}
                  className="accent-cyan-600"
                />
                No
              </label>

            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              If yes, at
            </label>

            <input
              type="time"
              {...register("aedAt")}
              disabled={aedApplied !== "Yes"}
              className={`${inputStyle} disabled:bg-gray-100`}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default CirculationSection;
