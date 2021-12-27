import axios from 'axios';

export default async function getFileStructure() {
  return (await axios.get("/structure")).data;
}
