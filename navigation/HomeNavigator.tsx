import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Zocial from "react-native-vector-icons/Zocial";
import { HomeScreen } from "../screens/Home";
import { ProfileScreen } from "../screens/Profile";

export const HomeNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "red",
        inActiveTintColor: "grey",
        tabBarStyle: [
          {
            paddingTop: 10,
            height: 100,
            //   backgroundColor: theme.colors.SURFACE_100,
            borderTopWidth: 0,
          },
          null,
        ],
        tabBarIcon: ({ color }) => {
          let iconName;
          let routeName = route.name;

          switch (routeName) {
            case "Home":
              iconName = "university";
              return <FontAwesome name={iconName} size={28} color={color} />;
            case "Search":
              iconName = "search";
              return <FontAwesome name={iconName} size={28} color={color} />;
            case "Notifications":
              iconName = "megaphone";
              return <Entypo name={iconName} size={30} color={color} />;
            case "Profile":
              iconName = "persona";
              return <Zocial name={iconName} size={30} color={color} />;
            default:
              break;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};
