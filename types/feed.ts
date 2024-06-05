import { Post } from "./post";

export interface FeedResponse {
  posts: Post[];
  page: number;
  hasMorePages: boolean;
}

export interface FeedRequest {
  page: number;
  token: string;
  sortBy?: "latest" | "greatest";
}
