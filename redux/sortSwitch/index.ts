import { createSlice } from "@reduxjs/toolkit";
import { SortSwitchState } from "./types";

const initialState: SortSwitchState = {
  activeSort: "latest",
};

export const sortSwitchSlice = createSlice({
  name: "sortSwitch",
  initialState,
  reducers: {
    setLatestSort(state) {
      state.activeSort = "latest";
    },
    setGreatestSort(state) {
      state.activeSort = "greatest";
    },
  },
});

export const { setLatestSort, setGreatestSort } = sortSwitchSlice.actions;
export default sortSwitchSlice.reducer;
