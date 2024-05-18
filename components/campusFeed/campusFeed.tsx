import React, { useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CampusCard } from "../campusCard";
import { getCampusFeedPosts } from "../../repositories/FeedRepository";
import { selectAuthToken } from "../../redux/auth/selectors";
import {
  selectCampusFeed,
  selectFeedPage,
  selectFeedLoading,
  selectHasMorePages,
  selectFeedRefreshing,
} from "../../redux/campusFeed/selectors";
import { setCampusFeedPage } from "../../redux/campusFeed";
import { Post } from "types";
//@ts-ignore
import { FeedFooter } from "../feedFooter";

export const CampusFeed = () => {
  const token = useSelector(selectAuthToken);
  const campusFeed = useSelector(selectCampusFeed);
  const currentPage = useSelector(selectFeedPage);
  const isLoading = useSelector(selectFeedLoading);
  const hasMorePages = useSelector(selectHasMorePages);
  const isRefreshing = useSelector(selectFeedRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      //@ts-ignore
      getCampusFeedPosts({
        page: currentPage,
        token,
      })
    );
  }, [currentPage <= 1]);

  const renderPost = ({ item }: { item: Post }) => {
    return (
      <View>
        <CampusCard post={item} />
      </View>
    );
  };

  const handleRefresh = () => {
    setTimeout(() => {
      dispatch(setCampusFeedPage(1));
    }, 1500);
  };

  const loadMorePosts = () => {
    if (hasMorePages) {
      setTimeout(() => {
        dispatch(setCampusFeedPage(currentPage + 1));
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
      data={campusFeed}
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
