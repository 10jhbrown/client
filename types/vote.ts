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
  vote: boolean;
  // Include any other response fields if necessary
}
