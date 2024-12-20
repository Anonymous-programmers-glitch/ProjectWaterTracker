import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// export const setAuthHeader = (token) => {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearAuthHeader = () => {
//   api.defaults.headers.common.Authorization = "";
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post("/auth/refresh");
//         const { accessToken } = response.data;
//         setAuthHeader(accessToken);
//         localStorage.setItem("accessToken", accessToken);

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         window.location.href = "/signin";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );

export default axios;
// export default api;
