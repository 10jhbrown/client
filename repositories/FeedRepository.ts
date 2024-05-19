import { API_URL } from "env.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFollowingFeedFailure,
  fetchFollowingFeedStart,
  fetchFollowingFeedSuccess,
  stopLoadingNewPost,
} from "../redux/followingFeed";

import {
  fetchCampusFeedFailure,
  fetchCampusFeedStart,
  fetchCampusFeedSuccess,
} from "../redux/campusFeed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveFeedToAsyncStorage } from "utils/asyncStorage";

export const getCampusFeedPosts = createAsyncThunk(
  "campusFeed/getCampusFeedPosts",
  async ({ page, token }: { page: number; token: string }, { dispatch }) => {
    try {
      dispatch(fetchCampusFeedStart());
      const campusFeedResponse = await fetch(
        `${API_URL}/feeds/campus?page=${page}&limit=6`,
        {
          method: "get",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const campusFeed = await campusFeedResponse.json();
      if (campusFeed.error) {
        dispatch(fetchCampusFeedFailure(campusFeed.error));
        return;
      }
      dispatch(fetchCampusFeedSuccess(campusFeed));
    } catch (error) {
      throw new error.message();
    }
  }
);

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
      dispatch(stopLoadingNewPost());

      await saveFeedToAsyncStorage("@storedFollowingFeed", followingFeed);
    } catch (error) {
      throw new error.message();
    }
  }
);
