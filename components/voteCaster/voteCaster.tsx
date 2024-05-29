import React from "react";
import { TouchableOpacity } from "react-native";
import {
  VoteContainer,
  ChevronUp,
  ChevronDown,
  VoteWrapper,
} from "./voteCaster.css";

interface Props {
  postId: string;
  voteCount: number;
  voteButtonStyle: (vote: boolean) => any;
  onVote: ({ _id, vote }) => any;
}

export const VoteCaster = React.memo(
  ({ postId, onVote, voteCount, voteButtonStyle }: Props) => {
    return (
      <VoteContainer>
        <TouchableOpacity
          // disabled={hasVoted}
          onPress={() =>
            //@ts-ignore
            onVote(postId, true)
          }
        >
          <ChevronUp name style={voteButtonStyle(true)} />
        </TouchableOpacity>

        <VoteWrapper>{voteCount}</VoteWrapper>
        <TouchableOpacity
          // disabled={hasVoted}
          onPress={() =>
            //@ts-ignore
            onVote(postId, false)
          }
        >
          <ChevronDown name style={voteButtonStyle(false)} />
        </TouchableOpacity>
      </VoteContainer>
    );
  }
);
