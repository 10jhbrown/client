import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "validation/loginValidationSchema";
import { CustomTextField } from "../customTextField";
import {
  LoginFormContainer,
  LoginTitle,
  ErrorContainer,
  ErrorText,
  LoginButtonContainer,
} from "./loginForm.css";
import { CustomButton } from "components/customButton";
import { WarningIcon } from "components/customTextField/customTextField.css";

export const LoginForm = ({ onSubmit, errorMessage, clearError }) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          //@ts-ignore
          <LoginFormContainer>
            <LoginTitle>Sign In</LoginTitle>
            <CustomTextField
              emailIcon
              placeholder={"Email"}
              onChangeText={handleChange("email")}
              value={values.email}
              //@ts-ignore
              autoCapitalize="none"
              errorEmail={errors.email}
              onBlur={handleEmailBlur}
            />
            {/* <InputField
              onFocus={() => setIsEmailFocused(true)}
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleEmailBlur}
              value={values.email}
              autoCapitalize="none"
              onChange={clearError}
            /> */}
            {/* {errors.email && (
              <ErrorContainer>
                <ErrorText>{errors.email}</ErrorText>
              </ErrorContainer>
            )} */}
            {/* <InputField
              onFocus={() => setIsPasswordFocused(true)}
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handlePasswordBlur}
              value={values.password}
              secureTextEntry
              onChange={clearError}
            /> */}
            <CustomTextField
              keyIcon
              placeholder={"Password"}
              onChangeText={handleChange("password")}
              value={values.password}
              //@ts-ignore
              secureTextEntry
              onChange={clearError}
              errorPassword={errors.password}
            />
            {/* {errors.password && (
              <ErrorContainer>
                <ErrorText>{errors.password}</ErrorText>
              </ErrorContainer>
            )} */}
            {errorMessage && (
              <ErrorContainer>
                <WarningIcon name />
                <ErrorText> {errorMessage}</ErrorText>
              </ErrorContainer>
            )}
            <LoginButtonContainer>
              <CustomButton onPress={() => handleSubmit()} title="Sign In" />
            </LoginButtonContainer>
          </LoginFormContainer>
        )}
      </Formik>
    </View>
  );
};
