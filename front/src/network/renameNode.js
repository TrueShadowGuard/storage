import axios from "./axios";

export default async function renameNode(path, name, userId) {
  try {
    const response = await axios.put(`/user/${userId}/rename-node`, {path, name});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
