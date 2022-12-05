import React from 'react';
import CheckBoxContainer from './CheckBoxContainer';
import InstrumentCard from './cards/InstrumentCard';
import Pagination from './Pagination';
import Footer from './Footer';

export default function InstrumentListPage({
  types,
  brands,
  name,
  instruments,
  pagesNumber,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className={`w-full flex flex-col space-between items-center`}>
      <div className="w-[85%] h-[100%]">
        <div className="flex flex-col items-center justify-center border-b-2 border-border_color">
          <p className="font-medium text-xl pb-4">{name.toUpperCase()}</p>
        </div>
        <div className="flex pt-3 min-h-[500px]">
          <div className="flex min-w-[250px]">
            <div className="border-r-2 border-border_color w-[90%] h-[100%] flex ">
              <CheckBoxContainer types={types} brands={brands} />
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
