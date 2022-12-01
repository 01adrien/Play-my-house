import { AXIOS } from './Axios';

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
  console.log(id, month, year);
  const post = new FormData();
  post.append('id', id);
  post.append('month', month);
  post.append('year', year);
  const res = await AXIOS.post(
    `/reservation/get_reservation_for_one_by_month`,
    post
  );
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
