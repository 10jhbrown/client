import React from "react";
import { useSelector } from "react-redux";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { selectAuthToken } from "../redux/auth/selectors";

export const RootNavigator = () => {
  const isAuth = useSelector(selectAuthToken);
  return isAuth ? <AppNavigator /> : <AuthNavigator />;
};
