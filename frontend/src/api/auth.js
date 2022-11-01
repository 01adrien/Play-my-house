import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080/src/router";

export async function signin(credentials) {
  return await axios.post(
    `${BASE_URL}/auth/signin`,
    JSON.stringify(credentials)
  );
}

export async function getUsers() {
  return await axios.get("http://127.0.0.1:8080/src/router/users");
}
