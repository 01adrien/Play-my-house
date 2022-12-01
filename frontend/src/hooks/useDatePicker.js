import { useEffect, useState } from 'react';
import { currentMonth, currentYear } from '../calendar/DatePickerUtils';
import {
  getInstrumentDisponibility,
  getReservationForOneByMonth,
} from '../api/reservation';

export function useDatePicker(id) {
  const [weekDispos, setWeekDispos] = useState({});
  const [arrayDays, setArrayDays] = useState([]);
  const [NotEmptyDays, setNotEmptyDays] = useState([]);
  const [notDispoDays, setNotDisposDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear());

  useEffect(() => {
    setArrayDays([]);
    setNotDisposDays([]);
    getInstrumentDisponibility(id).then((week) => {
      setWeekDispos(week);
      Object.keys(week).map((day) => setArrayDays((prev) => [day, ...prev]));
    });
    getReservationForOneByMonth(id, selectedMonth, selectedYear).then(
      (resas) => {
        Object.keys(resas).map((r) => {
          const date = new Date(resas[r]['date']).toLocaleDateString();
          if (!resas[r]['dispo_slots']) {
            setNotDisposDays((prev) => [...prev, date]);
          } else {
            setNotEmptyDays((prev) => [...prev, date]);
          }
        });
      }
    );
  }, [id, selectedMonth, selectedYear]);

  return {
    weekDispos,
    arrayDays,
    setArrayDays,
    NotEmptyDays,
    notDispoDays,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
  };
}
