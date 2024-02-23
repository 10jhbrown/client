import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LoginForm } from "../../components/loginForm";
import { loginUser } from "../../repositories/AuthRepository";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/types";
import { clearErrors } from "../../redux/auth";
export const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const [errorMessage, setErrorMessage] = useState<Error>(null);
  const error = useSelector((state: ApplicationState) => state.auth.error);
  const clearError = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      dispatch(clearErrors());
    }
  }, [error]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    //@ts-ignore
    dispatch(loginUser({ email, password }));
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <LoginForm
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        clearError={clearError}
      />
    </View>
  );
};

export default LoginScreen;
