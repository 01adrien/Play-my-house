import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function pingServer() {
  return await AXIOS.get("/");
}
