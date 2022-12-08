import React, { useState } from 'react';
import CheckBoxContainer from './CheckBoxContainer';
import InstrumentCard from './cards/InstrumentCard';
import Pagination from './Pagination';
import Footer from './Footer';
import useMediaQuery from '../hooks/useMediaQuery';
import { BsFilterSquareFill } from 'react-icons/bs';

export default function InstrumentListPage({
  types,
  brands,
  name,
  instruments,
  pagesNumber,
  currentPage,
  setCurrentPage,
}) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <div className={`w-full flex flex-col space-between items-center mt-6`}>
      <div className="w-[85%] h-[100%]">
        <div className="flex items-center justify-between border-b-2 pb-2 border-border_color">
          <p className="opacity-0">left</p>
          <p className="font-medium text-xl">{name.toUpperCase()}</p>
          {(isMobile && types) || (isMobile && brands.length) ? (
            <BsFilterSquareFill
              onClick={() => setOpenFilters(!openFilters)}
              className="text-xl cursor-pointer text-main_color"
            />
          ) : (
            <p className="opacity-0">riht</p>
          )}
        </div>
        <div className="flex pt-3 min-h-[500px]">
          <div
            className={` ${
              openFilters
                ? 'fixed top-0 left-0 h-[100vh] z-20  bg-white'
                : isMobile
                ? 'hidden'
                : ''
            } flex min-w-[250px]`}
          >
            <div
              className={`border-r-2 ml-4 border-border_color w-[100%] h-[100%] flex overflow-y-scroll`}
            >
              <CheckBoxContainer
                types={types}
                brands={brands}
                closeFilters={setOpenFilters}
              />
            </div>
          </div>
          <div className="flex flex-col h-full w-[100%]">
            <div className="flex flex-wrap justify-center h-fit mb-6  ">
              {instruments.length ? (
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
                <p>pas d'instruments</p>
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
