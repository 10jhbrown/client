import { API_URL } from "env.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFollowingFeedFailure,
  fetchFollowingFeedStart,
  fetchFollowingFeedSuccess,
} from "../redux/followingFeed";

export const getFollowingFeedPosts = createAsyncThunk(
  "followingFeed/getFollowingFeedPosts",
  async ({ page, token }: { page: number; token: string }, { dispatch }) => {
    try {
      dispatch(fetchFollowingFeedStart());
      const followingFeedResponse = await fetch(
        `${API_URL}/feeds/following?page=${page}&limit=6`,
        {
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const followingFeed = await followingFeedResponse.json();
      if (followingFeed.error) {
        dispatch(fetchFollowingFeedFailure(followingFeed.error));
        return;
      }
      dispatch(fetchFollowingFeedSuccess(followingFeed));
    } catch (error) {
      throw new error.message();
    }
  }
);
