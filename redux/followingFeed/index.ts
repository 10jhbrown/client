import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";
import { FollowingFeedState } from "./types";

const initialState: FollowingFeedState = {
  posts: [],
  loading: false,
  error: null,
};

export const followingFeedSlice = createSlice({
  name: "followingFeed",
  initialState,
  reducers: {
    fetchFollowingFeedStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFollowingFeedSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.error = null;
      state.posts = action.payload;
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
  },
});

export const {
  fetchFollowingFeedStart,
  fetchFollowingFeedSuccess,
  fetchFollowingFeedFailure,
  addPostToFollowingFeed,
} = followingFeedSlice.actions;
export default followingFeedSlice.reducer;
