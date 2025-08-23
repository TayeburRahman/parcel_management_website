"use client";

const SelectField = ({
  label,
  name,
  options = [],
  register,
  required = false,
  error,
  defaultOption = "Select an option",
}) => {
  return (
    <div className="space-y-1 relative">
      {label && (
          <label htmlFor={name} className="block text-xs text-gray-600">
          {label}
        </label>
      )}
      <select
        id={name}
        {...register(name, { required })}
        className="w-full border border-gray-300 px-2 py-1.5 rounded-sm text-xs text-gray-500 font-normal focus:outline-none focus:ring-1 focus:ring-primary outline-none appearance-none transition-all duration-300"
      >
        <option value="">{defaultOption}</option>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
        
      {error && <p className="text-xs text-red-500 mt-0.5">{error.message}</p>}
    </div>
  );
};

export default SelectField;
