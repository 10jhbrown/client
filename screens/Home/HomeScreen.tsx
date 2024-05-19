import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { theme } from "theme";
import { TopHomeBar } from "../../components/topHomeBar";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
import { CampusFeed } from "../../components/campusFeed";
import { FollowingFeed } from "../../components/followingFeed";
import {
  selectFollowingFeed,
  selectFeedPage,
  selectHasMorePages,
  selectLoadingNewPost,
} from "../../redux/followingFeed/selectors";
import { selectAuthToken } from "../../redux/auth/selectors";
import { loadFeedFromAsyncStorage } from "utils/asyncStorage";
import { getFollowingFeedPosts } from "repositories/FeedRepository";

export const HomeScreen = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const token = useSelector(selectAuthToken);
  const followingFeed = useSelector(selectFollowingFeed);
  const currentPage = useSelector(selectFeedPage);
  const hasMorePages = useSelector(selectHasMorePages);
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
    };
    loadFollowingFeed();
  }, [currentPage, isLoadingNewPost]);

  const mainPanel = () => {
    return activeFeedTab ? (
      <CampusFeed />
    ) : (
      <FollowingFeed
        flatListRef={flatListRef}
        followingFeed={followingFeed}
        currentPage={currentPage}
        hasMorePages={hasMorePages}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <TopHomeBar />
      {mainPanel()}
    </View>
  );
};
