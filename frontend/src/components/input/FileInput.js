import React from 'react';

export default function FileInput({
  label = '',
  setSelectedFile,
  multiple = '',
}) {
  return (
    <div className="w-[60%]">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="multiple_files"
      >
        {label}
      </label>
      <input
        className="block w-full bg-white text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer"
        id="multiple_files"
        type="file"
        accept="image/jpeg"
        multiple={multiple}
        required
        onChange={(e) => {
          !multiple
            ? setSelectedFile(e.target.files[0])
            : setSelectedFile((prev) => [...prev, e.target.files[0]]);
        }}
      />
    </div>
  );
}
