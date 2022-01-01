import axios from "./axios";

export default async function createFile(path, file, name) {
  try {
    const response = await axios.post('/create', {path, name, type: "file", file});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
