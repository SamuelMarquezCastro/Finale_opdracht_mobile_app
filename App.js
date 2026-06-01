import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import CampusDetail from "./screens/CampusDetail";
import SchoolGameScreen from "./screens/SchoolGameScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#111",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#111",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Busleyden Atheneum" }}
        />

        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Product details" }}
        />

        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ title: "Nieuws" }}
        />

        <Stack.Screen
          name="CampusDetail"
          component={CampusDetail}
          options={{ title: "Campus" }}
        />

        <Stack.Screen
          name="SchoolGame"
          component={SchoolGameScreen}
          options={{ title: "School Game" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
