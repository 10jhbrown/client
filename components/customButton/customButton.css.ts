import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { theme } from "theme";

export const StyledButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.PRIMARY_500};
  padding: 10px;
  border-radius: 5px;
  shadow-radius: 0px 0px 50px 15px #48abe0;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  font-family: Ethnocentric;
`;
