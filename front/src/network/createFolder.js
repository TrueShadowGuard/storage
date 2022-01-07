import axios from "./axios";

export default async function createFolder(path, userId) {
  try {
    const name = window.prompt("Enter new folder name");
    const response = await axios.post(`/user/${userId}/create`, {path, type: "folder", name});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
