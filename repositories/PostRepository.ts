import { API_URL } from "env.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPostToFollowingFeed } from "../redux/followingFeed";

import {
  fetchCampusFeedFailure,
  fetchCampusFeedStart,
  fetchCampusFeedSuccess,
} from "../redux/campusFeed";

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

export const submitFollowingPost = createAsyncThunk(
  "followingFeed/submitFollowingPost",
  async (
    { followingPost, token }: { followingPost: string; token: string },
    { dispatch }
  ) => {
    try {
      const setFollowingPostResponse = await fetch(`${API_URL}/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: followingPost,
        }),
      });

      const setFollowingPost = await setFollowingPostResponse.json();

      if (!setFollowingPostResponse.ok) {
        throw setFollowingPost.error;
      }

      dispatch(addPostToFollowingFeed(setFollowingPost));
    } catch (error) {
      throw new error.message();
    }
  }
);
