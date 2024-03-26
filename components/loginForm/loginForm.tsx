import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { loginValidationSchema } from "validation/loginValidationSchema";
import { CustomTextField } from "../customTextField";
import {
  LoginFormContainer,
  LoginTitle,
  ErrorContainer,
  ErrorText,
  LoginButtonContainer,
  SignUpContainer,
  SignUpText,
  SignUpTextLink,
} from "./loginForm.css";
import { CustomButton } from "components/customButton";
import { WarningIcon } from "components/customTextField/customTextField.css";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/types";

export const LoginForm = ({ onSubmit, errorMessage, setErrorMessage }) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation<NavigationProp>();

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
              title={"Email."}
              emailIcon
              placeholder={"Enter your email"}
              onChangeText={handleChange("email")}
              value={values.email}
              //@ts-ignore
              autoCapitalize="none"
              error={errors.email}
              onBlur={handleEmailBlur}
              setErrorMessage={setErrorMessage}
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
              title={"Password"}
              placeholder={"Enter your password"}
              onChangeText={handleChange("password")}
              value={values.password}
              //@ts-ignore
              secureTextEntry
              error={errors.password}
              setErrorMessage={setErrorMessage}
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
            <SignUpContainer>
              <SignUpText>Dont have an account? </SignUpText>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register", undefined)}
              >
                <SignUpTextLink>Sign Up</SignUpTextLink>
              </TouchableOpacity>
            </SignUpContainer>
          </LoginFormContainer>
        )}
      </Formik>
    </View>
  );
};
