const SelectField = ({
  label,
  name,
  register,
  options,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm">
        {label}
      </label>

      <select
        {...register(name)}
        className="border rounded-md px-3 py-2 bg-white"
      >
        <option value="">
          Select
        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;