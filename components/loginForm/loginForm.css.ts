import styled from "styled-components/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { theme } from "../../theme";
import { ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const LoginFormContainer = styled(LinearGradient).attrs({
  colors: ["#121220", "#272835"],
  start: { x: 0, y: 0.6 },
  end: { x: 0, y: 0.1 },
})`
  margin-horizontal: 25px;
  margin-top: 10%;
  padding: 25px;
  border-radius: 30px;
`;

export const LoginTitle = styled.Text`
  font-size: 26px;
  color: white;
  margin-bottom: 5px;
  font-weight: bold;
  font-family: Ethnocentric;
`;

export const RowContainer = styled.View`
  flex: 1;
  paddingleft: 5px;
  justify-content: space-betwenn;
  flex-direction: row;
`;

export const EmailIcon = styled(Fontisto).attrs({
  name: "email",
  color: theme.colors.PLACEHOLDER,
  size: 27,
})`
  bottom: -21px;
  padding-right: 10px;
`;

export const LockIcon = styled(AntDesign).attrs({
  name: "lock1",
  color: theme.colors.PLACEHOLDER,
  size: 28,
})`
  bottom: -20px;
  padding-right: 10px;
  left: -1px;
`;

export const LoginButtonContainer = styled.View`
  margin-top: 15px;
`;

export const LoadingAnimator = styled(ActivityIndicator).attrs({
  size: "large",
  color: theme.colors.PRIMARY_500,
});

export const SignUpContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 10px;
`;

export const SignUpText = styled.Text`
  font-size: 14px;
  color: white;
`;

export const SignUpTextLink = styled.Text`
  font-size: 14px;
  color: ${theme.colors.PRIMARY_500};
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
