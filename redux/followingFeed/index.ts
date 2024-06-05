// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Post } from "types";
// import { FollowingFeedState, FollowingFeedRequest } from "./types";

// const initialState: FollowingFeedState = {
//   posts: <Post[]>[],
//   loading: false,
//   loadingNewPost: false,
//   page: 1,
//   hasMorePages: false,
//   isRefreshing: false,
//   error: null,
// };

// export const followingFeedSlice = createSlice({
//   name: "followingFeed",
//   initialState,
//   reducers: {
//     fetchFollowingFeedStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchFollowingFeedSuccess(
//       state,
//       action: PayloadAction<FollowingFeedRequest>
//     ) {
//       state.loading = false;
//       state.error = null;
//       if (action.payload.page === 1) {
//         state.posts = action.payload.posts;
//       } else {
//         state.posts = [...state.posts, ...action.payload.posts];
//       }
//       state.hasMorePages = action.payload.posts.length === 6;
//       state.isRefreshing = false;
//     },
//     fetchFollowingFeedFailure(state, action: PayloadAction<Error>) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     addPostToFollowingFeed: (state, action: PayloadAction<Post>) => {
//       const updatedPosts = state.posts.map((post) => {
//         if (post._id === action.payload._id) return action.payload;
//         return post;
//       });
//       state.loadingNewPost = true;
//       state.page = 1;
//       state.posts = updatedPosts;
//     },
//     setFollowingFeedPage(state, action: PayloadAction<number>) {
//       state.isRefreshing = true;
//       state.page = action.payload;
//       state.isRefreshing = false;
//     },
//     // setVoteCount: (
//     //   state,
//     //   action: PayloadAction<{ postId: string; voteCount: number }>
//     // ) => {
//     //   const { postId, voteCount } = action.payload;
//     //   const post = state.posts.find((post) => post._id === postId);
//     //   if (post) {
//     //     console.log("ENTER VOTE REDUX");
//     //     post.voteCount = voteCount;
//     //   }
//     // },
//     //   setVoteCount(
//     //     state,
//     //     action: PayloadAction<{
//     //       postId: string;
//     //       votedBy: string;
//     //       vote: boolean;
//     //     }>
//     //   ) {
//     //     // let indexToUpdate = state.posts.findIndex(
//     //     //   (post) => post._id === action.payload.postId
//     //     // );
//     //     // if (!state.posts[indexToUpdate].hasVoted) {
//     //     //   state.posts[indexToUpdate].voteCount += 1;
//     //     //   state.posts[indexToUpdate].hasVoted = true;
//     //     // } else {
//     //     //   state.posts[indexToUpdate].voteCount += 2;
//     //     // }
//     //     // state.posts[indexToUpdate].voteStatus = true;
//     //     const { postId, vote } = action.payload;
//     //     // const postIndex = state.posts.findIndex((post) => post._id === postId);

//     //     // Ensure the post exists before trying to update it
//     //     // if (postIndex !== -1) {
//     //     //   const post = state.posts[postIndex];
//     //     //   const updatedPost = {
//     //     //     ...post,
//     //     //     voteCount: hasVoted ? post.voteCount + 2 : post.voteCount + 1,
//     //     //     hasVoted: true,
//     //     //     voteStatus: true,
//     //     //   };

//     //     // Return new state with the updated post
//     //     // state.posts = [
//     //     //   ...state.posts.slice(0, postIndex),
//     //     //   updatedPost,
//     //     //   ...state.posts.slice(postIndex + 1),
//     //     // ];

//     //     const post = state.posts.find((post) => post._id === postId);
//     //     if (post && !post.hasVoted) {
//     //       post.voteCount += 1;
//     //       post.hasVoted = true;
//     //     } else if (post && hasVoted) {
//     //       post.voteCount += 2;
//     //     }
//     //   },
//     stopLoadingNewPost(state) {
//       state.loadingNewPost = false;
//     },
//     emptyPosts(state) {
//       state.posts = [];
//       state.page = 1;
//     },
//     setVoteCount: (state, action) => {
//       const { postId, voteCount } = action.payload;
//       const post = state.posts.find((post) => post._id === postId);
//       if (post) {
//         post.voteCount = voteCount;
//       }
//     },
//   },
// });

