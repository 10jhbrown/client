import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FollowingCard } from "../../components/followingCard";
import { LoadingFollowingCard } from "../../components/loadingFollowingCard";

import {
  selectFeedLoading,
  selectFeedRefreshing,
  selectLoadingNewPost,
} from "../../redux/followingFeed/selectors";
import { setFollowingFeedPage } from "../../redux/followingFeed";
import { Post } from "types";
//@ts-ignore
import { FeedFooter } from "../../components/feedFooter";

export const FollowingFeed = ({
  followingFeed,
  currentPage,
  hasMorePages,
  flatListRef,
}) => {
  const isLoading = useSelector(selectFeedLoading);
  const isNewPostLoading = useSelector(selectLoadingNewPost);
  const isRefreshing = useSelector(selectFeedRefreshing);
  const dispatch = useDispatch();

  const renderPost = (item: Post, i: number) => {
    return isNewPostLoading && i === 0 ? (
      <View>
        <LoadingFollowingCard />
        <FollowingCard post={item} />
      </View>
    ) : (
      <View>
        <FollowingCard post={item} />
      </View>
    );
  };

  const handleRefresh = () => {
    setTimeout(() => {
      dispatch(setFollowingFeedPage(1));
    }, 3000);
    dispatch;
  };

  const loadMorePosts = () => {
    if (hasMorePages) {
      setTimeout(() => {
        dispatch(setFollowingFeedPage(currentPage + 1));
      }, 1500);
    }
  };

  const renderEndOfFeed = () => {
    return !hasMorePages && !isLoading ? (
      <FeedFooter />
    ) : (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        initialNumToRender={6}
        maxToRenderPerBatch={12}
        windowSize={24}
        data={followingFeed}
        renderItem={({ item, index }) => renderPost(item, index)}
        keyExtractor={(item) => item._id.toString()}
        ListFooterComponent={renderEndOfFeed}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={4}
        alwaysBounceVertical={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        decelerationRate={0.5}
      />
    </View>
  );
};
