import axios from "axios";

let API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) {
  throw new Error("VITE_API_URL is not defined in your .env file. Example: VITE_API_URL=http://localhost:5000");
}
// remove trailing slashes
API_BASE = API_BASE.replace(/\/+$|\s+/g, "");
// ensure it ends with /api
const baseURL = API_BASE.endsWith("/api") ? API_BASE : API_BASE + "/api";

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("rms_token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // unauthorized - clear tokens
      localStorage.removeItem("rms_token");
      localStorage.removeItem("rms_user");
      // optional: redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
