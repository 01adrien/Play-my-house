import React from 'react';
import { useRecoilState } from 'recoil';
import { categoryFilter } from '../../store/search';

export default function BasicCheckbox({ label, style, value, type }) {
  const [searchFilters, setSearchFilters] = useRecoilState(categoryFilter);
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          value={value}
          className="w-3 h-3 focus:ring-0 cursor-pointer bg-gray-50 rounded border border-gray-300"
          required=""
          onChange={(e) => {
            e.target.checked
              ? setSearchFilters((prev) => ({
                  ...prev,
                  [type]: [...prev[type], e.target.value],
                }))
              : setSearchFilters((prev) => ({
                  ...prev,
                  [type]: prev[type].filter((i) => i !== e.target.value),
                }));
          }}
        />
      </div>
      <label
        className={`${style} ml-2 text-sm text-gray-900 dark:text-gray-300`}
      >
        {label}
      </label>
    </div>
  );
}
