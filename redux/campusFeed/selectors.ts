import { ApplicationState } from "redux/types";

export const selectCampusFeedState = (state: ApplicationState) =>
  state.campusFeed;

export const selectCampusFeed = (state: ApplicationState) =>
  selectCampusFeedState(state).posts;

export const selectFeedPage = (state: ApplicationState) => {
  return selectCampusFeedState(state).page;
};

export const selectHasMorePages = (state: ApplicationState) => {
  return selectCampusFeedState(state).hasMorePages;
};

export const selectFeedLoading = (state: ApplicationState) => {
  return selectCampusFeedState(state).loading;
};

export const selectFeedRefreshing = (state: ApplicationState) => {
  return selectCampusFeedState(state).isRefreshing;
};
