import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { CustomButton } from "components/customButton";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInContainer,
  SignInText,
  SignInTextLink,
  RegisterButtonContainer,
  RegisterFormContainer,
  CreateAccountTitle,
  WarningIcon,
  ErrorContainer,
  ErrorText,
} from "./RegisterScreen.css";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/types";
import { CustomTextField } from "../../components/customTextField";
import { theme } from "../../theme";
import {
  registerForm1ValidationSchema,
  registerForm2ValidationSchema,
} from "../../validation/registerValidationSchema";
import { Schema } from "yup";
import { clearErrors } from "../../redux/auth";
import {
  availableUsername,
  availableEmail,
  sendEmailVerificationCode,
  registerUser,
  loginUser,
} from "../../repositories/AuthRepository";
import { VerificationForm } from "../../components/verificationForm";
import { ApplicationState } from "../../redux/types";

export const RegisterScreen = () => {
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | Error>(null);
  const error = useSelector((state: ApplicationState) => state.auth.error);
  // useEffect(() => {
  //   if (error) {
  //     console.log("SET ERRRO");
  //     setErrorMessage(error);
  //     dispatch(clearErrors());
  //   }
  // }, [error]);

  const dispatch = useDispatch();
  const goToNextForm = () => setCurrentForm((currentForm) => currentForm + 1);
  const goToPrevForm = () => {
    setCurrentForm((currentForm) => currentForm - 1);
    setErrorMessage(null);
  };

  const handleSubmit = async (values, actions) => {
    setErrorMessage(null);
    setIsUsernameAvailable(true);
    setIsEmailAvailable(true);
    switch (currentForm) {
      case 1:
        console.log("Form 1", values, isUsernameAvailable);
        const existingUsername = await availableUsername(values["username"]);

        if (!existingUsername) {
          setErrorMessage("Username has already been taken");
          setIsUsernameAvailable(false);
          break;
        }
        setCurrentForm(2);

        break;
      case 2:
        const existingEmail = await availableEmail(values["email"]);
        if (!existingEmail) {
          setErrorMessage("Email is already in use");
          setIsEmailAvailable(false);
          break;
        }
        // Implement phone registration logic here
        await sendEmailVerificationCode(values["email"]);
        console.log("SENT VERIFICATION CODE");
        setCurrentForm(3);
        break;
      case 3:
        //@ts-ignore
        dispatch(registerUser(values));
        // dispatch(loginUser(values.email, values.password));
        console.log("REGISTER errorMessage", errorMessage, error);
        // Implement social media registration logic here
        break;
      default:
        break;
    }

    // actions.resetForm();
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        // registerValidationSchema = registerForm1ValidationSchema;
        return (
          <Form
            initialValues={{
              firstName: null,
              lastName: null,
              username: null,
            }}
            onSubmit={handleSubmit}
            goToNextForm={goToNextForm}
            currentForm={currentForm}
            validationSchema={registerForm1ValidationSchema}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            isUsernameAvailable={isUsernameAvailable}
            setIsUsernameAvailable={setIsUsernameAvailable}
            setIsEmailAvailable={setIsEmailAvailable}
          />
        );
      case 2:
        // registerValidationSchema = registerForm2ValidationSchema;
        return (
          <Form
            initialValues={{
              email: null,
              password: null,
              confirmPassword: null,
            }}
            onSubmit={handleSubmit}
            goToNextForm={goToNextForm}
            goToPrevForm={goToPrevForm}
            currentForm={currentForm}
            validationSchema={registerForm2ValidationSchema}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            isEmailAvailable={isEmailAvailable}
            setIsEmailAvailable={setIsEmailAvailable}
            setIsUsernameAvailable={setIsUsernameAvailable}
          />
        );
      case 3:
        return (
          <Form
            initialValues={{
              emailCode: null,
            }}
            onSubmit={handleSubmit}
            goToPrevForm={goToPrevForm}
            currentForm={currentForm}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        );
      default:
        // registerValidationSchema = registerForm1ValidationSchema;
        return null;
    }
  };

  return <View style={styles.container}>{renderForm()}</View>;
};

