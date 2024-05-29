import { ApplicationState } from "redux/types";
import { createSelector } from "reselect";

export const selectFollowingFeedState = (state: ApplicationState) =>
  state.followingVote;

export const selectUserVotes = (state: ApplicationState) =>
  selectFollowingFeedState(state).userVotes;
