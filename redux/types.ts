import { AuthState } from "./auth/types";
import { FollowingFeedState } from "./followingFeed/types";
import { FeedTabState } from "./feedTab/types";
import { SortSwitchState } from "./sortSwitch/types";
import { CampusFeedState } from "./campusFeed/types";
import { FollowingVoteState } from "./followingVote/types";

export interface ApplicationState {
  auth: AuthState;
  campusFeed: CampusFeedState;
  followingFeed: FollowingFeedState;
  followingVote: FollowingVoteState;
  feedTab: FeedTabState;
  sortSwitch: SortSwitchState;
}
