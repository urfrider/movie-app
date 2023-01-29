import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import colors from "../colors";
import { useColorScheme } from "react-native";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "fade",
        headerStyle: { backgroundColor: isDark ? colors.black : "white" },
        headerTitleStyle: { color: isDark ? "white" : colors.black },
        headerTintColor: isDark ? "white" : colors.black,
        headerTitleAlign: "center",
      }}
    >
      {/* @ts-ignore */}
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
