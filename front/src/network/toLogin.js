import axios from "./axios";

export default async function toLogin(login, password) {
  try {
    const response = await axios.post("/login", {login, password});
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);
    return {ok: true, userId: response.data.userId}
  } catch (e) {
    window.e = e;
    return {ok: false, text: e.response.data.text};
  }
}
