const BasicInformation = ({
  control,
  register,
  errors
}) => {

  const inputStyle =
    "w-full border border-blue-100 bg-gray-50 rounded-md px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  return (

<div className="p-4 bg-white shadow-sm rounded-lg border mt-4 mb-4 border-blue-200">

       <h2 className="font-bold text-blue-800 mb-3">
          BASIC INFORMATION
        </h2>
    
  {/* Date & Location */}
  <div className="grid grid-cols-2 gap-4 mb-3">

    <div>
      <label className="block text-sm font-semibold mb-1">
        Date and Time of Arrest *
      </label>

      <input
        type="datetime-local"
        {...register("dateTimeOfArrest")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Location *
      </label>

      <select
        {...register("location")}
        className={inputStyle}
      >
        <option>Select Location</option>
      </select>
    </div>

  </div>

  {/* Doctor Row */}
  <div className="grid grid-cols-4 gap-4 mb-4">

    <div>
      <label className="block text-sm font-semibold mb-1">
        Doctor informed by
      </label>

      <input
        {...register("doctorInformedBy")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        At *
      </label>

      <input
        type="time"
        {...register("doctorAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Arrived at
      </label>

      <input
        type="time"
        {...register("doctorArrivedAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Name of Doctor *
      </label>

      <input
        {...register("doctorName")}
        className={inputStyle}
      />
    </div>

  </div>

  {/* Relative Row */}
  <div className="grid grid-cols-4 gap-4 mb-4">

    <div>
      <label className="block text-sm font-semibold mb-1">
        Relatives informed by
      </label>

      <input
        {...register("relativeInformedBy")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        At *
      </label>

      <input
        type="time"
        {...register("relativeAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Arrived at
      </label>

      <input
        type="time"
        {...register("relativeArrivedAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Name of Relative *
      </label>

      <input
        {...register("relativeName")}
        className={inputStyle}
      />
    </div>

  </div>

  {/* Ambulance Row */}
  <div className="grid grid-cols-3 gap-4 mb-4">

    <div>
      <label className="block text-sm font-semibold mb-1">
        Ambulance Called by
      </label>

      <input
        {...register("ambulanceCalledBy")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        At *
      </label>

      <input
        type="time"
        {...register("ambulanceAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        Arrived at
      </label>

      <input
        type="time"
        {...register("ambulanceArrivedAt")}
        className={inputStyle}
      />
    </div>

  </div>

  {/* HD Row */}
  <div className="grid grid-cols-2 gap-4">

    <div>
      <label className="block text-sm font-semibold mb-1">
        Immediate Activities: HD Concluded at
      </label>

      <input
        type="time"
        {...register("hdConcludedAt")}
        className={inputStyle}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">
        By
      </label>

      <input
        {...register("hdBy")}
        className={inputStyle}
      />
    </div>

  </div>

</div>

  );
}

export default BasicInformation;