import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/src/router";

export async function getPictureName(id) {
  return await axios.get(`${BASE_URL}/users/picture-name/${id}`);
}

export async function getPicture(name) {
  return await axios.get(`${BASE_URL}/user/picture/${name}`);
}
