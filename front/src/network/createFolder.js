import axios from "./axios";

export default async function createFolder(path) {
  try {
    const name = window.prompt("Enter new folder name");
    const response = await axios.post('/create', {path, type: "folder", name});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
