import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator } from "./HomeNavigator";
import { AddPostScreen } from "../screens/AddPost";
import { CustomButton } from "../components/customButton";
import { EthnoText } from "../components/customButton/customButton.css";
import { Text, View } from "react-native";
import { theme } from "theme";
import { useNavigation } from "@react-navigation/native";

const AppNavigator = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.SURFACE_300,
          headerStyle: {
            backgroundColor: theme.colors.SURFACE_100,
            shadowOpacity: 0,
          },

          //@ts-ignore
          headerTitle: () => <EthnoText>Rave Post</EthnoText>,
          // headerRight: () => (
          //   <View style={{ marginRight: 10, top: -5 }}>
          //     <CustomButton
          //       title="Submit"
          //       size={14}
          //       onPress={(navigation) => {
          //         navigation.getParams("handleSubmit"());
          //       }}
          //     />
          //   </View>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
