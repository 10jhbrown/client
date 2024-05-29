import React, { useCallback } from "react";
import {
  CardContainer,
  RowContainer,
  UsernameWrapper,
  UserInfoContainer,
  NameWrapper,
  ContentContainer,
  ContentWrapper,
  SpaceBetween,
  MainContainer,
  ColumnContainer,
  FooterRowContainer,
  FooterTextWrapper,
  TimeContainer,
  BlankTextWrapper,
  ClockIcon,
} from "./followingCard.css";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import { Post } from "types";
import { VoteCaster } from "../../components/voteCaster";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "theme";
import { selectAuthToken } from "redux/auth/selectors";
TimeAgo.addLocale(en);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "flex-start",
    borderRadius: 50,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 30,
  },
});

interface Props {
  post: Post;
  onVote: ({ _id, vote }) => boolean;
  userVote?: boolean | undefined;
}

export const FollowingCard = React.memo(({ post, onVote, userVote }: Props) => {
  const {
    _id,
    content,
    voteCount,
    commentCount,
    firstName,
    lastName,
    username,
    avatar,
    createdAt,
  } = post;
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  // // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");
  const handleVoteButtonStyle = useCallback(
    (vote: boolean) => {
      // console.log("USER VOTE", userVotes[postId]);
      if (userVote === vote) {
        return { color: theme.colors.PRIMARY_400 };
      }
      return {};
    },
    [userVote]
  );
  console.log("FOLLOWING CARD", _id);
  return (
    <CardContainer>
      {/* <Text>{username}</Text> */}
      <ColumnContainer>
        <SpaceBetween>
          <RowContainer>
            <MainContainer>
              <UserInfoContainer>
                <RowContainer>
                  <View style={styles.container}>
                    <Image source={{ uri: avatar }} style={styles.image} />
                  </View>
                  <NameWrapper>{`${firstName} ${lastName}`}</NameWrapper>
                  <UsernameWrapper>@{username}</UsernameWrapper>
                </RowContainer>
              </UserInfoContainer>
              <ContentContainer>
                <ContentWrapper>{content}</ContentWrapper>
              </ContentContainer>
            </MainContainer>
            <VoteCaster
              postId={_id}
              voteCount={voteCount}
              voteButtonStyle={handleVoteButtonStyle}
              onVote={onVote}
            />
          </RowContainer>
        </SpaceBetween>
        <FooterRowContainer>
          <TimeContainer>
            <ClockIcon name />{" "}
            <FooterTextWrapper>
              {timeAgo.format(new Date(createdAt), "mini")} ago
            </FooterTextWrapper>
          </TimeContainer>
          <FooterTextWrapper>{commentCount} comments </FooterTextWrapper>
          <BlankTextWrapper>...............</BlankTextWrapper>
        </FooterRowContainer>
      </ColumnContainer>
    </CardContainer>
  );
});

export default FollowingCard;

// import React, { useCallback, useMemo } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { Post } from "../../types";
// import { theme } from "theme";

// interface Props {
//   post: Post;
//   userVote: boolean | undefined;
//   onVote: (postId: string, vote: boolean) => void;
// }

// const FollowingCardComponent = ({ post, userVote, onVote }: Props) => {
//   const handleUpvote = useCallback(() => {
//     onVote(post._id, true);
//   }, [onVote, post._id]);

//   const handleDownvote = useCallback(() => {
//     onVote(post._id, false);
//   }, [onVote, post._id]);

//   const upvoteStyle = useMemo(() => {
//     return userVote === true
//       ? styles.activeVoteButton
//       : styles.inactiveVoteButton;
//   }, [userVote]);

//   const downvoteStyle = useMemo(() => {
//     return userVote === false
//       ? styles.activeVoteButton
//       : styles.inactiveVoteButton;
//   }, [userVote]);

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{post.firstName}</Text>
//       <Text style={styles.body}>{post.content}</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Upvote"
//           onPress={handleUpvote}
//           color={upvoteStyle.color}
//         />
//         <Button
//           title="Downvote"
//           onPress={handleDownvote}
//           color={downvoteStyle.color}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     padding: 16,
//     marginVertical: 8,
//     backgroundColor: theme.colors.SURFACE_100,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//   },
//   body: {
//     fontSize: 14,
//     color: "white",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   activeVoteButton: {
//     color: theme.colors.PRIMARY_400,
//   },
//   inactiveVoteButton: {
//     color: "grey",
//   },
// });

// export const FollowingCard = React.memo(FollowingCardComponent);
