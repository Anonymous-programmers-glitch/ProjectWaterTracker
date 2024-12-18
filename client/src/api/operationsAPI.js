import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Функція для оновлення токена
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post("/auth/refresh", null, {
      withCredentials: true,
    });
    const { accessToken } = data.data;

    // Зберігаємо токен у localStorage
    localStorage.setItem("accessToken", accessToken);

    // Оновлюємо заголовок авторизації
    setAuthHeader(accessToken);

    return accessToken;
  } catch (error) {
    console.error(
      "Failed to refresh token:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Додавання інтерсепторів
axios.interceptors.response.use(
  (response) => response, // Якщо відповідь успішна, просто повертаємо її
  async (error) => {
    const originalRequest = error.config;

    // Перевірка на 401 помилку та запобігання зацикленню
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Позначаємо, що вже намагалися оновити токен

      try {
        const newAccessToken = await refreshAccessToken();

        // Додаємо оновлений токен до оригінального запиту
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Повторно виконуємо запит
        return axios(originalRequest);
      } catch (refreshError) {
        // Якщо оновлення токена не вдалося, очищуємо локальні дані та перенаправляємо користувача
        clearAuthHeader();
        localStorage.removeItem("accessToken");
        console.error("Token refresh failed. Redirecting to login.");

        // Наприклад, перенаправлення на сторінку логіну
        window.location.href = "/signin";
        throw refreshError;
      }
    }

    // Якщо це інша помилка, передаємо її далі
    return Promise.reject(error);
  },
);

export default axios;
