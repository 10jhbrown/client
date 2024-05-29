import { ApplicationState } from "redux/types";
import { createSelector } from "reselect";

export const selectFollowingFeedState = (state: ApplicationState) =>
  state.followingFeed;

export const selectFollowingFeed = (state: ApplicationState) =>
  selectFollowingFeedState(state).posts;

const getPostId = (_, postId) => postId;

// Memoized selector to get a single post by id
export const makeGetPostById = () => {
  return createSelector([selectFollowingFeed, getPostId], (posts, postId) =>
    posts.find((post) => post.id === postId)
  );
};

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

export const selectLoadingNewPost = (state: ApplicationState) => {
  return selectFollowingFeedState(state).loadingNewPost;
};
