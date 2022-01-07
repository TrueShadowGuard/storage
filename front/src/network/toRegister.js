import axios from "./axios";

export default async function toRegister(login, password) {
  try {
    const response = await axios.post("/register", {login, password});
    return {ok: true, text: response.data.text};
  } catch (e) {
    console.error(e);
    return {ok: false, text: e.response.data.text};
  }
}
