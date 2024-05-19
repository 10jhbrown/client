import { Animated } from "react-native";
import styled from "styled-components/native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { theme } from "../../theme";
export const CardContainer = styled.View`
  display: flex;
  width: 100%;
  min-height: 165px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.SURFACE_100};
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RowContainer = styled.View`
  flex: 1;
  paddingleft: 5px;
  flex-direction: row;
`;
export const AvatarContainer = styled.View``;

export const AvatarWrapper = styled.Image`
  width: 50px;
  height: 50px;
`;

export const UsernameWrapper = styled.Text`
  font-size: 16px;
  color: ${theme.colors.PRIMARY_500};
  margin-top: 1px;
`;

export const NameWrapper = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  background-color: ${theme.colors.SURFACE_300};
`;

export const ContentContainer = styled.View`
  flex: 1px;
  margin-top: 5px;
  min-height: 130px;
`;

export const MainContainer = styled.View`
  width: 85%;
  margin-right: 15px;
  padding: 10px;
  min-height: 90px;
`;

export const ContentWrapper = styled.Text`
  font-size: 20px;
  color: white;
`;

export const ChevronUp = styled(Feather).attrs({
  name: "chevron-up",
  color: theme.colors.SURFACE_400,
  //   color: ({ props }) =>
  //     props.isClicked ? theme.colors.PRIMARY_500 : theme.colors.PLACEHOLDER,
  size: 45,
})`
  left: -10px;
  bottom: -5px;
`;

export const ChevronDown = styled(Feather).attrs({
  name: "chevron-down",
  color: theme.colors.SURFACE_400,
  //   color: ({ props }) =>
  //     props.isClicked ? theme.colors.PRIMARY_500 : theme.colors.PLACEHOLDER,
  size: 45,
})`
  left: -10px;
  top: -5px;
`;

export const VoteContainer = styled.View`
  flex: 1;
  flex-direction: column;
  top: 0px;
  height: 110px;
`;

export const VoteWrapper = styled.Text`
  font-size: 30px;
  color: ${theme.colors.PRIMARY_500};
  margin-left: 3px;
`;

export const SpaceBetween = styled.View`
  flex: 1;
  height: 120px;
`;

export const ColumnContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const FooterRowContainer = styled.View`
  flex: 1;
  paddingleft: 5px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
  padding-horizontal: 10px;
  height: 24px;
  bottom: 0px;
`;

export const FooterTextWrapper = styled.Text`
  color: ${theme.colors.SURFACE_400};
  font-weight: 600;
`;

export const BlankTextWrapper = styled.Text`
  color: ${theme.colors.SURFACE_200};
`;

export const TimeContainer = styled.Text`
  width: 90px;
`;

export const ClockIcon = styled(AntDesign).attrs({
  name: "clockcircleo",
  color: theme.colors.SURFACE_400,
  size: 15,
})``;

export const SkeletonWrapper = styled.View`
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  background-color: ${theme.colors.SURFACE_200};
`;

export const SkeletonElement = styled(Animated.View)`
  background-color: ${theme.colors.SURFACE_300};
  border-radius: 4px;
  margin-bottom: 10px;
`;

// Specific skeleton elements
export const SkeletonImage = styled(SkeletonElement)`
  width: 100%;
  height: 200px;
`;

export const SkeletonTitle = styled(SkeletonElement)`
  width: 60%;
  height: 20px;
`;

export const SkeletonText = styled(SkeletonElement)`
  width: 100%;
  height: 15px;
`;

export const SkeletonButton = styled(SkeletonElement)`
  width: 30%;
  height: 30px;
  margin-top: auto;
`;
