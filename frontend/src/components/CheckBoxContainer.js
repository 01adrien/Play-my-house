import React from "react";
import BasicCheckbox from "../components/checkbox/BasicCheckbox";

export default function CheckBoxContainer({ types, brands }) {
  return (
    <div className="flex flex-col w-[95%] pt-3">
      <div className="flex flex-col">
        {types && (
          <>
            <div className="flex">
              <p className="text-center font-bold">filtre par instrument</p>
            </div>
            <div className="mt-2">
              {types?.map((type, i) => {
                return (
                  <div className="flex justify-between">
                    <BasicCheckbox key={i} label={type.name} />
                    <span className="text-xs text-gray-500">
                      ({Object.values(type.count)})
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex mt-5">
          <p className="text-center font-bold">filtre par marque</p>
        </div>
        <div className="mt-2">
          {brands?.map((brand) => {
            return (
              <div className="flex justify-between">
                <BasicCheckbox label={brand.name} />
                <span className="text-xs text-gray-500">
                  ({brand.count && Object.values(brand.count)})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
