import React, { useEffect, useRef } from "react";
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
  selectLoadingNewPost,
} from "../../redux/followingFeed/selectors";
import {
  setFollowingFeedPage,
  stopLoadingNewPost,
} from "../../redux/followingFeed";
import { Post } from "types";
//@ts-ignore
import { FeedFooter } from "../../components/feedFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadFeedFromAsyncStorage } from "utils/asyncStorage";
import { store } from "redux/store";

export const FollowingFeed = () => {
  const token = useSelector(selectAuthToken);
  const followingFeed = useSelector(selectFollowingFeed);
  const currentPage = useSelector(selectFeedPage);
  const isLoading = useSelector(selectFeedLoading);
  const hasMorePages = useSelector(selectHasMorePages);
  const isRefreshing = useSelector(selectFeedRefreshing);
  const isLoadingNewPost = useSelector(selectLoadingNewPost);
  const dispatch = useDispatch();
  const flatListRef = useRef();

  useEffect(() => {
    const loadFollowingFeed = async () => {
      const storedFollowingFeed = await loadFeedFromAsyncStorage(
        "@storedFollowingFeed"
      );

      if (
        storedFollowingFeed.page !== currentPage ||
        storedFollowingFeed.page === 1 ||
        hasMorePages
      ) {
        dispatch(
          //@ts-ignore
          getFollowingFeedPosts({
            page: currentPage,
            token,
          })
        );
      }
      if (isLoadingNewPost) {
        //@ts-ignore
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
      dispatch(stopLoadingNewPost());
    };
    loadFollowingFeed();
  }, [currentPage, isLoadingNewPost]);

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
    <FlatList
      ref={flatListRef}
      initialNumToRender={6}
      maxToRenderPerBatch={12}
      windowSize={24}
      data={followingFeed}
      renderItem={renderPost}
      keyExtractor={(item) => item._id.toString()}
      ListFooterComponent={renderEndOfFeed}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={4}
      alwaysBounceVertical={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};
