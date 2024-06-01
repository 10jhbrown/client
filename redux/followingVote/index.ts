import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFollowingVotes, FollowingVote, FollowingVoteState } from "./types";
import {
  sendFollowingVote,
  fetchUserFollowingVotes,
} from "../../repositories/VoteRepo";

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
      .addCase(sendFollowingVote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendFollowingVote.fulfilled, (state, action) => {
        const { postId, vote } = action.payload;
        state.userVotes[postId] = vote;
        state.status = "succeeded";
      })
      .addCase(sendFollowingVote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to send vote";
      })
      .addCase(fetchUserFollowingVotes.pending, (state) => {
        state.status = "loading";
        console.log("LOADING FETCH");
      })
      .addCase(fetchUserFollowingVotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to send vote";
      })
      .addCase(fetchUserFollowingVotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userVotes = action.payload.reduce(
          (
            acc: UserFollowingVotes,
            vote: { postId: string; vote: FollowingVote }
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
