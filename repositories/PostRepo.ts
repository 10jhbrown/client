import { API_URL } from "env.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPostToFollowingFeed, setVoteCount } from "../redux/followingFeed";

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

// export const setUpVoteOnPost = createAsyncThunk(
//   "followingFeed/setUpVoteOnPost",
//   async (
//     {
//       _id,
//       newUpVoteStatus,
//       hasVoted,
//       token,
//     }: {
//       _id: string;
//       newUpVoteStatus: boolean | null;
//       hasVoted: boolean;
//       token: string;
//     },
//     { dispatch }
//   ) => {
//     try {
//       const followingVoteResponse = await fetch(`${API_URL}/posts/upvote`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           postId: _id,
//           newUpVoteStatus: newUpVoteStatus,
//           hasVoted: hasVoted,
//         }),
//       });

//       const followingVote = await followingVoteResponse.json();
//       if (!followingVoteResponse.ok) {
//         throw followingVote.error;
//       }

//       dispatch(setVoteCount(followingVote));
//     } catch (error) {
//       throw new error.message();
//     }
//   }
// );
