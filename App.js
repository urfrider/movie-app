import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons/";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Function to load images and fonts
const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  async function prepare() {
    try {
      // Pre-load fonts, make any API calls you need to do here
      const fonts = loadFonts([Ionicons.font]);
      const images = loadImages([
        require("./issue2.jpg"),
        "https://d33wubrfki0l68.cloudfront.net/4245a6b338cc1b008aa1265c213c1e75be207801/2eaf7/img/oss_logo.svg",
      ]);
      await Promise.all([...fonts, ...images]);
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </View>
  );
}
