import { createSlice } from "@reduxjs/toolkit";
import { SortSwitchState } from "./types";
import { ACTIVE_SORT_SWITCH } from "../../constants/constants";

const initialState: SortSwitchState = {
  activeSortSwitch: ACTIVE_SORT_SWITCH.LATEST,
};

export const sortSwitchSlice = createSlice({
  name: "sortSwitch",
  initialState,
  reducers: {
    setLatestSort(state) {
      state.activeSortSwitch = ACTIVE_SORT_SWITCH.GREATEST;
    },
    setGreatestSort(state) {
      state.activeSortSwitch = ACTIVE_SORT_SWITCH.LATEST;
    },
  },
});

export const { setLatestSort, setGreatestSort } = sortSwitchSlice.actions;
export default sortSwitchSlice.reducer;
