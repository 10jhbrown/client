import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";
import { FollowingFeedState, FollowingFeedRequest } from "./types";

const initialState: FollowingFeedState = {
  posts: [],
  loading: false,
  loadingNewPost: false,
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
      state.loadingNewPost = true;
      state.page = 1;
      state.posts = updatedPosts;
    },
    setFollowingFeedPage(state, action: PayloadAction<number>) {
      state.isRefreshing = true;
      state.page = action.payload;
      state.isRefreshing = false;
    },
    stopLoadingNewPost(state) {
      state.loadingNewPost = false;
    },
    emptyPosts(state) {
      state.posts = [];
      state.page = 1;
    },
  },
});

export const {
  fetchFollowingFeedStart,
  fetchFollowingFeedSuccess,
  fetchFollowingFeedFailure,
  addPostToFollowingFeed,
  setFollowingFeedPage,
  stopLoadingNewPost,
  emptyPosts,
} = followingFeedSlice.actions;
export default followingFeedSlice.reducer;