interface Props {
  initialValues: {};
  onSubmit: (values: string[], action: any) => void;
  goToNextForm?: () => void;
  goToPrevForm?: () => void;
  currentForm: number;
  validationSchema?: Schema;
  errorMessage?: string | Error;
  setErrorMessage?: (e: any) => any;
  isUsernameAvailable?: boolean;
  setIsUsernameAvailable?: (e: any) => any;
  isEmailAvailable?: boolean;
  setIsEmailAvailable?: (e: any) => any;
}

const Form = ({
  initialValues,
  onSubmit,
  goToNextForm,
  goToPrevForm,
  currentForm,
  validationSchema,
  errorMessage,
  setErrorMessage,
  isUsernameAvailable,
  setIsUsernameAvailable,
  isEmailAvailable,
  setIsEmailAvailable,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  console.log("FORM NUMBER", currentForm);
  console.log("errorMessage on REg screen", errorMessage);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      goToNextForm={goToNextForm}
      goToPrevForm={goToPrevForm}
      currentForm={currentForm}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {currentForm !== 3 ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <RegisterFormContainer colors>
                <CreateAccountTitle>Sign Up</CreateAccountTitle>
                {Object.keys(initialValues).map((fieldName) => {
                  var formatFieldName =
                    fieldName === "firstName" || fieldName === "lastName"
                      ? fieldName.charAt(0).toUpperCase() +
                        fieldName.slice(1, -4) +
                        " Name"
                      : fieldName.charAt(0).toUpperCase() +
                        fieldName.slice(1).toLowerCase();
                  return (
                    <CustomTextField
                      title={formatFieldName}
                      key={fieldName}
                      onChangeText={handleChange(fieldName)}
                      onBlur={handleBlur}
                      value={values[fieldName]}
                      placeholder={`Enter ${fieldName
                        .charAt(0)
                        .toLowerCase()}${fieldName.slice(1).toLowerCase()}`}
                      error={errors[fieldName]}
                      autoCapitalize={
                        fieldName === "username" || fieldName === "email"
                          ? "none"
                          : "words"
                      }
                      secureTextEntry={
                        fieldName === "password" ||
                        fieldName === "confirmPassword"
                          ? true
                          : false
                      }
                      setErrorMessage={setErrorMessage}
                      isUsernameAvailable={isUsernameAvailable}
                      setIsUsernameAvailable={setIsUsernameAvailable}
                      isEmailAvailable={isEmailAvailable}
                      setIsEmailAvailable={setIsEmailAvailable}
                    />
                  );
                })}
                {errorMessage && (
                  <ErrorContainer>
                    <WarningIcon name />
                    <ErrorText> {errorMessage}</ErrorText>
                  </ErrorContainer>
                )}
                <RegisterButtonContainer>
                  <CustomButton
                    title="Continue"
                    onPress={handleSubmit}
                    disabled={
                      currentForm === 1
                        ? !values["firstName"] ||
                          !values["lastName"] ||
                          !values["username"] ||
                          errors["firstName"] ||
                          errors["lastName"] ||
                          errors["username"]
                        : currentForm === 2
                        ? !values["email"] ||
                          !values["password"] ||
                          !values["confirmPassword"] ||
                          errors["email"] ||
                          errors["password"] ||
                          errors["confirmPassword"]
                        : false
                    }
                  />
                </RegisterButtonContainer>
                {currentForm !== 1 && (
                  <RegisterButtonContainer>
                    <CustomButton
                      title="Back"
                      onPress={goToPrevForm}
                      secondary={true}
                    />
                  </RegisterButtonContainer>
                )}
                <SignInContainer>
                  <SignInText>Already have an account? </SignInText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login", undefined)}
                  >
                    <SignInTextLink>Sign In</SignInTextLink>
                  </TouchableOpacity>
                </SignInContainer>
              </RegisterFormContainer>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <RegisterFormContainer colors>
                <VerificationForm
                  values={values}
                  goToPrevForm={goToPrevForm}
                  handleSubmit={handleSubmit}
                  errorMessage={errorMessage}
                />
              </RegisterFormContainer>
            </TouchableWithoutFeedback>
          )}
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    backgroundColor: theme.colors.SURFACE_100,
  },
});
