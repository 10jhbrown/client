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
import { _ } from "lodash";
import { FeedFooter } from "../../components/feedFooter";
import { theme } from "theme";
export const HomeScreen = () => {
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
    // setTimeout(() => {
    dispatch(setFollowingFeedPage(1));
    // }, 1500);
  };

  const loadMorePosts = () => {
    if (hasMorePages) dispatch(setFollowingFeedPage(currentPage + 1));
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
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <View style={{ height: 60, backgroundColor: theme.colors.SURFACE_100 }} />
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
    </View>
  );
};
