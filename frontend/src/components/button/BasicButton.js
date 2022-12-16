import React from 'react';

export default function BasicButton({
  type,
  style,
  width = '[100%]',
  height = '12',
  testId,
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      data-cy={testId}
      type={type}
      disabled={disabled}
      className={`${style} text-white flex justify-center items-center shadow-md bg-main_color w-${width} h-${height} hover:bg-main_color_hover focus:outline-none font-bold h-10 rounded px-5 py-3 text-center`}
    >
      <div className="w-[100%] h-[100%] flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
