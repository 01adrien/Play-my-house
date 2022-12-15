import { useEffect, useState } from 'react';
import { currentMonth, currentYear } from '../calendar/DatePickerUtils';
import { makeErrorToast } from '../utils';
import { useRecoilValue } from 'recoil';
import format from 'date-fns/format';
import { user } from '../store/user';
import {
  getInstrumentDisponibility,
  getReservationForOneByMonth,
  getDispoSlotsByDay,
  getTimelineByDay,
} from '../api/reservation';

export function useDatePicker(id, reFetchResa) {
  const [weekDispos, setWeekDispos] = useState({});
  const [arrayDays, setArrayDays] = useState([]);
  const [NotEmptyDays, setNotEmptyDays] = useState([]);
  const [notDispoDays, setNotDisposDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear());
  const [notDispoSlots, setNotDispoSlots] = useState('');
  const [noDispo, setNoDispo] = useState([]);
  const [openReservationModal, setOpenReservationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timelineDay, setTimelineDay] = useState({});
  const profile = useRecoilValue(user);

  function handleSelectDate(day) {
    if (!profile) return makeErrorToast({}, "Connectez-vous d'abord");
    if (profile.role !== 'user')
      return makeErrorToast(
        {},
        'Vous devez vous connecter en "USER" pour reserver un creneau..'
      );
    setTimelineDay({});
    setSelectedDate('');
    setNoDispo({});
    getDispoSlotsByDay(id, day).then(setNoDispo);
    const dayFormated = format(day, 'yyyy-MM-dd');
    setSelectedDate(dayFormated);
    getTimelineByDay(id, day)
      .then(setTimelineDay)
      .then(() => setOpenReservationModal(true));
  }

  function handleDayHover(day) {
    const formatDay = day.toLocaleDateString();
    if (NotEmptyDays.includes(formatDay)) {
      getDispoSlotsByDay(id, day).then((slots) => {
        return setNotDispoSlots({
          date: formatDay,
          slots: slots,
        });
      });
    }
  }

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
  }, [id, selectedMonth, selectedYear, reFetchResa, selectedDate]);

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
    timelineDay,
    noDispo,
    openReservationModal,
    selectedDate,
    setOpenReservationModal,
    handleSelectDate,
    handleDayHover,
    notDispoSlots,
    setNotDispoSlots,
  };
}
