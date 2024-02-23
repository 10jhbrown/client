import { AppRegistry, Platform } from "react-native";
import App from "./App";

AppRegistry.registerComponent("App", () => App);

if (Platform.OS === "web") {
  const rootTag =
    // eslint-disable-next-line no-undef
    document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("App", { rootTag });
}
