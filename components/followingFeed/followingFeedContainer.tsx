import React, {
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowingFeed } from "../../components/followingFeed";
import {
  selectLatestFeed,
  selectLatestPage,
  selectHasMoreLatestPages,
  selectGreatestFeed,
  selectGreatestPage,
  selectHasMoreGreatestPages,
  selectFeedLoading,
  selectFeedRefreshing,
  selectIsAddingPost,
} from "../../redux/followingFeed/selectors";
import { selectAuthToken } from "../../redux/auth/selectors";
import {
  getLatestFollowingPosts,
  getGreatestFollowingPosts,
} from "../../redux/followingFeed/thunk";
import {
  getUserVotes,
  voteFollowingPost,
} from "../../redux/followingVote/thunk";
import { selectUserVotes } from "../../redux/followingVote/selectors";
import {
  setLatestFeedPage,
  setGreatestFeedPage,
} from "../../redux/followingFeed";

interface Props {
  sortType: "latest" | "greatest";
}

export const FollowingFeedContainer: React.FC<Props> = ({ sortType }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const flatListRef = useRef() as MutableRefObject<undefined>;
  const followingFeed = useSelector(
    sortType === "latest" ? selectLatestFeed : selectGreatestFeed
  );
  const currentPage = useSelector(
    sortType === "latest" ? selectLatestPage : selectGreatestPage
  );
  const hasMorePages = useSelector(
    sortType === "latest"
      ? selectHasMoreLatestPages
      : selectHasMoreGreatestPages
  );
  const isLoading = useSelector(selectFeedLoading);
  const isRefreshing = useSelector(selectFeedRefreshing);
  const isNewPostLoading = useSelector(selectIsAddingPost);
  const userVotes = useSelector(selectUserVotes);
  // const postIds = useMemo(() => followingFeed.map((post) => post._id), [
  //   followingFeed,
  // ]);

  const postIds = useMemo(() => followingFeed.map((post) => post._id), [
    followingFeed,
  ]);

  const fetchPostsAndVotes = useCallback(async () => {
    if (sortType === "latest") {
      //@ts-ignore
      dispatch(getLatestFollowingPosts({ page: currentPage, token }));
    } else if (sortType === "greatest") {
      //@ts-ignore
      dispatch(getGreatestFollowingPosts({ page: currentPage, token }));
    }
    //@ts-ignore
    if (isNewPostLoading) {
      //@ts-ignore
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [dispatch, token, currentPage, sortType, isNewPostLoading]);

  useEffect(() => {
    fetchPostsAndVotes();
  }, [fetchPostsAndVotes]);

  useEffect(() => {
    dispatch(getUserVotes({ postIds: postIds, token }));
  }, [postIds]);

  const handleRefresh = useCallback(() => {
    if (sortType === "latest") {
      dispatch(setLatestFeedPage(1));
    } else {
      dispatch(setGreatestFeedPage(1));
    }
  }, [sortType]);

  const loadMorePosts = useCallback(() => {
    if (hasMorePages) {
      if (sortType === "latest") {
        dispatch(setLatestFeedPage(currentPage + 1));
      } else {
        dispatch(setGreatestFeedPage(currentPage + 1));
      }
    }
  }, [hasMorePages, sortType, currentPage]);

  const handleVote = useCallback(
    (postId: string, vote: boolean) => {
      //@ts-ignore
      dispatch(voteFollowingPost({ postId, vote, token }));
    },
    [dispatch, token]
  );

  return (
    <FollowingFeed
      followingFeed={followingFeed}
      currentPage={currentPage}
      hasMorePages={hasMorePages}
      flatListRef={flatListRef}
      userVotes={userVotes}
      isLoading={isLoading}
      isNewPostLoading={isNewPostLoading}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onLoadMore={loadMorePosts}
      onVote={handleVote}
    />
  );
};
