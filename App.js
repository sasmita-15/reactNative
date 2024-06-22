import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login.js";
import RegisterPage from "./components/Register.js";
import { StatusBar } from "react-native";
import Product from "./components/Product.js";
import Home from "./Home.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#5A72A0"} />
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerLeft: null,
            title: "Namaste, Please login here",
            headerStyle: {
              backgroundColor: "#1A2130",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            title: "Namaste, Please register here",
            headerStyle: {
              backgroundColor: "#1A2130",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null,
            title: "Welcome",
            headerStyle: {
              backgroundColor: "#1A2130",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
