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
import { getFollowingFeedPosts } from "repositories/FeedRepo";
import { fetchUserFollowingVotes } from "repositories/VoteRepo";
import { selectUserVotes } from "redux/followingVote/selectors";

export const HomeScreen = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const token = useSelector(selectAuthToken);
  const followingFeed = useSelector(selectFollowingFeed);
  const currentPage = useSelector(selectFeedPage);
  const hasMorePages = useSelector(selectHasMorePages);
  const isLoadingNewPost = useSelector(selectLoadingNewPost);
  const userVotes = useSelector(selectUserVotes);
  const dispatch = useDispatch();
  const flatListRef = useRef();

  useEffect(() => {
    const postIds = followingFeed.map((post) => post._id);
    const loadFollowingFeed = async () => {
      const storedFollowingFeed = await loadFeedFromAsyncStorage(
        "@storedFollowingFeed"
      );

      if (
        storedFollowingFeed.page !== currentPage ||
        storedFollowingFeed.page === 1 ||
        hasMorePages
      ) {
        //@ts-ignore

        // const postsPromise = dispatch(
        //   getFollowingFeedPosts({ page: currentPage, token })
        // );
        // //@ts-ignore
        // const votesPromise = dispatch(
        //   fetchUserFollowingVotes({ postIds, token })
        // );

        // await Promise.all([postsPromise, votesPromise]);

        dispatch(fetchUserFollowingVotes({ postIds, token }));

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

  const renderFollowingFeed = () => (
    <FollowingFeed
      flatListRef={flatListRef}
      followingFeed={followingFeed}
      currentPage={currentPage}
      hasMorePages={hasMorePages}
      userVotes={userVotes}
    />
  );

  const renderCampusFeed = () => <CampusFeed />;

  const mainPanel = () => {
    return activeFeedTab ? renderCampusFeed() : renderFollowingFeed();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <TopHomeBar />
      {mainPanel()}
    </View>
  );
};

// import React, { useEffect, useRef, useCallback, useMemo } from "react";
// import { View } from "react-native";
// import { theme } from "theme";
// import { TopHomeBar } from "../../components/topHomeBar";
// import { useSelector, useDispatch } from "react-redux";
// import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
// import { CampusFeed } from "../../components/campusFeed";
// import { FollowingFeed } from "../../components/followingFeed";
// import {
//   selectFollowingFeed,
//   selectFeedPage,
//   selectHasMorePages,
//   selectLoadingNewPost,
// } from "../../redux/followingFeed/selectors";
// import { selectAuthToken } from "../../redux/auth/selectors";
// import { loadFeedFromAsyncStorage } from "utils/asyncStorage";
// import { getFollowingFeedPosts } from "repositories/FeedRepo";
// import { fetchUserFollowingVotes } from "repositories/VoteRepo";
// import { selectUserVotes } from "redux/followingVote/selectors";

// export const HomeScreen = () => {
//   const activeFeedTab = useSelector(selectActiveFeedTab);
//   const token = useSelector(selectAuthToken);
//   const followingFeed = useSelector(selectFollowingFeed);
//   const currentPage = useSelector(selectFeedPage);
//   const hasMorePages = useSelector(selectHasMorePages);
//   const isLoadingNewPost = useSelector(selectLoadingNewPost);
//   const userVotes = useSelector(selectUserVotes);
//   const dispatch = useDispatch();
//   const flatListRef = useRef();

//   const fetchPostsAndVotes = useCallback(async () => {
//     const postIds = followingFeed.map((post) => post._id);
//     const storedFollowingFeed = await loadFeedFromAsyncStorage(
//       "@storedFollowingFeed"
//     );

//     if (
//       storedFollowingFeed.page !== currentPage ||
//       storedFollowingFeed.page === 1 ||
//       hasMorePages
//     ) {
//       const postsPromise = dispatch(
//         //@ts-ignore
//         getFollowingFeedPosts({ page: currentPage, token })
//       );
//       const votesPromise = dispatch(
//         //@ts-ignore
//         fetchUserFollowingVotes({ postIds, token })
//       );

//       await Promise.all([postsPromise, votesPromise]);
//     }

//     if (isLoadingNewPost) {
//       //@ts-ignore
//       flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
//     }
//   }, [
//     dispatch,
//     followingFeed,
//     currentPage,
//     token,
//     hasMorePages,
//     isLoadingNewPost,
//   ]);

//   useEffect(() => {
//     fetchPostsAndVotes();
//   }, [fetchPostsAndVotes]);

//   const renderFollowingFeed = useCallback(
//     () => (
//       <FollowingFeed
//         flatListRef={flatListRef}
//         followingFeed={followingFeed}
//         currentPage={currentPage}
//         hasMorePages={hasMorePages}
//         userVotes={userVotes}
//       />
//     ),
//     [followingFeed, currentPage, hasMorePages, userVotes]
//   );

//   const renderCampusFeed = useCallback(() => <CampusFeed />, []);

//   const mainPanel = useMemo(
//     () => (activeFeedTab ? renderCampusFeed() : renderFollowingFeed()),
//     [activeFeedTab, renderCampusFeed, renderFollowingFeed]
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
//       <TopHomeBar />
//       {mainPanel}
//     </View>
//   );
// };

// export default React.memo(HomeScreen);
