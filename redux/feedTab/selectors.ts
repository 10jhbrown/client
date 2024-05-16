import { ApplicationState } from "redux/types";

export const selectFeedState = (state: ApplicationState) => state.feedTab;

export const selectActiveFeedTab = (state: ApplicationState) => {
  return selectFeedState(state).activeFeedTab;
};
