import { ApplicationState } from "redux/types";

export const selectSortState = (state: ApplicationState) => state.sortSwitch;

export const selectActiveSort = (state: ApplicationState) => {
  return selectSortState(state).activeSort;
};
