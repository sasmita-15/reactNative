import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Product from "./components/Product.js";
import OrderPage from "./components/OrderPage.js";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();


export default function Home() {

  const screenOptions = {
    tabBarStyle: {
      backgroundColor:'#5A72A0',
      height: 80,
      paddingVertical: 10,
      color: 'black'
    },
    tabBarItemStyle: {
      backgroundColor:'#5A72A0',
      marginBottom: 10,
      color: 'black'
    }
  };

  return (

      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Product" component={Product} 
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
          tabBarIcon: () =>
            <View>
              <AntDesign name="home" size={25} style={{ color: "black" }} />
            </View>,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white"
          }} />
        <Tab.Screen name="Order" component={OrderPage} 
        options={{
          tabBarLabel: "Orders",
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
          tabBarIcon: () =>
            <View>
              <AntDesign name="shoppingcart" size={25} style={{ color: "black" }} />
            </View>,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "white"
          }}
        />
      </Tab.Navigator>
  );
}
