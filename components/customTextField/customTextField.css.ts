import styled from "styled-components/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, TextInput, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "theme";

export interface LabelProps {
  isFocused: boolean;
}

export interface InputProps {
  isFocused: boolean;
  error: boolean;
}

export const CustomTextFieldContainer = styled(View)`
  margin: 10px;
`;

export const FieldLabel = styled(Text)<LabelProps>`
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: -7px;
  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const InputField = styled(TextInput).attrs({
  placeholderTextColor: theme.colors.PLACEHOLDER,
})<InputProps>`
  height: 40px;
  width: 90%;
  margin-bottom: 0px;
  padding-horizontal: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.error
      ? "red"
      : props.isFocused
      ? theme.colors.PRIMARY_500
      : theme.colors.PLACEHOLDER};
  border-radius: 15px;
  color: black;
  background-color: ${theme.colors.SURFACE_200};
  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const RowContainer = styled.View`
  paddingleft: 5px;
  justify-content: space-betwenn;
  flex-direction: row;
`;

export const EmailIcon = styled(Fontisto).attrs({
  name: "email",
  color: theme.colors.PLACEHOLDER,
  size: 23,
})<LabelProps>`
  padding-top: 8px;
  padding-right: 10px;
  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const KeyIcon = styled(Ionicons).attrs({
  name: "key-outline",
  size: 25,
})<LabelProps>`
  padding-top: 8px;
  padding-right: 10px;
  margin-left: -2px;
  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const WarningIcon = styled(Entypo).attrs({
  name: "warning",
  size: 15,
})`
  color: red;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  background-color: #ffcccb;
  border-radius: 0px 0px 15px 15px;
  border-width: 1px;
  border-color: red;
  padding: 8px 5px 5px 10px;
  margin-top: -6px;
  z-index: -1000;
`;

export const ErrorText = styled.Text`
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  color: ${theme.colors.PRIMARY_100};
`;
