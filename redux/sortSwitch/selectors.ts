import { ApplicationState } from "redux/types";

export const selectSortState = (state: ApplicationState) => state.sortSwitch;

export const selectActiveSortState = (state: ApplicationState) => {
  return selectSortState(state).activeSortSwitch;
};
