"use client"

const InputField = ({
    label,
    name,
    type = "text",
    register,
    placeholder = "",
    required = false,
    registerOptions = {},
    error,
    ...rest
}) => {
    return (
        <div className="space-y-1 w-full">
            {label && (
                <label htmlFor={name} className="block text-xs text-gray-600">
                    {label}
                </label>
            )}
            <input
                id={name}
                type={type}
                {...register(name, { required, ...registerOptions })}
                className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1.5 rounded-sm text-xs placeholder:text-xs outline-none transition-all duration-300 file:rounded-sm file:border-0 file:bg-gray-100 file:text-gray-600 file:text-xs file:py-1 file:px-3"
                {...rest}
                placeholder={placeholder}
            />
            {error && <p className="text-xs text-red-500 mt-0.5">{error.message}</p>}
        </div>
    );
};

export default InputField;