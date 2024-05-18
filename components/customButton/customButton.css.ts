import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { theme } from "theme";

export const StyledButton = styled(TouchableOpacity)<{ secondary: boolean }>`
  background-color: ${(props) =>
    props.secondary ? theme.colors.SURFACE_100 : theme.colors.PRIMARY_500};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 10px;
  border-radius: 5px;
  shadow-radius: 0px 0px 50px 15px #48abe0;
`;

export const EthnoText = styled(Text)<{ secondary?: boolean; size?: number }>`
  color: ${(props) => (props.secondary ? theme.colors.PRIMARY_500 : "#fff")};
  text-align: center;
  font-size: ${(props) => (props.size ? `${props.size}px` : "16px")};
  font-weight: bold;
  font-family: Ethnocentric;
`;
