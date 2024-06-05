import React, { useCallback, MutableRefObject } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FollowingCard } from "../../components/followingCard";
import { LoadingFollowingCard } from "../../components/loadingFollowingCard";
import { FeedFooter } from "../../components/feedFooter";
import { Post } from "../../types";
import {
  selectFeedLoading,
  selectFeedRefreshing,
  selectIsAddingPost,
} from "../../redux/followingFeed/selectors";
import { selectAuthToken } from "redux/auth/selectors";
import { voteFollowingPost } from "redux/followingVote/thunk";
import { selectUserVotes } from "redux/followingVote/selectors";

interface Props {
  followingFeed: Post[];
  currentPage: number;
  hasMorePages: boolean;
  flatListRef: MutableRefObject<undefined>;
  userVotes: Record<string, boolean>;
  isLoading: boolean;
  isNewPostLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onVote: (postId: string, vote: boolean) => void;
}

export const FollowingFeed: React.FC<Props> = ({
  followingFeed,
  currentPage,
  hasMorePages,
  flatListRef,
  userVotes,
  isLoading,
  isNewPostLoading,
  isRefreshing,
  onRefresh,
  onLoadMore,
  onVote,
}) => {
  const renderPost = useCallback(
    ({ item, index }) => {
      return (
        <View>
          {isNewPostLoading && index === 0 ? <LoadingFollowingCard /> : null}
          <FollowingCard
            post={item}
            userVote={userVotes[item._id]}
            onVote={onVote}
          />
        </View>
      );
    },
    [isNewPostLoading, onVote, userVotes, followingFeed]
  );

  const renderEndOfFeed = () => {
    return !hasMorePages && !isLoading ? <FeedFooter /> : <ActivityIndicator />;
  };

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 160 }}
        ref={flatListRef}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        data={followingFeed}
        renderItem={renderPost}
        keyExtractor={(item) => item._id.toString()}
        ListFooterComponent={renderEndOfFeed}
        onEndReached={onLoadMore}
        onEndReachedThreshold={1}
        alwaysBounceVertical={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        decelerationRate={0.5}
      />
    </View>
  );
};
