import React from 'react';

export default function BasicToggle({ setValue, value }) {
  return (
    <label class="inline-flex relative items-center h-[100%] cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={setValue}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-main_color rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-main_color"></div>
    </label>
  );
}
