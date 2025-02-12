import axios from "axios";

axios.defaults.baseURL = "https://projectwatertrackerteam4.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export default axios;
