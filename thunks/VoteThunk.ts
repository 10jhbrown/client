// import { API_URL } from "env.json";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { FollowingVoteResponse, FollowingVoteRequest } from "../";
// import { setVoteCount } from "redux/followingFeed";
// import { setUserVotes } from "redux/followingVote";

// export const sendFollowingVote = createAsyncThunk(
//   "followingVote/sendFollowingVote",
//   async (
//     {
//       postId,
//       vote,
//       token,
//     }: {
//       postId: string;
//       vote: boolean;
//       token: string;
//     },
//     { dispatch }
//   ) => {
//     try {
//       const response = await fetch(`${API_URL}/posts/vote`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           postId: postId,
//           vote: vote,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw data.error;
//       }

//       const { voteCount } = data;
//       dispatch(setVoteCount({ postId: postId, voteCount: voteCount }));
//       return data as FollowingVoteResponse;
//     } catch (error) {
//       throw error.message;
//     }
//   }
// );

// export const fetchUserFollowingVotes = createAsyncThunk(
//   "votes/fetchUserVotes",
//   async (
//     { postIds, token }: { postIds: string[]; token: string },
//     { dispatch }
//   ) => {
//     try {
//       const response = await fetch(`${API_URL}/posts/uservotes`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ postIds }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw data.error;
//       }
//       data.forEach((vote: FollowingVoteResponse) => {
//         dispatch(setUserVotes({ postId: vote.postId, vote: vote.vote }));
//       });
//       return data as FollowingVoteResponse[];
//     } catch (error) {
//       throw error.message;
//     }
//   }
// );

// // export const fetchUserFollowingVotes = createAsyncThunk(
// //   "votes/fetchUserVotes",
// //   async (
// //     { postId, token }: { postId: string; token: string },
// //     { dispatch }
// //   ) => {
// //     try {
// //       const response = await fetch(`${API_URL}/posts/uservotes`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ postId }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw data.error;
// //       }
// //       data.forEach((vote: FollowingVoteResponse) => {
// //       dispatch(setUserVotes({ postId: postId, vote: data.vote }));
// //       });
// //       return data as FollowingVoteResponse[];
// //     } catch (error) {
// //       throw error.message;
// //     }
// //   }
// // );
