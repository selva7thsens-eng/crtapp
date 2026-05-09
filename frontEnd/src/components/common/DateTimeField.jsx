const DateTimeField = ({
  label,
  register,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type="datetime-local"
        {...register(name)}
        className="border rounded-md px-3 py-2"
      />
    </div>
  );
};

export default DateTimeField;