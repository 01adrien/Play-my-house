import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/src/router";

export async function getPicture(id) {
  return await axios.get(`${BASE_URL}/users/picture/${id}`);
}

export async function uploadPicture(body) {
  const { id, name, selectedFile, keypass, picture_id } = body;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("keypass", keypass);
  formData.append("file", selectedFile);
  formData.append("id", id);
  formData.append("picture_id", picture_id);

  return await axios.post(`${BASE_URL}/users/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
