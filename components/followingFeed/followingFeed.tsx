import React, { useCallback, useEffect, MutableRefObject } from "react";
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
import { FeedFooter } from "../../components/feedFooter";
import { Post } from "../../types";
import { selectAuthToken } from "redux/auth/selectors";
import { sendFollowingVote } from "repositories/VoteRepo";
import { UserFollowingVotes } from "redux/followingVote/types";

interface Props {
  followingFeed: Post[];
  currentPage: number;
  hasMorePages: boolean;
  flatListRef: MutableRefObject<undefined>;
  userVotes: UserFollowingVotes;
}

export const FollowingFeed = React.memo(
  ({
    followingFeed,
    currentPage,
    hasMorePages,
    flatListRef,
    userVotes,
  }: Props) => {
    const isLoading = useSelector(selectFeedLoading);
    const isNewPostLoading = useSelector(selectLoadingNewPost);
    const isRefreshing = useSelector(selectFeedRefreshing);
    const token = useSelector(selectAuthToken);
    const dispatch = useDispatch();

    const handleVote = useCallback(
      (postId: string, vote: boolean) => {
        //@ts-ignore
        dispatch(sendFollowingVote({ postId, vote, token }));
      },
      [dispatch, token]
    );

    const renderPost = useCallback(
      (item: Post, i: number) => {
        return (
          <View>
            {isNewPostLoading && i === 0 ? <LoadingFollowingCard /> : null}
            <FollowingCard
              post={item}
              userVote={userVotes[item._id]}
              onVote={handleVote}
            />
          </View>
        );
      },
      [isNewPostLoading, handleVote, userVotes]
    );

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
      <View style={{ height: "100%" }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 160 }}
          ref={flatListRef}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
          data={followingFeed}
          renderItem={({ item, index }) => renderPost(item, index)}
          keyExtractor={(item) => item._id.toString()}
          ListFooterComponent={renderEndOfFeed}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={3}
          alwaysBounceVertical={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          decelerationRate={0.5}
        />
      </View>
    );
  }
);

// import React, { useCallback, useEffect, MutableRefObject } from "react";
// import {
//   View,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { FollowingCard } from "../../components/followingCard";
// import { LoadingFollowingCard } from "../../components/loadingFollowingCard";
// import {
//   selectFeedLoading,
//   selectFeedRefreshing,
//   selectLoadingNewPost,
// } from "../../redux/followingFeed/selectors";
// import { setFollowingFeedPage } from "../../redux/followingFeed";
// import { FeedFooter } from "../../components/feedFooter";
// import { Post } from "../../types";
// import { selectAuthToken } from "redux/auth/selectors";
// import { sendFollowingVote } from "repositories/VoteRepo";
// import { selectUserVotes } from "redux/followingVote/selectors";

// interface Props {
//   followingFeed: Post[];
//   currentPage: number;
//   hasMorePages: boolean;
//   flatListRef: MutableRefObject<undefined>;
//   userVotes: Record<string, boolean>;
// }

// export const FollowingFeed = React.memo(
//   ({
//     followingFeed,
//     currentPage,
//     hasMorePages,
//     flatListRef,
//     userVotes,
//   }: Props) => {
//     const isLoading = useSelector(selectFeedLoading);
//     const isNewPostLoading = useSelector(selectLoadingNewPost);
//     const isRefreshing = useSelector(selectFeedRefreshing);
//     const token = useSelector(selectAuthToken);
//     const dispatch = useDispatch();

//     const handleVote = useCallback(
//       (postId: string, vote: boolean) => {
//         //@ts-ignore
//         dispatch(sendFollowingVote({ postId, vote, token }));
//       },
//       [dispatch, token]
//     );

//     const renderPost = useCallback(
//       ({ item, index }: { item: Post; index: number }) => {
//         return (
//           <View>
//             {isNewPostLoading && index === 0 ? <LoadingFollowingCard /> : null}
//             <FollowingCard
//               post={item}
//               userVote={userVotes[item._id]}
//               onVote={handleVote}
//             />
//           </View>
//         );
//       },
//       [isNewPostLoading, handleVote, userVotes]
//     );

//     const handleRefresh = useCallback(() => {
//       setTimeout(() => {
//         dispatch(setFollowingFeedPage(1));
//       }, 3000);
//     }, [dispatch]);

//     const loadMorePosts = useCallback(() => {
//       if (hasMorePages) {
//         setTimeout(() => {
//           dispatch(setFollowingFeedPage(currentPage + 1));
//         }, 1500);
//       }
//     }, [dispatch, currentPage, hasMorePages]);

//     const renderEndOfFeed = useCallback(() => {
//       return !hasMorePages && !isLoading ? (
//         <FeedFooter />
//       ) : (
//         <View>
//           <ActivityIndicator />
//         </View>
//       );
//     }, [hasMorePages, isLoading]);

//     return (
//       <View style={{ height: "100%" }}>
//         <FlatList
//           contentContainerStyle={{ paddingBottom: 160 }}
//           ref={flatListRef}
//           initialNumToRender={10}
//           maxToRenderPerBatch={10}
//           windowSize={21}
//           data={followingFeed}
//           renderItem={renderPost}
//           keyExtractor={(item) => item._id.toString()}
//           ListFooterComponent={renderEndOfFeed}
//           onEndReached={loadMorePosts}
//           onEndReachedThreshold={3}
//           alwaysBounceVertical={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={isRefreshing}
//               onRefresh={handleRefresh}
//             />
//           }
//           decelerationRate="fast"
//         />
//       </View>
//     );
//   }
// );
