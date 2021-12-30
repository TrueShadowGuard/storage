import axios from "./axios";

export default async function createFile(path, file, name) {
  try {
    const form = new FormData();
    form.append("path", path);
    form.append("file", file);
    form.append("name", name);
    form.append("type", "file");
    const response = await axios.post('/create', form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
