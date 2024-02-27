import styled from "styled-components/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { theme } from "../../theme";

export const FeedFooterContainer = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-contents: space-between;
  height: 65px;
`;

export const CheckIcon = styled(AntDesign).attrs({
  name: "checkcircleo",
  color: theme.colors.PRIMARY_500,
  size: 25,
})``;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BreakLine = styled.View`
  flex: 1;
  height: 1px;
  background: ${theme.colors.PRIMARY_500};
`;

export const TextWrapper = styled.Text`
  text-align: center;
  color: white;
  margin-top: 5px;
`;
