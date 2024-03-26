import { ApplicationState } from "redux/types";

export const selectAuthState = (state: ApplicationState) => state.auth;

export const selectUserInfo = (state: ApplicationState) =>
  selectAuthState(state).user;

export const selectAuthToken = (state: ApplicationState) => {
  return selectAuthState(state).token;
};

export const selectAuthError = (state: ApplicationState) => {
  return selectAuthState(state).error;
};
