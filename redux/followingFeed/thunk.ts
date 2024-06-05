import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFollowingFeedPosts, postFollowingContent } from "../../api/FeedAPI"; // Adjust the path as necessary
import {
  FeedResponse,
  FeedRequest,
  FollowingPostRequest,
  FollowingPostResponse,
  Post,
} from "../../types";
import { RootState } from "redux/store";
import { addPostToFollowingFeed } from ".";
import { useDispatch } from "react-redux";

export const getLatestFollowingPosts = createAsyncThunk<
  FeedResponse,
  FeedRequest,
  { rejectValue: string; state: RootState }
>(
  "followingFeed/getLatestFollowingPosts",
  async (requestParams, { rejectWithValue }) => {
    try {
      const response = await getFollowingFeedPosts({
        ...requestParams,
        sortBy: "latest",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGreatestFollowingPosts = createAsyncThunk<
  FeedResponse,
  FeedRequest,
  { rejectValue: string }
>(
  "followingFeed/getGreatestFollowingPosts",
  async (requestParams, { rejectWithValue }) => {
    try {
      const response = await getFollowingFeedPosts({
        ...requestParams,
        sortBy: "greatest",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFollowingPostThunk = createAsyncThunk<
  FollowingPostResponse,
  FollowingPostRequest,
  { rejectValue: string }
>(
  "followingFeed/addFollowingPostThunk",
  async (requestParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await postFollowingContent({
        ...requestParams,
      });
      dispatch(addPostToFollowingFeed(response));
      console.log("THUNK Before entering redux: ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
