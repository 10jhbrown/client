import { API_URL } from "env.json";
import {
  FeedRequest,
  FeedResponse,
  FollowingPostRequest,
  FollowingPostResponse,
  Post,
} from "../types";
import { addPostToFollowingFeed } from "redux/followingFeed";

export const getFollowingFeedPosts = async ({
  page,
  token,
  sortBy,
}: FeedRequest): Promise<FeedResponse> => {
  try {
    console.log("ENTER API");
    const response = await fetch(
      `${API_URL}/feeds/following?page=${page}&limit=6&sortBy=${sortBy}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FeedResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postFollowingContent = async ({
  content,
  token,
}: FollowingPostRequest): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FollowingPostResponse = await response.json();
    addPostToFollowingFeed(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const submitFollowingPost = createAsyncThunk(
//   "followingFeed/submitFollowingPost",
//   async (
//     { followingPost, token }: { followingPost: string; token: string },
//     { dispatch }
//   ) => {
//     try {
//       const setFollowingPostResponse = await fetch(`${API_URL}/posts`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           content: followingPost,
//         }),
//       });

//       const setFollowingPost = await setFollowingPostResponse.json();

//       if (!setFollowingPostResponse.ok) {
//         throw setFollowingPost.error;
//       }

//       dispatch(addPostToFollowingFeed(setFollowingPost));
//     } catch (error) {
//       throw new error.message();
//     }
//   }
// );
