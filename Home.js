import React from "react";
import { Button, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookPage from "./components/Book.js";
import Product from "./components/Product.js";
import OrderPage from "./components/OrderPage.js";
import AntDesign from "react-native-vector-icons/AntDesign";
import FoodPage from "./components/Food.js";
import DrawerPage from "./Drawer.js";
import { useUser } from "./context/userContext.jsx";


const Tab = createBottomTabNavigator();


export default function Home({ route }) {

  // const name=route.params.user.data.data.user.username
  // console.log(name)
  const user = useUser()
  // console.log(user)
  const screenOptions = {

    tabBarStyle: {
      backgroundColor: "#5A72A0",
      height: 80,
      paddingVertical: 10,
      color: "black",
    },
    tabBarItemStyle: {
      backgroundColor: "#5A72A0",
      marginBottom: 10,
      color: "black",
    },
  };
  return (
    <Tab.Navigator 
      screenOptions={ screenOptions }
    >
      <Tab.Screen
        name="Prasad"
        initialParams={user}
        component={FoodPage}
        options={{
          tabBarLabel: "Prasada",
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
          tabBarIcon: () => (
            <View>
              <AntDesign name="home" size={25} style={{ color: "black" }} />
            </View>
          ),
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
        }}
      />
      <Tab.Screen
        name="Holy Books"
        initialParams={user}
        component={BookPage}
        options={{
          tabBarLabel: "Books",
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
          tabBarIcon: () => (
            <View>
              <AntDesign
                name="book"
                size={25}
                style={{ color: "black" }}
              />
            </View>
          ),
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
        }}
      />
      <Tab.Screen
        name="Account"
        initialParams={user}
        component={DrawerPage}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
          tabBarIcon: () => (
            <View>
              <AntDesign
                name="user"
                size={25}
                style={{ color: "black" }}
              />
            </View>
          ),
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white",
        }}
      />
    </Tab.Navigator>
  );
}
