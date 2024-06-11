const Input = ({
  htmlFor,
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <div
        id="standard_error_help"
        className="mt-2 text-xs text-red-600 dark:text-red-400"
      ></div>
    </div>
  );
};

export default Input;
