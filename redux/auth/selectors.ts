import { createSelector } from "@reduxjs/toolkit";
import { AuthState } from "./types";
export const selectAuthState = (state) => state.auth;
