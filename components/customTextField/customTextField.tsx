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

interface Props {
  title: string;
  emailIcon?: boolean;
  keyIcon?: boolean;
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  error?: string;
  onBlur?: (event: any) => void;
  secureTextEntry?: boolean;
  onChange?: (this: Window, ev: Event) => any;
  autoCapitalize?: string;
  setErrorMessage?: (e: any) => any;
  isUsernameAvailable?: boolean;
  setIsUsernameAvailable?: (e: any) => boolean | undefined;
  isEmailAvailable?: boolean;
  setIsEmailAvailable?: (e: any) => boolean | undefined;
}

export const CustomTextField = ({
  title,
  emailIcon = false,
  keyIcon = false,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  autoCapitalize,
  onChange,
  error,
  setErrorMessage,
  isEmailAvailable,
  isUsernameAvailable,
  setIsUsernameAvailable,
  setIsEmailAvailable,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <CustomTextFieldContainer>
      <FieldLabel isFocused={isFocused}>
        {title === "Email." ? "Email" : title}
      </FieldLabel>
      <RowContainer>
        {emailIcon && <EmailIcon name isFocused={isFocused} />}
        {keyIcon && <KeyIcon name isFocused={isFocused} />}
        <InputField
          {...rest}
          error={error}
          isUsernameAvailable={isUsernameAvailable}
          isEmailAvailable={isEmailAvailable}
          isFocused={isFocused}
          onFocus={() => {
            setIsFocused(true);
            setErrorMessage(null);
            if (!isUsernameAvailable && title === "Username") {
              setIsUsernameAvailable(true);
            }
            if (!isEmailAvailable && title === "Email") {
              setIsEmailAvailable(true);
            }
          }}
          title={title}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={() => setIsFocused(false)}
          value={value}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onChange={() => {
            setErrorMessage(null);
            if (!isUsernameAvailable && title === "Username") {
              setIsUsernameAvailable(true);
            }
            if (!isEmailAvailable && title === "Email") {
              setIsEmailAvailable(true);
            }
          }}
        />
      </RowContainer>
      {error && (
        <ErrorContainer>
          <WarningIcon name />
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}
    </CustomTextFieldContainer>
  );
};
