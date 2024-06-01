import { createSlice } from "@reduxjs/toolkit";
import { SortSwitchState } from "./types";
import { ACTIVE_SORT_SWITCH } from "../../constants/constants";

const initialState: SortSwitchState = {
  activeSort: ACTIVE_SORT_SWITCH.LATEST,
};

export const sortSwitchSlice = createSlice({
  name: "sortSwitch",
  initialState,
  reducers: {
    setLatestSort(state) {
      state.activeSort = ACTIVE_SORT_SWITCH.LATEST;
    },
    setGreatestSort(state) {
      state.activeSort = ACTIVE_SORT_SWITCH.GREATEST;
    },
  },
});

export const { setLatestSort, setGreatestSort } = sortSwitchSlice.actions;
export default sortSwitchSlice.reducer;
