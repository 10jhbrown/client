import React from "react";
import { useSelector } from "react-redux";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { ApplicationState } from "redux/types";

export const RootNavigator = () => {
  const isAuth = useSelector((state: ApplicationState) => state.auth.token);
  return isAuth ? <AppNavigator /> : <AuthNavigator />;
};
