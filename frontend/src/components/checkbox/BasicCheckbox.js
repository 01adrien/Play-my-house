import React from "react";

export default function BasicCheckbox({ label }) {
  return (
    <div className="flex items-start mb-4">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3"
          required=""
        />
      </div>
      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}
