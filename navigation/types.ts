import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";

type LoginParamList = undefined;
type RegisterParamList = undefined;
type HomeParamList = { postId: string };
type ProfileParamList = { userId: string };

export enum RouteNames {
  Login = "Login",
  Register = "Register",
  Home = "Home",
  Profile = "Profile",
}

export type RootStackParamList = Partial<{
  Login: NavigatorScreenParams<{
    Login: LoginParamList;
  }>;
  Register: NavigatorScreenParams<{
    Register: RegisterParamList;
  }>;
  Home: NavigatorScreenParams<{
    Home: HomeParamList;
  }>;
  Profile: NavigatorScreenParams<{
    Profile: ProfileParamList;
  }>;
}>;

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  RouteNames
>;
