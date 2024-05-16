import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedTabState } from "./types";
import { ACTIVE_FEED_TAB } from "../../constants/constants";

const initialState: FeedTabState = {
  activeFeedTab: ACTIVE_FEED_TAB.CAMPUS,
};

export const feedTabSlice = createSlice({
  name: "feedTab",
  initialState,
  reducers: {
    setCampusFeedTab(state) {
      state.activeFeedTab = true;
    },
    setFollowingFeedTab(state) {
      state.activeFeedTab = false;
    },
  },
});

export const { setCampusFeedTab, setFollowingFeedTab } = feedTabSlice.actions;
export default feedTabSlice.reducer;
