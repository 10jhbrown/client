export interface Vote {
  _id: string;
  votedBy: string;
  vote: boolean;
}
export interface FollowingVoteRequest {
  postId: string;
  votedBy: string;
  vote: boolean;
  token: string;
}
export interface FollowingVoteResponse {
  postId: string;
  votedBy: string;
  vote: boolean;
  voteCount?: number;
  success?: boolean;
}

export interface UserVotesRequest {
  postIds: string[];
  token: string;
}

export interface UserVotesResponse {
  postIds: string[];
}

export interface UserVotesMap {
  votes: FollowingVoteResponse[];
}
