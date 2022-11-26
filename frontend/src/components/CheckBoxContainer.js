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
              {types?.map((type) => {
                return (
                  <div key={type.id} className="flex justify-between">
                    <BasicCheckbox label={type.name} />
                    <span className="text-xs text-gray-500">
                      ({type?.cout && Object.values(type.count)})
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
              <div key={brand.id} className="flex justify-between">
                <BasicCheckbox label={brand.name} />
                <span className="text-xs text-gray-500">
                  ({brand?.count && Object.values(brand.count)})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
