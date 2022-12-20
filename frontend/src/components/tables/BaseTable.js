import React, { useState } from 'react';
import { Table, Checkbox } from 'flowbite-react';
import Spinner from '../icons/Spinner';
import { SiApplemusic } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination';
import BasicButton from '../button/BasicButton';
import ModalDelete from '../modal/ModalDelete';
import ModalAdminValidation from '../modal/ModalAdminValidation';
import { useDeleteItems, viewTolabel } from '../../hooks/useDeleteItems';
import useMediaQuery from '../../hooks/useMediaQuery';
import useAdminVAlidation from '../../hooks/useAdminValidation';

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

  const [instrumentToValidate, setinstrumentToValidate] = useState(null);

  const {
    openModalAdmin,
    closeModalAdmin,
    showModalAdmin,
    instrumentInfos,
    schedule,
    userInfos,
    handleDeny,
    handleValidation,
  } = useAdminVAlidation(instrumentToValidate, fn1, setItemsNumber);

  const isMobile = useMediaQuery('(max-width: 700px)');

  function handleSelectInstrument(instrument) {
    if (view === 'ADMIN_VALIDATION') {
      setinstrumentToValidate(instrument);
      openModalAdmin();
    }
  }

  const displayStatus = (value) => {
    const status = (color) => {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <div
            className={`w-[10px] h-[10px] rounded-full bg-${color}-600`}
          ></div>
        </div>
      );
    };
    if (value === 'NV') return status('yellow');
    if (value === 'V') return status('green');
    if (value === 'A') return status('red');
    return value;
  };

  return (
    <>
      {!loading ? (
        <div className="flex flex-col mb-8">
          <div className="text-center mb-8">{title.toUpperCase()}</div>
          <div
            className={`flex justify-around w-full text-sm h-10 items-center mb-8`}
          >
            {view !== 'ADMIN_VALIDATION' && (
              <BasicButton
                onClick={openModal}
                width={isMobile ? '16' : '40'}
                style="h-10 bg-red-600 hover:bg-red-700 hover:scale-105 text-xs"
              >
                <p className="self-center">supprimer</p>
              </BasicButton>
            )}
            <SiApplemusic className="text-2xl" />
            <p className={`${isMobile ? 'text-xs' : 'text-base'} text-thin`}>
              {itemsNumber + ' ' + viewTolabel[view]}
            </p>
          </div>
          <Table
            hoverable={true}
            striped={true}
            className="min-w-[500px] !focus:ring-0 mt-6"
          >
            <Table.Head className="sticky top-0">
              {data.length & (view !== 'ADMIN_VALIDATION') ? (
                <>
                  <Table.HeadCell className="text-center !p-4">
                    <p>🎶</p>
                  </Table.HeadCell>
                  {view === 'OWNER_INSTRUMENT' && (
                    <Table.HeadCell>editer</Table.HeadCell>
                  )}
                </>
              ) : (
                ''
              )}
              {data[0] &&
                Object.keys(data[0]).map((h) => (
                  <Table.HeadCell className="!px-2 text-xs text-center" key={h}>
                    {h}
                  </Table.HeadCell>
                ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.map((d) => (
                <Table.Row
                  key={d.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => handleSelectInstrument(d)}
                >
                  {view !== 'ADMIN_VALIDATION' && (
                    <Table.Cell
                      key={d.id}
                      className="!focus:ring-0 !p-4 text-sm"
                    >
                      <Checkbox
                        key={d.id}
                        checked={isChecked(d, view)}
                        onChange={(e) => handleSelectItem(e, d)}
                        className="!focus:ring-0"
                      />
                    </Table.Cell>
                  )}
                  {view === 'OWNER_INSTRUMENT' && (
                    <Table.Cell className="text-center">
                      <FiEdit className="text-center" />
                    </Table.Cell>
                  )}

                  {Object.keys(d).map((cell, i) => (
                    <Table.Cell
                      className={`text-center text-xs !px-2 ${
                        i % 2 === 0 && 'text-main_color'
                      }`}
                      key={cell}
                    >
                      {displayStatus(d[cell]) || '*'}
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
          {showModalAdmin && (
            <ModalAdminValidation
              onClose={closeModalAdmin}
              onConfirm={handleValidation}
              instrument={instrumentToValidate}
              instrumentInfos={instrumentInfos}
              schedule={schedule}
              userInfos={userInfos}
              onDeny={handleDeny}
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
