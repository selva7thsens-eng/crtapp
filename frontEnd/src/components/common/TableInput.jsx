const TableInput = ({
  type = "text",
  register,
  name,
}) => {
  return (
    <input
      type={type}
      {...register(name)}
      className="w-full border px-2 py-1 rounded"
    />
  );
};

export default TableInput;