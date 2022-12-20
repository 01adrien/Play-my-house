import { useState, useEffect } from 'react';
import { getInstrumentById } from '../api/instrument';
import { getInstrumentDisponibility } from '../api/reservation';
import { validateOrNotInstrument } from '../api/instrument';

export default function useAdminVAlidation(
  instrumentToValidate,
  fn1,
  setItemsNumber
) {
  const [showModalAdmin, setShowModalAdmin] = useState(false);
  const [instrumentInfos, setInstrumentInfos] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const openModalAdmin = () => setShowModalAdmin(true);
  const closeModalAdmin = () => setShowModalAdmin(false);

  const handleValidation = (action, id) =>
    validateOrNotInstrument(action, id).then(() => fn1().then(setItemsNumber));

  const handleDeny = (action, id) =>
    validateOrNotInstrument(action, id).then(() => fn1().then(setItemsNumber));

  useEffect(() => {
    if (instrumentToValidate) {
      getInstrumentById(instrumentToValidate.id).then(setInstrumentInfos);
      getInstrumentDisponibility(instrumentToValidate.id).then(setSchedule);
    }
  }, [instrumentToValidate]);

  return {
    openModalAdmin,
    closeModalAdmin,
    handleValidation,
    showModalAdmin,
    instrumentInfos,
    schedule,
    handleDeny,
  };
}
