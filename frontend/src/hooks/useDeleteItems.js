import { useState } from 'react';
import { deleteInstrument } from '../api/instrument';
import { deleteUser } from '../api/user';
import { makeSuccesToast } from '../utils';

export const viewTolabel = {
  ADMIN_USERS: 'utilisateur(s)',
  ADMIN_INSTRUMENTS: 'instrument(s)',
};

const viewToFunction = {
  ADMIN_USERS: deleteUser,
  ADMIN_INSTRUMENTS: deleteInstrument,
};

export function useDeleteItems(view, fn1, setItemsNumber) {
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  function handleSelectItem(e, item) {
    e.target.checked
      ? setItemsToDelete((prev) => [...prev, item])
      : setItemsToDelete((prev) => prev.filter((i) => i.id !== item.id));
  }

  function closeModal() {
    setShowModal(false);
    setItemsToDelete([]);
  }

  function handleConfirm() {
    itemsToDelete.forEach((items) => viewToFunction[view](items.id));
    makeSuccesToast({}, 'suppression effectuée!');
    fn1().then(setItemsNumber);
    closeModal();
  }

  return {
    itemsToDelete,
    setItemsToDelete,
    closeModal,
    openModal,
    handleSelectItem,
    showModal,
    handleConfirm,
  };
}
