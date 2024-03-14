import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { RootNavigator } from "./navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

export default function App() {
  const persistor = persistStore(store);
  const [fontsloaded] = useFonts({
    Ethnocentric: require("./assets/fonts/Ethnocentric Regular.ttf"),
  });
  // const [fontLoaded, setFontLoaded] = useState(false);
  // useEffect(async () => {
  //   await Font.loadAsync({
  //     Ethnocentric: require("./assets/fonts/Ethnocentric Regular.ttf"),
  //   });
  //   setFontLoaded(true);
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
