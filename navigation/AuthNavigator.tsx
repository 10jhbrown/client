import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { LoginScreen } from "../screens/Login";

const AuthNavigator = () => {
  const Stack = createStackNavigator();

  const stackNavigatorOptions = {
    headerShown: null,
    ...TransitionPresets.SlideFromRightIOS,
  };

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
