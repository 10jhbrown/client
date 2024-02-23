import { combineReducers } from "@reduxjs/toolkit";
import followingFeedReducer from "./followingFeed";
import authReducer from "./auth";

// Combine all reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  followingFeed: followingFeedReducer,
});
