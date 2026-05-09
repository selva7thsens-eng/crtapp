const RadioField = ({
  label,
  name,
  register,
}) => {
  return (
    <div>
      <label className="font-semibold text-sm block mb-2">
        {label}
      </label>

      <div className="flex gap-5">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="Yes"
            {...register(name)}
          />
          Yes
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="No"
            {...register(name)}
          />
          No
        </label>
      </div>
    </div>
  );
};

export default RadioField;