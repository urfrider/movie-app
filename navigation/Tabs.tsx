import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons/";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? colors.black : "white",
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? colors.black : "white" },
        tabBarActiveTintColor: isDark ? colors.yellow : colors.black,
        tabBarInactiveTintColor: isDark ? colors.light_gray : colors.dark_gray,
        headerStyle: { backgroundColor: isDark ? colors.black : " white" },
        headerTitleStyle: { color: isDark ? "white" : colors.black },
        headerTitleAlign: "center",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: -5 },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="film" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="tv" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
