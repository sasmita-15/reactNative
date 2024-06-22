import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

const Img = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg" }}
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});


// function Car() {
//     return(
//         <View>
//             <Text>My new car</Text>
//         </View>
//     )
//     const login=true;
//     const element1 = (
//         <div>
//             <Text>
//                 Hello, {login ? "user" : "Guest" }
//             </Text>
//             {
//                 login && (
//                     <View>
//                         <Text>logout</Text>
//                     </View>
//                 )
//             }
//         </div>

//     )

// }

export { Img };
