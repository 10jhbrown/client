export interface Post {
  _id: string;
  postedBy: string;
  content: string;
  voteCount: number;
  commentCount: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface FollowingPostRequest {
  content: string;
  token: string;
}

export interface FollowingPostResponse {
  _id: string;
  postedBy: string;
  content: string;
  voteCount: number;
  commentCount: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt?: Date;
  __v?: number;
}
