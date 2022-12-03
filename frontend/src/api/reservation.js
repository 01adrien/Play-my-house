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

export async function getActiveUserReservation(id, offset, limit) {
  const post = new FormData();
  post.append('id', id);
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(
    `/reservation/get_active_user_reservation`,
    post
  );
  return res.data;
}

export async function getActiveCountByUser(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/reservation/get_active_count_by_user`, post);
  return res.data;
}

export async function getInactiveUserReservation(id, offset, limit) {
  const post = new FormData();
  post.append('id', id);
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(
    `/reservation/get_inactive_user_reservation`,
    post
  );
  return res.data;
}

export async function getInactiveCountByUser(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/reservation/get_inactive_count_by_user`, post);
  return res.data;
}
