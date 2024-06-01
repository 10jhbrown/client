import React from "react";
import { Post } from "types";
import { theme } from "theme";
import TimeAgo from "javascript-time-ago";
import styled from "styled-components/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Card = styled.View`
  background: ${theme.colors.SURFACE_200};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  padding: 15px;
  margin: 3px 0;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid ${theme.colors.SURFACE_300};
`;

const UserDetails = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const FullName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: white;
`;

const Username = styled.Text`
  color: ${theme.colors.PRIMARY_400};
  font-size: 14px;
`;

const PostContent = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  line-height: 20px;
  color: white;
  width: 85%;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const VoteSection = styled.View`
  position: absolute;
  right: 10px;
  top: 0px;
  flex-direction: column;
  align-items: center;
`;

const VoteButton = styled.TouchableOpacity`
  margin: 0px 5px;
`;

const VoteCount = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${theme.colors.PRIMARY_400};
`;

const Time = styled.Text`
  font-size: 12px;
  color: ${theme.colors.SURFACE_500};
`;

const Comment = styled.Text`
  font-size: 12.5px;
  color: ${theme.colors.SURFACE_500};
`;

const More = styled.View`
  color: ${theme.colors.SURFACE_500};
`;

interface Props {
  post: Post;
  userVote?: boolean;
  onVote: (postId: string, vote: boolean) => void;
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.post === nextProps.post &&
    prevProps.userVote === nextProps.userVote
  );
};

export const FollowingCard = React.memo(({ post, userVote, onVote }: Props) => {
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

  console.log("RENDERED CARD");

  const timeAgo = new TimeAgo("en-US");

  return (
    <Card>
      <Header>
        <Avatar source={{ uri: avatar }} />
        <UserDetails>
          <FullName>
            {firstName} {lastName}
          </FullName>
          <Username>@{username}</Username>
        </UserDetails>
        <VoteSection>
          <VoteButton onPress={() => onVote(_id, true)}>
            <FontAwesome
              name="chevron-up"
              size={26}
              color={
                userVote === true
                  ? theme.colors.PRIMARY_400
                  : theme.colors.SURFACE_500
              }
            />
          </VoteButton>
          <VoteCount>{voteCount}</VoteCount>
          <VoteButton onPress={() => onVote(_id, false)}>
            <FontAwesome
              name="chevron-down"
              size={26}
              color={
                userVote === false
                  ? theme.colors.PRIMARY_400
                  : theme.colors.SURFACE_500
              }
            />
          </VoteButton>
        </VoteSection>
      </Header>
      <PostContent>{content}</PostContent>
      <Footer>
        <Time>{timeAgo.format(new Date(createdAt), "mini")} ago</Time>
        <Comment>
          <FontAwesome
            name="comments"
            size={15}
            color={theme.colors.SURFACE_500}
          />{" "}
          {commentCount} comments
        </Comment>
        <More>
          <Entypo
            name="dots-three-horizontal"
            size={15}
            color={theme.colors.SURFACE_500}
          />
        </More>
      </Footer>
    </Card>
  );
}, areEqual);

export default FollowingCard;
