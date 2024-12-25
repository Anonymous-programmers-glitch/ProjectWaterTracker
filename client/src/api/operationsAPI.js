import axios from "axios";

// axios.defaults.baseURL = "https://projectwatertrackerteam4.onrender.com";
axios.defaults.baseURL = "http://localhost:3000";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export default axios;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

// export const setAuthHeader = (token) => {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearAuthHeader = () => {
//   // api.defaults.headers.common.Authorization = "";
//   delete api.defaults.headers.common.Authorization;
// };

// const token = localStorage.getItem("accessToken");
// if (token) {
//   setAuthHeader(token);
// }

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post(
//           "/auth/refresh",
//           {},
//           { withCredentials: true }
//         );
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

// export default api;
