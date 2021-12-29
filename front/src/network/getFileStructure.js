import axios from './axios';

export default async function getFileStructure() {
  try {
    const response = await axios.get("/structure")
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
