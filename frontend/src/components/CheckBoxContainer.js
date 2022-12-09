import React from 'react';
import BasicCheckbox from '../components/checkbox/BasicCheckbox';
import useMediaQuery from '../hooks/useMediaQuery';
import { RxCrossCircled } from 'react-icons/rx';
import { motion } from 'framer-motion';

export default function CheckBoxContainer({ types, brands, closeFilters }) {
  const isMobile = useMediaQuery('(max-width: 740px)');

  return (
    <div className="flex flex-col w-[95%] pt-3 pb-16">
      <div className="ml-4 flex flex-col">
        {types && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-center font-bold">filtre par instrument</p>
              {isMobile && (
                <RxCrossCircled
                  onClick={() => closeFilters(false)}
                  className="bg-red-600 text-white cursor-pointer rounded-full text-xl"
                />
              )}
            </div>
            <div data-cy="checkbox-type" className="mt-2 ">
              {types?.map((type) => {
                return (
                  <div key={type.id} className="flex justify-between ml-2">
                    <BasicCheckbox label={type.name} />
                    <span className="text-xs text-gray-500">
                      ({type?.count && Object.values(type.count)})
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="flex justify-between items-center mt-2">
          <p className="text-center font-bold">filtre par marque</p>
          {isMobile && !types && (
            <RxCrossCircled
              onClick={() => closeFilters(false)}
              className="bg-red-600 text-white cursor-pointer rounded-full text-xl"
            />
          )}
        </div>
        <div data-cy="checkbox-brand" className="mt-2 mb-6">
          {brands?.map((brand) => {
            return (
              <div key={brand.id} className="flex justify-between ml-2">
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
