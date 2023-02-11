import React, { useState } from 'react';
import CheckBoxContainer from './CheckBoxContainer';
import InstrumentCard from './cards/InstrumentCard';
import Pagination from './Pagination';
import { BsFilterCircleFill } from 'react-icons/bs';

export default function InstrumentListPage({
  types,
  brands,
  name,
  instruments,
  pagesNumber,
  currentPage,
  setCurrentPage,
  page,
}) {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={`w-full flex flex-col space-between items-center mt-6`}>
      <div className="w-[85%] h-[100%]">
        <div className="flex items-center justify-between border-b-2 pb-6 border-border_color">
          <p className="opacity-0">left</p>
          <p className="font-medium text-xl">{name.toUpperCase()}</p>
          <p className="opacity-0 xs:hidden 2xs:hidden 3xs:hidden">riht</p>
          {types || brands.length ? (
            <BsFilterCircleFill
              onClick={() => setOpenFilters(!openFilters)}
              className={`text-xl cursor-pointer sm:hidden ${
                openFilters && 'text-main_color'
              }`}
            />
          ) : (
            <p className="opacity-0">right</p>
          )}
        </div>
        <div className="flex pt-3 min-h-[80vh]">
          <div
            className={` ${
              !openFilters ? 'xs:hidden 2xs:hidden 3xs:hidden' : ''
            }`}
          >
            <div
              className={`border-r-2 border-border_color min-w-[250px] xs:w-[40%] xs:shadow-2xl 2xs:shadow-2xl 2xs:w-[40%] sm:w-[100%] h-[100%] bg-white flex overflow-y-scroll z-20 3xs:fixed 3xs:top-0 3xs:left-0 2xs:fixed 2xs:top-0 2xs:left-0 xs:fixed xs:top-0 xs:left-0`}
            >
              <CheckBoxContainer
                types={types}
                brands={brands}
                closeFilters={setOpenFilters}
                page={page}
              />
            </div>
          </div>
          <div className="flex flex-col h-full w-[100%]">
            <div className="flex flex-wrap justify-center h-fit mb-6">
              {instruments?.length ? (
                instruments?.map((instrument) => {
                  return (
                    <InstrumentCard
                      key={instrument.id}
                      instrument={instrument}
                      link={`/instrument/${instrument.id}`}
                    />
                  );
                })
              ) : (
                <div className="flex justify-center items-center h-[50vh]">
                  <p className="uppercase py-8 px-8">pas d'instruments..</p>
                </div>
              )}
            </div>
            <div className={`flex justify-center`}>
              {pagesNumber > 1 && instruments.length && (
                <Pagination
                  index={pagesNumber}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
