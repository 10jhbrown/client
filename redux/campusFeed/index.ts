import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";
import { CampusFeedState, CampusFeedRequest } from "./types";

const initialState: CampusFeedState = {
  posts: [],
  loading: false,
  page: 1,
  hasMorePages: false,
  isRefreshing: false,
  error: null,
};

export const campusFeedSlice = createSlice({
  name: "campusFeed",
  initialState,
  reducers: {
    fetchCampusFeedStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCampusFeedSuccess(state, action: PayloadAction<CampusFeedRequest>) {
      state.loading = false;
      state.error = null;
      if (action.payload.page === 1) {
        state.posts = action.payload.posts;
      } else {
        state.posts = [...state.posts, ...action.payload.posts];
      }
      state.hasMorePages = action.payload.posts.length === 6;
      state.isRefreshing = false;
    },
    fetchCampusFeedFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPostToCampusFeed: (state, action: PayloadAction<Post>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCampusFeedPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      state.isRefreshing = true;
    },
    emptyPosts(state) {
      state.posts = [];
      state.page = 1;
    },
  },
});

export const {
  fetchCampusFeedStart,
  fetchCampusFeedSuccess,
  fetchCampusFeedFailure,
  addPostToCampusFeed,
  setCampusFeedPage,
  emptyPosts,
} = campusFeedSlice.actions;
export default campusFeedSlice.reducer;
