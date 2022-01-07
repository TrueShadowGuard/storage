import axios from "./axios";

export default async function deleteNode(path, userId) {
  try {
    const response = await axios.post(`/user/${userId}/delete-node`, {path});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
