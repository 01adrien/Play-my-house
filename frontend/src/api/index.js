import { AXIOS } from "./Axios";

export async function getMenuItems() {
  res = await AXIOS.get(`/instrument/get_menu_items`);
  return res.data;
}
