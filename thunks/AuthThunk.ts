import { API_URL } from "../env.json";
import { setAuthSuccess, setAuthFailure } from "../redux/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
const endpoint = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
};

export const availableUsername = async (username: string) => {
  try {
    const usernameResponse = await fetch(`${endpoint.register}/username`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const isUsernameAvailable = await usernameResponse.json();

    if (!usernameResponse.ok) {
      throw isUsernameAvailable.error;
    }
    const { available } = isUsernameAvailable;
    return available;
  } catch (error) {
    return error.message;
  }
};

export const availableEmail = async (email: string) => {
  try {
    const emailResponse = await fetch(`${endpoint.register}/email`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const isEmailAvailable = await emailResponse.json();

    if (!emailResponse.ok) {
      throw isEmailAvailable.error;
    }
    const { available } = isEmailAvailable;
    return available;
  } catch (error) {
    return error.message;
  }
};

export const sendEmailVerificationCode = async (email: string) => {
  try {
    const emailCodeResponse = await fetch(
      `${endpoint.register}/sendEmailVerificationCode`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const emailSentStatus = await emailCodeResponse.json();

    if (!emailSentStatus.ok) {
      throw emailSentStatus.error;
    }
    const { message } = emailSentStatus;
    return message;
  } catch (error) {
    return error;
  }
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      emailCode,
    }: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      emailCode: number;
    },
    { dispatch }
  ) => {
    try {
      const registerResponse = await fetch(endpoint.register, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          emailCode: emailCode,
        }),
      });
      const registerUser = await registerResponse.json();

      if (registerUser.error) {
        dispatch(setAuthFailure(registerUser.error));
        return;
      }

      dispatch(
        setAuthSuccess({
          user: registerUser.user,
          token: registerUser.token,
        })
      );
    } catch (error) {
      return error.message;
    }
  }
);

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
        dispatch(setAuthFailure(loggedInUser.error));
        return;
      }

      dispatch(
        setAuthSuccess({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );
    } catch (error) {
      return error.message;
    }
  }
);
