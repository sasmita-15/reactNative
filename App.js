import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login.js";
import RegisterPage from "./components/Register.js";
import { StatusBar, View } from "react-native";
import Home from "./Home.js";
import { UserProvider, useUser } from "./context/userContext.jsx";
import DrawerPage from "./Drawer.js";

const Stack = createStackNavigator();
export default function App() {
  

  return (
    <UserProvider>
      <NavigationContainer warnForNonSerializableState={false}>
        <StatusBar backgroundColor={"#5A72A0"} />
        {/* <DrawerPage /> */}
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
            
            options={({ route }) => ({
              
              title: `Welcome, ${route.params.user.data.data.user.username}`, // Set title with username
              headerStyle: {
                backgroundColor: "#1A2130",
              },
              headerLeft: null,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            })}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerPage}
            options={{
              headerShown: false,
              tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
              tabBarIcon: () => (
                <View>
                  <AntDesign name="book" size={25} style={{ color: "black" }} />
                </View>
              ),
              tabBarActiveTintColor: "blue",
              tabBarInactiveTintColor: "white",
              tabBarActiveBackgroundColor: "white",
              tabBarInactiveBackgroundColor: "white",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
