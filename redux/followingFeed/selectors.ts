import { ApplicationState } from "redux/types";

export const selectFollowingFeedState = (state: ApplicationState) =>
  state.followingFeed;

export const selectFollowingFeed = (state: ApplicationState) =>
  selectFollowingFeedState(state).posts;

export const selectFeedPage = (state: ApplicationState) =>
  selectFollowingFeedState(state).page;

export const selectHasMorePages = (state: ApplicationState) => {
  return selectFollowingFeedState(state).hasMorePages;
};

export const selectFeedLoading = (state: ApplicationState) => {
  return selectFollowingFeedState(state).loading;
};

export const selectFeedRefreshing = (state: ApplicationState) => {
  return selectFollowingFeedState(state).isRefreshing;
};
