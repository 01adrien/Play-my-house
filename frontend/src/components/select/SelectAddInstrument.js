import React from 'react';

export default function SelectAddInstrument({
  label,
  data,
  type,
  value,
  setValue,
  disabled,
}) {
  const handleChange = (e) =>
    setValue((prev) => ({ ...prev, [type]: e.target.value }));

  return (
    <div
      className={`flex flex-col w-[70%] justify-center items-center ${
        disabled && 'opacity-30'
      }`}
    >
      <label className="text-xs mb-1 text-gray-500">{label}</label>
      <select
        onChange={handleChange}
        className={`rounded-md md:w-[80%] sm:w-[80%] xs:w-[100%] 2xs:w-[100%] 3xs:w-[100%] border-main_color focus:ring-0`}
        value={value}
        disabled={disabled}
      >
        <option value="">select..</option>
        {data &&
          data.map((d) => {
            return (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
