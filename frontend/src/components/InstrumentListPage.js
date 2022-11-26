import React from 'react';
import CheckBoxContainer from './CheckBoxContainer';
import InstrumentCard from './cards/InstrumentCard';
import Pagination from './Pagination';

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
    <div className="w-full flex justify-center">
      <div className="w-[85%]">
        <div className="flex flex-col items-center justify-center border-b-2 border-border_color">
          <p className="font-medium pt-3">{name.toUpperCase()}</p>
          <p className="w-[65%] py-5 text-center">
            Etiam consectetur, felis sit amet scelerisque consectetur, ligula
            metus condimentum sapien, ut dignissim tellus mauris quis orci. In
            magna massa, posuere ut eros id, efficitur pellentesque ipsum. Duis
            scelerisque suscipit dolor, non convallis diam. Donec ut mauris a ex
            aliquam pellentesque. Pellentesque vitae sapien eget nulla
            condimentum dictum. Fusce nec dolor sed risus maximus tincidunt.
            Nulla pretium{' '}
          </p>
        </div>
        <div className="flex pt-3">
          <div className="flex min-w-[250px]">
            <div className="border-r-2 border-border_color w-[80%] auto flex h-full">
              <CheckBoxContainer types={types} brands={brands} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center h-fit">
              {instruments?.map((instrument) => {
                return (
                  <InstrumentCard key={instrument.id} instrument={instrument} />
                );
              })}
            </div>
            <div className="w-full flex justify-center">
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
    </div>
  );
}
