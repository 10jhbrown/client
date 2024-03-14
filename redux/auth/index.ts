import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "types";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginSuccess(state, action: PayloadAction<Auth>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoginFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
    },
    setLogOut(state) {
      state.user = null;
      state.token = null;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  setLoginSuccess,
  setLoginFailure,
  setLogOut,
  clearErrors,
} = authSlice.actions;
export default authSlice.reducer;
