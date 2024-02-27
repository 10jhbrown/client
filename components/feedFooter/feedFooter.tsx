import {
  CheckIcon,
  FeedFooterContainer,
  RowContainer,
  BreakLine,
  TextWrapper,
} from "./feedFooter.css";
import { View } from "react-native";

export const FeedFooter = () => {
  return (
    <FeedFooterContainer>
      <RowContainer>
        <BreakLine />
        <View>
          <CheckIcon name />
        </View>
        <BreakLine />
      </RowContainer>
      <TextWrapper>You're all caught up</TextWrapper>
    </FeedFooterContainer>
  );
};
