export function makeSlotsChunks(slot) {
  const arr = Array.from(
    { length: slot[1] - slot[0] + 1 },
    (_, i) => i + slot[0]
  );
  if (arr.length === 2) return [[arr]];
  arr.pop();
  return arr.map((s) => [s, s + 1]);
}

export function isDispoSlot(slot, chunks) {
  let dispo = false;
  chunks.forEach((s) => {
    if (JSON.stringify(slot) === JSON.stringify(s)) {
      dispo = true;
    }
    if (dispo) return;
  });
  return dispo;
}

export function getSlotsRightNumber(types) {
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

export function reservationSlotsControl(timeChecker) {
  return function (resa) {
    let valid = true;
    timeChecker.forEach((t) => {
      resa.forEach((r) => {
        if (
          JSON.stringify(t.slot[0]) ==
            JSON.stringify(resa.length === 1 ? r[0] : r) &&
          t.check === true
        ) {
          console.log('creneau deja pris');
          return (valid = false);
        }
      });
    });
    return valid;
  };
}

export function isValidHours(start, end) {
  return start >= end || !start || !end ? false : true;
}

export const timelineReducer = (acc, x) => {
  !acc[x[0]] && (acc[x[0]] = 0);
  return acc;
};
