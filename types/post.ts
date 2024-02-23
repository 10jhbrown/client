export interface Post {
  _id: string;
  postedBy: string;
  content: string;
  voteCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt?: Date;
}
