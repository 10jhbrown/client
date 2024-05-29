export interface FollowingVoteState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userVotes: Record<string, boolean | null>; // Mapping of postId to voteType
}

export type FollowingVote = boolean;

export interface FollowingVoteRequest {
  postId: string;
  votedBy: string;
  vote: FollowingVote;
  token: string;
}

export interface FollowingVoteResponse {
  postId: string;
  votedBy: string;
  vote: boolean;
  success: boolean;
}

export type UserFollowingVotes = Record<string, FollowingVote>;
