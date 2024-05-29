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
  hasVoted: boolean;
  voteStatus: boolean | null;
}
