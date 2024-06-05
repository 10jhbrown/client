import { createAsyncThunk } from "@reduxjs/toolkit";
import { setVoteCount } from "../../redux/followingFeed";
import {
  FollowingVoteResponse,
  FollowingVoteRequest,
  UserVotesRequest,
  UserVotesResponse,
} from "../../types";
import { postFollowingVote, getUserFollowingVotes } from "../../api/VoteAPI";
import { setUserVotes } from ".";

export const voteFollowingPost = createAsyncThunk<
  FollowingVoteResponse,
  FollowingVoteRequest
>(
  "followingVote/voteFollowingPost",
  async (requestParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await postFollowingVote({ ...requestParams });
      dispatch(setVoteCount(response));
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserVotes = createAsyncThunk<
  UserVotesResponse,
  UserVotesRequest
>(
  "followingVote/getUserVotes",
  async (requestParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await getUserFollowingVotes({ ...requestParams });
      //@ts-ignore
      response.forEach((vote: FollowingVoteResponse) => {
        dispatch(setUserVotes({ postId: vote.postId, vote: vote.vote }));
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
