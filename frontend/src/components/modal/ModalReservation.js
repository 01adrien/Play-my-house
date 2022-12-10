import React, { usState, useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { user } from '../../store/user';
import { useRecoilValue } from 'recoil';
import { AiOutlineCalendar } from 'react-icons/ai';
import BasicSelect from '../select/BasicSelect';
import BasicToggle from '../toggle/BasicToggle';
import { createReservation } from '../../api/reservation';
import { makeErrorToast, makeSuccesToast, deepCopyFunction } from '../../utils';
import BasicButton from '../button/BasicButton';

export default function ModalReservation({
  onClose,
  instrument,
  noDispo,
  date,
  timeline,
}) {
  const profile = useRecoilValue(user);
  const { id, instrumentName, owner_id } = instrument;
  const [slots, setSlots] = useState({});
  const [selectedSlot, setselectedSlot] = useState({});
  const [reservationHours, setReservationHours] = useState({
    start: '',
    end: '',
  });

  const indispo = JSON.parse(noDispo);

  function getSlotsRightNumber(types) {
    return function (array) {
      if (types === 'START') {
        if (array.length < 3) return [array[0]];
        else return array.slice(0, -1);
      }
      if (types === 'END') {
        if (array.length < 3) return array.slice(-1);
        else return array.slice(1, array.length);
      }
    };
  }

  const removeFirstHour = getSlotsRightNumber('START');
  const removeLastHour = getSlotsRightNumber('END');

  function slotsReducer(acc, x) {
    if (indispo?.array.includes(x)) return acc;
    acc[timeline[x]]
      ? (acc[timeline[x]] = [...acc[timeline[x]], x])
      : (acc[timeline[x]] = [x]);
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

  function handleClose() {
    onClose();
    setSlots({});
  }

  function handleConfirmReservation() {
    const { start, end } = reservationHours;
    if (parseInt(start) >= parseInt(end) || !end || !start) {
      return makeErrorToast({}, 'Probleme selection horaires');
    }
    const startHour = `${date} ${start}:00:00`;
    const endHour = `${date} ${end}:00:00`;
    const body = {
      owner_id: owner_id,
      user_id: profile?.id,
      instrument_id: id,
      start: startHour,
      end: endHour,
    };

    createReservation(body)
      .then(() => {
        makeSuccesToast({}, 'Reservation cree avec succes!!');
      })
      .catch(() =>
        makeErrorToast(
          {},
          'Impossible de creer la reservation, merci de reessayer plus tard..'
        )
      );
    handleClose();
  }

  useEffect(() => {
    const daySlots = Object.keys(timeline).reduce(slotsReducer, {});
    const indispoInt = indispo.array.map((x) => parseInt(x));
    Object.keys(daySlots).map((slot) => {
      const currentSlot = daySlots[slot];
      const firstHour = parseInt(currentSlot[0]);
      const lastHour = parseInt(currentSlot[currentSlot.length - 1]);
      if (indispoInt.includes(firstHour - 1)) {
        currentSlot.unshift(firstHour - 1);
      }
      if (indispoInt.includes(lastHour + 1)) {
        currentSlot.push(lastHour + 1);
      }
    });

    //console.log(daySlots);
    //console.log(timeline);
    console.log(indispo.array);
    setSlots(daySlots);
  }, [id]);

  return (
    <Modal
      show={true}
      size="md"
      popup={true}
      onClose={handleClose}
      className="h-[100vh]"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center flex flex-col">
          <p className="mb-5 font-normal text-xl text-gray-500">{date}</p>
          <AiOutlineCalendar className="mx-auto mb-4 h-14 w-14 text-main_color" />
          <h3 className="mb-5 font-normal text-xl text-gray-500">
            {instrumentName}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              {slots &&
                Object.keys(slots).map((slot, i) => {
                  const [last] = slots[slot].slice(-1);
                  return (
                    <div key={i}>
                      <p className="text center text-sm  text-gray-500">
                        Creneau(x) entre {slots[slot][0]}h et {last}h
                      </p>
                      <div className="w-full flex justify-around py-2 items-center">
                        <BasicSelect
                          disabled={!selectedSlot || !selectedSlot[i]}
                          setValue={setReservationHours}
                          index={'start'}
                          value={reservationHours.start}
                          deflt={' 🕐 '}
                          data={removeFirstHour(slots[slot])}
                          label={'heure de debut*'}
                        />
                        <BasicSelect
                          disabled={!selectedSlot || !selectedSlot[i]}
                          setValue={setReservationHours}
                          index={'end'}
                          value={reservationHours.end}
                          deflt={' 🕐 '}
                          data={removeLastHour(slots[slot])}
                          label={'heure de fin*'}
                        />
                        <BasicToggle
                          setValue={() => handleSelectSlot(i)}
                          value={selectedSlot && selectedSlot[i]}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
            <BasicButton className="text-xl" onClick={handleConfirmReservation}>
              <p>JE RESERVE</p>
            </BasicButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
