import { AXIOS } from "./Axios";

export async function getTenNewest() {
  res = await AXIOS.get(`/instrument/get_ten_newest`);
  return res.data;
}

export async function getInstrumentPicture(fileName) {
  const post = new FormData();
  post.append("fileName", fileName);
  return await AXIOS.post(`/instrument/get_picture`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getByFamilyName(name, data, offset, limit) {
  const post = new FormData();
  post.append("name", name);
  post.append("data", data);
  post.append("offset", offset);
  post.append("limit", limit);
  const res = await AXIOS.post(`/instrument/get_by_family_name`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function getByTypeName(name, data, offset, limit) {
  const post = new FormData();
  post.append("name", name);
  post.append("data", data);
  post.append("offset", offset);
  post.append("limit", limit);
  const res = await AXIOS.post(`/instrument/get_by_type_name`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
