import React from 'react';
import { Table, Checkbox } from 'flowbite-react';
import Spinner from '../icons/Spinner';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination';
import BasicButton from '../button/BasicButton';
import ModalDelete from '../modal/ModalDelete';
import { useDeleteItems, viewTolabel } from '../../hooks/useDeleteItems';

export default function BaseTable({ fn1, fn2, view, id }) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    setItemsNumber,
    data,
    loading,
  } = usePagination(fn1, fn2, id);

  const {
    handleConfirm,
    closeModal,
    openModal,
    handleSelectItem,
    showModal,
    isChecked,
  } = useDeleteItems(view, fn1, setItemsNumber);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col min-w-[700px]">
          <div className="flex justify-around w-full text-sm h-18 items-center">
            <BasicButton
              onClick={openModal}
              width="40"
              style="h-10 bg-red-600 hover:bg-red-700 hover:scale-105"
            >
              <p className="self-center">supprimer</p>
            </BasicButton>
            {Math.ceil(itemsNumber / itemsPerPage) > 0 && data.length && (
              <Pagination
                index={Math.ceil(itemsNumber / itemsPerPage)}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
          <Table hoverable={true} striped={true} className="min-w-[500px] mt-6">
            <Table.Head>
              <Table.HeadCell className="!p-4">
                <p>🎶</p>
              </Table.HeadCell>
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
                  <Table.Cell className="focus:ring-0 !p-4 text-sm">
                    <Checkbox
                      checked={isChecked(d, view)}
                      onChange={(e) => handleSelectItem(e, d)}
                      className="focus:ring-0"
                    />
                  </Table.Cell>
                  {Object.keys(d).map((cell) => (
                    <Table.Cell className="text-xs !px-2" key={cell}>
                      {d[cell] || '--'}
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
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
