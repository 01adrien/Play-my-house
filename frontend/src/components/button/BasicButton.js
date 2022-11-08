import React from "react";

export default function BasicButton({ text, type, style, width = "[100%]" }) {
  return (
    <button
      type={type}
      className={`${style} text-white flex justify-center items-center bg-main_color w-${width} h-12 hover:bg-main_color_hover focus:outline-none font-bold rounded px-5 py-3 text-center`}
    >
      {text}
    </button>
  );
}
