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

  console.log(id);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col">
          <div className="flex justify-around w-full h-18 items-center">
            <BasicButton
              onClick={openModal}
              width="40"
              style="h-10 bg-red-600 hover:bg-red-700"
            >
              <p className="self-center">delete</p>
            </BasicButton>
            {Math.ceil(itemsNumber / itemsPerPage) > 0 && data.length && (
              <Pagination
                index={Math.ceil(itemsNumber / itemsPerPage)}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
          <Table hoverable={true} striped={true}>
            <Table.Head>
              <Table.HeadCell className="!p-4">
                <p>🎶</p>
              </Table.HeadCell>
              {data[0] &&
                Object.keys(data[0]).map((h) => (
                  <Table.HeadCell key={h}>{h}</Table.HeadCell>
                ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.map((d) => (
                <Table.Row
                  key={d.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="focus:ring-0 !p-4">
                    <Checkbox
                      checked={isChecked(d)}
                      onChange={(e) => handleSelectItem(e, d)}
                      className="focus:ring-0"
                    />
                  </Table.Cell>
                  {Object.keys(d).map((cell) => (
                    <Table.Cell key={cell}>{d[cell] || '--'}</Table.Cell>
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
