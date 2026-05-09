const inputStyle =
  "w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all text-sm";

const VascularAccess = ({ register }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm mt-4">

      {/* HEADER */}
      <div className="bg-blue-50 border-b border-gray-300 px-4 py-3">
        <h2 className="font-bold text-blue-800">
          VASCULAR ACCESS
        </h2>
      </div>

      <div className="p-4 grid grid-cols-3 gap-5">

        {/* AVF / AVG */}
        <div className="space-y-3">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Use AVF/AVG as IV Access (Yes/No)
            </label>

            <div className="flex items-center gap-6 border border-gray-300 bg-gray-50 rounded-md px-4 py-2 h-[42px]">

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="Yes" {...register("avfAccess")} className="accent-blue-600" />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="No" {...register("avfAccess")} className="accent-blue-600" />
                No
              </label>

            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Specify Site
            </label>

            <input {...register("avfSite")} className={inputStyle} />
          </div>

        </div>

        {/* CVC */}
        <div className="space-y-3">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Use CVC as IV Access (Yes/No)
            </label>

            <div className="flex items-center gap-6 border border-gray-300 bg-gray-50 rounded-md px-4 py-2 h-[42px]">

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="Yes" {...register("cvcAccess")} className="accent-blue-600" />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="No" {...register("cvcAccess")} className="accent-blue-600" />
                No
              </label>

            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Specify Site
            </label>

            <input {...register("cvcSite")} className={inputStyle} />
          </div>

        </div>

        {/* IV Cannula */}
        <div className="space-y-3">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Time IV Cannula Initiated
            </label>

            <input type="time" {...register("ivCannulaTime")} className={inputStyle} />
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="block text-sm font-semibold mb-2">Site</label>
              <input {...register("ivCannulaSite")} className={inputStyle} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Inserted By</label>
              <input {...register("ivCannulaInsertedBy")} className={inputStyle} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VascularAccess;