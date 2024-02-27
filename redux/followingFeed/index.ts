import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";
import { FollowingFeedState, FollowingFeedRequest } from "./types";

const initialState: FollowingFeedState = {
  posts: [],
  loading: false,
  page: 1,
  hasMorePages: false,
  isRefreshing: false,
  error: null,
};

export const followingFeedSlice = createSlice({
  name: "followingFeed",
  initialState,
  reducers: {
    fetchFollowingFeedStart(state) {
      state.loading = true;
      state.error = null;
      // state.posts = [];
    },
    fetchFollowingFeedSuccess(
      state,
      action: PayloadAction<FollowingFeedRequest>
    ) {
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
    fetchFollowingFeedFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPostToFollowingFeed: (state, action: PayloadAction<Post>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFollowingFeedPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      state.isRefreshing = true;
    },
  },
});

export const {
  fetchFollowingFeedStart,
  fetchFollowingFeedSuccess,
  fetchFollowingFeedFailure,
  addPostToFollowingFeed,
  setFollowingFeedPage,
} = followingFeedSlice.actions;
export default followingFeedSlice.reducer;
