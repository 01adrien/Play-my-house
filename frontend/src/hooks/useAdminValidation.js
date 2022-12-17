import { useState, useEffect } from 'react';
import { getInstrumentById } from '../api/instrument';
import { getInstrumentDisponibility } from '../api/reservation';
import { getUserById } from '../api/user';

export default function useAdminVAlidation(instrumentToValidate) {
  const [showModalAdmin, setShowModalAdmin] = useState(false);
  const [instrumentInfos, setInstrumentInfos] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const openModalAdmin = () => setShowModalAdmin(true);
  const closeModalAdmin = () => setShowModalAdmin(false);

  const handleValidation = () => null;
  const handleDeny = () => null;

  useEffect(() => {
    if (instrumentToValidate) {
      getInstrumentById(instrumentToValidate.id).then(setInstrumentInfos);
      getInstrumentDisponibility(instrumentToValidate.id).then(setSchedule);
      // getUserById(instrumentToValidate.owner_id).then(setUserInfos);
    }
  }, [instrumentToValidate]);

  return {
    openModalAdmin,
    closeModalAdmin,
    handleValidation,
    showModalAdmin,
    instrumentInfos,
    schedule,
    userInfos,
    handleDeny,
  };
}
