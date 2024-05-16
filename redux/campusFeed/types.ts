import { Post } from "../../types";
export interface CampusFeedState {
  posts: Post[];
  loading: boolean;
  page: number;
  hasMorePages: boolean;
  isRefreshing: boolean;
  error: Error | null;
}

export interface CampusFeedRequest {
  posts: Post[];
  page: number;
  hasMorePages: boolean;
}
