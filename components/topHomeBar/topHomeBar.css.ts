import styled from "styled-components/native";
import Octicons from "react-native-vector-icons/Octicons";
import { theme } from "../../theme";
export const TopHomeBarContainer = styled.View`
  height: 160px;
  background-color: ${theme.colors.SURFACE_100};
`;

export const AddFollowingPostIcon = styled(Octicons).attrs({
  name: "diff-added",
  size: 30,
  color: theme.colors.PRIMARY_500,
})`
  position: absolute;
  right: 0px;
  top: 60px;
  margin-right: 25px;
`;

export const AddCampusPostIcon = styled(Octicons).attrs({
  name: "diff-added",
  size: 30,
  color: theme.colors.PRIMARY_500,
})`
  position: absolute;
  left: 0px;
  top: 60px;
  margin-left: 25px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;
