import axios, { setAuthHeader, clearAuthHeader } from "../../api/operationsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

/*
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
      //const { user} = (await axios.post("/auth/register", credentials)).data;
      // const { user } = (await $api.post("/auth/register", credentials)).data;
      //return user;

      return response.data;
    } catch (error) {
      console.log(
        "error.response.data.status :>> ",
        error.response.data.status
      );
      console.log(
        "error.response.data.message :>> ",
        error.response.data.message
      );
      //return thunkAPI.rejectWithValue(error.message);
      //return thunkAPI.rejectWithValue(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
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
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = (await axios.post("/auth/login", credentials)).data;
      // const response = (await $api.post("/auth/login", credentials)).data;
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 *
 *  After successful logout, remove the access token from the HTTP header
 */
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    // await $api.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
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
      return response.data;
    } catch (error) {
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
 * PATCH @ /users
 * headers: Authorization: Bearer token
 */

export const update = createAsyncThunk(
  "user/update",
  async (data, thunkAPI) => {
    try {
      const response = (await axios.patch(`/users`, data)).data;
      // const response = (await $api.patch(`/users`, data)).data;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

/*
 * PATCH @ /users/avatar
 * headers: Authorization: Bearer token
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

// /*
//  * GET @ /auth/refresh
//  * headers: Authorization: Bearer token
//  */
// // export const refreshToken = createAsyncThunk(
// //   "user/refreshToken",
// //   async (_, thunkAPI) => {
// //     try {
// //       const response = (
// //         await axios.post("/auth/refresh", null, { withCredentials: true })
// //       ).data;
// //       console.log("response :>> ", response);
// //       // console.log("response.data.accessToken :>> ", response.data.accessToken);
// //       setAuthHeader(response.data.accessToken);
// //       return response;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // );

// // Операція запиту на скидання паролю
// export const requestResetToken = createAsyncThunk(
//   "user/requestResetToken",
//   async (email, thunkAPI) => {
//     try {
//       const response = await axios.post("/auth/send-reset-email", { email });
//       return response.data.message;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Операція скидання паролю
// export const resetPassword = createAsyncThunk(
//   "user/resetPassword",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.post("/auth/reset-pwd", payload);
//       return response.data.message;
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
