import styled from "styled-components/native";
import { theme } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";

export const SignInContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 10px;
`;

export const SignInText = styled.Text`
  font-size: 14px;
  color: white;
`;

export const SignInTextLink = styled.Text`
  font-size: 14px;
  color: ${theme.colors.PRIMARY_500};
`;

export const RegisterButtonContainer = styled.View`
  margin-top: 15px;
`;

export const RegisterFormContainer = styled(LinearGradient).attrs({
  colors: ["#121220", "#272835"],
  start: { x: 0, y: 0.6 },
  end: { x: 0, y: 0.1 },
})`
  width: 100%;
  margin-horizontal: 25px;
  margin-top: 25%;
  padding: 25px;
  border-radius: 30px;
  margin-bottom: 30%;
`;

export const CreateAccountTitle = styled.Text`
  font-size: 26px;
  color: white;
  margin-bottom: 5px;
  font-weight: bold;
  font-family: Ethnocentric;
`;

export const WarningIcon = styled(Entypo).attrs({
  name: "warning",
  size: 15,
})`
  color: red;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: #ffcccb;
  border-radius: 15px 15px 15px 15px;
  border-width: 1px;
  border-color: red;
  padding: 5px 5px 5px 10px;
  margin-top: 10px;
`;

export const ErrorText = styled.Text`
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  color: ${theme.colors.PRIMARY_100};
`;
