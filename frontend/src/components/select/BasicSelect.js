import React from 'react';

export default function BasicSelect({
  data,
  deflt,
  setValue,
  value,
  disabled,
  index,
  label,
}) {
  const handleChange = (e) =>
    setValue((prev) => ({ ...prev, [index]: e.target.value }));

  return (
    <div className="flex flex-col justify-center items-start">
      <label
        className={`text-xs mb-1 ${
          disabled ? 'text-gray-300' : 'text-gray-500'
        } `}
      >
        {label}
      </label>
      <select
        className={`w-22 rounded-md border-main_color ${
          disabled && 'opacity-25'
        }`}
        onChange={handleChange}
        value={disabled ? '' : value}
        disabled={disabled}
      >
        <option key="title" className="text-sm text-center" value="">
          {deflt}
        </option>
        {data &&
          data.map((d) => {
            return (
              <option className="text-xs text-gray-500" key={d} value={d}>
                {d}h
              </option>
            );
          })}
      </select>
    </div>
  );
}



