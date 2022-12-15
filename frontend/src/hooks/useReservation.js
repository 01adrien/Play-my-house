import { useEffect, useState } from 'react';
import { isDispoSlot } from '../utils/utilsResa';

export default function useReservation(indispo, timeline, id) {
  const [slots, setSlots] = useState({});
  const [selectedSlot, setselectedSlot] = useState({});
  const [timeChecker, setTimeChecker] = useState([]);
  const [reservationHours, setReservationHours] = useState({
    start: '',
    end: '',
  });

  function timelineReducer(acc, x) {
    acc[timeline[x]]
      ? (acc[timeline[x]] = [
          ...acc[timeline[x]],
          [parseInt(x), parseInt(x) + 1],
        ])
      : (acc[timeline[x]] = [[parseInt(x), parseInt(x) + 1]]);
    return acc;
  }

  function handleSelectSlot(i) {
    setReservationHours({});
    if (!selectedSlot || !selectedSlot[i]) {
      setselectedSlot((prev) => ({ ...prev, [i]: true }));
    }
    if (selectedSlot || selectedSlot[i]) {
      setselectedSlot((prev) => ({ ...prev, [i]: !selectedSlot[i] }));
    }
    if (selectedSlot) {
      Object.keys(selectedSlot).forEach((el) => {
        if (el != i) {
          setselectedSlot((prev) => ({ ...prev, [el]: false }));
        }
      });
    }
  }

  function getSlotNumber() {
    const { start, end } = reservationHours;
    let number;
    Object.keys(slots).forEach((s) => {
      if (
        [...slots[s]].includes(parseInt(start)) &&
        [...slots[s]].includes(parseInt(end))
      ) {
        number = s;
      }
    });
    return number;
  }

  useEffect(() => {
    setTimeChecker([]);
    const timelineCheck = Object.keys(timeline).reduce(timelineReducer, {});
    const { slotsChunk } = indispo;
    Object.keys(timelineCheck).forEach((t) => {
      timelineCheck[t].slice(0, -1).forEach((hour) => {
        setTimeChecker((prev) => [
          ...prev,
          {
            slot: [hour],
            check: isDispoSlot(hour, slotsChunk),
          },
        ]);
      });
    });
    const daySlots = Object.keys(timeline).reduce(timelineReducer, {});
    Object.keys(daySlots).forEach((s) => {
      daySlots[s].pop();
      daySlots[s] = new Set(
        daySlots[s].filter((x) => !isDispoSlot(x, slotsChunk)).flat()
      );
    });
    setSlots(daySlots);
  }, [id]);

  return {
    slots,
    setSlots,
    selectedSlot,
    setselectedSlot,
    timeChecker,
    setTimeChecker,
    reservationHours,
    setReservationHours,
    handleSelectSlot,
    getSlotNumber,
  };
}
