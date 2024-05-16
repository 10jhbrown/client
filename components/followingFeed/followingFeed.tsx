import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FollowingCard } from "../../components/followingCard";
import { getFollowingFeedPosts } from "../../repositories/FeedRepository";
import { selectAuthToken } from "../../redux/auth/selectors";
import {
  selectFollowingFeed,
  selectFeedPage,
  selectFeedLoading,
  selectHasMorePages,
  selectFeedRefreshing,
} from "../../redux/followingFeed/selectors";
import { setFollowingFeedPage } from "../../redux/followingFeed";
import { Post } from "types";
//@ts-ignore
import { FeedFooter } from "../../components/feedFooter";

export const FollowingFeed = () => {
  const token = useSelector(selectAuthToken);
  const followingFeed = useSelector(selectFollowingFeed);
  const currentPage = useSelector(selectFeedPage);
  const isLoading = useSelector(selectFeedLoading);
  const hasMorePages = useSelector(selectHasMorePages);
  const isRefreshing = useSelector(selectFeedRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      //@ts-ignore
      getFollowingFeedPosts({
        page: currentPage,
        token,
      })
    );
  }, [currentPage]);

  const renderPost = ({ item }: { item: Post }) => {
    return (
      <View>
        <FollowingCard post={item} />
      </View>
    );
  };

  const handleRefresh = () => {
    setTimeout(() => {
      dispatch(setFollowingFeedPage(1));
    }, 1500);
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
    <FlatList
      data={followingFeed}
      renderItem={renderPost}
      keyExtractor={(item) => item._id.toString()}
      ListFooterComponent={renderEndOfFeed}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      alwaysBounceVertical={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};
