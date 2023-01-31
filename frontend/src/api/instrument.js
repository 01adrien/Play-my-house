import { AXIOS } from './Axios';

export async function getTenNewest() {
  const res = await AXIOS.get(`/instrument/get_ten_newest`);
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

export async function getAllFamily() {
  const res = await AXIOS.get(`/instrument/get_all_family`);
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

export async function getInstrumentById(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/get_by_id`, post);
  return res.data;
}

export async function searchInstrument(search, offset, limit) {
  const post = new FormData();
  post.append('offset', offset);
  post.append('limit', limit);
  post.append('search', JSON.stringify(search));
  console.log('search', search);
  const res = await AXIOS.post(`/instrument/search_instrument`, post);
  return res.data;
}

export async function getSearchCount(search) {
  const post = new FormData();
  post.append('search', JSON.stringify(search));
  const res = await AXIOS.post(`/instrument/get_search_count`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function getAllPictureForOne(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/get_all_pictures_for_one`, post);
  return res.data;
}

export async function getInstrumentAdmin(offset, limit) {
  const post = new FormData();
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/instrument/get_admin_data`, post);
  return res.data;
}

export async function getInstrumentToValidate(offset, limit) {
  const post = new FormData();
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/instrument/get_instrument_to_validate`, post);
  return res.data;
}

export async function getCountToValidate() {
  const res = await AXIOS.post(`/instrument/get_count_to_validate`);
  const [count] = Object.values(res.data);
  return count;
}

export async function deleteInstrument(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.delete(`/instrument/delete`, post);
  return res.data;
}

export async function getOwnerInstrument(id, nullArg, offset, limit) {
  const post = new FormData();
  post.append('null', nullArg);
  post.append('offset', offset);
  post.append('limit', limit);
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/get_owner_instrument`, post);
  return res.data;
}

export async function getOwnerCount(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/get_count_by_owner`, post);
  const [count] = Object.values(res.data);
  return count;
}

export async function createInstrument(body) {
  const post = new FormData();
  Object.keys(body).forEach((key) => {
    post.append(key, body[key]);
  });
  const res = await AXIOS.post(`/instrument/create_instrument`, post);
  return res.data;
}

export async function uploadPicture(body) {
  const post = new FormData();
  Object.keys(body).forEach((key) => {
    post.append(key, body[key]);
  });
  return await AXIOS.post(`/instrument/upload_picture`, post, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function validateOrNotInstrument(action, id) {
  const post = new FormData();
  post.append('action', action);
  post.append('id', id);
  const res = await AXIOS.post(`/instrument/admin_validation`, post);
  return res.data;
}
