import React from 'react';

export default function SlotHourSelect({
  data,
  deflt,
  setValue,
  value,
  label,
  day,
  allSlots,
}) {
  const handleChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [day]: [e.target.value],
    }));
  };
  return (
    <div className="flex flex-col justify-center items-start">
      <label className={`text-xs mb-1`}>{label}</label>
      <select
        className={`w-22 rounded-md border-main_color focus:border-none`}
        onChange={handleChange}
        value={54}
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
