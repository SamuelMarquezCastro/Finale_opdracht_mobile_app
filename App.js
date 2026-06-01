import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import BlogDetail from "./screens/BlogDetail";

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
          options={{ title: "SportWear Store" }}
        />

        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Product details" }}
        />

        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ title: "Blog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}