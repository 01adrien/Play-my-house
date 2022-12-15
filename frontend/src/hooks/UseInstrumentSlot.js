import { useEffect, useState } from 'react';

export default function useInstrumentSlot() {
  const [currentDay, setCurrentDay] = useState('lundi');
  const [hours, setHours] = useState({ start: '', end: '' });
  const [days, setDays] = useState({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: [],
  });

  const handleOneSlotValidation = () =>
    days[currentDay].push([parseInt(hours.start), parseInt(hours.end)]);

  const rangeHours = (len, st) => Array.from({ length: len }, (_, i) => st + i);

  const timeChecker = rangeHours(15, 9)
    .slice(0, -1)
    .map((x) => ({
      slot: [x, x + 1],
      check: false,
    }));

  return {
    days,
    currentDay,
    setCurrentDay,
    setDays,
    hours,
    setHours,
    handleOneSlotValidation,
    rangeHours,
    timeChecker,
  };
}
