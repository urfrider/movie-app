import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons/";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Function to load images and fonts
const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isDark = useColorScheme() === "dark";

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
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}
