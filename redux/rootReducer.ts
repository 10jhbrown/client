import { combineReducers } from "@reduxjs/toolkit";
import followingFeedReducer from "./followingFeed";
import followingVoteReducer from "./followingVote";
import authReducer from "./auth";
import feedTabReducer from "./feedTab";
import sortSwitchReducer from "./sortSwitch";
import campusFeedReducer from "./campusFeed";

// Combine all reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  feedTab: feedTabReducer,
  campusFeed: campusFeedReducer,
  followingFeed: followingFeedReducer,
  followingVote: followingVoteReducer,
  sortSwitch: sortSwitchReducer,
});
