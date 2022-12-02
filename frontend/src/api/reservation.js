import { AXIOS } from './Axios';
import format from 'date-fns/format';

export async function getInstrumentDisponibility(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(
    `/reservation/get_instrument_disponibility`,
    post
  );
  return res.data;
}

export async function getReservationForOneByMonth(id, month, year) {
  const post = new FormData();
  month < 10 ? post.append('month', `0${month}`) : post.append('month', month);
  post.append('id', id);
  post.append('year', year);
  const res = await AXIOS.post(
    `/reservation/get_reservation_for_one_by_month`,
    post
  );
  return res.data;
}

export async function getDispoSlotsByDay(id, day) {
  const post = new FormData();
  post.append('id', id);
  post.append('day', format(day, 'yyyy-MM-dd'));
  const res = await AXIOS.post(`/reservation/get_dispo_slots_by_day`, post);
  return res.data;
}

data = [
  {
    day: '28/12/2022',
    dispo: [{ '13-14': false }, { '14-15': true }, { '15-16': false }],
  },
  {
    day: '30/12/2022',
    dispo: ['18-21', '21-22'],
  },
];
