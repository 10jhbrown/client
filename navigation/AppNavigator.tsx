import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator } from "./HomeNavigator";
import { AddPostScreen } from "../screens/AddPost";

const AppNavigator = () => {
  const Stack = createStackNavigator();

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
          headerShown: false,
        }}
        //   headerBackTitle: "",
        //   headerRight: () => (
        //     <Button
        //       title="Post"
        //       onPress={() => dispatch(submitPost("It's JBB", token))}
        //     />
        //     // <Text>HGello</Text>
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
