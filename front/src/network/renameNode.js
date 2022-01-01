import axios from "./axios";

export default async function renameNode(path, name) {
  try {
    const response = await axios.put('/rename-node', {path, name});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
