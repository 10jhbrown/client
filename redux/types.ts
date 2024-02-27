import { AuthState } from "./auth/types";
import { FollowingFeedState } from "./followingFeed/types";

export interface ApplicationState {
  auth: AuthState;
  followingFeed: FollowingFeedState;
}
