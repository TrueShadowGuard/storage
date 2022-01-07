import a from "axios";

const axios = a.create({
  baseURL: "http://localhost"
});

axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

axios.interceptors.response.use(null, (err) => {
  const error = err.response;
  if (error.status === 401) {
    window._navigate("/login");
  } else if (error.status === 403) {
    window._navigate("/forbidden")
  }
  return Promise.reject(err);
});


export default axios;