// export const {
//   fetchFollowingFeedStart,
//   fetchFollowingFeedSuccess,
//   fetchFollowingFeedFailure,
//   addPostToFollowingFeed,
//   setFollowingFeedPage,
//   stopLoadingNewPost,
//   setVoteCount,
//   emptyPosts,
// } = followingFeedSlice.actions;
// export default followingFeedSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLatestFollowingPosts, getGreatestFollowingPosts } from "./thunk";
import { FollowingVoteResponse, Post } from "../../types";
import { FollowingFeedState } from "./types";

const initialState: FollowingFeedState = {
  latestPosts: [],
  latestPage: 1,
  hasMoreLatestPages: false,
  greatestPosts: [],
  greatestPage: 1,
  hasMoreGreatestPages: false,
  isLoading: false,
  isRefreshing: false,
  isAddingPost: false,
  error: null,
};

const followingFeedSlice = createSlice({
  name: "followingFeed",
  initialState,
  reducers: {
    setLatestFeedPage(state, action: PayloadAction<number>) {
      state.isRefreshing = true;
      state.latestPage = action.payload;
      state.isRefreshing = false;
    },
    setGreatestFeedPage(state, action: PayloadAction<number>) {
      state.isRefreshing = true;
      state.greatestPage = action.payload;
      state.isRefreshing = false;
    },
    addPostToFollowingFeed: (state, action: PayloadAction<Post>) => {
      console.log("ENTER REDUX", action.payload);
      const updatedPosts = state.latestPosts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.isAddingPost = true;
      state.latestPage = 1;
      state.latestPosts = updatedPosts;
    },
    setVoteCount: (
      state,
      action: PayloadAction<Partial<FollowingVoteResponse>>
    ) => {
      const { postId, voteCount } = action.payload;
      // Update vote count in latestPosts

      const latestPost = state.latestPosts.find((post) => post._id === postId);
      if (latestPost) {
        latestPost.voteCount = voteCount;
      }
      // Update vote count in greatestPosts
      const greatestPost = state.greatestPosts.find(
        (post) => post._id === postId
      );
      if (greatestPost) {
        greatestPost.voteCount = voteCount;
      }
    },
    emptyPosts(state) {
      state.latestPosts = [];
      state.greatestPosts = [];
      state.latestPage = 1;
      state.greatestPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchLatestFollowingPosts
      .addCase(getLatestFollowingPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLatestFollowingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latestPosts = action.payload.posts;
        state.latestPage = action.payload.page;
        state.hasMoreLatestPages = action.payload.hasMorePages;

        if (action.payload.page === 1) {
          state.latestPosts = action.payload.posts;
        } else {
          state.latestPosts = [...state.latestPosts, ...action.payload.posts];
        }
        state.hasMoreLatestPages = action.payload.posts.length === 6;
      })
      .addCase(getLatestFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchGreatestFollowingPosts
      .addCase(getGreatestFollowingPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGreatestFollowingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.greatestPosts = action.payload.posts;
        state.greatestPage = action.payload.page;
        state.hasMoreGreatestPages = action.payload.hasMorePages;

        if (action.payload.page === 1) {
          state.greatestPosts = action.payload.posts;
        } else {
          state.greatestPosts = [
            ...state.greatestPosts,
            ...action.payload.posts,
          ];
        }
        state.hasMoreGreatestPages = action.payload.posts.length === 6;
      })
      .addCase(getGreatestFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setLatestFeedPage,
  setGreatestFeedPage,
  addPostToFollowingFeed,
  setVoteCount,
  emptyPosts,
} = followingFeedSlice.actions;
export default followingFeedSlice.reducer;
