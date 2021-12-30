import axios from "./axios";

export default async function createFolder(path) {
  try {
    const response = await axios.post('/create', {path, type: "folder"});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
