import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL;

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function pingServer() {
  return await AXIOS.get('/');
}
