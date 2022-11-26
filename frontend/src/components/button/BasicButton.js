import React from "react";

export default function BasicButton({
  type,
  style,
  width = "[100%]",
  height = "12",
  testId,
  children,
}) {
  return (
    <button
      data-cy={testId}
      type={type}
      className={`${style} text-white flex justify-center items-center bg-main_color w-${width} h-${height} hover:bg-main_color_hover focus:outline-none font-bold rounded px-5 py-3 text-center`}
    >
      {children}
    </button>
  );
}
