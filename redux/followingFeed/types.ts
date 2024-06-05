import { Post, FollowingPostResponse } from "../../types";
export interface FollowingFeedState {
  latestPosts: Post[];
  latestPage: number;
  hasMoreLatestPages: boolean;
  greatestPosts: Post[];
  greatestPage: number;
  hasMoreGreatestPages: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  isAddingPost: boolean;
  error: string | null;
}
