import axios from './axios';

export default async function getFileStructure(userId) {
  try {
    const response = await axios.get(`/user/${userId}/structure`)
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
