import { AXIOS } from './Axios';
import format from 'date-fns/format';
import { DateNumToStr } from '../calendar/DatePickerUtils';

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

export async function getTimelineByDay(id, day) {
  const post = new FormData();
  const dayName = DateNumToStr[day.getDay()];
  post.append('day_name', dayName);
  post.append('id', id);
  post.append('day', format(day, 'yyyy-MM-dd'));
  const res = await AXIOS.post(`/reservation/get_timeline_by_day`, post);
  return res.data;
}

export async function getUserReservation(id, active, offset, limit) {
  const post = new FormData();
  post.append('id', id);
  post.append('offset', offset);
  post.append('limit', limit);
  post.append('active', active);
  const res = await AXIOS.post(`/reservation/get_user_reservation`, post);
  return res.data;
}

export async function getActiveCountByUser(id) {
  const post = new FormData();
  post.append('id', id);
  post.append('active', 1);
  const res = await AXIOS.post(`/reservation/get_count_by_user`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getInactiveCountByUser(id) {
  const post = new FormData();
  post.append('id', id);
  post.append('active', 0);
  const res = await AXIOS.post(`/reservation/get_count_by_user`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getOwnerReservation(id, active, offset, limit) {
  const post = new FormData();
  post.append('id', id);
  post.append('offset', offset);
  post.append('limit', limit);
  post.append('active', active);
  const res = await AXIOS.post(`/reservation/get_owner_reservation`, post);
  return res.data;
}

export async function getActiveCountByOwner(id) {
  const post = new FormData();
  post.append('id', id);
  post.append('active', 1);
  const res = await AXIOS.post(`/reservation/get_count_by_owner`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getInactiveCountByOwner(id) {
  const post = new FormData();
  post.append('id', id);
  post.append('active', 0);
  const res = await AXIOS.post(`/reservation/get_count_by_owner`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function deleteReservation(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.delete(`/reservation/delete`, post);
  return res.data;
}

export async function createReservation(body) {
  const post = new FormData();
  Object.keys(body).forEach((key) => {
    post.append(key, body[key]);
  });
  const res = await AXIOS.post(`/reservation/create`, post);
  return res.data;
}

export async function createTimeline(body) {
  const post = new FormData();
  Object.keys(body).forEach((key) => {
    post.append(key, body[key]);
  });
  const res = await AXIOS.post(`/reservation/create_get_timeline`, post);
  return res.data;
}
