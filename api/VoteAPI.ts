import { API_URL } from "env.json";
import {
  FollowingVoteResponse,
  FollowingVoteRequest,
  UserVotesRequest,
  UserVotesResponse,
} from "../types";

export const postFollowingVote = async ({
  postId,
  vote,
  token,
}: FollowingVoteRequest): Promise<FollowingVoteResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/vote`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        vote: vote,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FollowingVoteResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserFollowingVotes = async ({
  postIds,
  token,
}: UserVotesRequest): Promise<UserVotesResponse> => {
  try {
    const response = await fetch(`${API_URL}/posts/uservotes`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postIds: postIds,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UserVotesResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
