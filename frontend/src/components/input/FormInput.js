import React from "react";

export default function FormInput({
  name,
  type,
  id,
  fn,
  value,
  required = true,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {name}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        placeholder=""
        required={required}
        onChange={(e) => fn(e)}
        value={value}
      />
    </div>
  );
}
