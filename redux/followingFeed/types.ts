import { Post } from "../../types";
export interface FollowingFeedState {
  posts: Post[];
  loading: boolean;
  error: Error | null;
}
