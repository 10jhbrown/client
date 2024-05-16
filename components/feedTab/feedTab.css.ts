import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "../../theme";

interface FeedTabTextProps {
  activeFeedTab: boolean;
}

export const SchoolIcon = styled(Ionicons).attrs({
  name: "school",
  size: 25,
  color: theme.colors.SURFACE_400,
})``;

export const FollowingIcon = styled(FontAwesome5).attrs({
  name: "user-friends",
  size: 25,
  color: theme.colors.SURFACE_400,
})`
  padding: 0px;
`;

export const FeedTabText = styled.Text<FeedTabTextProps>`
  text-align: center;
  padding-vertical: 18px;
  font-size: 18px;
  font-weight: 800;
  color: ${(props) =>
    props.activeFeedTab ? "white" : theme.colors.PLACEHOLDER};
`;
