import CartPage from "./components/Cart.js";
import ProfilePage from "./components/Profile.js";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useUser } from "./context/userContext.jsx";

import Button from "./components/customizable.js";
const Drawer = createDrawerNavigator();

export default function DrawerPage({route}) {
    // console.log(route.params.data)
    const user = useUser()
  return (
    <Drawer.Navigator >
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        initialParams={{ user }}
        screenOptions={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartPage}
        initialParams={{ user }}
        screenOptions={{ headerShown: false }}
      />
      <Drawer.Screen
        name="cutom buttom"
        component={Button}
      />
    </Drawer.Navigator>
  );
}
