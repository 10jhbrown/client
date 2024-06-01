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
// import { UserFollowingVotes } from "redux/followingVote/types";

// interface Props {
//   followingFeed: Post[];
//   currentPage: number;
//   hasMorePages: boolean;
//   flatListRef: MutableRefObject<undefined>;
//   userVotes: UserFollowingVotes;
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
//       (item: Post, i: number) => {
//         return (
//           <View>
//             {isNewPostLoading && i === 0 ? <LoadingFollowingCard /> : null}
//             <FollowingCard
//               post={item}
//               userVote={userVotes[item._id]}
//               //@ts-ignore
//               onVote={handleVote}
//             />
//           </View>
//         );
//       },
//       [isNewPostLoading, handleVote, userVotes]
//     );

//     const handleRefresh = () => {
//       setTimeout(() => {
//         dispatch(setFollowingFeedPage(1));
//       }, 3000);
//       dispatch;
//     };

//     const loadMorePosts = () => {
//       if (hasMorePages) {
//         setTimeout(() => {
//           dispatch(setFollowingFeedPage(currentPage + 1));
//         }, 1500);
//       }
//     };

//     const renderEndOfFeed = () => {
//       return !hasMorePages && !isLoading ? (
//         <FeedFooter />
//       ) : (
//         <View>
//           <ActivityIndicator />
//         </View>
//       );
//     };

//     return (
//       <View style={{ height: "100%" }}>
//         <FlatList
//           contentContainerStyle={{ paddingBottom: 160 }}
//           ref={flatListRef}
//           initialNumToRender={10}
//           maxToRenderPerBatch={10}
//           windowSize={21}
//           data={followingFeed}
//           renderItem={({ item, index }) => renderPost(item, index)}
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
//           decelerationRate={0.5}
//         />
//       </View>
//     );
//   }
// );

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
import {
  sendFollowingVote,
  fetchUserFollowingVotes,
} from "repositories/VoteRepo";
import {
  selectUserVotes,
  selectUserVoteStatus,
} from "redux/followingVote/selectors";
import { setUserVotes } from "redux/followingVote";

interface Props {
  followingFeed: Post[];
  currentPage: number;
  hasMorePages: boolean;
  flatListRef: MutableRefObject<undefined>;
  userVotes: Record<string, boolean>;
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
    const userVotesStatus = useSelector(selectUserVoteStatus);
    const handleVote = useCallback(
      (postId: string, vote: boolean) => {
        //@ts-ignore
        dispatch(sendFollowingVote({ postId, vote, token }));
      },
      [dispatch, token]
    );

    const renderPost = useCallback(
      ({ item, index }) => {
        const userVote = userVotes[item._id];
        // dispatch(setUserVotes({ postId: item._id, vote: userVote }));
        return (
          <View>
            {isNewPostLoading && index === 0 ? <LoadingFollowingCard /> : null}
            <FollowingCard
              post={item}
              userVote={userVote}
              onVote={handleVote}
            />
          </View>
        );
      },
      [isNewPostLoading, userVotes, handleVote]
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
        <ActivityIndicator />
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
          renderItem={renderPost}
          keyExtractor={(item) => item._id.toString()}
          ListFooterComponent={renderEndOfFeed}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={1}
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
