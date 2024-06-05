import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFollowingVotes, FollowingVote, FollowingVoteState } from "./types";
import { voteFollowingPost, getUserVotes } from "./thunk";
import { UserVotesResponse } from "types";

const initialState: FollowingVoteState = {
  status: "idle",
  error: null,
  userVotes: {},
};

export const followingVoteSlice = createSlice({
  name: "followingVote",
  initialState,
  reducers: {
    setUserVotes(
      state,
      action: PayloadAction<{ postId: string; vote: boolean }>
    ) {
      state.status = "loading";
      const { postId, vote } = action.payload;
      state.userVotes[postId] = vote;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(voteFollowingPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voteFollowingPost.fulfilled, (state, action) => {
        const { postId, vote } = action.payload;
        state.userVotes[postId] = vote;
        state.status = "succeeded";
      })
      .addCase(voteFollowingPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to send vote";
      })
      .addCase(getUserVotes.pending, (state) => {
        state.status = "loading";
        console.log("LOADING FETCH");
      })
      .addCase(getUserVotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to send vote";
      })
      .addCase(getUserVotes.fulfilled, (state, action) => {
        console.log("USER VOTES REDUX");
        state.status = "succeeded";
        //@ts-ignore
        state.userVotes = action.payload.reduce(
          (
            acc: UserFollowingVotes,
            vote: { postId: string; vote: boolean }
          ) => {
            acc[vote.postId] = vote.vote;
            return acc;
          },
          {}
        );
        console.log("SUCCESSFUL FETCH", Object.keys(state.userVotes).length);
      });
  },
});

export const { setUserVotes } = followingVoteSlice.actions;
export default followingVoteSlice.reducer;
