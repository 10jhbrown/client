import React, { useEffect, useRef, useMemo, useCallback } from "react";
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
import {
  getLatestFollowingFeedPosts,
  getGreatestFollowingFeedPosts,
} from "repositories/FeedRepo";
import { fetchUserFollowingVotes } from "repositories/VoteRepo";
import { selectUserVotes } from "redux/followingVote/selectors";
import { selectActiveSortState } from "redux/sortSwitch/selectors";
import { ACTIVE_SORT_SWITCH } from "../../constants/constants";

export const HomeScreen = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const token = useSelector(selectAuthToken);
  const currentPage = useSelector(selectFeedPage);
  const hasMorePages = useSelector(selectHasMorePages);
  const isLoadingNewPost = useSelector(selectLoadingNewPost);
  const userVotes = useSelector(selectUserVotes);
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const activeSort = useSelector(selectActiveSortState);

  const fetchPostsAndVotes = useCallback(async () => {
    const postIds = followingFeed.map((post) => post._id);
    const storedFollowingFeed = await loadFeedFromAsyncStorage(
      "@storedFollowingFeed"
    );

    if (
      storedFollowingFeed.page !== currentPage ||
      storedFollowingFeed.page === 1 ||
      hasMorePages
    ) {
      // const postsPromise =  dispatch(
      //   //@ts-ignore
      //   getFollowingFeedPosts({ page: currentPage, token })
      // );

      if (activeSort === ACTIVE_SORT_SWITCH.LATEST) {
        dispatch(
          //@ts-ignore
          getLatestFollowingFeedPosts({ page: currentPage, token })
        );
      } else if (activeSort === ACTIVE_SORT_SWITCH.GREATEST) {
        dispatch(
          //@ts-ignore
          getGreatestFollowingFeedPosts({ page: currentPage, token })
        );
      }
      dispatch(
        //@ts-ignore
        fetchUserFollowingVotes({ postIds, token })
      );
    }

    if (isLoadingNewPost) {
      //@ts-ignore
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    console.log("HOME SCREEN FETCH POSTS");
  }, [
    isLoadingNewPost,
    currentPage /* */,
    activeSort,
    // activeSort,
    // dispatch,
    // hasMorePages,
    // followingFeed,
    // token,
  ]);
  const followingFeed = useSelector(selectFollowingFeed);

  useEffect(() => {
    fetchPostsAndVotes();
  }, [fetchPostsAndVotes]);

  const renderFollowingFeed = useCallback(() => {
    return (
      <FollowingFeed
        flatListRef={flatListRef}
        followingFeed={followingFeed}
        currentPage={currentPage}
        hasMorePages={hasMorePages}
        userVotes={userVotes}
      />
    );
  }, [
    currentPage,
    followingFeed,
    userVotes,
    // sortedFollowingFeed /*hasMorePages, flatListRef */,
  ]);

  const renderCampusFeed = useCallback(() => <CampusFeed />, []);

  const mainPanel = useMemo(
    () => (activeFeedTab ? renderCampusFeed() : renderFollowingFeed()),
    [activeFeedTab, renderCampusFeed, renderFollowingFeed]
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <TopHomeBar />
      {mainPanel}
    </View>
  );
};
