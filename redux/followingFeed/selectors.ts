import { ApplicationState } from "redux/types";

export const selectFollowingFeedState = (state: ApplicationState) =>
  state.followingFeed;

export const selectIsAddingPost = (state: ApplicationState) => {
  return selectFollowingFeedState(state).isAddingPost;
};

//TO DO: Duplicate?
export const selectFeedLoading = (state: ApplicationState) => {
  return selectFollowingFeedState(state).isLoading;
};

export const selectFeedRefreshing = (state: ApplicationState) => {
  return selectFollowingFeedState(state).isRefreshing;
};

// Latest Posts

export const selectLatestFeed = (state: ApplicationState) =>
  selectFollowingFeedState(state).latestPosts;

export const selectLatestPage = (state: ApplicationState) =>
  selectFollowingFeedState(state).latestPage;

export const selectHasMoreLatestPages = (state: ApplicationState) => {
  return selectFollowingFeedState(state).hasMoreLatestPages;
};

// Greatest Posts

export const selectGreatestFeed = (state: ApplicationState) =>
  selectFollowingFeedState(state).latestPosts;

export const selectGreatestPage = (state: ApplicationState) =>
  selectFollowingFeedState(state).latestPage;

export const selectHasMoreGreatestPages = (state: ApplicationState) => {
  return selectFollowingFeedState(state).hasMoreLatestPages;
};
