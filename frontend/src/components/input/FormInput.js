import React from 'react';

export default function FormInput({
  name,
  type,
  id,
  fn,
  value,
  required = true,
  testId,
  style,
}) {
  return (
    <div className={`mb-4 ${style}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {name}
      </label>
      <input
        data-cy={testId}
        type={type}
        id={id}
        className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        placeholder=""
        required={required}
        onChange={(e) => fn(e)}
        value={value}
      />
    </div>
  );
}
