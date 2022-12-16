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
  labelStyle = 'text-gray-900 text-sm font-medium',
}) {
  return (
    <div className={`mb-4 ${style}`}>
      <label htmlFor={id} className={`block mb-2 ${labelStyle}`}>
        {name}
      </label>
      <input
        data-cy={testId}
        type={type}
        id={id}
        className="bg-gray-50 border h-10 rounded-md border-main_color focus:border-none text-gray-900 text-sm block w-full p-2.5"
        placeholder=""
        required={required}
        onChange={(e) => fn(e)}
        value={value}
      />
    </div>
  );
}
