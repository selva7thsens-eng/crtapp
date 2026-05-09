const InputField = ({
  label,
  name,
  register,
  errors,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        className="border rounded-md px-3 py-2 bg-white"
      />

      {errors?.[name] && (
        <p className="text-red-500 text-xs">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;