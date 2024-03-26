import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";

const AuthNavigator = () => {
  const Stack = createStackNavigator();

  const stackNavigatorOptions = {
    headerShown: null,
    ...TransitionPresets.SlideFromRightIOS,
  };

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
