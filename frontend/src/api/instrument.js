import { AXIOS } from './Axios';

export async function getTenNewest() {
  res = await AXIOS.get(`/instrument/get_ten_newest`);
  return res.data;
}

export async function getInstrumentPicture(fileName) {
  const post = new FormData();
  post.append('fileName', fileName);
  return await AXIOS.post(`/instrument/get_picture`, post);
}

export async function getByFamilyName(name, data, offset, limit) {
  const post = new FormData();
  post.append('name', name);
  post.append('data', data);
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/instrument/get_by_family_name`, post);
  return res.data;
}

export async function getByTypeName(name, data, offset, limit) {
  const post = new FormData();
  post.append('name', name);
  post.append('data', data);
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/instrument/get_by_type_name`, post);
  return res.data;
}

export async function getAllBrand() {
  const res = await AXIOS.get(`/instrument/get_all_brand`);
  return res.data;
}

export async function getAllType() {
  const res = await AXIOS.get(`/instrument/get_all_type`);
  return res.data;
}

export async function getInstruments(offset, limit) {
  const post = new FormData();
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/instrument/get_all`, post);
  return res.data;
}

export async function getInstrumentCount() {
  const res = await AXIOS.get(`/instrument/get_count`);
  const [count] = Object.values(res.data);
  return count;
}

export async function getCountByFamilyName(name) {
  const post = new FormData();
  post.append('name', name);
  const res = await AXIOS.post(`/instrument/get_count_by_family_name`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getCountByTypeName(name) {
  const post = new FormData();
  post.append('name', name);
  const res = await AXIOS.post(`/instrument/get_count_by_type_name`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getAllPictureForOne(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/get_all_pictures_for_one`, post);
  return res.data;
}
