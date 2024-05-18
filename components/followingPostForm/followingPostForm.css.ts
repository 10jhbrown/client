import styled from "styled-components/native";
import { TextInput } from "react-native";
import { theme } from "theme";

export const FollowingPostField = styled(TextInput).attrs({
  placeholderTextColor: theme.colors.PLACEHOLDER,
})`
  padding: 25px;
  color: white;
  font-size: 15px;
`;
