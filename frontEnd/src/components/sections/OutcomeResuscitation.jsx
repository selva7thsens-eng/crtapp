const inputStyle =
  "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

const OutcomeResuscitation = ({ register }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">

      {/* HEADER */}
    
       <div className="p-4 space-y-5">
        <h2 className="font-bold text-blue-800">
           OUTCOME OF RESUSCITATION
        </h2> 

      

        {/* ROW 1 */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              CPR Ended At
            </label>

            <input
              type="time"
              {...register("cprEnded")}
              className={inputStyle}
            />
          </div>

        </div>

        {/* RETURN OF CIRCULATION */}
        <div className="space-y-4">

          <div className=" px-2 py-2">
            <h3 className="font-semibold text-blue-800 text-sm">
              RETURN OF CIRCULATION
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4">

            {/* HR */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Heart Rate (HR)
              </label>

              <input
                {...register("returnHR")}
                className={inputStyle}
                placeholder="Enter HR"
              />
            </div>

            {/* BP */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Blood Pressure (BP)
              </label>

              <input
                {...register("returnBP")}
                className={inputStyle}
                placeholder="Enter BP"
              />
            </div>

            {/* RR */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Respiration Rate (RR)
              </label>

              <input
                {...register("returnRR")}
                className={inputStyle}
                placeholder="Enter RR"
              />
            </div>

          </div>

        </div>

        {/* EMS TEAM ARRIVAL */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              EMS Arrived At
            </label>

            <input
              type="time"
              {...register("emsArrivedAt")}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              CPR Handover Time
            </label>

            <input
              type="time"
              {...register("cprHandoverTime")}
              className={inputStyle}
            />
          </div>

        </div>

        {/* TRANSFER & ESCORT */}
        <div className="grid grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Transferred To
            </label>

            <input
              {...register("transferredTo")}
              className={inputStyle}
              placeholder="Enter destination"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Transfer Time
            </label>

            <input
              type="time"
              {...register("transferTime")}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Escorted By
            </label>

            <input
              {...register("escortedBy")}
              className={inputStyle}
              placeholder="Enter escort name"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default OutcomeResuscitation;