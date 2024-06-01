import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "types";
import { FollowingFeedState, FollowingFeedRequest } from "./types";

const initialState: FollowingFeedState = {
  posts: <Post[]>[],
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
    // setVoteCount: (
    //   state,
    //   action: PayloadAction<{ postId: string; voteCount: number }>
    // ) => {
    //   const { postId, voteCount } = action.payload;
    //   const post = state.posts.find((post) => post._id === postId);
    //   if (post) {
    //     console.log("ENTER VOTE REDUX");
    //     post.voteCount = voteCount;
    //   }
    // },
    //   setVoteCount(
    //     state,
    //     action: PayloadAction<{
    //       postId: string;
    //       votedBy: string;
    //       vote: boolean;
    //     }>
    //   ) {
    //     // let indexToUpdate = state.posts.findIndex(
    //     //   (post) => post._id === action.payload.postId
    //     // );
    //     // if (!state.posts[indexToUpdate].hasVoted) {
    //     //   state.posts[indexToUpdate].voteCount += 1;
    //     //   state.posts[indexToUpdate].hasVoted = true;
    //     // } else {
    //     //   state.posts[indexToUpdate].voteCount += 2;
    //     // }
    //     // state.posts[indexToUpdate].voteStatus = true;
    //     const { postId, vote } = action.payload;
    //     // const postIndex = state.posts.findIndex((post) => post._id === postId);

    //     // Ensure the post exists before trying to update it
    //     // if (postIndex !== -1) {
    //     //   const post = state.posts[postIndex];
    //     //   const updatedPost = {
    //     //     ...post,
    //     //     voteCount: hasVoted ? post.voteCount + 2 : post.voteCount + 1,
    //     //     hasVoted: true,
    //     //     voteStatus: true,
    //     //   };

    //     // Return new state with the updated post
    //     // state.posts = [
    //     //   ...state.posts.slice(0, postIndex),
    //     //   updatedPost,
    //     //   ...state.posts.slice(postIndex + 1),
    //     // ];

    //     const post = state.posts.find((post) => post._id === postId);
    //     if (post && !post.hasVoted) {
    //       post.voteCount += 1;
    //       post.hasVoted = true;
    //     } else if (post && hasVoted) {
    //       post.voteCount += 2;
    //     }
    //   },
    stopLoadingNewPost(state) {
      state.loadingNewPost = false;
    },
    emptyPosts(state) {
      state.posts = [];
      state.page = 1;
    },
    setVoteCount: (state, action) => {
      const { postId, voteCount } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.voteCount = voteCount;
      }
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
  setVoteCount,
  emptyPosts,
} = followingFeedSlice.actions;
export default followingFeedSlice.reducer;
