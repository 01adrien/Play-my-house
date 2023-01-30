import { AXIOS } from './Axios';

export async function getPicture(id, fileName) {
  const post = new FormData();
  post.append('id', id);
  post.append('fileName', fileName);
  return await AXIOS.post(`/user_picture/get_picture`, post);
}

export async function getPictureByUserId(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/user_picture/get_picture_by_user_id`, post);
  return res.data;
}

export async function uploadPicture(body) {
  const { id, name, selectedFile, picture_id } = body;
  const post = new FormData();
  post.append('file', selectedFile);
  post.append('name', name);
  post.append('id', id);
  post.append('picture_id', picture_id);

  return await AXIOS.post(`/user_picture/upload_picture`, post, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getProfile() {
  const res = await AXIOS.get(`/user/get_profil`);
  return res.data;
}

export async function getUserById(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(`/user/get_by_ID`, post);
  return res.data;
}

export async function getUserAdmin(offset, limit) {
  const post = new FormData();
  post.append('offset', offset);
  post.append('limit', limit);
  const res = await AXIOS.post(`/user/get_admin_data`, post);
  return res.data;
}

export async function getUserCount() {
  const res = await AXIOS.get(`/user/get_count`);
  const [count] = Object.values(res.data);
  return count;
}

export async function deleteUser(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.delete(`/user/delete`, post);
  return res.data;
}

export async function modifyProfil(body) {
  const post = new FormData();
  const array = Object.keys(body);
  array.map((item) => {
    body[item] !== '' && post.append(item, body[item]);
  });
  const res = await AXIOS.post(`/user/modify_profil`, post);
  return res.data;
}
