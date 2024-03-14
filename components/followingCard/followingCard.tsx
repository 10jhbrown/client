import {
  CardContainer,
  RowContainer,
  UsernameWrapper,
  UserInfoContainer,
  NameWrapper,
  ContentContainer,
  ContentWrapper,
  VoteContainer,
  VoteWrapper,
  ChevronDown,
  ChevronUp,
  SpaceBetween,
  MainContainer,
  ColumnContainer,
  FooterRowContainer,
  FooterTextWrapper,
  TimeContainer,
  BlankTextWrapper,
  ClockIcon,
} from "./followingCard.css";
import { Image, StyleSheet, View } from "react-native";

import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
});

export const FollowingCard = ({ post }) => {
  const {
    content,
    voteCount,
    commentCount,
    firstName,
    lastName,
    username,
    avatar,
    createdAt,
  } = post;

  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");

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
            <VoteContainer>
              <ChevronUp name />
              <VoteWrapper>{voteCount}</VoteWrapper>

              <ChevronDown name />
            </VoteContainer>
          </RowContainer>
        </SpaceBetween>
        {/* <Text>Hello</Text> */}
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
};

export default FollowingCard;
