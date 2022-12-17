import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { listToDelete } from '../../store/user';
import { useRecoilValue } from 'recoil';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ModalDelete({ onClose, onConfirm, label }) {
  const items = useRecoilValue(listToDelete);
  return (
    <Modal show={true} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {items.length ? (
              <div className="text-sm">
                <p>Voulez-vous vraiment supprimmer ces ou cet {label}:</p>
              </div>
            ) : (
              <p>Vous n'avez rien selectionné !</p>
            )}
          </h3>
          {items.length ? (
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onConfirm}>
                OUI
              </Button>
              <Button color="gray" onClick={onClose}>
                NON
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
