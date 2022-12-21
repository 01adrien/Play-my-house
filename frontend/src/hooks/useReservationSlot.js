import { useState } from 'react';
import {
  makeSlotsChunks,
  isValidHours,
  timelineReducer,
} from '../utils/utilsResa';
import { createTimeline } from '../api/reservation';
import { timelineIds } from '../store/user';
import { useSetRecoilState } from 'recoil';

export default function useReservationSlot() {
  const setTimelines = useSetRecoilState(timelineIds);
  const [currentDay, setCurrentDay] = useState(0);
  const [hours, setHours] = useState({ start: '', end: '' });
  const [days, _] = useState({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: [],
  });

  const numToDay = {
    0: 'lundi',
    1: 'mardi',
    2: 'mercredi',
    3: 'jeudi',
    4: 'vendredi',
    5: 'samedi',
    6: 'dimanche',
  };

  const rangeHours = (len, st) => Array.from({ length: len }, (_, i) => st + i);

  const initialTimeCheckerState = rangeHours(15, 9)
    .slice(0, -1)
    .map((x) => ({
      slot: [x, x + 1],
      check: false,
    }));

  const [timeChecker, setTimechecker] = useState(initialTimeCheckerState);

  function isValidSlots(slots) {
    let valid = true;
    timeChecker.forEach((t) => {
      slots.forEach((r) => {
        if (
          JSON.stringify(t.slot) ==
            JSON.stringify(slots.length === 1 ? r[0] : r) &&
          t.check === true
        ) {
          return (valid = false);
        }
      });
    });
    return valid;
  }

  const resetTimeChecker = () => setTimechecker(initialTimeCheckerState);
  const resetHour = () => setHours({ start: '', end: '' });

  function hydrateTimeChecker(toCompare, type) {
    timeChecker.forEach((t, i) => {
      toCompare.forEach((s) => {
        if (
          JSON.stringify(t.slot) == JSON.stringify(s.length === 1 ? s[0] : s)
        ) {
          const newState = timeChecker.slice();
          newState[i].check = true;
          setTimechecker(newState);
          if (type === 'A') {
            days[numToDay[currentDay]].push(s.length === 1 ? s[0] : s);
          }
          if (type === 'D') {
            days[numToDay[currentDay]] = toCompare;
          }
        }
      });
    });
  }

  function handleOneSlotValidation() {
    const { start, end } = hours;
    const startInt = parseInt(start);
    const endInt = parseInt(end);
    const slotsRange = makeSlotsChunks([startInt, endInt]);
    if (!isValidHours(startInt, endInt) || !isValidSlots(slotsRange))
      return false;
    hydrateTimeChecker(slotsRange, 'A');
    resetHour();
    return true;
  }

  function nextDay() {
    if (currentDay === 6) return;
    resetTimeChecker();
    hydrateTimeChecker(days[numToDay[currentDay + 1]], 'H');
    setCurrentDay((prev) => prev + 1);
    resetHour();
  }

  function prevDay() {
    if (currentDay === 0) return;
    resetTimeChecker();
    hydrateTimeChecker(days[numToDay[currentDay - 1]], 'H');
    setCurrentDay((prev) => prev - 1);
    resetHour();
  }

  function handleDeleteHour(hour) {
    console.log(numToDay[currentDay]);
    resetTimeChecker();
    hydrateTimeChecker(
      days[numToDay[currentDay]].filter((h) => h !== hour),
      'D'
    );
  }

  async function formatDaySlotAndPostTimeline() {
    Object.keys(days).forEach(async (day) => {
      const totalHours = days[day].length;
      if (days[day].length) {
        let slotNumber = 1;
        const timelineScheme = makeSlotsChunks([9, 24]).reduce(
          timelineReducer,
          {}
        );
        const timelineObject = days[day].reduce(timelineReducer, {});
        const timelineArray = Object.keys(timelineObject);
        timelineObject[timelineArray[0]] = 1;
        const lastHour = parseInt(timelineArray[timelineArray.length - 1]);
        if (lastHour !== 23) timelineArray.push;
        timelineArray.forEach((h, i) => {
          if (i > 1 && parseInt(h) - 1 !== parseInt(timelineArray[i - 1])) {
            timelineObject[parseInt(timelineArray[i - 1]) + 1] = slotNumber;
            slotNumber++;
            timelineObject[timelineArray[i]] = slotNumber;
          } else {
            timelineObject[timelineArray[i]] = slotNumber;
          }
        });
        console.log(timelineObject);
        const data = {
          ...timelineScheme,
          ...timelineObject,
          total_hours: totalHours,
        };
        const { id } = await createTimeline(data);
        setTimelines((prev) => ({ ...prev, [day]: id }));
      }
    });
    resetHour();
    resetTimeChecker();
    setTimelines((prev) => ({ ...prev, done: true }));
  }

  return {
    days,
    currentDay,
    hours,
    setHours,
    rangeHours,
    numToDay,
    handleDeleteHour,
    nextDay,
    prevDay,
    handleOneSlotValidation,
    formatDaySlotAndPostTimeline,
  };
}
