import { AXIOS } from './Axios';

export async function getInstrumentDisponibility(id) {
  const post = new FormData();
  post.append('id', id);
  const res = await AXIOS.post(
    `/reservation/get_instrument_disponibility`,
    post,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data;
}
