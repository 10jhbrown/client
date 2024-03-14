import React, { useState } from "react";
import {
  CustomTextFieldContainer,
  InputField,
  FieldLabel,
  RowContainer,
  KeyIcon,
  EmailIcon,
  ErrorContainer,
  ErrorText,
  WarningIcon,
} from "./customTextField.css";
import { TextField } from "../../types";

export const CustomTextField: React.FC<TextField> = ({
  emailIcon = false,
  keyIcon = false,
  placeholder,
  onChangeText,
  value,
  errorEmail,
  errorPassword,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <CustomTextFieldContainer>
      <FieldLabel isFocused={isFocused}>{placeholder}</FieldLabel>
      <RowContainer>
        {emailIcon && <EmailIcon name isFocused={isFocused} />}
        {keyIcon && <KeyIcon name isFocused={isFocused} />}
        <InputField
          {...rest}
          error={errorEmail || errorPassword}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={() => setIsFocused(false)}
          value={value}
        />
      </RowContainer>
      {errorEmail && (
        <ErrorContainer>
          <WarningIcon name />
          <ErrorText> {errorEmail}</ErrorText>
        </ErrorContainer>
      )}
      {errorPassword && (
        <ErrorContainer>
          <WarningIcon name />
          <ErrorText> {errorPassword}</ErrorText>
        </ErrorContainer>
      )}
    </CustomTextFieldContainer>
  );
};
