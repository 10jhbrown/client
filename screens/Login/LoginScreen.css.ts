import styled from "styled-components/native";
import { theme } from "../../theme";
export const LoginScreenContainer = styled.View`
  height: 100%;
  background-color: ${theme.colors.SURFACE_100};
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;

export const RaveWaveLogo = styled.Text`
  font-size: 43px;
  font-family: Ethnocentric;
  color: ${theme.colors.PRIMARY_400};
`;

export const WaveLogo = styled.Text`
  font-size: 43px;
  font-family: Ethnocentric;
  color: white;
`;
