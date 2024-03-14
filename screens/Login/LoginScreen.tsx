import React, { useState, useEffect } from "react";
import { LoginForm } from "../../components/loginForm";
import { loginUser } from "../../repositories/AuthRepository";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../redux/types";
import { clearErrors } from "../../redux/auth";
import {
  LoginScreenContainer,
  RaveWaveLogo,
  LogoContainer,
  WaveLogo,
} from "./LoginScreen.css";
export const LoginScreen = () => {
  const dispatch = useDispatch();
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
    <LoginScreenContainer>
      <LogoContainer>
        {/* <Ethnocentric size={43}>RaveWave</Ethnocentric> */}
        <RaveWaveLogo>Rave</RaveWaveLogo>
        <WaveLogo>Wave</WaveLogo>
      </LogoContainer>
      <LoginForm
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
        clearError={clearError}
      />
    </LoginScreenContainer>
  );
};

export default LoginScreen;
