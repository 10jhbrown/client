import styled from "styled-components/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, TextInput, Text } from "react-native";

import { theme } from "theme";

export interface LabelProps {
  isFocused: boolean;
}

export interface InputProps {
  isFocused: boolean;
  error: boolean;
  isUsernameAvailable: boolean;
  isEmailAvailable: boolean;
  title: string;
}

export const CustomTextFieldContainer = styled(View)`
  margin: 5px;
`;

export const FieldLabel = styled(Text)<LabelProps>`
  font-size: 16px;
  margin-bottom: 5px;

  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const InputField = styled(TextInput).attrs({
  placeholderTextColor: theme.colors.PLACEHOLDER,
})<InputProps>`
  height: 40px;
  width: 90%;
  margin-bottom: 0px;
  padding-horizontal: 10px;
  border-width: 0px;
  border-color: transparent;
  border-radius: 15px;
  border-left-color: ${(props) =>
    props.error ||
    (!props.isEmailAvailable && props.title === "Email") ||
    (!props.isUsernameAvailable && props.title === "Username")
      ? "red"
      : props.isFocused
      ? theme.colors.PRIMARY_500
      : theme.colors.PLACEHOLDER};
  color: black;
  color: white;
`;

export const RowContainer = styled.View<InputProps>`
  paddingleft: 5px;
  flex-direction: row;
  border-width: 1px;
  border-color: ${(props) =>
    props.error ||
    (!props.isEmailAvailable && props.title === "Email") ||
    (!props.isUsernameAvailable && props.title === "Username")
      ? "red"
      : props.isFocused
      ? theme.colors.PRIMARY_500
      : theme.colors.PLACEHOLDER};
  border-radius: ${(props) =>
    props.error ||
    (!props.isEmailAvailable && props.title === "Email") ||
    (!props.isUsernameAvailable && props.title === "Username")
      ? "15px 15px 0px 0px"
      : "15px"};
  color: black;
  background-color: ${theme.colors.SURFACE_200};
  color: white;
`;

export const EmailIcon = styled(Fontisto).attrs({
  name: "email",
  color: theme.colors.PLACEHOLDER,
  size: 23,
})<LabelProps>`
  margin-left: 8px;
  padding-top: 8px;
  padding-right: 5px;
  color: ${(props) => (props.isFocused ? "white" : theme.colors.PLACEHOLDER)};
`;

export const KeyIcon = styled(Ionicons).attrs({
  name: "key-outline",
  size: 25,
})<LabelProps>`
  margin-left: 8px;
  padding-top: 8px;
  padding-right: 5px;
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
