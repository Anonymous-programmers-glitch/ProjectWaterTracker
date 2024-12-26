import axios, { setAuthHeader, clearAuthHeader } from "../../api/operationsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
/*
 * User registration.
 * POST @ /auth/register
 * body: { email, password }
 *
 * After successful registration, you will need to go through verification. An email with a link has been sent to the email address you provided during registration.
 */
export const signup = createAsyncThunk(
  "user/signup",
  async (credentials, thunkAPI) => {
    try {
      const response = (await axios.post("/auth/register", credentials)).data;
      return response;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * User login.
 * POST @ /auth/login
 * body: { email, password }
 *
 * After a successful login, the access token is added to the HTTP header for subsequent requests.
 */
export const login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = (await axios.post("/auth/login", credentials)).data;
      setAuthHeader(response.data.accessToken);
      return response;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * User logout.
 * Route: POST @ /auth/logout
 * Headers: Authorization: Bearer token
 *
 * After a successful logout, the access token is removed from the HTTP header.
 */
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/auth/logout");
    clearAuthHeader();
    return response.status;
  } catch (error) {
    if (error.response?.data) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
  // }
});

/*
 * Refresh user data by verifying the current access token.
 * Route: GET @ /users/current
 * Headers: Authorization: Bearer token
 *
 * Sends a request to the server to fetch the current user's data.
 */
export const refresh = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    if (!reduxState.user.accessToken) {
      return thunkAPI.rejectWithValue("No access token available");
    }
    try {
      setAuthHeader(reduxState.user.accessToken);

      const response = (await axios.get("/users/current")).data;
      setAuthHeader(response.data.accessToken);
      return response;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.user.accessToken !== null;
    },
  }
);

/*
 * Update user profile.
 * Route: PATCH @ /users
 * Headers: Authorization: Bearer token
 *
 * Allows updating user information such as name or other profile details.
 */
export const update = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      const response = (await axios.patch(`/users`, data)).data;
      return response;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * Update user's avatar.
 * Route: PATCH @ /users/avatar
 * Headers: Authorization: Bearer token
 * Request body: multipart/form-data
 *
 * Allows updating the user's avatar by uploading a new image file.
 */
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData, thunkAPI) => {
    try {
      const response = (
        await axios.patch(`/users/avatar`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
      return response;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// /*
//  * GET @ /auth/refresh
//  * headers: Authorization: Bearer token
//  */
// export const refreshToken = createAsyncThunk(
//   "user/refreshToken",
//   async (_, thunkAPI) => {
//     try {
//       const response = (
//         await axios.post("/auth/refresh", null, { withCredentials: true })
//       ).data;
//       console.log("response :>> ", response);
//       // console.log("response.data.accessToken :>> ", response.data.accessToken);
//       setAuthHeader(response.data.accessToken);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Операція запиту на скидання паролю
export const requestResetToken = createAsyncThunk(
  "user/requestResetToken",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("/auth/send-reset-email", { email });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція скидання паролю
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/auth/reset-pwd", payload);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// // Операція отримання URL для OAuth авторизації через Google
// export const getGoogleOAuthUrl = createAsyncThunk(
//   "auth/getGoogleOAuthUrl",
//   async (_, thunkAPI) => {
//     try {
//       const response = (await axios.get("/auth/get-oauth-url")).data;
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Операція логіну через Google OAuth
// export const loginWithGoogle = createAsyncThunk(
//   "auth/loginWithGoogle",
//   async (code, thunkAPI) => {
//     try {
//       const response = (await axios.post("/auth/confirm-oauth", { code })).data;
//       setAuthHeader(response.data.accessToken);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
