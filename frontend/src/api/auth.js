import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/src/router";

export async function signin(credentials) {
  return await axios.post(
    `${BASE_URL}/auth/signin`,
    JSON.stringify(credentials)
  );
}

export async function login(credentials) {
  return await axios.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify(credentials)
  );
}
