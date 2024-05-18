import { Post } from "../../types";
export interface FollowingFeedState {
  posts: Post[];
  loading: boolean;
  page: number;
  hasMorePages: boolean;
  isRefreshing: boolean;
  error: Error | null;
  loadingNewPost: boolean;
}

export interface FollowingFeedRequest {
  posts: Post[];
  page: number;
  hasMorePages: boolean;
}
