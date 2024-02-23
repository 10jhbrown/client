import { API_URL } from "../env.json";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setLoginSuccess, setLoginFailure } from "../redux/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "types";

const endpoint = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
};

// export const userRegister = async (user) => {
//   const response = await fetch(endpoint.register, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       username: user.username,
//       email: user.email,
//       password: user.password,
//       confirmPassword: user.confirmPassword,
//     }),
//   });

//   const responseData = await response.json();
//   if (!response.ok) {
//     throw responseData.error;
//   }
//   return responseData.user;
// };

// export const userLogin = async (email: string, password: string) => async (
//   dispatch: Dispatch
// ) => {
//   console.warn("ENTER");
//   console.warn("POST ENTER");
//   try {
//     const loggedInResponse = await fetch(endpoint.login, {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     const loggedInUser = await loggedInResponse.json();
//     console.warn("LoggedInUser", loggedInUser);

//     if (!loggedInUser.ok) {
//       throw loggedInUser.error;
//     }
//     dispatch(
//       setLoginSuccess({
//         user: loggedInUser.email,
//         token: loggedInUser.token,
//       })
//     );
//     console.warn("SUCCESSFUL LOGIN");
//   } catch (error) {}
// };

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const loggedInResponse = await fetch(endpoint.login, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const loggedInUser = await loggedInResponse.json();

      if (loggedInUser.error) {
        dispatch(setLoginFailure(loggedInUser.error));
        return;
      }
      dispatch(
        setLoginSuccess({
          user: loggedInUser.email,
          token: loggedInUser.token,
        })
      );
    } catch (error) {
      return error.message;
    }
  }
);
