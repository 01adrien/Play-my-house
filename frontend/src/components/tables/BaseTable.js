import React from 'react';
import { Table, Checkbox } from 'flowbite-react';
import Spinner from '../icons/Spinner';
import { SiApplemusic } from 'react-icons/si';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination';
import BasicButton from '../button/BasicButton';
import ModalDelete from '../modal/ModalDelete';
import { useDeleteItems, viewTolabel } from '../../hooks/useDeleteItems';

export default function BaseTable({ fn1, fn2, view, id, title, resaStatus }) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    setItemsNumber,
    data,
    loading,
  } = usePagination(fn1, fn2, id, resaStatus);

  const {
    handleConfirm,
    closeModal,
    openModal,
    handleSelectItem,
    showModal,
    isChecked,
  } = useDeleteItems(view, fn1, setItemsNumber);

  console.log(itemsNumber);

  const isOwnerInstrumentView = () => view === 'OWNER_INSTRUMENT';

  return (
    <>
      {!loading ? (
        <div className="flex flex-col min-w-[700px] mb-8 h-[100%]">
          <div className="text-center mb-8">{title.toUpperCase()}</div>
          <div className="flex justify-around w-full text-sm h-10 items-center mb-8">
            <BasicButton
              onClick={openModal}
              width="40"
              style="h-10 bg-red-600 hover:bg-red-700 hover:scale-105"
            >
              <p className="self-center">supprimer</p>
            </BasicButton>
            <SiApplemusic className="text-2xl" />
            <p className="text-base text-thin">
              {itemsNumber + ' ' + viewTolabel[view]}
            </p>
          </div>
          <Table
            hoverable={true}
            striped={true}
            className="min-w-[500px] !focus:ring-0 mt-6"
          >
            <Table.Head className="sticky top-0">
              <Table.HeadCell className="!p-4">
                <p>🎶</p>
              </Table.HeadCell>
              {view === 'OWNER_INSTRUMENT' && (
                <Table.HeadCell>editer</Table.HeadCell>
              )}
              {data[0] &&
                Object.keys(data[0]).map((h) => (
                  <Table.HeadCell className="!px-2 text-xs" key={h}>
                    {h}
                  </Table.HeadCell>
                ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.map((d) => (
                <Table.Row
                  key={d.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell key={d.id} className="!focus:ring-0 !p-4 text-sm">
                    <Checkbox
                      key={d.id}
                      checked={isChecked(d, view)}
                      onChange={(e) => handleSelectItem(e, d)}
                      className="!focus:ring-0"
                    />
                  </Table.Cell>
                  {view === 'OWNER_INSTRUMENT' && (
                    <Table.Cell>editer</Table.Cell>
                  )}

                  {Object.keys(d).map((cell, i) => (
                    <Table.Cell
                      className={`text-xs !px-2 ${
                        i % 2 === 0 && 'text-main_color'
                      }`}
                      key={cell}
                    >
                      {d[cell] || '*'}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showModal && (
            <ModalDelete
              onConfirm={handleConfirm}
              onClose={closeModal}
              label={viewTolabel[view]}
            />
          )}
          {itemsNumber > 12 && (
            <div className={`w-full flex justify-center mt-4`}>
              <Pagination
                index={Math.ceil(itemsNumber / itemsPerPage)}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
