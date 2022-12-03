import React from 'react';

export default function Pagination({ index, setCurrentPage, currentPage }) {
  if (index < 0 || isNaN(index)) index = 1;
  const pages = new Array(index).fill().map((_, i) => i + 1);

  function pageCountComponent(page, i) {
    return (
      <div
        key={i}
        className={`${
          page === currentPage && 'bg-slate-300'
        } border-r-[1px] borderborder-[1px] border-slate-300 hover:bg-slate-100`}
      >
        <a key={page} className="m-2" onClick={() => setCurrentPage(page)}>
          {page}
        </a>
      </div>
    );
  }

  return (
    <nav className="bg-white h-16 text-slate-600 flex justify-center items-center text-lg cursor-pointer w-[250px]">
      <span
        data-cy="prev-page"
        className="font-thin border-t-[1px] border-b-[1px] border-l-[1px] text-slate-300 border-slate-300 h-8 w-8 text-center rounded-l hover:bg-slate-100"
        onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : null}
      >
        ❮
      </span>
      <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-300 h-8 flex">
        {index < 5
          ? pages.map((page, i) => {
              return pageCountComponent(page, i);
            })
          : currentPage >= index - 2
          ? pages.slice(index - 5, index).map((page, i) => {
              return pageCountComponent(page, i);
            })
          : currentPage < 4
          ? pages.slice(0, 5).map((page, i) => {
              return pageCountComponent(page, i);
            })
          : pages.slice(currentPage - 3, currentPage + 2).map((page, i) => {
              return pageCountComponent(page, i);
            })}
        {index > 5 && currentPage < index - 2 ? <span>...</span> : null}
      </div>
      <span
        data-cy="next-page"
        className="font-thin h-8 w-8 text-slate-300 text-center border-t-[1px] border-b-[1px] border-r-[1px] rounded-r border-slate-300 hover:bg-slate-100"
        onClick={
          currentPage < index ? () => setCurrentPage(currentPage + 1) : null
        }
      >
        ❯
      </span>
    </nav>
  );
}
