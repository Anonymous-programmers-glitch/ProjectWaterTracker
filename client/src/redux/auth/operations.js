import axios, { setAuthHeader, clearAuthHeader } from "../../api/operationsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "http://localhost:3000";

/*
 * POST @ /auth/register
 * body: { email, password }
 *
 * After successful registration, you will need to go through verification. An email with a link has been sent to the email address you provided during registration.
 */
export const signup = createAsyncThunk(
  "auth/SignUp",
  async (credentials, thunkAPI) => {
    try {
      const { user } = (await axios.post("/auth/register", credentials)).data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * GET @ /auth/verify
 *
 *
 * After successful verification, add the access token to the HTTP header
 */
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (token, thunkAPI) => {
    try {
      const response = (await axios.get(`/auth/verify?token=${token}`)).data;
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password }
 *
 * After successful login, add the access token to the HTTP header
 */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = (await axios.post("/auth/login", credentials)).data;
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 *
 *  After successful logout, remove the access token from the HTTP header
 */
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /auth/refresh
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = (
        await axios.post("/auth/refresh", null, { withCredentials: true })
      ).data;
      console.log("response :>> ", response);
      setAuthHeader(response.data.accessToken);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// // Операція запиту на скидання паролю
// export const requestResetToken = createAsyncThunk(
//   "auth/requestResetToken",
//   async (email, thunkAPI) => {
//     try {
//       await axios.post("/auth/send-reset-email", { email });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Операція скидання паролю
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (payload, thunkAPI) => {
//     try {
//       await axios.post("/auth/reset-pwd", payload);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
