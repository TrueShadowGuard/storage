import axios from "./axios";

export default async function deleteNode(path) {
  try {
    const response = await axios.post('/delete-node', {path});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
